import type { ReactNode } from 'react';
import styles from './HorizontalBarCard.module.css';

interface HorizontalBarItem {
  label:      string;
  valueLabel: string;
  percentage: number;
  color?:     string;
}

interface HorizontalBarCardProps {
  title: string;
  icon?: ReactNode;
  items: HorizontalBarItem[];
}

export const HorizontalBarCard = ({ title, icon, items }: HorizontalBarCardProps) => (
  <div className={styles.card}>
    <div className={styles.header}>
      {icon && <span className={styles.headerIcon}>{icon}</span>}
      <span className={styles.title}>{title}</span>
    </div>
    <div className={styles.list}>
      {items.map((item) => (
        <div key={item.label} className={styles.row}>
          <span className={styles.label}>{item.label}</span>
          <div className={styles.track}>
            <div
              className={styles.bar}
              style={{ width: `${item.percentage}%`, backgroundColor: item.color ?? 'var(--muse-gold)' }}
            />
          </div>
          <span className={styles.value}>{item.valueLabel}</span>
        </div>
      ))}
    </div>
  </div>
);