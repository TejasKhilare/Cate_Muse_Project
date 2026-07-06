import type { OrderType } from '@/types/common.types.ts';
export type UserRoles =
  | 'event_producer'
  | 'event_designer'
  | 'admin';

export type UserStatuses = 'active' | 'inactive';

export type AssigneeType = { id: string; name: string };

export interface User {
  created_at: string;
  email: string;
  event_designer: { event_producers: AssigneeType[] };
  event_producer: { event_designers: AssigneeType[] };
  id: string;
  name: string;
  roles: UserRoles[];
  updated_at: string;
  disabled?: boolean;
}

export interface UserListItem {
  id: string;
  name: string;
  email: string;
  roles: UserRoles[];
  event_designer: { event_producers: AssigneeType[] };
  event_producer: { event_designers: AssigneeType[] };
  disabled?: boolean;
}

export interface GetUsersPayload {
  items: User[];
  pages: number;
  total: number;
}

export type GetUsersOrderBy = 'name' | 'createdAt';

export interface GetUsersParams {
  page?: number;
  size?: number;
  order_by?: GetUsersOrderBy;
  order?: OrderType;
  q?: string;
  role?: UserRoles;
}

export interface UserRoleOption {
  id: string;
  name: string;
}

export interface UserUpdatePayload {
  is_admin: boolean;
  event_designer: { event_producers: Array<string> };
  event_producer: { event_designers: Array<string> };
}

export interface UserCreatePayload
  extends UserUpdatePayload {
  email: string;
}
