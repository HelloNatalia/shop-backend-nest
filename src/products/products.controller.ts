import { Body, Controller, Get, Post, UseGuards, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('create')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  getProducts(
    @Query() getProductsFilterDto: GetProductsFilterDto,
  ): Promise<Product[]> {
    return this.productsService.getProducts(getProductsFilterDto);
  }
}
