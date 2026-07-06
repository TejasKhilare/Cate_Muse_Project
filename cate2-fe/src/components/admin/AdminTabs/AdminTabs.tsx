import classNames from 'classnames';
import { ADMIN_TABS } from '@/types/admin.types';
import type { AdminTabKey } from '@/types/admin.types';
import styles from './AdminTabs.module.css';

interface AdminTabsProps {
  activeTab: AdminTabKey;
  onChange:  (tab: AdminTabKey) => void;
}

export const AdminTabs = ({ activeTab, onChange }: AdminTabsProps) => (
  <div className={styles.tabsWrapper}>
    <div className={styles.tabsScroll}>
      {ADMIN_TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={classNames(styles.tab, { [styles.tabActive]: activeTab === tab.key })}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  </div>
);