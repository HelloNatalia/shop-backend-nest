import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddressesService } from './addresses.service';
import { Address } from './address.entity';
import { AddressDto } from './dto/address.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('addresses')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.Client)
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @Post()
  createAddress(
    @Body() createAddressDto: AddressDto,
    @GetUser() user: User,
  ): Promise<Address> {
    return this.addressesService.createAddress(createAddressDto, user);
  }

  @Get()
  getAddresses(@GetUser() user: User): Promise<Address[]> {
    return this.addressesService.getAddresses(user);
  }

  @Patch(':id')
  updateAddress(
    @Param('id') id: number,
    @GetUser() user: User,
    @Body() addressDto: AddressDto,
  ): Promise<Address> {
    return this.addressesService.updateAddress(id, user, addressDto);
  }

  @Delete(':id')
  deleteAddress(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.addressesService.deleteAddress(id, user);
  }
}
