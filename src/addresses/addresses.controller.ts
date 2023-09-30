import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddressesService } from './addresses.service';

@Controller('addresses')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.Client)
export class AddressesController {
  constructor(private addressesService: AddressesService) {}
}
