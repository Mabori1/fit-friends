import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateSubscriberDto {
  @ApiProperty({
    description: 'Email of subscriber',
    example: 'keks@keks.com',
  })
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'Name of subscriber',
    example: 'keks',
  })
  @IsString()
  public name: string;

  @ApiProperty({
    description: 'Trainers Id',
    example: '7',
  })
  @IsNumber()
  public trainerId: number;
}
