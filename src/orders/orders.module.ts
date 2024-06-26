import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/cart/cart.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Order } from './order.entity';
import { Address } from 'src/addresses/address.entity';
import { User } from 'src/auth/user.entity';
import { AddressesService } from 'src/addresses/addresses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Cart]),
    TypeOrmModule.forFeature([Address]),
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, AddressesService],
})
export class OrdersModule {}
