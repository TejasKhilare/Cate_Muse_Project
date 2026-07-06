// src/muse/routes/routeConfig.ts

import { MUSE_ROUTES } from '@/constants/routes';
import type { MuseRoutePath } from '@/constants/routes';
import type { MuseRole } from '@/security/permissions';

export interface MuseRouteConfig {
  path:          MuseRoutePath;
  requiredRole?: MuseRole;
}

export const MUSE_ROUTE_CONFIG: MuseRouteConfig[] = [
  { path: MUSE_ROUTES.DASHBOARD            },
  { path: MUSE_ROUTES.NEW_PROPOSAL         },
  { path: MUSE_ROUTES.PROPOSALS            },
  { path: MUSE_ROUTES.BOARD                },
  { path: MUSE_ROUTES.STAFF_CALCULATOR     },
  { path: MUSE_ROUTES.EQUIPMENT_CALCULATOR },
  { path: MUSE_ROUTES.ADMIN, requiredRole: 'admin' },
];