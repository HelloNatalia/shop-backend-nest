import {
  IsDecimal,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name: string;

  @IsOptional()
  @IsString()
  @Length(50, 1000)
  description: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  @Length(1, 999999)
  price: string;

  @IsOptional()
  @IsString()
  @Length(3, 100)
  img: string;

  @IsOptional()
  @IsUUID()
  categoryId: string;
}
