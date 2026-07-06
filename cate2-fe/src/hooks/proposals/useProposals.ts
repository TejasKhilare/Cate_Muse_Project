import { useQuery } from '@tanstack/react-query';
import type { Proposal } from '@/types/proposal.types';
import { MOCK_PROPOSALS } from '@/mocks/proposals.mock';

export const useProposals = () =>
  useQuery<Proposal[]>({
    queryKey: ['muse', 'proposals'],
    queryFn:  async () =>
      new Promise((resolve) =>
        setTimeout(() => resolve(MOCK_PROPOSALS), 350),
      ),
    // TODO: replace with → apiClient.get<Proposal[]>('/muse/proposals')
  });