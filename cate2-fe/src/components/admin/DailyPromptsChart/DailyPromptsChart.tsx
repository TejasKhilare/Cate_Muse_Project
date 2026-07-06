import type { DailyPromptCount } from '@/types/admin.types';
import styles from './DailyPromptsChart.module.css';

interface DailyPromptsChartProps {
  data: DailyPromptCount[];
}

export const DailyPromptsChart = ({ data }: DailyPromptsChartProps) => {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>Daily Prompts (This Week)</span>
      </div>
      <div className={styles.scrollWrapper}>
        <div className={styles.chart}>
          {data.map((d) => (
            <div key={d.day} className={styles.barCol}>
              <span className={styles.barValue}>{d.count}</span>
              <div className={styles.barTrack}>
                <div className={styles.bar} style={{ height: `${(d.count / max) * 100}%` }} />
              </div>
              <span className={styles.barLabel}>{d.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};