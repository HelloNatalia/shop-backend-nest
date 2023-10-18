import {
  IsArray,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
  Max,
  MaxLength,
} from 'class-validator';
import { Cart } from 'src/cart/cart.entity';

export class AddressOrderDto {
  @IsInt()
  addressId: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  street: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  number: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  postal_code: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  city: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  country: string;

  @IsOptional()
  @IsInt()
  phone_code: number;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('PL')
  phone_number: string;

  @IsArray()
  carts: Cart[];
}
