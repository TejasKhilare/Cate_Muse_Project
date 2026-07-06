import { Users, FileText, Clock, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { AdminMetricCard }    from '@/components/admin/AdminMetricCard/AdminMetricCard';
import { RecentActivityList } from '@/components/admin/RecentActivityList/RecentActivityList';
import { TopUsersList }       from '@/components/admin/TopUsersList/TopUsersList';
import { useOverviewStats, useRecentActivity, useTopUsers } from '@/hooks/admin/useAdminData';
import type { OverviewStat } from '@/types/admin.types';
import styles from './AdminOverviewTab.module.css';
import type { JSX } from 'react';

const ICON_MAP: Record<OverviewStat['icon'], JSX.Element> = {
  users:    <Users size={16} color="#c9a84c" aria-hidden="true" />,
  prompts:  <FileText size={16} color="#3b82f6" aria-hidden="true" />,
  time:     <Clock size={16} color="#22c55e" aria-hidden="true" />,
  cost:     <DollarSign size={16} color="#c9a84c" aria-hidden="true" />,
  success:  <TrendingUp size={16} color="#6366f1" aria-hidden="true" />,
  sessions: <Activity size={16} color="#3b82f6" aria-hidden="true" />,
};

export const AdminOverviewTab = () => {
  const { data: stats   = [] } = useOverviewStats();
  const { data: activity = [] } = useRecentActivity();
  const { data: topUsers = [] } = useTopUsers();

  return (
    <div className={styles.tab}>
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <AdminMetricCard
            key={stat.id}
            icon={ICON_MAP[stat.icon]}
            label={stat.label}
            labelPosition="bottom"
            value={stat.value}
            subtext={stat.subtext}
          />
        ))}
      </div>

      <div className={styles.bottomRow}>
        <RecentActivityList entries={activity} />
        <TopUsersList users={topUsers} />
      </div>
    </div>
  );
};