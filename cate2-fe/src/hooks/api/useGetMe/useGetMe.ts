import type { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/config.ts';
import type { User } from '@/types/users.types.ts';

export const useGetMe = () =>
  useQuery<User, AxiosError>({
    queryKey: ['users', 'me'],
    queryFn: async () => {
      const response: AxiosResponse<User> = await apiClient.get(`/users/me`);
      return response.data;
    },
  });
