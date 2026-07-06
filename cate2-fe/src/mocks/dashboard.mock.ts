import type { DashboardKpiStat, UpcomingEvent } from '@/types/dashboard.types';
import type { Proposal } from '@/types/proposal.types';

export const MOCK_KPI_STATS: DashboardKpiStat[] = [
  { id: '1', label: 'ACTIVE PROPOSALS',  value: '12',    subtext: '+3 this week',         icon: 'proposals', trend: 'up'   },
  { id: '2', label: 'AVG TURNAROUND',    value: '2.4h',  subtext: '-18% vs last month',   icon: 'clock',     trend: 'down' },
  { id: '3', label: 'WIN RATE',          value: '68%',   subtext: '+5% this quarter',     icon: 'chart',     trend: 'up'   },
  { id: '4', label: 'REVENUE PIPELINE',  value: '$284K', subtext: '14 proposals pending', icon: 'dollar',    trend: 'up'   },
];

export const MOCK_UPCOMING_EVENTS: UpcomingEvent[] = [
  { id: '1', name: 'Georgetown Garden Party',  date: 'May 31', venue: 'Dumbarton Oaks'   },
  { id: '2', name: 'National Gallery Opening', date: 'Jun 22', venue: 'National Gallery' },
];

export const MOCK_PIPELINE_PROPOSALS: Proposal[] = [
  { id: '1', name: 'Morrison Wedding Reception',  client: 'Morrison Family',           guests: 180,  eventDate: '2026-06-14', status: 'draft',     value: 38750,  updatedAt: '5 hours ago' },
  { id: '2', name: 'Tech Summit Gala Dinner',     client: 'TechCrunch DC',             guests: 450,  eventDate: '2026-07-02', status: 'draft',     value: 67200,  updatedAt: '2 days ago'  },
  { id: '3', name: 'Embassy Spring Soirée',       client: 'French Embassy',            guests: 320,  eventDate: '2026-05-28', status: 'in_review', value: 56800,  updatedAt: '4 hours ago' },
  { id: '4', name: 'Smithsonian Donor Dinner',    client: 'Smithsonian Institution',   guests: 200,  eventDate: '2026-06-08', status: 'in_review', value: 42100,  updatedAt: '1 day ago'   },
  { id: '5', name: 'Sands Capital Annual Gala',   client: 'Sands Capital Management',  guests: 1200, eventDate: '2026-09-15', status: 'sent',      value: 192000, updatedAt: '1 day ago'   },
  { id: '6', name: 'National Gallery Opening',    client: 'National Gallery of Art',   guests: 600,  eventDate: '2026-06-22', status: 'won',       value: 84200,  updatedAt: '2 days ago'  },
  { id: '7', name: 'Georgetown Garden Party',     client: 'Georgetown University',      guests: 150,  eventDate: '2026-05-31', status: 'won',       value: 28500,  updatedAt: '3 days ago'  },
];