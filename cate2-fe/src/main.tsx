import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Providers } from './Providers';
import { LoggedInPage } from '@/pages/LoggedInPage/LoggedInPage';
import { NotAuthorizedPage } from '@/pages/NotAuthorizedPage/NotAuthorizedPage';
import { museRoutes } from '@/routes/MuseRoutes';
import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route path="/" element={<Navigate to="/muse" replace />} />
          <Route path="/not-authorized" element={<NotAuthorizedPage />} />
          <Route path="/logged-in" element={<LoggedInPage />} />
          {museRoutes}
        </Routes>
      </Providers>
    </BrowserRouter>
  </StrictMode>,
);