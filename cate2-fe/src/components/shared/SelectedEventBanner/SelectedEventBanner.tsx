// src/muse/components/shared/SelectedEventBanner/SelectedEventBanner.tsx

import { FileText } from 'lucide-react';
import { formatEventDate, formatGuestCount } from '@/utils/formatters';
import type { EventBrief } from '@/types/eventBrief.types';
import styles from './SelectedEventBanner.module.css';

interface SelectedEventBannerProps {
  brief:         EventBrief;
  onChangeEvent: () => void;
}

export const SelectedEventBanner = ({ brief, onChangeEvent }: SelectedEventBannerProps) => (
  <div className={styles.banner}>
    <div className={styles.left}>
      <span className={styles.iconWrap}>
        <FileText size={16} color="var(--muse-gold)" aria-hidden="true" />
      </span>
      <div className={styles.textBlock}>
        <span className={styles.eventName}>{brief.eventName}</span>
        <span className={styles.eventMeta}>
          {brief.client} · {formatGuestCount(brief.guestCount)} guests · {brief.venue} · {formatEventDate(brief.eventDate)}
        </span>
      </div>
    </div>
    <button type="button" className={styles.changeBtn} onClick={onChangeEvent}>
      Change Event
    </button>
  </div>
);