import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BalanceRdo {
  @ApiProperty({
    description: 'The uniq ID',
    example: 12,
    required: true,
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'The uniq user ID',
    example: 12,
    required: true,
  })
  @Expose()
  public userId: number;

  @ApiProperty({
    description: 'The uniq friend ID',
    example: 12,
    required: true,
  })
  @Expose()
  public trainingId: number;

  @ApiProperty({
    description: 'Quantity of training',
    example: 12,
    required: true,
  })
  @Expose()
  public trainingQtt: number;
}
