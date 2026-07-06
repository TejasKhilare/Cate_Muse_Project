import { AlertTriangle } from 'lucide-react';
import type { RecurringErrorRow } from '@/types/admin.types';
import styles from './RecurringErrorsList.module.css';

interface RecurringErrorsListProps {
  errors: RecurringErrorRow[];
}

export const RecurringErrorsList = ({ errors }: RecurringErrorsListProps) => (
  <div className={styles.card}>
    <div className={styles.header}>
      <AlertTriangle size={16} color="#f59e0b" aria-hidden="true" />
      <span className={styles.title}>Recurring Errors</span>
    </div>
    <div className={styles.scrollWrapper}>
      <div className={styles.list}>
        {errors.map((err) => (
          <div key={err.id} className={styles.row}>
            <div className={styles.rowContent}>
              <span className={styles.name}>{err.name}</span>
              <span className={styles.meta}>Last seen: {err.lastSeen}</span>
            </div>
            <span className={styles.countBadge}>{err.count}×</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);