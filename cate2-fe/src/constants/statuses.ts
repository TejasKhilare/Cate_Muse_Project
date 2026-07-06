// src/muse/constants/statuses.ts

export type ProposalStatus = 'draft' | 'in_review' | 'sent' | 'won';

export interface StatusConfig {
  label:     string;
  textColor: string;
  bgColor:   string;
  dotColor:  string;
}

export const PROPOSAL_STATUS_CONFIG: Record<ProposalStatus, StatusConfig> = {
  draft: {
    label:     'Draft',
    textColor: '#64748b',
    bgColor:   '#f8fafc',
    dotColor:  '#64748b',
  },
  in_review: {
    label:     'In Review',
    textColor: '#d97706',
    bgColor:   '#fffbeb',
    dotColor:  '#d97706',
  },
  sent: {
    label:     'Sent',
    textColor: '#4f46e5',
    bgColor:   '#eef2ff',
    dotColor:  '#4f46e5',
  },
  won: {
    label:     'Won',
    textColor: '#16a34a',
    bgColor:   '#f0fdf4',
    dotColor:  '#16a34a',
  },
};

export const PIPELINE_COLUMNS: Array<{
  status: ProposalStatus;
  label:  string;
}> = [
  { status: 'draft',     label: 'DRAFT'     },
  { status: 'in_review', label: 'IN REVIEW' },
  { status: 'sent',      label: 'SENT'      },
  { status: 'won',       label: 'WON'       },
];