import { DefaultUsersQuery } from '@fit-friends/types';

export class UserQuery {
  public limit?: number = DefaultUsersQuery.Limit;
  public sortDirection?: 'desc' | 'asc' = DefaultUsersQuery.Desc;
  public page?: number;
  public locations?: string;
  public isReady?: boolean;
  public role?: string;
  public level?: string;
  public typesOfTraining?: string;
}
