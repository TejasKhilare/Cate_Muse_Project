import { Search, Filter } from 'lucide-react';
import { PromptLogsTable } from '@/components/admin/PromptLogsTable/PromptLogsTable';
import { usePromptLogs } from '@/hooks/admin/useAdminData';
import styles from './AdminPromptLogsTab.module.css';

export const AdminPromptLogsTab = () => {
  const { data: logs = [] } = usePromptLogs();

  return (
    <div className={styles.tab}>
      <div className={styles.actionsRow}>
        <div className={styles.searchBox}>
          <Search size={15} className={styles.searchIcon} aria-hidden="true" />
          <input type="search" placeholder="Search prompts..." className={styles.searchInput} />
        </div>
        <button type="button" className={styles.filterBtn}>
          <Filter size={15} aria-hidden="true" />
          Filter
        </button>
        <span className={styles.count}>Showing {logs.length} entries</span>
      </div>

      <PromptLogsTable logs={logs} />
    </div>
  );
};