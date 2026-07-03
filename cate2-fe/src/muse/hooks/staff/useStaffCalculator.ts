import { useState, useMemo } from 'react';
import type {
  StaffInput, StaffSummary, CalculatorMode, EventBriefOption,
} from '@/muse/types/staff.types';
import { INITIAL_STAFF_INPUT } from '@/muse/types/staff.types';
import { calculateStaffRoles } from '@/muse/utils/staffCalculations';
import { MOCK_EVENT_BRIEFS } from '@/muse/mocks/staffCalculator.mock';

export const useStaffCalculator = () => {
  const [mode, setMode]               = useState<CalculatorMode>('Standalone');
  const [input, setInput]             = useState<StaffInput>(INITIAL_STAFF_INPUT);
  const [selectedBrief, setSelectedBrief] = useState<EventBriefOption | null>(null);
  const [showBriefModal, setShowBriefModal] = useState(false);

  const updateInput = (partial: Partial<StaffInput>) =>
    setInput((prev) => ({ ...prev, ...partial }));

  const handleModeChange = (newMode: CalculatorMode) => {
    setMode(newMode);
    if (newMode === 'Pull from Event Brief') {
      setShowBriefModal(true);
    } else {
      setSelectedBrief(null);
      setInput(INITIAL_STAFF_INPUT);
    }
  };

  const handleSelectBrief = (brief: EventBriefOption) => {
    setSelectedBrief(brief);
    setShowBriefModal(false);
    // Auto-populate form from event brief
    setInput((prev) => ({
      ...prev,
      guestCount:         String(brief.guests),
      serviceStyle:       brief.serviceStyle,
      eventDurationHours: String(brief.durationHours),
      numberOfBars:       String(brief.numberOfBars),
      barType:            brief.barType,
    }));
  };

  const handleChangeBrief = () => setShowBriefModal(true);

  const summary: StaffSummary = useMemo(
    () => calculateStaffRoles(input),
    [input],
  );

  return {
    mode,
    input,
    updateInput,
    selectedBrief,
    showBriefModal,
    setShowBriefModal,
    handleModeChange,
    handleSelectBrief,
    handleChangeBrief,
    summary,
    eventBriefs: MOCK_EVENT_BRIEFS,
  };
};