import type {
  OverviewStat,
  ActivityLogEntry,
  TopUser,
  AdminUserRow,
  PromptLogRow,
  UsageAnalyticsStat,
  DailyPromptCount,
  EventTypePromptCount,
  ModelUsageStat,
  SystemHealthStat,
  RecurringErrorRow,
  ProcessingTimeBucket,
  SystemConfigItem,
} from '@/muse/types/admin.types';

export const MOCK_OVERVIEW_STATS: OverviewStat[] = [
  { id: '1', icon: 'users',    label: 'TOTAL USERS',     value: '6',     subtext: '+1 this month' },
  { id: '2', icon: 'prompts',  label: 'PROMPTS TODAY',   value: '47',    subtext: '+12% vs yesterday' },
  { id: '3', icon: 'time',     label: 'AVG PROCESSING',  value: '3.4s',  subtext: '-0.8s vs last week' },
  { id: '4', icon: 'cost',     label: 'EST. COST TODAY', value: '$4.18', subtext: '$19.85 this week' },
  { id: '5', icon: 'success',  label: 'SUCCESS RATE',    value: '96.7%', subtext: '3 failures this week' },
  { id: '6', icon: 'sessions', label: 'ACTIVE SESSIONS', value: '4',     subtext: 'Right now' },
];

export const MOCK_RECENT_ACTIVITY: ActivityLogEntry[] = [
  { id: '1', description: 'Create mood board for Embassy Spring Soirée with French garden party theme, sage and ivory palette',     userName: 'Emily Chen',       timestamp: 'May 18, 2:45 PM', duration: '4.2s',  status: 'success' },
  { id: '2', description: 'Generate staffing plan for 450-guest gala dinner with 6 bars and specialty cocktail service',            userName: 'Nathan Gersten',   timestamp: 'May 18, 2:30 PM', duration: '2.1s',  status: 'success' },
  { id: '3', description: 'Build equipment order for outdoor cocktail reception, 320 guests, tented venue',                          userName: 'Sarah Mitchell',   timestamp: 'May 18, 2:15 PM', duration: '3.0s',  status: 'success' },
  { id: '4', description: 'Create MUSE board for Amalfi Coast gala with Positano sunset colors and coastal Italian textures',        userName: 'Emily Chen',       timestamp: 'May 18, 1:58 PM', duration: '6.8s',  status: 'success' },
  { id: '5', description: 'Generate proposal for Morrison Wedding Reception, plated dinner for 180 guests at Meridian House',        userName: 'Marcus Johnson',   timestamp: 'May 18, 1:42 PM', duration: '30.0s', status: 'error' },
  { id: '6', description: 'Enhance prompt for garden terrace reception to include seasonal florals and ambient lighting cues',       userName: 'Jessica Williams', timestamp: 'May 18, 1:30 PM', duration: '1.2s',  status: 'success' },
  { id: '7', description: 'Calculate equipment for Smithsonian Donor Dinner with 200 seated guests and beer/wine bar service',       userName: 'Nathan Gersten',   timestamp: 'May 18, 1:15 PM', duration: '2.4s',  status: 'success' },
  { id: '8', description: 'Create mood board for tech summit with modern minimalist palette and clean geometric staging',            userName: 'Sarah Mitchell',   timestamp: 'May 18, 12:50 PM', duration: '5.1s', status: 'success' },
];

export const MOCK_TOP_USERS: TopUser[] = [
  { id: '1', rank: 1, name: 'Emily Chen',       role: 'Designer',    lastActive: '3 hrs ago',  promptCount: 203 },
  { id: '2', rank: 2, name: 'Nathan Gersten',   role: 'Admin',       lastActive: '2 min ago',  promptCount: 142 },
  { id: '3', rank: 3, name: 'Jessica Williams', role: 'Designer',    lastActive: '30 min ago', promptCount: 94 },
  { id: '4', rank: 4, name: 'Sarah Mitchell',   role: 'Designer',    lastActive: '15 min ago', promptCount: 87 },
  { id: '5', rank: 5, name: 'Marcus Johnson',   role: 'Manager',     lastActive: '1 hr ago',   promptCount: 56 },
  { id: '6', rank: 6, name: 'David Park',       role: 'Coordinator', lastActive: '2 days ago', promptCount: 12 },
];

