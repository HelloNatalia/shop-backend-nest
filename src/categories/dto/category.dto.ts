import { IsString, Length } from 'class-validator';

export class CategoryDto {
  @IsString()
  @Length(2, 50)
  name: string;
}
