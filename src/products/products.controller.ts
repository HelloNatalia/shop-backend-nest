import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Query,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Promise<Product> {
    return this.productsService.getProduct(id);
  }

  @Get()
  getProducts(
    @Query() getProductsFilterDto: GetProductsFilterDto,
  ): Promise<Product[]> {
    return this.productsService.getProducts(getProductsFilterDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  deleteProduct(@Param('id') id: string): Promise<void> {
    return this.productsService.deleteProduct(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, updateProductDto);
  }
}
