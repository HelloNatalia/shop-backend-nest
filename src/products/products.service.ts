import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, description, price, img } = createProductDto;

    const product = this.productsRepository.create({
      name,
      description,
      price,
      img,
    });

    try {
      await this.productsRepository.save(product);
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('Something went wrong');
    }

    return product;
  }

  async getProducts(
    getProductsFilterDto: GetProductsFilterDto,
  ): Promise<Product[]> {
    const { search, price_from, price_to } = getProductsFilterDto;
    const query = this.productsRepository.createQueryBuilder('product');
    if (search) {
      query.andWhere(
        '(LOWER(product.name) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    if (price_from) {
      const parsedPriceFrom = parseFloat(price_from);
      query.andWhere('CAST(product.price AS DECIMAL) >= :parsedPriceFrom', {
        parsedPriceFrom,
      });
    }

    if (price_to) {
      const parsedPriceTo = parseFloat(price_to);
      query.andWhere('CAST(product.price AS DECIMAL) <= :parsedPriceTo', {
        parsedPriceTo,
      });
    }

    try {
      const products = await query.getMany();
      return products;
    } catch (error) {
      // logger
      console.log(error.message);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
