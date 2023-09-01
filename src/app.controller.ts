import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/roles.decorator';
import { Role } from './auth/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './auth/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // Example of how to use roles
  // @Roles(Role.Admin)
  // @UseGuards(AuthGuard(), RolesGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
