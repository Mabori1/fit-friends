import { DEFAULT_USER_COUNT_LIMIT, levelsOfExperience } from '@fit-friends/types';
import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserQuery {
  @Transform(({ value }) => +value || DEFAULT_USER_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_USER_COUNT_LIMIT;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.toString().split(','))
  location: string;

  @IsOptional()
  @IsIn(levelsOfExperience)
  public level: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.toString().split(','))
  public typesOfTraining: string[];
}
