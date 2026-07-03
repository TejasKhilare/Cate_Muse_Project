import type { TopUser } from '@/muse/types/admin.types';
import styles from './TopUsersList.module.css';

const getInitials = (name: string) =>
  name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

interface TopUsersListProps {
  users: TopUser[];
}

export const TopUsersList = ({ users }: TopUsersListProps) => (
  <div className={styles.card}>
    <div className={styles.header}>
      <span className={styles.title}>Top Users (by prompts)</span>
    </div>
    <div className={styles.scrollWrapper}>
      <div className={styles.list}>
        {users.map((user) => (
          <div key={user.id} className={styles.row}>
            <span className={styles.rank}>{user.rank}.</span>
            <div className={styles.avatar}>{getInitials(user.name)}</div>
            <div className={styles.rowContent}>
              <span className={styles.name}>{user.name}</span>
              <span className={styles.meta}>{user.role} · {user.lastActive}</span>
            </div>
            <span className={styles.count}>{user.promptCount}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);