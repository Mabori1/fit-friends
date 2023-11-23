import axios, { InternalAxiosRequestConfig } from 'axios';
import dayjs from 'dayjs';
import { getAccessToken, getRefreshToken, saveTokens } from './tokens';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../const';

const REQUEST_TIMEOUT = 2000;
const BASE_URL = 'http://localhost:4000/api';

const token = getAccessToken();

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (!token) {
      const token = getAccessToken();
      console.log('No token, ');
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp) {
      console.log('decodedToken.exp', decodedToken.exp);
      const isTokenExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;

      if (!isTokenExpired) {
        console.log('access token not expired');
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }
      const refreshToken = getRefreshToken();
      const decodedRefreshToken = jwtDecode(refreshToken);

      if (decodedRefreshToken.exp) {
        console.log('decodedRefreshToken.exp', decodedRefreshToken.exp);

        const isRefreshTokenExpired =
          dayjs.unix(decodedRefreshToken.exp).diff(dayjs()) < 1;

        if (!isRefreshTokenExpired) {
          console.log('refresh token not expired');

          const response = await axios.post(`${BASE_URL}/auth/refresh`, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          console.log(response);

          if (response.status === 200) {
            console.log('refresh token success');
            saveTokens(response.data.access_token, response.data.refresh_token);
            config.headers.Authorization = `Bearer ${getAccessToken()}`;
            return config;
          } else if (response.status === 401) {
            console.log('refresh token failed');
            Navigate({ to: AppRoute.Intro, replace: true });
          }
        }
      }
    }

    return config;
  },
);
