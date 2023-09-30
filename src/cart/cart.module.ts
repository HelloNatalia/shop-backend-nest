import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from 'src/products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    TypeOrmModule.forFeature([Product]),
    AuthModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
