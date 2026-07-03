import { AxiosResponse } from 'axios';

export type OrderType = 'asc' | 'desc';

export enum InputType {
  NUMBER = 'number',
  DATE = 'date',
  SELECT = 'select',
}

export interface ErrorResponseType {
  response: AxiosResponse<{ detail: string }>;
}
