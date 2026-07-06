import { CheckCircle, Send, Clock, PenLine } from 'lucide-react';
import type { ProposalStatus } from '@/constants/statuses';
import { PROPOSAL_STATUS_CONFIG } from '@/constants/statuses';
import styles from './ProposalStatusTag.module.css';

const ICON_MAP: Record<ProposalStatus, React.ReactNode> = {
  won:       <CheckCircle size={13} />,
  sent:      <Send        size={13} />,
  in_review: <Clock       size={13} />,
  draft:     <PenLine     size={13} />,
};

interface ProposalStatusTagProps {
  status: ProposalStatus;
}

export const ProposalStatusTag = ({ status }: ProposalStatusTagProps) => {
  const config = PROPOSAL_STATUS_CONFIG[status];

  return (
    <span
      className={styles.tag}
      style={{
        color:           config.textColor,
        backgroundColor: config.bgColor,
      }}
    >
      <span className={styles.icon}>{ICON_MAP[status]}</span>
      {config.label}
    </span>
  );
};