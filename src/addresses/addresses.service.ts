import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { Repository } from 'typeorm';
import { AddressDto } from './dto/address.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createAddress(
    createAddressDto: AddressDto,
    user: User,
  ): Promise<Address> {
    const {
      street,
      number,
      postal_code,
      city,
      country,
      phone_code,
      phone_number,
    } = createAddressDto;

    const address = this.addressRepository.create({
      street,
      number,
      postal_code,
      city,
      country,
      phone_code,
      phone_number,
      user,
    });

    try {
      this.addressRepository.save(address);
      return address;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getAddresses(user: User): Promise<Address[]> {
    const addresses = this.addressRepository
      .createQueryBuilder('address')
      .where('address.userId = :userId', { userId: user.id })
      .getMany();
    return addresses;
  }

  async updateAddress(
    id: number,
    user: User,
    addressDto: AddressDto,
  ): Promise<Address> {
    const address = await this.addressRepository.findOneBy({ id: id });

    if (!address) {
      throw new NotFoundException(`Address with id ${id} not found`);
    }

    const {
      street,
      number,
      postal_code,
      city,
      country,
      phone_code,
      phone_number,
    } = addressDto;

    if (street) address.street = street;
    if (number) address.number = number;
    if (postal_code) address.postal_code = postal_code;
    if (city) address.city = city;
    if (country) address.country = country;
    if (phone_code) address.phone_code = phone_code;
    if (phone_number) address.phone_number = phone_number;

    await this.addressRepository.save(address);
    return address;
  }

  async deleteAddress(id: number, user: User): Promise<void> {
    const address = await this.addressRepository
      .createQueryBuilder('address')
      .where('address.userId = :userId', { userId: user.id })
      .andWhere('id = :id', { id: id })
      .getOne();

    if (!address) {
      throw new NotFoundException(
        `The address could not be deleted. Try again.`,
      );
    }
    await this.addressRepository.delete({ id: id });
  }
}
