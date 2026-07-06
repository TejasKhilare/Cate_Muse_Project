import type { ActivityLogEntry } from '@/types/admin.types';
import styles from './RecentActivityList.module.css';

interface RecentActivityListProps {
  entries: ActivityLogEntry[];
}

export const RecentActivityList = ({ entries }: RecentActivityListProps) => (
  <div className={styles.card}>
    <div className={styles.header}>
      <span className={styles.title}>Recent Activity</span>
    </div>
    <div className={styles.scrollWrapper}>
      <div className={styles.list}>
        {entries.map((entry) => (
          <div key={entry.id} className={styles.row}>
            <span
              className={styles.statusDot}
              style={{ backgroundColor: entry.status === 'success' ? '#22c55e' : '#ef4444' }}
            />
            <div className={styles.rowContent}>
              <span className={styles.description}>{entry.description}</span>
              <span className={styles.meta}>{entry.userName} · {entry.timestamp}</span>
            </div>
            <span className={styles.duration}>{entry.duration}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);