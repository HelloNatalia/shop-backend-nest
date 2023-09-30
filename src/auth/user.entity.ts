import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';
import { Cart } from 'src/cart/cart.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [],
  })
  roles: Role[];

  @OneToMany(() => Cart, (cart) => cart.user, { eager: true })
  cart: Cart;
}
