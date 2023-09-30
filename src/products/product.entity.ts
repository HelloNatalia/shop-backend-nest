import { Min } from 'class-validator';
import { Category } from 'src/categories/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category: Category;

  @Column()
  img: string;
}
