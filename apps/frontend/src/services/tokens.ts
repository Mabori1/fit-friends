const ACCESS_TOKEN_KEY_NAME = 'fitfriends-access-token';
const REFRESH_TOKEN_KEY_NAME = 'fitfriends-refresh-token';

export type Token = string;

export const getToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY_NAME);
  return token ?? localStorage.getItem(REFRESH_TOKEN_KEY_NAME);
};

export const getAccessToken = (): Token => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY_NAME);
  return token ?? '';
};

export const getRefreshToken = (): Token => {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveTokens = (accessToken: Token, refreshToken: Token): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY_NAME, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY_NAME, refreshToken);
};

export const dropTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY_NAME);
  localStorage.removeItem(REFRESH_TOKEN_KEY_NAME);
};
