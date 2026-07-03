// src/muse/security/permissions.ts
// Aligns with UserRoles from @/types/users.types.ts:
// 'event_producer' | 'event_designer' | 'admin'

import type { UserRoles } from '@/types/users.types';
import { MUSE_ROUTES } from '@/muse/constants/routes';
import type { MuseRoutePath } from '@/muse/constants/routes';

// Re-export UserRoles as MuseRole — same type, MUSE-scoped alias.
// If backend adds new roles later, update users.types.ts — this follows automatically.
export type MuseRole = UserRoles;

// Which roles are required to access which MUSE routes.
// Partial<Record<...>> — not every route needs a restriction.
// Unrestricted routes simply have no entry here.
export const ROUTE_ROLE_MAP: Partial<Record<MuseRoutePath, MuseRole[]>> = {
  [MUSE_ROUTES.ADMIN]: ['admin'],
};

// Helper — check if a user's roles satisfy a required role.
// Called by RoleGuard.tsx — keeps role logic out of the component.
export const hasRequiredRole = (
  userRoles: UserRoles[],
  requiredRole: MuseRole,
): boolean => {
  return userRoles.includes(requiredRole);
};