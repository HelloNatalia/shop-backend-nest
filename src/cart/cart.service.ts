import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CartAddDto } from './dto/cart-add.dto';
import { User } from 'src/auth/user.entity';
import { Product } from 'src/products/product.entity';
import { CartUpdateDto } from './dto/cart-update.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addToCart(cartAddDto: CartAddDto, user: User): Promise<void> {
    const { productId, quantity } = cartAddDto;

    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product) {
      throw new Error(`Product with id "${productId}" not found`);
    }

    const cart = this.cartRepository.create({
      quantity,
      user,
      product,
    });

    try {
      await this.cartRepository.save(cart);
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async updateCart(id: number, cartUpdateDto: CartUpdateDto): Promise<Cart> {
    const { quantity } = cartUpdateDto;

    const cart = await this.cartRepository.findOneBy({ id: id });
    if (!cart) {
      throw new NotFoundException(`Cart's element not found`);
    }

    cart.quantity = quantity;

    await this.cartRepository.save(cart);

    return cart;
  }
}
