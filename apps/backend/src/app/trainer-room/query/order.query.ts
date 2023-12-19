import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { OrderQueryDefault } from '@fit-friends/types';

export class OrderQuery {
  @IsNumber()
  @Transform(({ value }) => +value || OrderQueryDefault.Limit)
  @IsOptional()
  public limit?: number = OrderQueryDefault.Limit;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public quantitySort?: 'desc' | 'asc';

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public priceSort?: 'desc' | 'asc';

  @IsOptional()
  @Transform(({ value }) => +value)
  public page?: number;
}
