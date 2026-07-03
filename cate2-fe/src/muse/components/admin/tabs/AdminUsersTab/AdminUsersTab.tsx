import { Search, UserPlus } from 'lucide-react';
import { UsersTable } from '@/muse/components/admin/UsersTable/UsersTable';
import { useAdminUsersList } from '@/muse/hooks/admin/useAdminData';
import styles from './AdminUsersTab.module.css';

export const AdminUsersTab = () => {
  const { data: users = [] } = useAdminUsersList();

  return (
    <div className={styles.tab}>
      <div className={styles.actionsRow}>
        <div className={styles.searchBox}>
          <Search size={15} className={styles.searchIcon} aria-hidden="true" />
          <input type="search" placeholder="Search users..." className={styles.searchInput} />
        </div>
        <button type="button" className={styles.addBtn}>
          <UserPlus size={15} aria-hidden="true" />
          Add User
        </button>
      </div>

      <UsersTable users={users} />
    </div>
  );
};