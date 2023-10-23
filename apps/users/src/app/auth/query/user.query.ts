import {
  DEFAULT_USER_COUNT_LIMIT,
  UserLocation,
  UserRole,
  UserTypesTraining,
  levelsOfExperience,
} from '@fit-friends/types';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsString()
  @IsEnum(UserLocation, { each: true })
  public location: string;

  @IsOptional()
  @IsString()
  @IsEnum(UserRole, { each: true })
  public role: string;

  @IsOptional()
  @IsIn(levelsOfExperience)
  public level: string;

  @IsOptional()
  @IsArray()
  @IsEnum(UserTypesTraining, { each: true })
  @Transform(({ value }) => value.toString().split(','))
  public typesOfTraining: string[];
}
