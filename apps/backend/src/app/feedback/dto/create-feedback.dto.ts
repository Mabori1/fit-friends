import {
  FEEDBACK_TEXT_NOT_VALID,
  FeedbackTextLength,
  Rating,
} from '@fit-friends/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Training id',
    example: 123,
    required: true,
  })
  @IsNumber()
  public trainingId!: number;

  @ApiProperty({
    description: 'Training rating',
    example: 4,
    required: true,
  })
  @IsNumber()
  @Min(Rating.Min)
  @Max(Rating.Max)
  public rating!: number;

  @ApiProperty({
    description: 'Training reveiw text',
    example: 'Эта тренировка для меня зарядка по утрам, помогает проснуться.',
    required: true,
  })
  @IsString()
  @Length(FeedbackTextLength.Min, FeedbackTextLength.Max, {
    message: FEEDBACK_TEXT_NOT_VALID,
  })
  public text!: string;

  @ApiProperty({
    description: 'feedback author name',
    example: 'Татьяна',
    required: true,
  })
  public userName!: string;

  @ApiProperty({
    description: 'feedback author avatar',
    example: 'https://i.pravatar.cc/300',
    required: true,
  })
  public userAvatar!: string;
}
