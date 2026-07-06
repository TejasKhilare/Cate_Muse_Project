// src/muse/security/RoleGuard.tsx

import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useUserStore } from '@/stores/userStore/userStore';
import { MUSE_ROUTES } from '@/constants/routes';
import { hasRequiredRole } from './permissions';
import type { MuseRole } from './permissions';

interface RoleGuardProps {
  children:     ReactNode;
  requiredRole: MuseRole;
}

export const RoleGuard = ({ children, requiredRole }: RoleGuardProps) => {
  const userData = useUserStore((s) => s.userData);

  // userData is null until MuseLayout calls useGetMe() and populates the store.
  // If null, allow render to proceed — MuseLayout will show PageLoader anyway.
  // This avoids a false redirect before user data has loaded.
  if (userData === null) {
    return null;
  }

  const hasAccess = hasRequiredRole(userData.roles, requiredRole);

  if (!hasAccess) {
    return <Navigate to={MUSE_ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
};