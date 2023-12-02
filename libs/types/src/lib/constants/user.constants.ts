export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password or email is wrong';
export const AUTH_USER_EXISTS = 'User with this email exists';
export const SALT_ROUNDS = 10;
export const AUTH_USER_EMAIL_NOT_VALID = 'The email is not valid';
export const AUTH_USER_DATE_BIRTH_NOT_VALID =
  'The user date birth is not valid';
export const AUTH_NOT_FOR_AUTH_USER = 'Only for new user';
export const AUTH_USER_ONLY_CLIENT_PERMIT = 'Only users permisions';
export const AUTH_USER_ONLY_TRAINERS_PERMIT = 'Only treiners permisions';
export const DEFAULT_USER_COUNT_LIMIT = 50;
export const MAX_AVATAR_FILE_SIZE = 1000000;
export const TOO_BIG_FILE = 'Too big file';
export const WRONG_FILE_TYPE = 'Wrong file type';

export const ImageTypes: string[] = ['jpg', 'jpeg', 'png'];
export const VideoTypes: string[] = ['mov', 'avi', 'mp4'];

export enum DefaultUsersQuery {
  maxLimit = 50,
  minLimit = 1,
  sortDesc = -1,
  sortAsc = 1,
  Limit = 50,
  Desc = -1,
}

export const UsersErrorMessage = {
  EmailNotValid: 'The email format is not valid',
  PasswordNotValid: 'Password min length is 6, max is 12 symbols',
  NameNotValid: 'The user name not valid',
  NameLengthNotValid: 'Name min length is 1, max length is 15 symbols',
  MeritsLengthNotValid:
    'Trainer merits min length is 10, max length is 140 symbols',
  DescriptionLengthNotValid:
    'Client description min length is 10, max length is 140 symbols',
  NameMinLengthNotValid: 'Min length for the name is 1 symbol',
  NameMaxLengthNotValid: 'Max length for the name is 15 symbols',
  BirthDateNotValid: 'The user date birth is not valid',
  ImageFormatNotValid: 'Only jpg/jpeg or png format is allowed',
  JWTFormatNotValid: 'Refresh token has wrong format',
} as const;

export const Image = {
  FileMaxSize: 500 * 1024,
  FileType: /.(jpg|jpeg|png)$/,
} as const;

export enum AuthErrorMessage {
  UserAlreadyExist = 'User with this email exists',
  UserNotFound = 'User with this email/id not found',
  UserPasswordWrong = 'User password is wrong',
  RefreshTokenNotValid = 'Refresh token is not valid',
  WrongAccessToken = 'Wrong access-token or expired',
  ActionNotAllowed = 'User can update only his own data',
  UsersCountExceeded = 'The number of users cannot be more than 50',
  UpdateForbiddenProperties = 'Email, password, role and some others cannot be updated',
  WrongUserRole = 'Only a user with the Client role has access to this action',
  TrainingNotFound = "The training with the specified ID is not on the user's balance",
  AlreadyRequested = 'Friendship already requested',
  AlreadyHaveFriend = 'The user is already your friend',
  AlreadyReqTraining = 'The personal training is already requested',
  NotFriend = 'Personal training request allowed only for friends',
  NoPersonalTraining = 'The current trainer does not provide personal training',
  NotReadyToTraining = 'The current user is not ready to training',
  DontHaveFriend = "Don't have user with this ID in friends list",
  CantAcceptFriend = "Can't accept friendship from user, who didn't request it",
  CantAcceptTraining = "Can't accept personal training from user, who didn't request it",
  CantRejectFriend = "Can't reject friendship from user, who is your friend",
  CantRejectUser = "Can't reject user, who did't request friendship",
  GymAlreadyFavorite = 'The gym is already in favorite list',
  GymNotFavorite = 'The gym is not in favorite list',
  SameId = 'Requestor ID and respondend ID are the same',
}
