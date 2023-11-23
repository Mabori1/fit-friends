import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { getAccessToken, getRefreshToken, saveTokens } from './tokens';

const baseURL = 'http://127.0.0.1:4000/api';

let accessToken = getAccessToken() ? JSON.parse(getAccessToken()) : null;

const apiService = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${accessToken}` },
});

apiService.interceptors.request.use(async (req) => {
  if (!accessToken) {
    accessToken = getAccessToken() ? JSON.parse(getAccessToken()) : null;
    req.headers.Authorization = `Bearer ${accessToken}`;
  }

  const decodedAccessToken = jwtDecode(accessToken);
  if (decodedAccessToken.exp) {
    const isExpired = dayjs.unix(decodedAccessToken.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;
  }

  const response = await axios.post(
    `${baseURL}auth/refresh`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getRefreshToken()}`,
      },
    },
  );

  saveTokens(response.data.access_token, response.data.refresh_token);
  req.headers.Authorization = `Bearer ${response.data.access_token}`;
  return req;
});

export default apiService;
