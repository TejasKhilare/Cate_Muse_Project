// src/muse/hooks/new-proposal/useNewProposal.ts

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { message } from 'antd';
import type { NewProposalFormData } from '@/types/new-proposal.types';
import { INITIAL_FORM } from '@/types/new-proposal.types';
import { MUSE_ROUTES } from '@/constants/routes';

export const useNewProposal = () => {
  const navigate = useNavigate();

  const [form, setForm]               = useState<NewProposalFormData>(INITIAL_FORM);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSavingDraft, setSaving]    = useState(false);

  // Generic field updater — typed so TypeScript catches mismatches
  const updateField = <K extends keyof NewProposalFormData>(
    field: K,
    value: NewProposalFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValid =
    form.eventName.trim()  !== '' &&
    form.clientName.trim() !== '' &&
    form.guestCount.trim() !== '' &&
    form.eventDate         !== null;

  const handleCreate = async () => {
    if (!isValid) {
      message.warning('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    try {
      // TODO: replace with real API call
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));
      message.success('Proposal created successfully!');
      navigate(MUSE_ROUTES.PROPOSALS);
    } catch {
      message.error('Failed to create proposal. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      // TODO: replace with real API call
      await new Promise<void>((resolve) => setTimeout(resolve, 800));
      message.success('Draft saved.');
    } catch {
      message.error('Failed to save draft.');
    } finally {
      setSaving(false);
    }
  };

  return {
    form,
    updateField,
    isValid,
    isSubmitting,
    isSavingDraft,
    handleCreate,
    handleSaveDraft,
  };
};