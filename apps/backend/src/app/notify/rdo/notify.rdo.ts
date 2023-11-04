import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NotifyRdo {
  @ApiProperty({
    description: 'Id of user which will responce',
    example: '100',
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Target user id',
    example: '100',
  })
  @Expose()
  public targetUserId: number;

  @ApiProperty({
    description: 'Type of notification',
    example: 'добавить в друзья',
  })
  @Expose()
  public type: string;

  @ApiProperty({
    description: 'Source user id',
    example: '12',
  })
  @Expose()
  public srcUserId: number;
}
