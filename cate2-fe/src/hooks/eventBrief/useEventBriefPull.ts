// src/muse/hooks/eventBrief/useEventBriefPull.ts

import { useCallback, useState } from 'react';
import type { CalculatorMode, EventBrief } from '@/types/eventBrief.types';

interface UseEventBriefPullOptions {
  onApply: (brief: EventBrief) => void;
}

export const useEventBriefPull = ({ onApply }: UseEventBriefPullOptions) => {
  const [mode, setModeState]        = useState<CalculatorMode>('Standalone');
  const [selectedBrief, setBrief]   = useState<EventBrief | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const setMode = useCallback((next: CalculatorMode) => {
    setModeState(next);
    // Switching into pull mode with nothing chosen yet → prompt immediately
    if (next === 'Pull from Event Brief' && !selectedBrief) {
      setModalOpen(true);
    }
  }, [selectedBrief]);

  const openModal = useCallback(() => setModalOpen(true), []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    // Cancelling the very first pick reverts the dropdown back to Standalone
    setModeState((current) =>
      current === 'Pull from Event Brief' && !selectedBrief ? 'Standalone' : current,
    );
  }, [selectedBrief]);

  const selectBrief = useCallback((brief: EventBrief) => {
    setBrief(brief);
    setModeState('Pull from Event Brief');
    setModalOpen(false);
    onApply(brief);
  }, [onApply]);

  return { mode, setMode, selectedBrief, isModalOpen, openModal, closeModal, selectBrief };
};