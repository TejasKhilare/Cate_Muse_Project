// src/muse/components/shared/EventBriefStatusTag/EventBriefStatusTag.tsx

import type { EventBriefStatus } from '@/types/eventBrief.types';
import styles from './EventBriefStatusTag.module.css';

type StatusConfig = { label: string; textColor: string; bgColor: string };

type StatusConfigMap = Record<EventBriefStatus, StatusConfig>;

const STATUS_CONFIG: StatusConfigMap = {
  confirmed:   { label: 'confirmed',  textColor: '#16a34a', bgColor: '#f0fdf4' },
  'in-review': { label: 'in-review', textColor: '#d97706', bgColor: '#fffbeb' },
  draft:       { label: 'draft',     textColor: '#64748b', bgColor: '#f8fafc' },
};

interface EventBriefStatusTagProps {
  status: EventBriefStatus;
}

export const EventBriefStatusTag = ({ status }: EventBriefStatusTagProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={styles.tag}
      style={{ color: config.textColor, backgroundColor: config.bgColor }}
    >
      {config.label}
    </span>
  );
};