import {
  GenderOfTraining,
  TrainingDuration,
  UserLevel,
  UserTypesTraining,
} from '@fit-friends/types';

export const trainingMock = {
  id: 1,
  title: 'Супер',
  backgroundPicture: '/static/images/training-1.jpg',
  levelOfUser: UserLevel.Amateur,
  typeOfTraining: UserTypesTraining.Yoga,
  duration: TrainingDuration.LessHalfHour,
  gender: GenderOfTraining.ForMen,
  caloriesQtt: 1000,
  description: 'Бег по стадиону, отработка дыхания',
  video: '/static/video/video-1.mp4',
  price: 1000,
  rating: 4,
  trainerId: 1,
  isPromo: true,
};
