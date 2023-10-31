import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TypeOfOrder, TypeOfPayment } from '@fit-friends/types';

export class OrderRdo {
  @ApiProperty({
    description: 'The uniq order ID',
    example: 123,
    required: true,
  })
  @Expose()
  public id!: number;

  @ApiProperty({
    description: 'Training ID',
    example: 123,
    required: true,
  })
  @Expose()
  public trainingId!: number;

  @ApiProperty({
    description: 'Training or season pass to gym',
    example: 'Абонемент',
    enum: TypeOfOrder,
    required: true,
  })
  @Expose()
  public type!: TypeOfOrder;

  @ApiProperty({
    description: 'Subscription price',
    example: 1234,
    required: true,
  })
  @Expose()
  public price!: number;

  @ApiProperty({
    description: 'Trainings quantity',
    example: 12,
    required: true,
  })
  @Expose()
  public quantity!: number;

  @ApiProperty({
    description: 'Total price',
    example: 14808,
    required: true,
  })
  @Expose()
  public totalPrice!: number;

  @ApiProperty({
    description: 'Payment method',
    example: 'Visa',
    enum: TypeOfPayment,
    required: true,
  })
  @Expose()
  public typeOfPayment!: TypeOfPayment;

  @ApiProperty({
    description: 'Order creation date',
    example: '2023-03-28T16:14:35.132Z',
    required: true,
  })
  @Expose()
  public createdAt!: Date;
}
