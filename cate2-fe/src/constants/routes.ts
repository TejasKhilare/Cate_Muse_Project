// src/muse/constants/routes.ts

export const MUSE_ROUTES = {
  DASHBOARD:            '/muse',
  NEW_PROPOSAL:         '/muse/new-proposal',
  PROPOSALS:            '/muse/proposals',
  BOARD:                '/muse/board',
  BOARD_RESULT:         '/muse/board/:id',
  STAFF_CALCULATOR:     '/muse/staff-calculator',
  EQUIPMENT_CALCULATOR: '/muse/equipment-calculator',
  ADMIN:                '/muse/admin',
} as const;

export type MuseRoutePath = typeof MUSE_ROUTES[keyof typeof MUSE_ROUTES];