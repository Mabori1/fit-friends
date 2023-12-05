import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FeedbackRdo {
  @ApiProperty({
    description: 'id of feedback',
    example: 'Татьяна',
    required: true,
  })
  @Expose()
  public id!: number;

  @ApiProperty({
    description: 'Feedback author id',
    example: 'Татьяна',
    required: true,
  })
  @Expose()
  public userId!: number;

  @ApiProperty({
    description: 'Training id',
    example: 13,
    required: true,
  })
  @Expose()
  public trainingId!: number;

  @ApiProperty({
    description: 'Training rating',
    example: 4,
    required: true,
  })
  @Expose()
  public rating!: number;

  @ApiProperty({
    description: 'Training review text',
    example:
      'Хорошая тренировка, но все же не хватило немного динамики. Для меня оказалась слишком легкой.',
    required: true,
  })
  @Expose()
  public text!: string;

  @ApiProperty({
    description: 'feedback creation date',
    example: '2023-03-28T16:14:35.132Z',
    required: true,
  })
  @Expose()
  public createdAt!: Date;

  @ApiProperty({
    description: 'feedback author name',
    example: 'Татьяна',
    required: true,
  })
  @Expose()
  public userName!: string;

  @ApiProperty({
    description: 'feedback author avatar',
    example: 'https://i.pravatar.cc/300',
    required: true,
  })
  @Expose()
  public userAvatar!: string;
}
