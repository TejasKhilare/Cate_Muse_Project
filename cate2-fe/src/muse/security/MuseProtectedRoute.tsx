// src/muse/security/MuseProtectedRoute.tsx

import { ReactNode } from 'react';
import { ProtectedRoute } from '@/ProtectedRoute';
import { RoleGuard } from './RoleGuard';
import type { MuseRole } from './permissions';

interface MuseProtectedRouteProps {
  children:      ReactNode;
  requiredRole?: MuseRole;
}

export const MuseProtectedRoute = ({
  children,
  requiredRole,
}: MuseProtectedRouteProps) => {
  if (requiredRole) {
    return (
      <ProtectedRoute>
        <RoleGuard requiredRole={requiredRole}>
          {children}
        </RoleGuard>
      </ProtectedRoute>
    );
  }

  return <ProtectedRoute>{children}</ProtectedRoute>;
};