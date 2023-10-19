import {
  IsISO8601,
  IsString,
  IsOptional,
  Length,
  IsEnum,
  IsBoolean,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  TrainerMeritLength,
  UserGender,
  UserLevel,
  UserLocation,
  UserNameLength,
  UserTypesTraining,
  UsersErrorMessage,
} from '@fit-friends/types';

export class UpdateTrainerDto {
  @ApiProperty({
    description: 'User name',
    example: 'Алексей',
    minLength: UserNameLength.Min,
    maxLength: UserNameLength.Max,
  })
  @IsOptional()
  @IsString()
  @Length(UserNameLength.Min, UserNameLength.Max, {
    message: UsersErrorMessage.NameLengthNotValid,
  })
  public name?: string;

  @ApiProperty({
    description: 'User gender',
    example: 'женский',
    enum: UserGender,
  })
  @IsOptional()
  @IsEnum(UserGender)
  public gender?: UserGender;

  @ApiProperty({
    description: 'The nearest metro station to the place of training',
    example: 'Пионерская',
    enum: UserLocation,
  })
  @IsOptional()
  @IsEnum(UserLocation)
  public location?: UserLocation;

  @ApiProperty({
    description: 'User birth date',
    example: '2000-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsISO8601()
  public birthDate?: Date;

  @ApiProperty({
    description: 'User avatar',
    example: 'avatar.jpg',
  })
  @IsOptional()
  @IsString()
  public avatar?: string;

  @ApiProperty({
    description: 'User level',
    example: 'Любитель',
    enum: UserLevel,
  })
  @IsOptional()
  @IsEnum(UserLevel)
  public level?: UserLevel;

  @ApiProperty({
    description: 'Training type',
    example: 'Кроссфит',
  })
  @IsOptional()
  @IsIn(['Йога', 'Бег', 'Бокс', 'Стрейчинг', 'Кроссфит', 'Аэробика', 'Пилатес'])
  public trainingType?: UserTypesTraining[];

  @ApiProperty({
    description: 'Trainer certificate',
    example: 'certificate.pdf',
  })
  @IsOptional()
  @IsString()
  public certificat?: string;

  @ApiProperty({
    description: 'Trainer merits',
    example: 'certificate.pdf',
    minLength: TrainerMeritLength.Min,
    maxLength: TrainerMeritLength.Max,
  })
  @IsOptional()
  @IsString()
  @Length(TrainerMeritLength.Min, TrainerMeritLength.Max, {
    message: UsersErrorMessage.MeritsLengthNotValid,
  })
  public merits?: string;

  @ApiProperty({
    description: 'Trainer readiness marker for personal training',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  public isPersonalTraining?: boolean;
}
