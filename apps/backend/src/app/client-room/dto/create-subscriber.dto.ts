import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubscriberDto {
  @ApiProperty({
    description: 'Email of subscriber',
    example: 'keks@keks.com',
  })
  @IsString()
  @IsEmail(
    {},
    {
      message: 'The email is not valid',
    },
  )
  public email: string;

  @ApiProperty({
    description: 'Name of subscriber',
    example: 'keks',
  })
  @IsString()
  @IsNotEmpty({ message: 'The first name is empty' })
  public name: string;

  @ApiProperty({
    description: 'Trainers Id',
    example: '7',
  })
  @IsNumber()
  @IsNotEmpty({ message: 'The trainerId is empty' })
  public trainerId: number;
}
