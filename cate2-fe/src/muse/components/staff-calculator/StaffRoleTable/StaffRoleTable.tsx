import { FileText } from 'lucide-react';
import { formatCurrency } from '@/muse/utils/formatters';
import type { StaffSummary } from '@/muse/types/staff.types';
import styles from './StaffRoleTable.module.css';

interface StaffRoleTableProps {
  summary: StaffSummary;
}

export const StaffRoleTable = ({ summary }: StaffRoleTableProps) => (
  <div className={styles.wrapper}>
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <FileText size={16} color="var(--muse-gold)" aria-hidden="true" />
        <span className={styles.title}>Calculated Staffing List</span>
      </div>
      <span className={styles.activeRoles}>{summary.activeRoles} active roles</span>
    </div>

    <div className={styles.scrollWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={`${styles.th} ${styles.roleCol}`}>Role</th>
            <th className={`${styles.th} ${styles.numCol}`}>Count</th>
            <th className={`${styles.th} ${styles.numCol}`}>Hours</th>
            <th className={`${styles.th} ${styles.numCol}`}>Rate $/hr</th>
            <th className={`${styles.th} ${styles.numCol}`}>Client Charge</th>
            <th className={`${styles.th} ${styles.numCol}`}>Hire Cost</th>
            <th className={`${styles.th} ${styles.numCol}`}>Margin</th>
          </tr>
        </thead>
        <tbody>
          {summary.roles.map((role, i) => (
            <tr key={i} className={styles.row}>
              <td className={styles.td}>
                <span className={styles.roleName}>{role.role}</span>
                <span className={styles.roleRationale}>{role.rationale}</span>
              </td>
              <td className={`${styles.td} ${styles.num}`}>{role.count}</td>
              <td className={`${styles.td} ${styles.num}`}>{role.hours}</td>
              <td className={`${styles.td} ${styles.num}`}>${role.ratePerHour.toFixed(2)}</td>
              <td className={`${styles.td} ${styles.num}`}>{formatCurrency(role.clientCharge)}</td>
              <td className={`${styles.td} ${styles.num}`}>{formatCurrency(role.hireCost)}</td>
              <td className={`${styles.td} ${styles.num} ${styles.margin}`}>
                {formatCurrency(role.margin)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);