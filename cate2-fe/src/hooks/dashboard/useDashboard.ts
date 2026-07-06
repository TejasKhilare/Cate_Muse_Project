import { useQuery } from '@tanstack/react-query';
import type { DashboardKpiStat, UpcomingEvent } from '@/types/dashboard.types';
import type { Proposal } from '@/types/proposal.types';
import {
  MOCK_KPI_STATS,
  MOCK_UPCOMING_EVENTS,
  MOCK_PIPELINE_PROPOSALS,
} from '@/mocks/dashboard.mock';

export const useDashboardStats = () =>
  useQuery<DashboardKpiStat[]>({
    queryKey: ['muse', 'dashboard', 'stats'],
    queryFn:  async () =>
      new Promise((resolve) => setTimeout(() => resolve(MOCK_KPI_STATS), 300)),
    // TODO: replace with → apiClient.get<DashboardKpiStat[]>('/muse/dashboard/stats')
  });

export const useUpcomingEvents = () =>
  useQuery<UpcomingEvent[]>({
    queryKey: ['muse', 'dashboard', 'upcoming-events'],
    queryFn:  async () =>
      new Promise((resolve) => setTimeout(() => resolve(MOCK_UPCOMING_EVENTS), 300)),
    // TODO: replace with → apiClient.get<UpcomingEvent[]>('/muse/events/upcoming')
  });

export const usePipelineProposals = () =>
  useQuery<Proposal[]>({
    queryKey: ['muse', 'dashboard', 'pipeline'],
    queryFn:  async () =>
      new Promise((resolve) => setTimeout(() => resolve(MOCK_PIPELINE_PROPOSALS), 300)),
    // TODO: replace with → apiClient.get<Proposal[]>('/muse/proposals?limit=10')
  });