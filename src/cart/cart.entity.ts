import { User } from 'src/auth/user.entity';
import { Order } from 'src/orders/order.entity';
import { Product } from 'src/products/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cart)
  user: User;

  @ManyToOne(() => Product, (product) => product.cart, { eager: true })
  product: Product;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.carts)
  order: Order;
}
