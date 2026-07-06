// src/muse/pages/NewProposalPage/NewProposalPage.tsx

import { FileText, Sparkles } from 'lucide-react';
import { MuseLayout }     from '@/components/layout/MuseLayout/MuseLayout';
import { EventBriefForm } from '@/components/new-proposal/EventBriefForm/EventBriefForm';
import { useNewProposal } from '@/hooks/new-proposal/useNewProposal';
import styles from './NewProposalPage.module.css';

export const NewProposalPage = () => {
  const {
    form,
    updateField,
    isSubmitting,
    isSavingDraft,
    handleCreate,
    handleSaveDraft,
  } = useNewProposal();

  return (
    <MuseLayout>
      <div className={styles.page}>

        {/* ── Page header ── */}
        <div className={styles.pageHeader}>
          <div className={styles.titleRow}>
            <FileText
              size={28}
              color="var(--muse-gold)"
              aria-hidden="true"
            />
            <h1 className={styles.pageTitle}>New Proposal</h1>
          </div>
          <p className={styles.pageSubtitle}>
            Create a new event proposal. CATE will use this brief to
            auto-populate staff, equipment, and MUSE boards.
          </p>
        </div>

        {/* ── Form card ── */}
        <EventBriefForm
          form={form}
          updateField={updateField}
        />

        {/* ── Action buttons — outside the card, below it ── */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.createBtn}
            onClick={handleCreate}
            disabled={isSubmitting}
          >
            <Sparkles size={16} aria-hidden="true" />
            {isSubmitting ? 'Creating…' : 'Create & Generate'}
          </button>

          <button
            type="button"
            className={styles.draftBtn}
            onClick={handleSaveDraft}
            disabled={isSavingDraft}
          >
            {isSavingDraft ? 'Saving…' : 'Save Draft'}
          </button>
        </div>

        {/* ── How it works info ── */}
        <div className={styles.howItWorks}>
          <strong>How it works:</strong>
          {' '}Once you create a proposal, CATE will automatically generate
          a staff plan (Staff Calculator), equipment order (Equipment
          Calculator), and design direction (MUSE Board) based on this
          event brief. You can then review, adjust, and export each
          module individually.
        </div>

      </div>
    </MuseLayout>
  );
};