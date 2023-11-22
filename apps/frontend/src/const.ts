export const BASE_RESPONSE_URL = 'http//localhost:4000/api';

export enum AppRoute {
  Intro = '/',
  Login = '/login',
  Main = '/main',
  TrainerRoom = '/trainer-room',
  ClientRoom = '/client-room',
  Info = '/info',
  Register = '/register',
  CreateTraining = '/create-training',
  MyTrainings = '/my-trainings',
  MyOrders = '/my-orders',
  FriendsList = '/friends-list',
  TrainingCard = '/training-card',
  TrainingCatalog = '/training-catalog',
  UsersCatalog = '/users-catalog',
  UserCard = '/user-card',
  UserCardId = '/user-card/:id',
  NotFound = '*',
}

export enum NameSpace {
  AuthSlice = 'AUTH_SLICE',
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
  Logout = '/auth/logout',
  Refresh = '/auth/refresh',
  Users = '/users',
  Friends = '/users/friends',
  Avatar = '/users/avatar',
  Certificate = '/users/certificate',
  DeleteCertificate = '/users/certificate/delete',
  AddFriend = '/users/friends/add',
  RemoveFriend = '/users/friends/remove',
  Trainings = '/trainings',
  RecommendedTrainings = '/trainings/recommended',
  Orders = '/orders/trainings',
}

export const LOCATIONS_ZOD = [
  'Пионерская',
  'Петроградская',
  'Удельная',
  'Звёздная',
  'Спортивная',
] as const;

export const GENDER_ZOD = ['мужской', 'женский', 'неважно'] as const;
export const ROLE_ZOD = ['тренер', 'пользователь'] as const;

export const AVATAR_FILE_TYPES = ['jpg', 'png', 'jpeg'] as const;

export const AVATAR_MAX_SIZE = 1000000;
