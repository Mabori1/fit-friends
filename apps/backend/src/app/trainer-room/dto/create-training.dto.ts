import {
  CaloriesOfDay,
  GenderOfTraining,
  TrainingDescriptionLength,
  TrainingDuration,
  TrainingTitleLength,
  UserLevel,
  UserTypesTraining,
} from '@fit-friends/types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsString,
  Max,
  Min,
  MinLength,
  MaxLength,
} from 'class-validator';

export default class CreateTrainingDto {
  @ApiProperty({
    description: 'Training title',
    example: 'Йога Аэнгара',
  })
  @MinLength(TrainingTitleLength.Min)
  @MaxLength(TrainingTitleLength.Max)
  public title: string;

  @ApiProperty({
    description: 'Client level of experience',
    example: 'любитель',
  })
  @IsString()
  @IsEnum(UserLevel)
  public levelOfUser: UserLevel;

  @ApiProperty({
    description: 'User types of training',
    example: 'йога',
  })
  @IsString()
  @IsEnum(UserTypesTraining)
  public typeOfTraining: UserTypesTraining;

  @ApiProperty({
    description: 'Duration of training',
    example: '30-50 мин',
  })
  @IsString()
  @IsEnum(TrainingDuration)
  public duration: TrainingDuration;

  @ApiProperty({
    description: 'Price of training',
    example: '100',
  })
  @IsNumber()
  @Min(0)
  public price: number;

  @ApiProperty({
    description: 'Calories of training',
    example: '1000',
  })
  @IsNumber()
  @Min(CaloriesOfDay.Min)
  @Max(CaloriesOfDay.Max)
  public caloriesQtt: number;

  @ApiProperty({
    description: 'Description of training',
    example:
      'Расслабляющая, растягивающая и динамичная тренировка. Для души и тела',
  })
  @IsString()
  @MinLength(TrainingDescriptionLength.Min)
  @MaxLength(TrainingDescriptionLength.Max)
  public description: string;

  @ApiProperty({
    description: 'Gender of client',
    example: 'для мужчин',
  })
  @IsString()
  @IsEnum(GenderOfTraining)
  public gender: GenderOfTraining;

  @ApiProperty({
    description: 'FileName of video file',
    example: 'box.avi',
  })
  @IsString()
  public video: string;
}
