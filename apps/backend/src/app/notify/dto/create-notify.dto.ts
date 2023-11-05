import { NotifyText } from '@fit-friends/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateNotifyDto {
  @ApiProperty({
    description: 'Id of user which will responce',
    example: '100',
  })
  @IsEmail()
  public targetUserEmail: string;

  @ApiProperty({
    description: 'Type of notification',
    example: 'добавить в друзья',
  })
  @IsString()
  @MinLength(NotifyText.Min)
  @MaxLength(NotifyText.Max)
  public text: string;
}
