import type { AxiosResponse } from 'axios';

export type OrderType = 'asc' | 'desc';

export type InputType = 'number' | 'date' | 'select';

export const InputType = {
  NUMBER: 'number',
  DATE: 'date',
  SELECT: 'select',
} as const;

export interface ErrorResponseType {
  response: AxiosResponse<{ detail: string }>;
}