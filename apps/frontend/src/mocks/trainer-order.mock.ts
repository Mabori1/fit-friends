import {
  GenderOfTraining,
  TrainingDuration,
  UserLevel,
  UserTypesTraining,
} from '@fit-friends/types';

export const trainerOrderMock = {
  id: 1,
  title: 'Супер № 1',
  backgroundPicture: '/static/images/training-1.jpg',
  levelOfUser: UserLevel.Amateur,
  typeOfTraining: [UserTypesTraining.Yoga],
  duration: TrainingDuration.AboutAnHour,
  gender: GenderOfTraining.ForAll,
  caloriesQtt: 1000,
  description: 'Бег по стадиону, отработка дыхания',
  video: '/static/video/video-1.mp4',
  price: 1000,
  rating: 4,
  trainerId: 1,
  isPromo: true,
  totalQuantity: 22000,
  totalPrice: 10000,
};
