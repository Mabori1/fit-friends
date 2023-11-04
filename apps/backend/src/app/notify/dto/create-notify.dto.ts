import { NotifyType } from '@fit-friends/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateNotifyDto {
  @ApiProperty({
    description: 'Id of user which will responce',
    example: '100',
  })
  @IsNumber()
  public targetUserId: number;

  @ApiProperty({
    description: 'Type of notification',
    example: 'добавить в друзья',
  })
  @IsString()
  @IsEnum(NotifyType)
  public type: string;
}
