import { OrderQueryDefault } from '@fit-friends/types';

export class OrderQuery {
  public limit?: number = OrderQueryDefault.Limit;

  public sortDirection?: 'desc' | 'asc' = OrderQueryDefault.SortDirection;

  public sortField?: 'sum' | 'sumTraining';

  public page?: number;
}
