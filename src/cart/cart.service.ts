import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CartAddDto } from './dto/cart-add.dto';
import { User } from 'src/auth/user.entity';
import { Product } from 'src/products/product.entity';

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
}
