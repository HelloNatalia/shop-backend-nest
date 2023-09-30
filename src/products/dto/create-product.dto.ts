import { IsDecimal, IsString, Length, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsString()
  @Length(50, 1000)
  description: string;

  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  @Length(1, 999999)
  price: string;

  @IsString()
  @Length(3, 100)
  img: string;
}
