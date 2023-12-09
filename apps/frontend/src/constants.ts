import { UserTypesTraining } from '@fit-friends/types';

export const BASE_RESPONSE_URL = 'http//localhost:4000/api';
export const FILE_URL = 'http//localhost:4000';
export const SERVER_API_URL = 'http//localhost:4000/api';
export const MAX_TRAININGS_COUNT_PER_PAGE = 12;
export const FILTER_QUERY_DELAY = 1000;
export const MAX_DIFF_IN_MILLISECONDS = 900000;
export const MAX_FRIENDS_COUNT_PER_PAGE = 9;
export const MIN_CALORIES_COUNT_COEFFICIENT = 0.8;
export const MAX_CALORIES_COUNT_COEFFICIENT = 1.2;
export const MAX_SLIDER_TRAININGS_COUNT = 9;
export const MAX_SLIDER_TRAININGS_PER_PAGE = 3;
export const DISCOUNT_PERCENTAGE = 10;
export const MAX_SLIDER_POPULAR_TRAININGS_PER_PAGE = 4;
export const MAX_SLIDER_USERS_COUNT = 8;
export const MAX_SLIDER_USERS_COUNT_PER_PAGE = 4;
export const RATING_VALUES = [1, 2, 3, 4, 5];
export const MAX_USER_CARD_TRAININGS_COUNT = 5;
export const MAX_POPUP_CERTIFICATES_COUNT_PER_PAGE = 1;
export const MAX_USERS_CATALOG_ITEMS_COUNT_PER_PAGE = 9;
export const MAX_LOCATION_TYPES_COUNT_PER_PAGE = 4;
export const MAX_USERS_CATALOG_COUNT_PER_PAGE = 20;
export const MAX_TRAINING_TYPES_COUNT_PER_PAGE = 4;
export const DAYS_IN_A_WEEK = 7;

export enum AppRoute {
  Root = '/',
  Intro = '/intro',
  Info = '/info',
  Register = '/register',
  Login = '/login',
  Main = '/main',
  Friends = '/friends-list',
  TrainerRoom = '/trainer-room',
  ClientRoom = '/client-room',
  RegisterTrainer = '/register-trainer',
  RegisterClient = '/register-client',
  CreateTraining = '/create-training',
  TrainerTrainings = '/trainer-trainings',
  TrainerOrders = '/trainer-orders',
  ClientOrders = '/client-orders',
  TrainingCard = '/training-card',
  TrainingCatalog = '/training-catalog',
  UsersCatalog = '/users-catalog',
  UserCardId = '/user-card/:id',
  UserCard = '/user-card',
  NotFound = '*',
}

export enum NameSpace {
  UserSlice = 'USER_SLICE',
  AppSlice = 'APP_SLICE',
  TrainingSlice = 'TRAINING_SLICE',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Register = '/auth/register',
  Login = '/auth/login',
  Check = '/auth/check',
  Logout = '/auth/logout',
  Refresh = '/auth/refresh',
  UpdateUser = '/users/update',
  Users = '/users',
  UsersQuery = '/users/feed',
  Notify = '/notify',
  TrainerFriends = '/trainer/friends',
  ClientFriends = '/client/friends',
  PersonalOrder = '/personal-order',
  UploadAvatar = 'files/upload/img',
  UploadVideo = 'files/upload/video',
  Certificate = 'files/upload/pdf',
  DeleteCertificate = 'files/delete/certificate',
  AddRemoveFriend = 'client/friend',
  CreateTraining = 'trainer/create',
  UpdateTraining = 'trainer/update',
  FetchTrainings = 'trainer/feed',
  FetchRecomended = 'client/recomended',
  TrainingCatalog = 'trainer/training-catalog',
  TrainerOrders = '/trainer/orders',
  ClientBalance = '/client/balance',
  Training = 'trainer/training',
  SpendTraining = 'client/training',
  BuyOrder = 'client/order',
  BuyPersonalOrder = 'client/personal-order',
  CreateFeedback = 'feedbacks/create',
  Feedbacks = 'feedbacks',
  CheckSubscribe = 'clitnt/check-subscribe',
  ToggleSubscribe = 'client/subscribe',
}

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum SliceStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Rejected = 'REJECTED',
  Fulfilled = 'FULFILLED',
}

export const LOCATIONS_ZOD = [
  'Пионерская',
  'Петроградская',
  'Удельная',
  'Звёздная',
  'Спортивная',
] as const;

export const MAX_CERTIFICATES_COUNT_PER_PAGE = 3;

export const CERTIFICATE_FILE_TYPES = ['jpg', 'pdf', 'png'];
export const VIDEO_FILE_TYPES = ['mov', 'avi', 'mp4'];

export const TrainingTypeImageMap = {
  [UserTypesTraining.Yoga]: 'img/content/thumbnails/training-01.jpg',
  [UserTypesTraining.Running]: 'img/content/thumbnails/training-06.jpg',
  [UserTypesTraining.Boxing]: 'img/content/thumbnails/training-03.jpg',
  [UserTypesTraining.Stretching]: 'img/content/thumbnails/training-12.jpg',
  [UserTypesTraining.Crossfit]: 'img/content/thumbnails/training-02.jpg',
  [UserTypesTraining.Aerobics]: 'img/content/thumbnails/training-07.jpg',
  [UserTypesTraining.Pilates]: 'img/content/thumbnails/training-09.jpg',
  [UserTypesTraining.Power]: 'img/content/thumbnails/training-10.jpg',
};

export const TYPE_TRAINING_ZOD = [
  'йога',
  'бег',
  'силовые',
  'аэробика',
  'кроссфит',
  'бокс',
  'пилатес',
  'стрейчинг',
] as const;

export const LEVEL_TRAINING_ZOD = [
  'новичок',
  'любитель',
  'профессионал',
] as const;

export const DURATION_TRAINING_ZOD = [
  '10-30 мин',
  '30-50 мин',
  '50-80 мин',
  'больше 80 мин',
] as const;

export const GENDER_ZOD = ['мужской', 'женский', 'неважно'] as const;
export const ROLE_ZOD = ['тренер', 'пользователь'] as const;

export const AVATAR_FILE_TYPES = ['jpg', 'png', 'jpeg'] as const;

export const AVATAR_MAX_SIZE = 1000000;
