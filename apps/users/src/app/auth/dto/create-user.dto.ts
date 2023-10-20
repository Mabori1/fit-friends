import {
  IsEmail,
  IsISO8601,
  IsString,
  IsAlphanumeric,
  IsOptional,
  Length,
  IsEnum,
  IsBoolean,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  TrainingDuration,
  UserDescriptionLength,
  UserGender,
  UserLevel,
  UserLocation,
  UserNameLength,
  UserPasswordLength,
  UserRole,
  UserTypesTraining,
  UsersErrorMessage,
} from '@fit-friends/types';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Вася',
    required: true,
    minLength: UserNameLength.Min,
    maxLength: UserNameLength.Max,
  })
  @IsString()
  @Length(UserNameLength.Min, UserNameLength.Max, {
    message: UsersErrorMessage.NameLengthNotValid,
  })
  public name!: string;

  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.ru',
    required: true,
  })
  @IsEmail({}, { message: UsersErrorMessage.EmailNotValid })
  public email!: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'my-avatar.png',
  })
  @IsOptional()
  @IsString()
  public avatar?: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty12345',
    required: true,
    minLength: UserPasswordLength.Min,
    maxLength: UserPasswordLength.Max,
  })
  @IsAlphanumeric()
  @Length(UserPasswordLength.Min, UserPasswordLength.Max, {
    message: UsersErrorMessage.PasswordNotValid,
  })
  public password!: string;

  @ApiProperty({
    description: 'User gender',
    example: 'Мужской',
    enum: UserGender,
    required: true,
  })
  @IsEnum(UserGender)
  public gender!: UserGender;

  @ApiProperty({
    description: 'User birth date',
    example: '2000-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsISO8601()
  public birthDate?: Date;

  @ApiProperty({
    description: 'User role',
    example: 'пользователь',
    enum: UserRole,
    required: true,
  })
  @IsEnum(UserRole)
  public role!: UserRole;

  @ApiProperty({
    description: 'User description',
    example: 'Я собираюсь стать лучшим в этом сфере, когда-нибудь.',
    minLength: UserDescriptionLength.Min,
    maxLength: UserDescriptionLength.Max,
    required: true,
  })
  @IsString()
  @Length(UserDescriptionLength.Min, UserDescriptionLength.Max, {
    message: UsersErrorMessage.DescriptionLengthNotValid,
  })
  public description?: string;

  @ApiProperty({
    description: 'The nearest metro station to the place of training',
    example: 'Пионерская',
    enum: UserLocation,
    required: true,
  })
  @IsEnum(UserLocation)
  public location!: UserLocation;

  @ApiProperty({
    description: 'User level',
    example: 'Любитель',
    enum: UserLevel,
    required: true,
  })
  @IsEnum(UserLevel)
  public level!: UserLevel;

  @ApiProperty({
    description: 'Training type',
    example: 'Кроссфит',
    required: true,
  })
  @IsIn(['Йога', 'Бег', 'Бокс', 'Стрейчинг', 'Кроссфит', 'Аэробика', 'Пилатес'])
  public typesOfTraining!: UserTypesTraining[];

  @ApiProperty({
    description: 'Training duration',
    example: '10-30 мин',
    enum: TrainingDuration,
    required: true,
  })
  @IsEnum(TrainingDuration)
  public timeOfTraining!: TrainingDuration;
}
