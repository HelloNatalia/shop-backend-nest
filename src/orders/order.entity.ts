import { Address } from 'src/addresses/address.entity';
import { User } from 'src/auth/user.entity';
import { Cart } from 'src/cart/cart.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from './status.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Address, (address) => address.order)
  address: Address;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @OneToMany(() => Cart, (cart) => cart.order)
  carts: Cart[];

  @Column({
    type: 'enum',
    enum: Status,
    array: false,
    default: Status.IN_PROGRESS,
  })
  status: Status;
}
