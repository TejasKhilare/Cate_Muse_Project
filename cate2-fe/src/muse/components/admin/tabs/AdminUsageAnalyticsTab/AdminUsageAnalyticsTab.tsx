import { AdminMetricCard }    from '@/muse/components/admin/AdminMetricCard/AdminMetricCard';
import { DailyPromptsChart }  from '@/muse/components/admin/DailyPromptsChart/DailyPromptsChart';
import { HorizontalBarCard }  from '@/muse/components/admin/HorizontalBarCard/HorizontalBarCard';
import { ModelUsageCards }    from '@/muse/components/admin/ModelUsageCards/ModelUsageCards';
import {
  useUsageAnalyticsStats,
  useDailyPrompts,
  usePromptsByEventType,
  useModelUsage,
} from '@/muse/hooks/admin/useAdminData';
import styles from './AdminUsageAnalyticsTab.module.css';

export const AdminUsageAnalyticsTab = () => {
  const { data: stats      = [] } = useUsageAnalyticsStats();
  const { data: daily      = [] } = useDailyPrompts();
  const { data: eventTypes = [] } = usePromptsByEventType();
  const { data: models     = [] } = useModelUsage();

  const maxEventCount = Math.max(...eventTypes.map((e) => e.count), 1);

  return (
    <div className={styles.tab}>
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <AdminMetricCard
            key={stat.id}
            label={stat.label}
            labelPosition="top"
            value={stat.value}
            subtext={stat.subtext}
          />
        ))}
      </div>

      <div className={styles.chartsRow}>
        <DailyPromptsChart data={daily} />
        <HorizontalBarCard
          title="Prompts by Event Type"
          items={eventTypes.map((e) => ({
            label:      e.label,
            valueLabel: String(e.count),
            percentage: (e.count / maxEventCount) * 100,
          }))}
        />
      </div>

      <div className={styles.modelSection}>
        <span className={styles.sectionTitle}>Model Usage</span>
        <ModelUsageCards models={models} />
      </div>
    </div>
  );
};