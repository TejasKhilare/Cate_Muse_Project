import React, { useEffect } from 'react';
import {
  QueryClient,
  QueryClientProvider as QueryClientProviderReactQuery,
} from '@tanstack/react-query';
import { AuthProvider } from 'react-oidc-context';
import { ConfigProvider } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import { config } from './constants/config';
import { antdTheme } from './theme';
import { setApiNavigateHandler } from '@/api/config';

interface QueryClientProviderProp {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const cognitoAuthConfig = {
  authority: config.authAuthority,
  client_id: config.authClientId,
  redirect_uri: config.authRedirectUrl,
  response_type: 'code',
  scope: 'openid',
  automaticSilentRenew: true,
};

export const Providers = ({ children }: QueryClientProviderProp) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setApiNavigateHandler(navigate);
  }, [navigate]);

  return (
    <AuthProvider
      {...cognitoAuthConfig}
      onSigninCallback={() => {
        navigate(pathname);
      }}
    >
      <QueryClientProviderReactQuery client={queryClient}>
        <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
      </QueryClientProviderReactQuery>
    </AuthProvider>
  );
};