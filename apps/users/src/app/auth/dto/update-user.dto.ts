import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsISO8601,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  AUTH_USER_DATE_BIRTH_NOT_VALID,
  CaloriesOfDay,
  MAXIMUM_TRAINING_TYPES_CHOICE,
  TrainerMeritLength,
  UserDescriptionLength,
  UserTitleLength,
  durationOfTraining,
  levelsOfExperience,
  userGenders,
  userLocations,
} from '@fit-friends/shared/app-constants';

class ClientDto {
  @IsString()
  @IsIn(durationOfTraining)
  public timeOfTraining: string;

  @IsNumber()
  @Min(CaloriesOfDay.Min)
  @Max(CaloriesOfDay.Max)
  public caloryLosingPlanTotal: number;

  @IsNumber()
  @Min(CaloriesOfDay.Min)
  @Max(CaloriesOfDay.Max)
  public caloryLosingPlanDaily: number;

  @IsBoolean()
  public isTrainingReadiness: boolean;
}
class TrainerDto {
  @IsArray()
  @IsString({ each: true })
  public sertificat: string;

  @IsOptional()
  @IsString()
  @MinLength(TrainerMeritLength.Min)
  @MaxLength(TrainerMeritLength.Max)
  public merit?: string;

  @IsOptional()
  @IsBoolean()
  public isPersonalTraining?: boolean;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'User  name',
    example: 'Алексей',
  })
  @IsString()
  @IsOptional()
  @MinLength(UserTitleLength.Min)
  @MaxLength(UserTitleLength.Max)
  @Matches(/^[a-zA-Zа-яА-Я]*$/)
  public name?: string;

  @IsString()
  @IsOptional()
  public userAvatar?: string;

  @IsString()
  @IsIn(userGenders)
  @IsOptional()
  public userGender?: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1971-03-12',
  })
  @IsISO8601({}, { message: AUTH_USER_DATE_BIRTH_NOT_VALID })
  @IsOptional()
  public birthDate?: string;

  @IsString()
  @MinLength(UserDescriptionLength.Min)
  @MaxLength(UserDescriptionLength.Max)
  @IsOptional()
  public description?: string;

  @IsString()
  @IsIn(userLocations)
  @IsOptional()
  public location?: string;

  @IsString()
  @IsOptional()
  public backgraundPicture?: string;

  @ValidateNested()
  @Type(() => ClientDto)
  public client?: ClientDto;

  @ValidateNested()
  @Type(() => TrainerDto)
  public trainer?: TrainerDto;

  @IsString()
  @IsIn(levelsOfExperience)
  @IsOptional()
  public level?: string;

  @IsArray()
  @ArrayMaxSize(MAXIMUM_TRAINING_TYPES_CHOICE)
  @IsOptional()
  @IsString({ each: true })
  public typesOfTraining?: string[];
}
