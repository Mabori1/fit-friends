import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13',
  })
  @Expose({ name: '_id' })
  public userId!: number;

  @ApiProperty({
    description: 'User email',
    example: 'user@gmail.com',
  })
  @Expose()
  public email!: string;

  @ApiProperty({
    description: 'Access token',
    example: 'user@gmail.com',
  })
  @Expose()
  public accessToken!: string;

  @Expose()
  public refreshToken!: string;
}
