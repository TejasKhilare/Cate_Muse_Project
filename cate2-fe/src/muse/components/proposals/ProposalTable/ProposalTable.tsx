import { useNavigate } from 'react-router';
import { ProposalStatusTag } from '../ProposalStatusTag/ProposalStatusTag';
import { formatCurrency, formatEventDate, formatGuestCount } from '@/muse/utils/formatters';
import type { Proposal } from '@/muse/types/proposal.types';
import styles from './ProposalTable.module.css';

interface ProposalTableProps {
  proposals: Proposal[];
}

export const ProposalTable = ({ proposals }: ProposalTableProps) => {
  const navigate = useNavigate();

  if (proposals.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>No proposals found.</p>
      </div>
    );
  }

  return (
    /* Scroll wrapper handles overflow on mobile */
    <div className={styles.scrollWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Proposal</th>
            <th className={styles.th}>Client</th>
            <th className={`${styles.th} ${styles.right}`}>Guests</th>
            <th className={styles.th}>Event Date</th>
            <th className={styles.th}>Status</th>
            <th className={`${styles.th} ${styles.right}`}>Value</th>
            <th className={`${styles.th} ${styles.right}`}>Updated</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal, index) => (
            <tr
              key={proposal.id}
              className={styles.row}
              onClick={() => navigate(`/muse/proposals/${proposal.id}`)}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <td className={styles.td}>
                <span className={styles.proposalName}>{proposal.name}</span>
              </td>
              <td className={styles.td}>
                <span className={styles.clientName}>{proposal.client}</span>
              </td>
              <td className={`${styles.td} ${styles.right}`}>
                <span className={styles.guests}>
                  {formatGuestCount(proposal.guests)}
                </span>
              </td>
              <td className={styles.td}>
                <span className={styles.date}>
                  {formatEventDate(proposal.eventDate)}
                </span>
              </td>
              <td className={styles.td}>
                <ProposalStatusTag status={proposal.status} />
              </td>
              <td className={`${styles.td} ${styles.right}`}>
                <span className={styles.value}>
                  {formatCurrency(proposal.value)}
                </span>
              </td>
              <td className={`${styles.td} ${styles.right}`}>
                <span className={styles.updatedAt}>{proposal.updatedAt}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};