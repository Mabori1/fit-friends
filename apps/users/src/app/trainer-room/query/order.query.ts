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
  public sortQtt?: 'desc' | 'asc' = OrderQueryDefault.SortDirection;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortPrice?: 'desc' | 'asc' = OrderQueryDefault.SortDirection;

  @IsOptional()
  @Transform(({ value }) => +value)
  public page?: number;
}
