import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getAccessToken, getRefreshToken } from './tokens';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';
import { AppRoute, BASE_URL } from '../const';
import { store } from '../redux/store';
import { refreshTokensAction } from '../redux/authSlice/apiAuthActions';

const optionsToast = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.FORBIDDEN]: true,
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
  !!StatusCodeMapping[response.status];

const REQUEST_TIMEOUT = 5000;

export const createRefreshTokensAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getRefreshToken();

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        toast.warn(error.response.statusText, optionsToast);

        redirect(AppRoute.Intro);
      }

      throw error;
    },
  );

  return api;
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        toast.warn(error.response.statusText, optionsToast);
      }

      if (error.response?.status === 401) {
        store.dispatch(refreshTokensAction());
      }

      throw error;
    },
  );

  return api;
};
