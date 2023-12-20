import { OrderQueryDefault } from '@fit-friends/types';

export class OrderQuery {
  public limit?: number = OrderQueryDefault.Limit;

  public sortDirection?: 'desc' | 'asc';

  public quantitySort?: 'asc' | 'desc';

  public priceSort?: 'asc' | 'desc';

  public page?: number;
}
