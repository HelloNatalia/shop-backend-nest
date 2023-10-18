import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { OrdersService } from './orders.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AddressOrderDto } from './dto/address-order.dto copy';
import { Order } from './order.entity';

@Controller('orders')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.Client)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('order-details')
  selectOrderDetails(
    @Body() cartIds: number[],
    @GetUser() user: User,
  ): Promise<any[]> {
    return this.ordersService.getOrderDetails(cartIds, user);
  }

  @Post('created-order')
  createOrder(
    @Body() addressOrder: AddressOrderDto,
    @GetUser() user: User,
  ): Promise<Order> {
    return this.ordersService.createOrder(addressOrder, user);
  }
}
