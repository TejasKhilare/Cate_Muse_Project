// src/muse/types/new-proposal.types.ts

import type { Dayjs } from 'dayjs';

export type EventType =
  | 'Plated Dinner'
  | 'Cocktail Reception'
  | 'Cocktail + Plated'
  | 'Buffet'
  | 'Luncheon'
  | 'Breakfast / Brunch'
  | 'Wedding Reception'
  | 'Gala Dinner'
  | 'Corporate Meeting'
  | 'Holiday Party';

export interface NewProposalFormData {
  eventName:  string;
  clientName: string;
  guestCount: string;
  eventDate:  Dayjs | null;
  eventType:  EventType;
  venue:      string;
  notes:      string;
}

export const INITIAL_FORM: NewProposalFormData = {
  eventName:  '',
  clientName: '',
  guestCount: '',
  eventDate:  null,
  eventType:  'Plated Dinner',
  venue:      '',
  notes:      '',
};

export const EVENT_TYPE_OPTIONS: EventType[] = [
  'Plated Dinner',
  'Cocktail Reception',
  'Cocktail + Plated',
  'Buffet',
  'Luncheon',
  'Breakfast / Brunch',
  'Wedding Reception',
  'Gala Dinner',
  'Corporate Meeting',
  'Holiday Party',
];