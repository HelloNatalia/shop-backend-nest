import { IsInt, IsUUID, Length, Max, Min } from 'class-validator';

export class CartAddDto {
  @IsUUID()
  productId: string;

  //   @IsInt()
  //   @Min(1)
  //   @Max(99)
  quantity: string;
}
