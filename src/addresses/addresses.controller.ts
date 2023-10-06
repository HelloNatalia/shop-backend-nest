import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddressesService } from './addresses.service';
import { Address } from './address.entity';
import { CreateAddressDto } from './dto/create_address.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('addresses')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.Client)
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @Post()
  createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @GetUser() user: User,
  ): Promise<Address> {
    return this.addressesService.createAddress(createAddressDto, user);
  }
}
