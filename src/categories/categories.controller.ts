import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { Category } from './category.entity';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.Admin)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoriesService.getCategories();
  }

  @Post()
  createCategory(@Body() categoryDto: CategoryDto): Promise<Category> {
    return this.categoriesService.createCategory(categoryDto);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string): Promise<void> {
    return this.categoriesService.deleteCategory(id);
  }
}
