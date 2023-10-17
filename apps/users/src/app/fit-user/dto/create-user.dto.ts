import {
  IsEmail,
  IsISO8601,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  AUTH_USER_DATE_BIRTH_NOT_VALID,
  AUTH_USER_EMAIL_NOT_VALID,
  UserPasswordLength,
  UserTitleLength,
} from '@fit-friends/shared/app-constants';
import {
  UserGender,
  UserLevel,
  UserLocation,
  UserRole,
  UserTypesTraining,
} from '@fit-friends/shared/app-types';

export class CreateUserDto {
  @ApiProperty({
    description: 'User  name',
    example: 'Алексей',
  })
  @IsString()
  @MinLength(UserTitleLength.Min)
  @MaxLength(UserTitleLength.Max)
  @Matches(/^[a-zA-Zа-яА-Я]*$/)
  public name: string;

  @ApiProperty({
    description: 'User unique address',
    example: 'user@gmail.com',
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'User avatar filename',
    example: 'avatar.jpg',
  })
  @IsString()
  public avatar!: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  @MinLength(UserPasswordLength.Min)
  @MaxLength(UserPasswordLength.Max)
  public password: string;

  @ApiProperty({
    description: 'User gender',
    example: 'мужской',
  })
  @IsString()
  public gender: UserGender;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsISO8601({}, { message: AUTH_USER_DATE_BIRTH_NOT_VALID })
  public birthDate!: string;

  @ApiProperty({
    description: 'User role',
    example: 'тренер',
  })
  public role: UserRole;

  @ApiProperty({
    description: 'User location',
    example: 'пионерская',
  })
  @IsString()
  public location: UserLocation;

  @ApiProperty({
    description: 'User level',
    example: 'новичок',
  })
  @IsString()
  public level: UserLevel;

  @ApiProperty({
    description: 'User types of training',
    example: 'бег',
  })
  @IsString()
  typesOfTraining: UserTypesTraining[];
}
