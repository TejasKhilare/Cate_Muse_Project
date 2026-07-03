import axios, { AxiosResponse, AxiosError } from 'axios';
import { config } from '@/constants/config';
import { serializeQueryParams } from '@/api/serializeQueryParams.ts';

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
        window.location.assign('not-authorized');
      }

      return Promise.reject(err);
    },
  );

  return apiClient;
};

export const apiClient = createApiClient(config.baseApiURL);
