import type { ProposalStatus } from '@/muse/constants/statuses';

export type { ProposalStatus };

export interface Proposal {
  id:        string;
  name:      string;
  client:    string;
  guests:    number;
  eventDate: string;   // ISO date string "2026-06-22"
  status:    ProposalStatus;
  value:     number;   // USD integer
  updatedAt: string;   // human-readable "2 days ago"
}