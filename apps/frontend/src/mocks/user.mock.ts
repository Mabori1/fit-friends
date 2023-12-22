import {
  IAlert,
  TrainingDuration,
  UserRole,
  UserTypesTraining,
} from '@fit-friends/types';

export const userMock = {
  userId: 1,
  name: 'Алексей Макеев',
  email: '1ma@ma.ru',
  avatar: '/static/images/avatar/avatar-1.jpg',
  gender: 'мужской',
  birthDate: '01.01.1990',
  role: UserRole.Client,
  description: 'Очень хороший спортсмен',
  location: 'Пионерская',
  createdAt: new Date('2023-07-15T13:54:05.747Z'),
  updatedAt: new Date('2023-07-17T13:54:05.747Z'),
  level: 'любитель',
  typesOfTraining: ['бег', 'Аэробика'] as UserTypesTraining[],
  alerts: [
    { text: 'Текст', date: new Date('2023-07-15T13:54:05.747Z') },
  ] as IAlert[],
  client: {
    id: 1,
    userId: 1,
    timeOfTraining: TrainingDuration.LessHalfHour,
    caloryLosingPlanTotal: 5000,
    caloryLosingPlanDaily: 1000,
    isReady: true,
  },
  trainer: {
    id: 1,
    userId: 1,
    certificate: ['/static/certificate/certificate-1.pdf'],
    merits: 'Да я вообще очень крутой тренер',
    isPersonalTraining: true,
  },
};
