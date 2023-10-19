export enum TrainingTitleLength {
  Min = 1,
  Max = 15,
}

export enum UserNameLength {
  Min = 1,
  Max = 15,
}

export enum TrainingDescriptionLength {
  Min = 10,
  Max = 140,
}

export enum Price {
  Min = 1000,
  Max = 5000,
}

export enum UserTitleLength {
  Min = 1,
  Max = 15,
}

export enum UserPasswordLength {
  Min = 6,
  Max = 12,
}

export enum UserDescriptionLength {
  Min = 10,
  Max = 140,
}

export enum CaloriesOfDay {
  Min = 1000,
  Max = 5000,
}

export const MAXIMUM_TRAINING_TYPES_CHOICE = 3;

export enum TrainerMeritLength {
  Min = 10,
  Max = 140,
}

export const userGenders: string[] = ['женский', 'мужской', 'неважно'];

export const levelsOfExperience: string[] = [
  'новичок',
  'любитель',
  'профессионал',
];

export const userLocations: string[] = [
  'Пионерская',
  'Петроградская',
  'Удельная',
  'Звёздная',
  'Спортивная',
];

export const durationOfTraining: string[] = [
  '10-30 мин',
  '30-50 мин',
  '50-80 мин',
  '80-100 мин',
];

export const typesOfTraining: string[] = [
  'йога',
  'бег',
  'бокс',
  'стрейчинг',
  'кроссфит',
  'аэробика',
  'пилатес',
];

export const trainingGender: string[] = [
  'для женщин',
  'для мужчин',
  'для всех',
];

export const trainingBackgroundTypes: string[] = ['.jpg', '.jpeg', '.png'];
