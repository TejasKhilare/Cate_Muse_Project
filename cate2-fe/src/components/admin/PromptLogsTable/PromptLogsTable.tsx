import { useState, Fragment } from 'react';
import { ChevronRight, ChevronDown, CheckCircle, XCircle } from 'lucide-react';
import type { PromptLogRow } from '@/types/admin.types';
import styles from './PromptLogsTable.module.css';

interface PromptLogsTableProps {
  logs: PromptLogRow[];
}

export const PromptLogsTable = ({ logs }: PromptLogsTableProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={`${styles.th} ${styles.chevronCol}`} />
              <th className={styles.th}>ID</th>
              <th className={styles.th}>User</th>
              <th className={styles.th}>Time</th>
              <th className={`${styles.th} ${styles.promptCol}`}>Prompt</th>
              <th className={`${styles.th} ${styles.right}`}>Tokens</th>
              <th className={`${styles.th} ${styles.right}`}>Cost</th>
              <th className={`${styles.th} ${styles.right}`}>Time</th>
              <th className={styles.th}>Model</th>
              <th className={`${styles.th} ${styles.center}`}>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => {
              const isExpanded = expandedId === log.id;
              return (
                <Fragment key={log.id}>
                  <tr className={styles.row}>
                    <td className={styles.td}>
                      <button
                        type="button"
                        className={styles.chevronBtn}
                        onClick={() => setExpandedId(isExpanded ? null : log.id)}
                        aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                      >
                        {isExpanded ? <ChevronDown size={14} aria-hidden="true" /> : <ChevronRight size={14} aria-hidden="true" />}
                      </button>
                    </td>
                    <td className={`${styles.td} ${styles.idCell}`}>{log.id}</td>
                    <td className={styles.td}>{log.user}</td>
                    <td className={styles.td}>{log.time}</td>
                    <td className={`${styles.td} ${styles.promptCell}`}>{log.prompt}</td>
                    <td className={`${styles.td} ${styles.right}`}>{log.tokens.toLocaleString()}</td>
                    <td className={`${styles.td} ${styles.right}`}>${log.cost.toFixed(2)}</td>
                    <td className={`${styles.td} ${styles.right}`}>{log.duration}</td>
                    <td className={styles.td}><span className={styles.modelBadge}>{log.model}</span></td>
                    <td className={`${styles.td} ${styles.center}`}>
                      {log.status === 'success'
                        ? <CheckCircle size={16} color="#22c55e" aria-label="Success" />
                        : <XCircle size={16} color="#ef4444" aria-label="Error" />}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className={styles.expandedRow}>
                      <td colSpan={10} className={styles.expandedCell}>
                        <span className={styles.expandedLabel}>Full prompt:</span> {log.prompt}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};