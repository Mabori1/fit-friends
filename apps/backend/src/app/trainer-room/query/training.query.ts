import {
  IsEnum,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import {
  CaloriesOfDay,
  DefaultTraining,
  Rating,
  TrainingDuration,
  UserTypesTraining,
} from '@fit-friends/types';

export class TrainingQuery {
  @IsNumber()
  @IsPositive()
  @Max(DefaultTraining.Limit)
  @Transform(({ value }) => +value || DefaultTraining.Limit)
  @IsOptional()
  public limit: number = DefaultTraining.Limit;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = DefaultTraining.SortDirection;

  @IsOptional()
  @Transform(({ value }) => +value)
  public page: number = DefaultTraining.Page;

  @IsPositive()
  @Min(0)
  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  public priceMin: number;

  @IsPositive()
  @Min(0)
  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  public priceMax: number;

  @IsIn(['asc', 'desc', 'none'])
  @IsOptional()
  public priceSort: 'asc' | 'desc' = DefaultTraining.SortDirection;

  @Min(CaloriesOfDay.Min)
  @Max(CaloriesOfDay.Max)
  @IsInt()
  @Transform(({ value }) => +value)
  @IsOptional()
  public caloriesMin: number;

  @Min(CaloriesOfDay.Min)
  @Max(CaloriesOfDay.Max)
  @IsInt()
  @Transform(({ value }) => +value)
  @IsOptional()
  public caloriesMax: number;

  @Min(Rating.Min)
  @Max(Rating.Max)
  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  public ratingMin: number;

  @Min(Rating.Min)
  @Max(Rating.Max)
  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  public ratingMax: number;

  @IsEnum(UserTypesTraining, {
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item))
  @IsOptional()
  public types: UserTypesTraining[];

  @IsString()
  @IsOptional()
  public trainerId?: string;

  @IsEnum(TrainingDuration, {
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item))
  @IsOptional()
  public durations: TrainingDuration[];
}
