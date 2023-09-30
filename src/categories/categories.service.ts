import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    const categories = this.categoriesRepository.find();
    return categories;
  }

  async createCategory(categoryDto: CategoryDto): Promise<Category> {
    const { name } = categoryDto;

    const category = this.categoriesRepository.create({ name });

    try {
      await this.categoriesRepository.save(category);
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('Something went wrong');
    }
    return category;
  }

  async deleteCategory(id: string): Promise<void> {
    const result = await this.categoriesRepository.delete(id);

    if (result.affected == 0) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
  }
}
