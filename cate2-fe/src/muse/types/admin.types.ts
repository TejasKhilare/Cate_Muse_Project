export type AdminTabKey = 'overview' | 'users' | 'prompt-logs' | 'usage-analytics' | 'system-health';

export interface AdminTabConfig {
  key:   AdminTabKey;
  label: string;
}

export const ADMIN_TABS: AdminTabConfig[] = [
  { key: 'overview',        label: 'Overview' },
  { key: 'users',           label: 'Users' },
  { key: 'prompt-logs',     label: 'Prompt Logs' },
  { key: 'usage-analytics', label: 'Usage Analytics' },
  { key: 'system-health',   label: 'System Health' },
];

// ── Overview ──
export interface OverviewStat {
  id:       string;
  label:    string;
  value:    string;
  subtext?: string;
  icon:     'users' | 'prompts' | 'time' | 'cost' | 'success' | 'sessions';
}

export interface ActivityLogEntry {
  id:          string;
  description: string;
  userName:    string;
  timestamp:   string;
  duration:    string;
  status:      'success' | 'error';
}

export interface TopUser {
  id:          string;
  rank:        number;
  name:        string;
  role:        string;
  lastActive:  string;
  promptCount: number;
}

// ── Users ──
export type AdminUserStatus = 'Active' | 'Inactive';

export interface AdminUserRow {
  id:         string;
  name:       string;
  email:      string;
  role:       string;
  status:     AdminUserStatus;
  prompts:    number;
  lastActive: string;
}

// ── Prompt Logs ──
export type PromptLogStatus = 'success' | 'error';

export interface PromptLogRow {
  id:       string;
  user:     string;
  time:     string;
  prompt:   string;
  tokens:   number;
  cost:     number;
  duration: string;
  model:    string;
  status:   PromptLogStatus;
}

// ── Usage Analytics ──
export interface UsageAnalyticsStat {
  id:      string;
  label:   string;
  value:   string;
  subtext: string;
}

export interface DailyPromptCount {
  day:   string;
  count: number;
}

export interface EventTypePromptCount {
  label: string;
  count: number;
}

export interface ModelUsageStat {
  model:       string;
  percentage:  number;
  description: string;
}

// ── System Health ──
export interface SystemHealthStat {
  id:       string;
  label:    string;
  value:    string;
  dotColor: string;
}

export interface RecurringErrorRow {
  id:       string;
  name:     string;
  lastSeen: string;
  count:    number;
}

export interface ProcessingTimeBucket {
  label:      string;
  percentage: number;
  color:      string;
}

export interface SystemConfigItem {
  label: string;
  value: string;
}