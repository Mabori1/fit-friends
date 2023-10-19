import {
  IAlert,
  IOrderTraining,
  IPersonalOrderTraining,
  IUserBalance,
  TrainingDuration,
  UserRole,
  UserTypesTraining,
} from '@fit-friends/types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ClientRdo {
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
  public role!: UserRole;

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
    description: 'User creation date',
    example: '01.01.2000',
  })
  @Expose()
  public createdAt!: Date;

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
  public typesOfTraining!: UserTypesTraining[];

  @ApiProperty({
    description: 'User is personal training',
    example: 'true',
  })
  @Expose()
  public isPersonalTraining?: boolean;

  @ApiProperty({
    description: 'User alerts',
    example: [
      {
        text: 'Вам пора на тренировку',
        date: '2023-02-25T14:07:27.554Z',
      },
    ],
    required: true,
  })
  @Expose()
  public alerts!: IAlert[];

  @ApiProperty({
    description: 'Time of training',
    example: '10-30 минут',
  })
  @Expose()
  public timeOfTraining: TrainingDuration;

  @ApiProperty({
    description: 'Calory losing plan total',
    example: '1500',
  })
  @Expose()
  public caloryLosingPlanTotal: number;

  @ApiProperty({
    description: 'Calory losing plan daily',
    example: '1000',
  })
  @Expose()
  public caloryLosingPlanDaily: number;

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
}
