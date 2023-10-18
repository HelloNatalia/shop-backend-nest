import { User } from 'src/auth/user.entity';
import { Order } from 'src/orders/order.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  postal_code: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  phone_code: number;

  @Column()
  phone_number: string;

  @ManyToOne(() => User, (user) => user.address, { eager: true })
  user: User;

  @OneToMany(() => Order, (order) => order.address)
  order: Order;
}
