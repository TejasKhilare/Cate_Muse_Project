import { useState, useMemo } from 'react';
import type { Proposal } from '@/types/proposal.types';
import type { ProposalStatus } from '@/constants/statuses';

export const useProposalFilters = (proposals: Proposal[] = []) => {
  const [search,       setSearch]  = useState('');
  const [statusFilter, setStatus]  = useState<ProposalStatus | 'all'>('all');

  const filtered = useMemo(() => {
    return proposals.filter((p) => {
      const matchesSearch =
        search === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.client.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || p.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [proposals, search, statusFilter]);

  return { filtered, search, setSearch, statusFilter, setStatus };
};