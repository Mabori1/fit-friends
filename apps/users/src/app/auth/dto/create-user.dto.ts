import {
  IsEmail,
  IsISO8601,
  IsString,
  IsAlphanumeric,
  IsOptional,
  Length,
  IsEnum,
  IsArray,
  ArrayMaxSize,
  Matches,
  ArrayNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IClient,
  ITrainer,
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
    example: 'Алексей',
    required: true,
    minLength: UserNameLength.Min,
    maxLength: UserNameLength.Max,
  })
  @IsString()
  @Length(UserNameLength.Min, UserNameLength.Max, {
    message: UsersErrorMessage.NameLengthNotValid,
  })
  @Matches(/[a-zа-яё\s]+/i)
  public name!: string;

  @ApiProperty({
    description: 'User unique email',
    example: 'mabori@mail.ru',
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
    example: '12345a',
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
    example: 'мужской',
    enum: UserGender,
    required: true,
  })
  @IsEnum(UserGender)
  public gender!: UserGender;

  @ApiProperty({
    description: 'User birth date',
    example: '1993-01-11',
  })
  @IsOptional()
  @IsISO8601()
  public birthDate?: Date;

  @ApiProperty({
    description: 'User role',
    example: 'тренер',
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
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(3)
  @IsEnum(UserTypesTraining, { each: true })
  public typesOfTraining!: UserTypesTraining[];

  @ApiProperty({
    description: 'User of Trainer',
    example: [
      {
        certificate: 'certificate.pdf',
        merits: 'Вырастил двоих олимпиадников',
        isPersonalTraining: true,
      },
    ],
  })
  public trainer?: ITrainer;

  @ApiProperty({
    description: 'User of Client',
    example: [
      {
        timeOfTraining: '10-30 мин',
        caloryLosingPlanTotal: 1500,
        caloryLosingPlanDaily: 1000,
        isReady: true,
      },
    ],
  })
  public client?: IClient;
}
