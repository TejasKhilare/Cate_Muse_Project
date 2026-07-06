// src/muse/constants/sidebar.ts
// No React imports here — this is pure data.
// MuseSidebar.tsx maps iconName strings to actual lucide-react components.

import { MUSE_ROUTES } from './routes';

export interface SidebarNavItem {
  to:        string;
  label:     string;
  iconName:  string;   // mapped to lucide-react component in MuseSidebar.tsx
  adminOnly: boolean;
  end:       boolean;  // React Router NavLink `end` prop — exact match only
}

export const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  {
    to:        MUSE_ROUTES.DASHBOARD,
    label:     'Dashboard',
    iconName:  'LayoutDashboard',
    adminOnly: false,
    end:       true,   // /muse must be exact — without `end`, /muse/proposals also marks this active
  },
  {
    to:        MUSE_ROUTES.NEW_PROPOSAL,
    label:     'New Proposal',
    iconName:  'FilePlus',
    adminOnly: false,
    end:       false,
  },
  {
    to:        MUSE_ROUTES.PROPOSALS,
    label:     'Proposals',
    iconName:  'FileText',
    adminOnly: false,
    end:       false,
  },
  {
    to:        MUSE_ROUTES.BOARD,
    label:     'MUSE Boards',
    iconName:  'Palette',
    adminOnly: false,
    end:       false,
  },
  {
    to:        MUSE_ROUTES.STAFF_CALCULATOR,
    label:     'Staff Calculator',
    iconName:  'Users',
    adminOnly: false,
    end:       false,
  },
  {
    to:        MUSE_ROUTES.EQUIPMENT_CALCULATOR,
    label:     'Equipment Calculator',
    iconName:  'Package',
    adminOnly: false,
    end:       false,
  },
  {
    to:        MUSE_ROUTES.ADMIN,
    label:     'Admin',
    iconName:  'ShieldCheck',
    adminOnly: true,   // RoleGuard handles route protection — this controls visibility only
    end:       false,
  },
];