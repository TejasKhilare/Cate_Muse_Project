import { MoreHorizontal } from 'lucide-react';
import type { AdminUserRow } from '@/muse/types/admin.types';
import styles from './UsersTable.module.css';

const ROLE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  Admin:       { bg: '#fdf8ec', text: '#a88735', border: '#e8d49a' },
  Designer:    { bg: '#eef4ff', text: '#3b6fd6', border: '#c7d9fb' },
  Manager:     { bg: '#f5f4f0', text: '#6b7280', border: '#e0ded6' },
  Coordinator: { bg: '#f5f4f0', text: '#6b7280', border: '#e0ded6' },
};

const getRoleStyle = (role: string) => ROLE_STYLES[role] ?? ROLE_STYLES.Manager;

const getInitials = (name: string) =>
  name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

interface UsersTableProps {
  users: AdminUserRow[];
}

export const UsersTable = ({ users }: UsersTableProps) => (
  <div className={styles.wrapper}>
    <div className={styles.scrollWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={`${styles.th} ${styles.userCol}`}>User</th>
            <th className={styles.th}>Role</th>
            <th className={styles.th}>Status</th>
            <th className={`${styles.th} ${styles.right}`}>Prompts</th>
            <th className={styles.th}>Last Active</th>
            <th className={`${styles.th} ${styles.right}`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const roleStyle = getRoleStyle(u.role);
            return (
              <tr key={u.id} className={styles.row}>
                <td className={styles.td}>
                  <div className={styles.userCell}>
                    <div className={styles.avatar}>{getInitials(u.name)}</div>
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>{u.name}</span>
                      <span className={styles.userEmail}>{u.email}</span>
                    </div>
                  </div>
                </td>
                <td className={styles.td}>
                  <span
                    className={styles.roleBadge}
                    style={{ backgroundColor: roleStyle.bg, color: roleStyle.text, borderColor: roleStyle.border }}
                  >
                    {u.role}
                  </span>
                </td>
                <td className={styles.td}>
                  <span className={styles.statusCell}>
                    <span
                      className={styles.statusDot}
                      style={{ backgroundColor: u.status === 'Active' ? '#22c55e' : '#9ca3af' }}
                    />
                    {u.status}
                  </span>
                </td>
                <td className={`${styles.td} ${styles.right}`}>{u.prompts}</td>
                <td className={styles.td}>{u.lastActive}</td>
                <td className={`${styles.td} ${styles.right}`}>
                  <button type="button" className={styles.actionsBtn} aria-label="More actions">
                    <MoreHorizontal size={16} aria-hidden="true" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);