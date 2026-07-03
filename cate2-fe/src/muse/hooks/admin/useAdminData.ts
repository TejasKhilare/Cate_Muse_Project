import { useQuery } from '@tanstack/react-query';
import type {
  OverviewStat, ActivityLogEntry, TopUser, AdminUserRow, PromptLogRow,
  UsageAnalyticsStat, DailyPromptCount, EventTypePromptCount, ModelUsageStat,
  SystemHealthStat, RecurringErrorRow, ProcessingTimeBucket, SystemConfigItem,
} from '@/muse/types/admin.types';
import {
  MOCK_OVERVIEW_STATS, MOCK_RECENT_ACTIVITY, MOCK_TOP_USERS, MOCK_ADMIN_USERS,
  MOCK_PROMPT_LOGS, MOCK_USAGE_ANALYTICS_STATS, MOCK_DAILY_PROMPTS,
  MOCK_PROMPTS_BY_EVENT_TYPE, MOCK_MODEL_USAGE, MOCK_SYSTEM_HEALTH_STATS,
  MOCK_RECURRING_ERRORS, MOCK_PROCESSING_TIME_DISTRIBUTION, MOCK_SYSTEM_CONFIG,
} from '@/muse/mocks/admin.mock';

const delay = <T,>(data: T, ms = 300) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(data), ms));

export const useOverviewStats = () =>
  useQuery<OverviewStat[]>({ queryKey: ['muse', 'admin', 'overview-stats'], queryFn: () => delay(MOCK_OVERVIEW_STATS) });

export const useRecentActivity = () =>
  useQuery<ActivityLogEntry[]>({ queryKey: ['muse', 'admin', 'recent-activity'], queryFn: () => delay(MOCK_RECENT_ACTIVITY) });

export const useTopUsers = () =>
  useQuery<TopUser[]>({ queryKey: ['muse', 'admin', 'top-users'], queryFn: () => delay(MOCK_TOP_USERS) });

export const useAdminUsersList = () =>
  useQuery<AdminUserRow[]>({ queryKey: ['muse', 'admin', 'users'], queryFn: () => delay(MOCK_ADMIN_USERS) });

export const usePromptLogs = () =>
  useQuery<PromptLogRow[]>({ queryKey: ['muse', 'admin', 'prompt-logs'], queryFn: () => delay(MOCK_PROMPT_LOGS) });

export const useUsageAnalyticsStats = () =>
  useQuery<UsageAnalyticsStat[]>({ queryKey: ['muse', 'admin', 'usage-analytics-stats'], queryFn: () => delay(MOCK_USAGE_ANALYTICS_STATS) });

export const useDailyPrompts = () =>
  useQuery<DailyPromptCount[]>({ queryKey: ['muse', 'admin', 'daily-prompts'], queryFn: () => delay(MOCK_DAILY_PROMPTS) });

export const usePromptsByEventType = () =>
  useQuery<EventTypePromptCount[]>({ queryKey: ['muse', 'admin', 'prompts-by-event-type'], queryFn: () => delay(MOCK_PROMPTS_BY_EVENT_TYPE) });

export const useModelUsage = () =>
  useQuery<ModelUsageStat[]>({ queryKey: ['muse', 'admin', 'model-usage'], queryFn: () => delay(MOCK_MODEL_USAGE) });

export const useSystemHealthStats = () =>
  useQuery<SystemHealthStat[]>({ queryKey: ['muse', 'admin', 'system-health-stats'], queryFn: () => delay(MOCK_SYSTEM_HEALTH_STATS) });

export const useRecurringErrors = () =>
  useQuery<RecurringErrorRow[]>({ queryKey: ['muse', 'admin', 'recurring-errors'], queryFn: () => delay(MOCK_RECURRING_ERRORS) });

export const useProcessingTimeDistribution = () =>
  useQuery<ProcessingTimeBucket[]>({ queryKey: ['muse', 'admin', 'processing-time-distribution'], queryFn: () => delay(MOCK_PROCESSING_TIME_DISTRIBUTION) });

export const useSystemConfig = () =>
  useQuery<SystemConfigItem[]>({ queryKey: ['muse', 'admin', 'system-config'], queryFn: () => delay(MOCK_SYSTEM_CONFIG) });