export const MOCK_ADMIN_USERS: AdminUserRow[] = [
  { id: '1', name: 'Emily Chen',       email: 'emily@ridgewells.com',   role: 'Designer',    status: 'Active',   prompts: 203, lastActive: '3 hrs ago' },
  { id: '2', name: 'Nathan Gersten',   email: 'nathan@ridgewells.com',  role: 'Admin',       status: 'Active',   prompts: 142, lastActive: '2 min ago' },
  { id: '3', name: 'Jessica Williams', email: 'jessica@ridgewells.com', role: 'Designer',    status: 'Active',   prompts: 94,  lastActive: '30 min ago' },
  { id: '4', name: 'Sarah Mitchell',   email: 'sarah@ridgewells.com',   role: 'Designer',    status: 'Active',   prompts: 87,  lastActive: '15 min ago' },
  { id: '5', name: 'Marcus Johnson',   email: 'marcus@ridgewells.com',  role: 'Manager',     status: 'Active',   prompts: 56,  lastActive: '1 hr ago' },
  { id: '6', name: 'David Park',       email: 'david@ridgewells.com',   role: 'Coordinator', status: 'Inactive', prompts: 12,  lastActive: '2 days ago' },
];

export const MOCK_PROMPT_LOGS: PromptLogRow[] = [
  { id: 'PL-001', user: 'Emily Chen',       time: 'May 18, 2:45 PM',  prompt: 'Create mood board for Embassy Spring Soirée with French garden party theme, sage and ivory palette, vintage botanical references', tokens: 3420, cost: 0.12, duration: '4.2s',  model: 'GPT-4o',      status: 'success' },
  { id: 'PL-002', user: 'Nathan Gersten',   time: 'May 18, 2:30 PM',  prompt: 'Generate staffing plan for 450-guest gala dinner with 6 bars and specialty cocktail service', tokens: 1850, cost: 0.06, duration: '2.1s',  model: 'GPT-4o',      status: 'success' },
  { id: 'PL-003', user: 'Sarah Mitchell',   time: 'May 18, 2:15 PM',  prompt: 'Build equipment order for outdoor cocktail reception, 320 guests, tented venue with full bar setup', tokens: 2100, cost: 0.08, duration: '3.0s',  model: 'GPT-4o',      status: 'success' },
  { id: 'PL-004', user: 'Emily Chen',       time: 'May 18, 1:58 PM',  prompt: 'Create MUSE board for Amalfi Coast gala with Positano sunset colors, citrus accents, and coastal Italian textures', tokens: 4200, cost: 0.15, duration: '6.8s',  model: 'GPT-4o',      status: 'success' },
  { id: 'PL-005', user: 'Marcus Johnson',   time: 'May 18, 1:42 PM',  prompt: 'Generate proposal for Morrison Wedding Reception, plated dinner for 180 guests at Meridian House', tokens: 0,    cost: 0.00, duration: '30.0s', model: 'GPT-4o',      status: 'error' },
  { id: 'PL-006', user: 'Jessica Williams', time: 'May 18, 1:30 PM',  prompt: 'Enhance prompt for garden terrace reception to include seasonal florals and ambient lighting cues', tokens: 890,  cost: 0.03, duration: '1.2s',  model: 'GPT-4o-mini', status: 'success' },
  { id: 'PL-007', user: 'Nathan Gersten',   time: 'May 18, 1:15 PM',  prompt: 'Calculate equipment for Smithsonian Donor Dinner with 200 seated guests and beer/wine bar service', tokens: 1650, cost: 0.06, duration: '2.4s',  model: 'GPT-4o',      status: 'success' },
  { id: 'PL-008', user: 'Sarah Mitchell',   time: 'May 18, 12:50 PM', prompt: 'Create mood board for tech summit with modern minimalist palette and clean geometric staging', tokens: 3800, cost: 0.13, duration: '5.1s',  model: 'GPT-4o',      status: 'success' },
];

