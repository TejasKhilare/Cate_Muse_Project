import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';
import { config } from '@/constants/config';
import { serializeQueryParams } from '@/api/serializeQueryParams.ts';

let navigateHandler: ((path: string) => void) | null = null;
export const setApiNavigateHandler = (fn: (path: string) => void) => {
  navigateHandler = fn;
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

  apiClient.interceptors.response.use(
    (res: AxiosResponse) => {
      return res;
    },
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