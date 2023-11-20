import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { dropTokens, getToken, saveTokens } from './tokens';
import { Tokens } from '../types/tokens';

const REQUEST_TIMEOUT = 5000;
const BASE_URL = 'http://localhost:4000/api';

export const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    config.headers = config.headers ?? {};

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    async (error: AxiosError) => {
      const { response } = error;
      const originalRequest = response?.config as InternalAxiosRequestConfig & {
        _retry: boolean;
      };

      if (response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      try {
        dropTokens();
        const { data } = await api.get<Tokens>('/auth/refresh');
        saveTokens(data.access_token, data.refresh_token);

        originalRequest._retry = true;

        return api(originalRequest);
      } catch {
        return Promise.reject(new Error('Текущая сессия истекла.'));
      }
    },
  );

  return api;
};
