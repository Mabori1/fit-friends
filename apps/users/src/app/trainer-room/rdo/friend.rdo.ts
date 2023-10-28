import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FriendRdo {
  @ApiProperty({
    description: 'The uniq ID',
    example: 123,
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
    description: 'The uniq friend ID',
    example: 123,
    required: true,
  })
  @Expose()
  public friendId: number;

  @ApiProperty({
    description: 'Is confirmed',
    example: true,
    required: true,
  })
  @Expose()
  public isConfirmed: boolean;
}
