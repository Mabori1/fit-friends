export enum AppRoute {
  Main = '/',
  Intro = '/intro',
  Info = '/info',
  SingIn = '/login',
  SingUp = '/registration',
  TrainerRoom = '/trainer',
  ClientRoom = '/client',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  User = 'USER',
  Data = 'DATA',
  Training = 'TRAINING',
}
