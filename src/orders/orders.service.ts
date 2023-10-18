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

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,
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
      throw new InternalServerErrorException(
        `Something went wrong, try again.`,
      );
    }
  }
}
