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
    description: 'Date of notify',
    example: '2021-01-01T00:00:00.000Z',
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Text of notify',
    example: 'добавить в друзья',
  })
  @Expose()
  public text: string;
}
