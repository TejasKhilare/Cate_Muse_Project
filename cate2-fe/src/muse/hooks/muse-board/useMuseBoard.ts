// src/muse/hooks/muse-board/useMuseBoard.ts

import { useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router';
import type { MuseBoardFormData, VibeTag } from '@/muse/types/museBoard.types';
import { INITIAL_MUSE_BOARD_FORM, APPROVED_VENDORS } from '@/muse/types/museBoard.types';

export const useMuseBoard = () => {
  const navigate = useNavigate();

  const [form, setForm]               = useState<MuseBoardFormData>(INITIAL_MUSE_BOARD_FORM);
  const [isGenerating, setGenerating] = useState(false);

  const updateField = <K extends keyof MuseBoardFormData>(
    field: K,
    value: MuseBoardFormData[K],
  ) => setForm((prev: MuseBoardFormData) => ({ ...prev, [field]: value }));

  // ── Color palette ──────────────────────────────────────────
  const updateColor = (index: number, hex: string) => {
    const updated = [...form.colorPalette];
    updated[index] = hex;
    updateField('colorPalette', updated);
  };

  const addColor = () => {
    if (form.colorPalette.length >= 6) return;
    updateField('colorPalette', [...form.colorPalette, '#C9A84C']);
  };

  const removeColor = (index: number) => {
    if (form.colorPalette.length <= 1) return;
    const updated = form.colorPalette.filter((_c: string, i: number) => i !== index);
    updateField('colorPalette', updated);
  };

  // ── Vibe tags ──────────────────────────────────────────────
  const toggleVibeTag = (tag: VibeTag) => {
    const current = form.vibeTags;
    const next = current.includes(tag)
      ? current.filter((t: VibeTag) => t !== tag)
      : [...current, tag];
    updateField('vibeTags', next);
  };

  // ── Vendors ────────────────────────────────────────────────
  const toggleVendor = (vendor: string) => {
    const current = form.approvedVendors;
    const next = current.includes(vendor)
      ? current.filter((v: string) => v !== vendor)
      : [...current, vendor];
    updateField('approvedVendors', next);
  };

  const selectAllVendors = () => {
    updateField('approvedVendors', [...APPROVED_VENDORS]);
  };

  const deselectAllVendors = () => {
    updateField('approvedVendors', []);
  };

  const areAllVendorsSelected =
    form.approvedVendors.length === APPROVED_VENDORS.length;

  // ── Submit ─────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!form.eventName.trim()) {
      message.warning('Please enter an event name.');
      return;
    }
    if (!form.themeDirection.trim()) {
      message.warning('Please describe the theme/design direction.');
      return;
    }
    setGenerating(true);
    try {
      // TODO: replace with real API call — navigate to returned board id
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
      message.success('MUSE Board generated successfully!');
      navigate('/muse/board/mb-001');
    } catch {
      message.error('Failed to generate MUSE Board. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  return {
    form,
    updateField,
    updateColor,
    addColor,
    removeColor,
    toggleVibeTag,
    toggleVendor,
    selectAllVendors,
    deselectAllVendors,
    areAllVendorsSelected,
    isGenerating,
    handleGenerate,
  };
};