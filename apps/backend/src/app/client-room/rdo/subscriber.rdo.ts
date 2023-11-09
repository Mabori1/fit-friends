import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SubscriberRdo {
  @ApiProperty({
    description: 'Id of subscriber',
    example: 'keks@keks.com',
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Email of subscriber',
    example: 'keks@keks.com',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Name of subscriber',
    example: 'keks',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Trainers Id',
    example: '7',
  })
  @Expose()
  public trainerId: number;
}
