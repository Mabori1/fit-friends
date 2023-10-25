import { UserTypesTraining } from './user-types-training.enum';

export interface TrainingFilter {
  priceMin?: number;
  priceMax?: number;
  caloriesMin?: number;
  caloriesMax?: number;
  ratingMin?: number;
  ratingMax?: number;
  priceSort?: string;
  types?: UserTypesTraining[];
  limit?: number;
  page?: number;
}
