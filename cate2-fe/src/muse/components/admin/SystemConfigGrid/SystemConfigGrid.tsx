import type { SystemConfigItem } from '@/muse/types/admin.types';
import styles from './SystemConfigGrid.module.css';

interface SystemConfigGridProps {
  items: SystemConfigItem[];
}

export const SystemConfigGrid = ({ items }: SystemConfigGridProps) => (
  <div className={styles.card}>
    <div className={styles.header}>
      <span className={styles.title}>System Configuration</span>
    </div>
    <div className={styles.grid}>
      {items.map((item) => (
        <div key={item.label} className={styles.item}>
          <span className={styles.label}>{item.label}</span>
          <span className={styles.value}>{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);
