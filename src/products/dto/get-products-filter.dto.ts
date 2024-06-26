import { IsDecimal, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetProductsFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  price_from?: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  price_to?: string;

  @IsOptional()
  @IsUUID()
  categoryId: string;
}