export const MOCK_USAGE_ANALYTICS_STATS: UsageAnalyticsStat[] = [
  { id: '1', label: 'WEEKLY PROMPTS',    value: '266',    subtext: 'Avg 38/day' },
  { id: '2', label: 'WEEKLY TOKENS',     value: '532K',   subtext: 'Avg 76K/day' },
  { id: '3', label: 'WEEKLY COST',       value: '$19.85', subtext: 'Avg $2.84/day' },
  { id: '4', label: 'AVG COST/PROMPT',   value: '$0.075', subtext: 'Across all models' },
];

export const MOCK_DAILY_PROMPTS: DailyPromptCount[] = [
  { day: 'Mon', count: 42 },
  { day: 'Tue', count: 56 },
  { day: 'Wed', count: 38 },
  { day: 'Thu', count: 61 },
  { day: 'Fri', count: 49 },
  { day: 'Sat', count: 12 },
  { day: 'Sun', count: 8 },
];

export const MOCK_PROMPTS_BY_EVENT_TYPE: EventTypePromptCount[] = [
  { label: 'Gala Dinner',        count: 34 },
  { label: 'Cocktail Reception', count: 26 },
  { label: 'Corporate Event',    count: 22 },
  { label: 'Wedding',            count: 19 },
  { label: 'Buffet/Stations',    count: 12 },
  { label: 'Other',              count: 9 },
];

export const MOCK_MODEL_USAGE: ModelUsageStat[] = [
  { model: 'GPT-4o',      percentage: 87, description: 'Primary model · MUSE, Staff, Equipment' },
  { model: 'GPT-4o-mini', percentage: 11, description: 'Prompt enhancement, quick lookups' },
  { model: 'DALL-E 3',    percentage: 2,  description: 'MUSE hero renderings' },
];

export const MOCK_SYSTEM_HEALTH_STATS: SystemHealthStat[] = [
  { id: '1', label: 'API UPTIME',         value: '99.8%', dotColor: '#22c55e' },
  { id: '2', label: 'AVG RESPONSE TIME',  value: '3.4s',  dotColor: '#22c55e' },
  { id: '3', label: 'ERROR RATE (24H)',   value: '3.3%',  dotColor: '#f59e0b' },
  { id: '4', label: 'QUEUE DEPTH',        value: '0',     dotColor: '#22c55e' },
];

export const MOCK_RECURRING_ERRORS: RecurringErrorRow[] = [
  { id: '1', name: 'Timeout (>30s)',          lastSeen: '2 hrs ago',  count: 4 },
  { id: '2', name: 'Token limit exceeded',    lastSeen: '1 day ago',  count: 2 },
  { id: '3', name: 'Invalid venue reference', lastSeen: '3 days ago', count: 1 },
  { id: '4', name: 'Rate limit hit',          lastSeen: '5 days ago', count: 1 },
];

export const MOCK_PROCESSING_TIME_DISTRIBUTION: ProcessingTimeBucket[] = [
  { label: '< 2s',  percentage: 25, color: '#22c55e' },
  { label: '2-4s',  percentage: 45, color: '#22c55e' },
  { label: '4-6s',  percentage: 20, color: '#f59e0b' },
  { label: '6-10s', percentage: 7,  color: '#f97316' },
  { label: '> 10s', percentage: 3,  color: '#ef4444' },
];

export const MOCK_SYSTEM_CONFIG: SystemConfigItem[] = [
  { label: 'PRIMARY MODEL',       value: 'GPT-4o (2026-05)' },
  { label: 'FALLBACK MODEL',      value: 'GPT-4o-mini' },
  { label: 'MAX TOKENS/REQUEST',  value: '4,096' },
  { label: 'RATE LIMIT',          value: '60 req/min' },
  { label: 'TIMEOUT',             value: '30s' },
  { label: 'RETRY POLICY',        value: '3× exponential' },
  { label: 'DATA RETENTION',      value: '90 days' },
  { label: 'BACKUP SCHEDULE',     value: 'Daily 2:00 AM' },
];