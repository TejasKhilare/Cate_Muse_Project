import { useState, useMemo } from 'react';
import type { EquipmentInput, EquipmentSummary } from '@/muse/types/equipment.types';
import { INITIAL_EQUIPMENT_INPUT } from '@/muse/types/equipment.types';
import { calculateEquipment } from '@/muse/utils/equipmentCalculations';

export const useEquipmentCalculator = () => {
  const [input, setInput] = useState<EquipmentInput>(INITIAL_EQUIPMENT_INPUT);

  const updateInput = (partial: Partial<EquipmentInput>) =>
    setInput((prev) => ({ ...prev, ...partial }));

  const summary: EquipmentSummary = useMemo(
    () => calculateEquipment(input),
    [input],
  );

  return { input, updateInput, summary };
};