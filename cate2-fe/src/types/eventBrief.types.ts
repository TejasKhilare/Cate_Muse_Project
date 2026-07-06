// src/muse/types/eventBrief.types.ts

export type EventBriefStatus = 'confirmed' | 'in-review' | 'draft';

export type CalculatorMode = 'Standalone' | 'Pull from Event Brief';

export interface EventBrief {
  id:            string;
  eventName:     string;
  client:        string;
  guestCount:    number;
  eventType:     string;   // free-text from brief, e.g. "cocktail reception"
  venue:         string;
  eventDate:     string;   // ISO date "2026-05-31"
  durationHours: number;
  barType:       string;   // free-text, e.g. "full bar"
  status:        EventBriefStatus;
}