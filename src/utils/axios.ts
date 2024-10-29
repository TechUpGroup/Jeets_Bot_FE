import axios from 'axios';

import { appConfig } from '@/config';
import useGlobalStore from '@/store/useGlobalStore';
import useListUserStore from '@/store/useListUserStore';
import useUserStore from '@/store/useUserStore';
import { ITokens, IUserInfo } from '@/types/auth.type';

const baseURL = appConfig.publicUrl;
const contentType = 'application/json';
const headers = { 'Content-Type': contentType };

let refreshTokenRequest: Promise<IUserInfo> | null = null;

export const axiosNoAuthInstance = axios.create({
  baseURL,
  headers,
});

export const axiosInstance = axios.create({
  baseURL,
  headers,
});

const getToken = () => useUserStore.getState()?.user?.tokens;
const updateUser = (tokens: IUserInfo | null) => useUserStore.getState().setUser(tokens);
const logoutAndClearUser = () => {
  const userStore = useUserStore.getState();
  if (userStore.user) {
    useListUserStore.getState().clearUserToList(userStore.user);
  }
  userStore.setUser(null);
};

const isExpired = (date: string) => {
  return new Date(date).getTime() < Date.now();
};

const getRefreshToken = async (refreshToken: string) => {
  const tokensData = await axiosNoAuthInstance.post<IUserInfo>('/auth/refresh-tokens', { refreshToken });
  if (![200, 201].includes(tokensData?.status)) throw tokensData;
  return tokensData.data;
};

const refreshToken = async (tokens?: ITokens | null) => {
  try {
    if (!tokens) {
      const x = useUserStore.getState();
      tokens = getToken();
      if (!tokens) throw new Error('token not found');
    }
    if (isExpired(tokens.refresh.expires)) throw new Error('refresh token expired');
    refreshTokenRequest = refreshTokenRequest ?? getRefreshToken(tokens.refresh.token);
    const newToken = await refreshTokenRequest;
    // reset token request for the next expiration
    refreshTokenRequest = null;
    await updateUser(newToken);
    return newToken.tokens.access.token;
  } catch (err) {
    console.error(err);
    // reset tokens
    await logoutAndClearUser();
    return null;
  }
};

async function getAccessToken() {
  try {
    const tokens = getToken();
    if (!tokens) return null;

    if (isExpired(tokens.access.expires)) return refreshToken(tokens);

    return tokens?.access.token;
  } catch {
    return null;
  }
}

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    if (['post', 'put'].includes(response.config.method ?? '')) {
      useGlobalStore.getState().incrementCount();
    }
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if ([401, 403].includes(error?.response?.status) && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await refreshToken();
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  },
);
