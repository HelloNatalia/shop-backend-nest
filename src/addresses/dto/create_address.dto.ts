import {
  IsInt,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
  Max,
  MaxLength,
} from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @MaxLength(200)
  street: string;

  @IsString()
  @MaxLength(10)
  number: string;

  @IsString()
  @MaxLength(10)
  postal_code: string;

  @IsString()
  @MaxLength(100)
  city: string;

  @IsString()
  @MaxLength(100)
  country: string;

  @IsInt()
  phone_code: number;

  @IsString()
  @IsPhoneNumber('PL')
  phone_number: string;
}
