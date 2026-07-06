import { Clock } from 'lucide-react';
import { AdminMetricCard }      from '@/components/admin/AdminMetricCard/AdminMetricCard';
import { RecurringErrorsList }  from '@/components/admin/RecurringErrorsList/RecurringErrorsList';
import { HorizontalBarCard }    from '@/components/admin/HorizontalBarCard/HorizontalBarCard';
import { SystemConfigGrid }     from '@/components/admin/SystemConfigGrid/SystemConfigGrid';
import {
  useSystemHealthStats,
  useRecurringErrors,
  useProcessingTimeDistribution,
  useSystemConfig,
} from '@/hooks/admin/useAdminData';
import styles from './AdminSystemHealthTab.module.css';

export const AdminSystemHealthTab = () => {
  const { data: stats   = [] } = useSystemHealthStats();
  const { data: errors  = [] } = useRecurringErrors();
  const { data: buckets = [] } = useProcessingTimeDistribution();
  const { data: config  = [] } = useSystemConfig();

  return (
    <div className={styles.tab}>
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <AdminMetricCard
            key={stat.id}
            dotColor={stat.dotColor}
            label={stat.label}
            labelPosition="bottom"
            value={stat.value}
          />
        ))}
      </div>

      <div className={styles.chartsRow}>
        <RecurringErrorsList errors={errors} />
        <HorizontalBarCard
          title="Processing Time Distribution"
          icon={<Clock size={16} color="#3b82f6" aria-hidden="true" />}
          items={buckets.map((b) => ({
            label:      b.label,
            valueLabel: `${b.percentage}%`,
            percentage: b.percentage,
            color:      b.color,
          }))}
        />
      </div>

      <SystemConfigGrid items={config} />
    </div>
  );
};