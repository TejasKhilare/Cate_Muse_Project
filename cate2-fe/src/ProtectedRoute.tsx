import { useEffect, ReactNode } from 'react';
import { withAuthenticationRequired } from 'react-oidc-context';

import { apiClient } from '@/api/config.ts';
import { useAuth } from 'react-oidc-context';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = withAuthenticationRequired(
  ({ children }: ProtectedRouteProps) => {
    const auth = useAuth();

    useEffect(() => {
      if (auth.user?.access_token) {
        apiClient.defaults.headers.common['Authorization'] =
          `Bearer ${auth.user?.access_token}`;
      }
    }, [auth.user?.access_token]);

    return children;
  },
  {
    onBeforeSignin: () =>
      localStorage.setItem('loggedInRedirectUrl', window.location.pathname),
  },
);
