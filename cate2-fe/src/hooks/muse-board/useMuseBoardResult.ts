// src/muse/hooks/muse-board/useMuseBoardResult.ts

import { useQuery } from '@tanstack/react-query';
import type { MuseBoardResult } from '@/types/museBoard.types';
import { MOCK_MUSE_BOARD_RESULT } from '@/mocks/museBoardResult.mock';

export const useMuseBoardResult = (id: string) =>
  useQuery<MuseBoardResult>({
    queryKey: ['muse', 'board-result', id],
    queryFn:  () =>
      new Promise<MuseBoardResult>((resolve) =>
        setTimeout(() => resolve(MOCK_MUSE_BOARD_RESULT), 400),
      ),
    // TODO: replace with → apiClient.get<MuseBoardResult>(`/muse/boards/${id}`)
  });