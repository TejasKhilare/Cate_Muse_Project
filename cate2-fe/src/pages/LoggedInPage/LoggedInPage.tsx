import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { PageLoader } from '@/components';

export const LoggedInPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!search) {
      navigate(localStorage.getItem('loggedInRedirectUrl') || '/');
    }
  }, [search, navigate]);

  return <PageLoader />;
};
