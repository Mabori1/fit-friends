import { UserPasswordLength, UsersErrorMessage } from '@fit-friends/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsAlphanumeric, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'mabori@gmail.com',
    required: true,
  })
  @IsEmail({}, { message: UsersErrorMessage.EmailNotValid })
  public email!: string;

  @ApiProperty({
    description: 'User password',
    example: '12345a',
    minLength: UserPasswordLength.Min,
    maxLength: UserPasswordLength.Max,
    required: true,
  })
  @IsAlphanumeric()
  @Length(UserPasswordLength.Min, UserPasswordLength.Max, {
    message: UsersErrorMessage.PasswordNotValid,
  })
  public password!: string;
}
