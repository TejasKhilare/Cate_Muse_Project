import type { ModelUsageStat } from '@/types/admin.types';
import styles from './ModelUsageCards.module.css';

interface ModelUsageCardsProps {
  models: ModelUsageStat[];
}

export const ModelUsageCards = ({ models }: ModelUsageCardsProps) => (
  <div className={styles.grid}>
    {models.map((m) => (
      <div key={m.model} className={styles.modelCard}>
        <span className={styles.modelName}>{m.model}</span>
        <span className={styles.modelPercent}>{m.percentage}%</span>
        <span className={styles.modelDesc}>{m.description}</span>
      </div>
    ))}
  </div>
);