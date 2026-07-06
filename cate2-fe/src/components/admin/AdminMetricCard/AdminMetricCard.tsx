import type { ReactNode } from 'react';
import styles from './AdminMetricCard.module.css';

interface AdminMetricCardProps {
  icon?:         ReactNode;
  dotColor?:     string;
  label:         string;
  labelPosition: 'top' | 'bottom';
  value:         string;
  subtext?:      string;
}

export const AdminMetricCard = ({ icon, dotColor, label, labelPosition, value, subtext }: AdminMetricCardProps) => (
  <div className={styles.card}>
    {labelPosition === 'top' && <span className={styles.labelTop}>{label}</span>}

    {(icon || dotColor) && (
      <div className={styles.indicatorRow}>
        {icon && <span className={styles.iconWrap}>{icon}</span>}
        {dotColor && <span className={styles.dot} style={{ backgroundColor: dotColor }} />}
      </div>
    )}

    <div className={styles.value}>{value}</div>

    {subtext && <div className={styles.subtext}>{subtext}</div>}

    {labelPosition === 'bottom' && <span className={styles.labelBottom}>{label}</span>}
  </div>
);