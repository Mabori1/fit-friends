import { DefaultTraining, UserTypesTraining } from '@fit-friends/types';

export class TrainingQuery {
  public limit?: number = DefaultTraining.Limit;
  public sortDirection?: 'desc' | 'asc' = DefaultTraining.SortDirection;
  public page?: number = DefaultTraining.Page;
  public priceMin?: number;
  public priceMax?: number;
  public priceSort?: 'asc' | 'desc' = 'desc';
  public caloriesMin?: number;
  public caloriesMax?: number;
  public ratingMin?: number;
  public ratingMax?: number;
  public types?: UserTypesTraining[];
  public trainerId?: string;
  public durations?: string;
}
