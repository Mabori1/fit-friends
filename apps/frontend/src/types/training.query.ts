import { DefaultTraining } from '@fit-friends/types';
import { SortDirection } from '../constants';

export class TrainingQuery {
  public limit?: number = DefaultTraining.Limit;
  public sortDirection?: 'desc' | 'asc' = SortDirection.Desc;
  public priceSort?: 'asc' | 'desc' = 'desc';
  public ratingSort?: 'asc' | 'desc' = SortDirection.Desc;
  public page?: number = DefaultTraining.Page;
  public priceMin?: number;
  public priceMax?: number;
  public caloriesMin?: number;
  public caloriesMax?: number;
  public ratingMin?: number;
  public ratingMax?: number;
  public types?: string;
  public trainerId?: number;
  public durations?: string;
  public levelOfUser?: string;
  public isPromo?: boolean;
}
