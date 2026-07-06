import axios from 'axios';
import type { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { User } from 'oidc-client-ts';
import { config } from '@/constants/config';
import { serializeQueryParams } from '@/api/serializeQueryParams.ts';

let navigateHandler: ((path: string) => void) | null = null;
export const setApiNavigateHandler = (fn: (path: string) => void) => {
  navigateHandler = fn;
};

const getStoredAccessToken = (): string | null => {
  const oidcKey = `oidc.user:${config.authAuthority}:${config.authClientId}`;
  const raw = sessionStorage.getItem(oidcKey);
  if (!raw) return null;
  try {
    const user = User.fromStorageString(raw);
    return user?.access_token ?? null;
  } catch {
    return null;
  }
};

const createApiClient = (baseApiUrl: string) => {
  if (!baseApiUrl) throw new Error('baseApiUrl must be a valid URL');

  const apiClient = axios.create({
    baseURL: `${baseApiUrl}/`,
    paramsSerializer: serializeQueryParams,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  apiClient.interceptors.request.use((cfg: InternalAxiosRequestConfig) => {
    const token = getStoredAccessToken();
    if (token) {
      cfg.headers.Authorization = `Bearer ${token}`;
    }
    return cfg;
  });

  apiClient.interceptors.response.use(
    (res: AxiosResponse) => res,
    async (err: AxiosError) => {
      const status = err.response ? err.response.status : null;
      if (status === 403) {
        if (navigateHandler) {
          navigateHandler('/not-authorized');
        } else {
          window.location.assign('/not-authorized');
        }
      }
      return Promise.reject(err);
    },
  );

  return apiClient;
};

export const apiClient = createApiClient(config.baseApiURL);