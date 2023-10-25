import {
  CaloriesOfDay,
  Rating,
  TrainingDescriptionLength,
  TrainingDuration,
  TrainingTitleLength,
  UserGender,
  UserLevel,
  UserTypesTraining,
} from '@fit-friends/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsPositive, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export default class CreateTrainingDto {
  @ApiProperty({
    description: 'Training  title',
    example: 'Йога Аэнгара ежедневно',
  })
  @IsString()
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
    description: 'User types of traning',
    example: 'йога',
  })
  @IsString()
  @IsEnum(UserTypesTraining)
  public typeOfTraining: UserTypesTraining;

  @ApiProperty({
    description: 'Duration of traning',
    example: '30-50 мин',
  })
  @IsString()
  @IsEnum(TrainingDuration)
  public duration: TrainingDuration;

  @ApiProperty({
    description: 'Price of traning',
    example: '100',
  })
  @IsPositive()
  @IsNumber()
  @Min(0)
  public price: number;

  @ApiProperty({
    description: 'Rating of traning',
    example: '5',
  })
  @IsNumber()
  @Min(Rating.Min)
  @Max(Rating.Max)
  public rating: number;

  @ApiProperty({
    description: 'Calories of traning',
    example: '1000',
  })
  @IsNumber()
  @Min(CaloriesOfDay.Min)
  @Max(CaloriesOfDay.Max)
  public caloriesQtt: number;

  @ApiProperty({
    description: 'Description of traning',
    example: 'Расслабляющая, растягивающая и динамичная тренировка. Для души и тела',
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
  @IsEnum(UserGender)
  public gender: UserGender;

  @ApiProperty({
    description: 'FileName of video file',
    example: 'box.avi',
  })
  @IsString()
  public video: string;

  @ApiProperty({
    description: 'Id of the trainer who created the training',
    example: '2',
  })
  @IsNumber()
  public trainerId: number;
}
