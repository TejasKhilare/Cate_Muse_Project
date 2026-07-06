import type { ReactNode } from 'react';
import { withAuthenticationRequired } from 'react-oidc-context';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = withAuthenticationRequired(
  ({ children }: ProtectedRouteProps) => {
    return children;
  },
  {
    onBeforeSignin: () =>
      localStorage.setItem('loggedInRedirectUrl', window.location.pathname),
  },
);