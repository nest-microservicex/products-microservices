import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  page?: number = 1;

  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  limit?: number = 10;
}
