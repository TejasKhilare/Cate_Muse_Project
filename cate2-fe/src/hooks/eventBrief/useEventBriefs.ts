// src/muse/hooks/eventBrief/useEventBriefs.ts

import { useQuery } from '@tanstack/react-query';
import type { EventBrief } from '@/types/eventBrief.types';
import { MOCK_EVENT_BRIEFS } from '@/mocks/eventBriefs.mock';

export const useEventBriefs = () =>
  useQuery<EventBrief[]>({
    queryKey: ['muse', 'event-briefs'],
    queryFn:  async () =>
      new Promise((resolve) => setTimeout(() => resolve(MOCK_EVENT_BRIEFS), 300)),
    // TODO: replace with → apiClient.get<EventBrief[]>('/muse/event-briefs')
  });