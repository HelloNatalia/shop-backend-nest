import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create_address.dto';
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
    createAddressDto: CreateAddressDto,
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

  // getAddresses -> this function gets loggedin user's adresses

  // updateAddress -> this function updates loggedin user's specific address

  // deleteAddress -> this function deletes loggedin user's specific address

  // then: orders module
}
