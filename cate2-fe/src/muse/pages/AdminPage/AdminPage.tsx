import { useState } from 'react';
import { Shield, Download } from 'lucide-react';
import { MuseLayout } from '@/muse/components/layout/MuseLayout/MuseLayout';
import { AdminTabs } from '@/muse/components/admin/AdminTabs/AdminTabs';
import { AdminOverviewTab }        from '@/muse/components/admin/tabs/AdminOverviewTab/AdminOverviewTab';
import { AdminUsersTab }           from '@/muse/components/admin/tabs/AdminUsersTab/AdminUsersTab';
import { AdminPromptLogsTab }      from '@/muse/components/admin/tabs/AdminPromptLogsTab/AdminPromptLogsTab';
import { AdminUsageAnalyticsTab }  from '@/muse/components/admin/tabs/AdminUsageAnalyticsTab/AdminUsageAnalyticsTab';
import { AdminSystemHealthTab }    from '@/muse/components/admin/tabs/AdminSystemHealthTab/AdminSystemHealthTab';
import type { AdminTabKey } from '@/muse/types/admin.types';
import styles from './AdminPage.module.css';

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<AdminTabKey>('overview');

  return (
    <MuseLayout>
      <div className={styles.page}>

        <div className={styles.pageHeader}>
          <div className={styles.pageHeaderLeft}>
            <div className={styles.titleRow}>
              <Shield size={26} color="var(--muse-gold)" aria-hidden="true" />
              <h1 className={styles.pageTitle}>Admin Panel</h1>
            </div>
            <p className={styles.pageSubtitle}>
              Manage users, monitor usage, review prompt logs, and track system health.
            </p>
          </div>
          <button type="button" className={styles.exportBtn}>
            <Download size={15} aria-hidden="true" />
            Export Report
          </button>
        </div>

        <AdminTabs activeTab={activeTab} onChange={setActiveTab} />

        <div className={styles.tabContent}>
          {activeTab === 'overview'        && <AdminOverviewTab />}
          {activeTab === 'users'           && <AdminUsersTab />}
          {activeTab === 'prompt-logs'     && <AdminPromptLogsTab />}
          {activeTab === 'usage-analytics' && <AdminUsageAnalyticsTab />}
          {activeTab === 'system-health'   && <AdminSystemHealthTab />}
        </div>

      </div>
    </MuseLayout>
  );
};