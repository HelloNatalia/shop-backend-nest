import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/categories/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, description, price, img, categoryId } = createProductDto;

    const category = await this.categoriesRepository.findOneBy({
      id: categoryId,
    });

    if (!category) {
      throw new Error(`Category with id "${categoryId}" not found`);
    }

    const product = this.productsRepository.create({
      name,
      description,
      price,
      img,
      category,
    });

    try {
      await this.productsRepository.save(product);
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('Something went wrong');
    }

    return product;
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id: id });

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return product;
  }

  async getProducts(
    getProductsFilterDto: GetProductsFilterDto,
  ): Promise<Product[]> {
    const { search, price_from, price_to, categoryId } = getProductsFilterDto;
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

    if (categoryId) {
      query.andWhere('product.categoryId = :categoryId', { categoryId });
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

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productsRepository.delete(id);

    if (result.affected == 0) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id: id });

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    const { name, description, price, img, categoryId } = updateProductDto;

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (img) product.img = img;
    if (categoryId) {
      const category = await this.categoriesRepository.findOneBy({
        id: categoryId,
      });

      if (!category) {
        throw new NotFoundException(
          `Category with id "${categoryId}" not found`,
        );
      }
      product.category = category;
    }

    await this.productsRepository.save(product);

    return product;
  }
}
