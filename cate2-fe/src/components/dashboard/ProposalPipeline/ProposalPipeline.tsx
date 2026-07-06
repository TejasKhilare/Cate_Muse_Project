// src/muse/components/dashboard/ProposalPipeline/ProposalPipeline.tsx

import { usePipelineProposals } from '@/hooks/dashboard/useDashboard';
import { PIPELINE_COLUMNS } from '@/constants/statuses';
import type { Proposal } from '@/types/proposal.types';
import styles from './ProposalPipeline.module.css';

const STATUS_DOT: Record<string, string> = {
  draft:     '#94a3b8',
  in_review: '#94a3b8',
  sent:      '#6366f1',
  won:       '#22c55e',
};

export const ProposalPipeline = () => {
  const { data: proposals = [] } = usePipelineProposals();

  const grouped = PIPELINE_COLUMNS.reduce<Record<string, Proposal[]>>(
    (acc, col) => {
      acc[col.status] = proposals.filter((p) => p.status === col.status);
      return acc;
    },
    {} as Record<string, Proposal[]>,
  );

  return (
    <div className={styles.wrapper}>
      {/*
        scrollWrapper — on mobile this becomes overflow-x: auto.
        Headers and columns sit inside so they scroll together.
      */}
      <div className={styles.scrollWrapper}>

        {/* Column headers */}
        <div className={styles.headers}>
          {PIPELINE_COLUMNS.map((col) => (
            <div key={col.status} className={styles.colHeader}>
              <span
                className={styles.dot}
                style={{ background: STATUS_DOT[col.status] }}
              />
              <span className={styles.colLabel}>{col.label}</span>
              <span className={styles.colCount}>
                {grouped[col.status]?.length ?? 0}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        {/* Proposal columns */}
        <div className={styles.columns}>
          {PIPELINE_COLUMNS.map((col) => (
            <div key={col.status} className={styles.col}>
              {grouped[col.status]?.map((p) => (
                <div key={p.id} className={styles.proposalChip}>
                  {p.name}
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};