import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { CartAddDto } from './dto/cart-add.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('cart')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.Client)
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  addToCart(
    @Body() cartAddDto: CartAddDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.cartService.addToCart(cartAddDto, user);
  }
}
