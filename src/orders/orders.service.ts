import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { User } from 'src/auth/user.entity';
import { Cart } from 'src/cart/cart.entity';
import { Address } from 'src/addresses/address.entity';
import { AddressOrderDto } from './dto/address-order.dto copy';
import { AddressesService } from 'src/addresses/addresses.service';
import { AddressDto } from 'src/addresses/dto/address.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,
    private addressesService: AddressesService,
  ) {}

  async getOrderDetails(cartIds: number[], user: User) {
    try {
      const carts = await Promise.all(
        cartIds.map(async (element) => {
          const cart = await this.cartRepository.findOneBy({ id: element });
          if (!cart)
            throw new NotFoundException(`Product with id ${element} not found`);
          return cart;
        }),
      );

      const addresses = await this.addressesRepository
        .createQueryBuilder('address')
        .where('address.userId = :userId', { userId: user.id })
        .getMany();

      return [user, carts, addresses];
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException(`Product not found`);
    }
  }

  async createOrder(addressOrder: AddressOrderDto, user: User): Promise<Order> {
    const aId = addressOrder.addressId;
    let address = await this.addressesRepository.findOneBy({ id: aId });
    const carts = addressOrder.carts;
    if (!address && addressOrder.street) {
      const addressDto: AddressDto = {
        street: addressOrder.street,
        number: addressOrder.number,
        postal_code: addressOrder.postal_code,
        city: addressOrder.city,
        country: addressOrder.country,
        phone_code: addressOrder.phone_code,
        phone_number: addressOrder.phone_number,
      };
      address = await this.addressesService.createAddress(addressDto, user);
    } else if (!address && !addressOrder.street) {
      throw new NotFoundException(`Failed with filling in an address`);
    }

    const order = this.ordersRepository.create({
      address,
      user,
      carts,
    });

    try {
      await this.ordersRepository.save(order);
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('Something went wrong');
    }

    return order;
  }
}
