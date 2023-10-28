import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PersonalOrderRdo {
  @ApiProperty({
    description: 'The uniq ID',
    example: 123,
    required: true,
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'The uniq user ID',
    example: 123,
    required: true,
  })
  @Expose()
  public userId: number;

  @ApiProperty({
    description: 'The uniq trainer ID',
    example: 123,
    required: true,
  })
  @Expose()
  public trainerId: number;

  @ApiProperty({
    description: 'The order status',
    example: 'на рассмотрении',
    required: true,
  })
  @Expose()
  public orderStatus: string;

  @ApiProperty({
    description: 'Сreate date',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Update date',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  })
  @Expose()
  public updateAt: Date;
}
