import {
  IOrderTraining,
  IPersonalOrderTraining,
  IUserBalance,
  UserRoleType,
} from '@fit-friends/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13',
  })
  @Expose({ name: '_id' })
  public userId!: number;

  @ApiProperty({
    description: 'User name',
    example: 'Алексей',
  })
  @Expose()
  public name!: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@gmail.com',
  })
  @Expose()
  public mail!: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'avatar.jpg',
  })
  @Expose()
  public avatar?: string;

  @ApiProperty({
    description: 'Human gender',
    example: 'неважно',
  })
  @Expose()
  public gender!: string;

  @ApiProperty({
    description: 'User birth date',
    example: '01.01.2000',
  })
  @Expose()
  public birthDate!: string;

  @ApiProperty({
    description: 'User role',
    example: 'тренер',
  })
  @Expose()
  public role!: UserRoleType;

  @ApiProperty({
    description: 'User description',
    example: 'О себе много чего могу рассказать...',
  })
  @Expose()
  public description!: string;

  @ApiProperty({
    description: 'subway station',
    example: 'Пионерская',
  })
  @Expose()
  public location!: string;

  @ApiProperty({
    description: 'User backgraund picture',
    example: 'backgraund.jpg',
  })
  @Expose()
  public backgraundPicture!: string;

  @ApiProperty({
    description: 'User creation date',
    example: '01.01.2000',
  })
  @Expose()
  public createdAt!: Date;

  @ApiProperty({
    description: 'User with role client',
    example: 'client',
  })
  @Expose()
  public client?: {
    clientId?: number;
    timeOfTraining?: string;
    caloryLosingPlanTotal?: number;
    caloryLosingPlanDaily?: number;
    readinessForTraining?: boolean;
  };

  @ApiProperty({
    description: 'User with role trainer',
    example: 'trainer',
  })
  @Expose()
  public trainer?: {
    trainerId?: number;
    sertificates?: string[];
    merit?: string;
    readinessForPrivate?: boolean;
  };

  @ApiProperty({
    description: 'User level',
    example: 'новичок',
  })
  @Expose()
  public level!: string;

  @ApiProperty({
    description: 'User types of training',
    example: 'йога, бег, аэробика',
  })
  @Expose()
  public typesOfTraining!: string[];

  @ApiProperty({
    description: 'User orders',
    example: 'order',
  })
  @Expose()
  public orders?: IOrderTraining[];

  @ApiProperty({
    description: 'User personal orders',
    example: 'order',
  })
  @Expose()
  public personalOrders?: IPersonalOrderTraining[];

  @ApiProperty({
    description: 'User balance',
  })
  @Expose()
  public balance?: IUserBalance[];

  @ApiProperty({
    description: 'certificate availability',
    example: 'certificate.pdf',
  })
  @Expose()
  public sertificat?: string;
}
