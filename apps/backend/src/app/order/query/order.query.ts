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
  public sortDirection?: 'desc' | 'asc' = OrderQueryDefault.SortDirection;

  @IsIn(['sum', 'sumTraining'])
  @IsOptional()
  public sortField?: 'sum' | 'sumTraining';

  @IsOptional()
  @Transform(({ value }) => +value)
  public page?: number;
}
