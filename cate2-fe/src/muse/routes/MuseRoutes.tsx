// src/muse/routes/MuseRoutes.tsx

import { Route } from 'react-router';
import { MuseProtectedRoute }      from '@/muse/security/MuseProtectedRoute';
import { MUSE_ROUTES }             from '@/muse/constants/routes';
import { DashboardPage }           from '@/muse/pages/DashboardPage/DashboardPage';
import { NewProposalPage }         from '@/muse/pages/NewProposalPage/NewProposalPage';
import { ProposalsPage }           from '@/muse/pages/ProposalsPage/ProposalsPage';
import { MuseBoardPage }           from '@/muse/pages/MuseBoardPage/MuseBoardPage';
import { MuseBoardResultPage }     from '@/muse/pages/MuseBoardResultPage/MuseBoardResultPage';
import { StaffCalculatorPage }     from '@/muse/pages/StaffCalculatorPage/StaffCalculatorPage';
import { EquipmentCalculatorPage } from '@/muse/pages/EquipmentCalculatorPage/EquipmentCalculatorPage';
import { AdminPage }               from '@/muse/pages/AdminPage/AdminPage';

export const museRoutes = [
  <Route
    key="muse-dashboard"
    path={MUSE_ROUTES.DASHBOARD}
    element={<MuseProtectedRoute><DashboardPage /></MuseProtectedRoute>}
  />,
  <Route
    key="muse-new-proposal"
    path={MUSE_ROUTES.NEW_PROPOSAL}
    element={<MuseProtectedRoute><NewProposalPage /></MuseProtectedRoute>}
  />,
  <Route
    key="muse-proposals"
    path={MUSE_ROUTES.PROPOSALS}
    element={<MuseProtectedRoute><ProposalsPage /></MuseProtectedRoute>}
  />,
  <Route
    key="muse-board"
    path={MUSE_ROUTES.BOARD}
    element={<MuseProtectedRoute><MuseBoardPage /></MuseProtectedRoute>}
  />,
  <Route
    key="muse-board-result"
    path={MUSE_ROUTES.BOARD_RESULT}
    element={<MuseProtectedRoute><MuseBoardResultPage /></MuseProtectedRoute>}
  />,
  <Route
    key="muse-staff-calculator"
    path={MUSE_ROUTES.STAFF_CALCULATOR}
    element={<MuseProtectedRoute><StaffCalculatorPage /></MuseProtectedRoute>}
  />,
  <Route
    key="muse-equipment-calculator"
    path={MUSE_ROUTES.EQUIPMENT_CALCULATOR}
    element={<MuseProtectedRoute><EquipmentCalculatorPage /></MuseProtectedRoute>}
  />,
  <Route
    key="muse-admin"
    path={MUSE_ROUTES.ADMIN}
    element={<MuseProtectedRoute requiredRole="admin"><AdminPage /></MuseProtectedRoute>}
  />,
];