import { formatCurrency } from '@/muse/utils/formatters';
import type { StaffSummary } from '@/muse/types/staff.types';
import styles from './StaffSummaryBar.module.css';

interface StaffSummaryBarProps {
  summary: StaffSummary;
}

export const StaffSummaryBar = ({ summary }: StaffSummaryBarProps) => (
  <div className={styles.bar}>
    <div className={styles.metric}>
      <span className={styles.label}>TOTAL STAFF</span>
      <span className={styles.value}>{summary.totalStaff}</span>
    </div>
    <div className={styles.divider} />
    <div className={styles.metric}>
      <span className={styles.label}>CLIENT CHARGE</span>
      <span className={styles.value}>{formatCurrency(summary.clientCharge)}</span>
    </div>
    <div className={styles.divider} />
    <div className={styles.metric}>
      <span className={styles.label}>HIRE COST</span>
      <span className={styles.value}>{formatCurrency(summary.hireCost)}</span>
    </div>
    <div className={styles.divider} />
    <div className={styles.metric}>
      <span className={styles.label}>GROSS MARGIN</span>
      <span className={styles.value}>{formatCurrency(summary.grossMargin)}</span>
    </div>
    <div className={styles.divider} />
    <div className={styles.metric}>
      <span className={styles.label}>MARGIN %</span>
      <span className={`${styles.value} ${styles.marginPct}`}>
        {summary.marginPercent.toFixed(1)}%
      </span>
    </div>
  </div>
);