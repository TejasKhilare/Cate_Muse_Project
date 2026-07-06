// src/muse/components/shared/EventBriefSelectorModal/EventBriefSelectorModal.tsx

import { useEffect } from 'react';
import { useEventBriefs } from '@/hooks/eventBrief/useEventBriefs';
import { EventBriefStatusTag } from '@/components/shared/EventBriefStatusTag/EventBriefStatusTag';
import { formatEventDate, formatGuestCount } from '@/utils/formatters';
import type { EventBrief } from '@/types/eventBrief.types';
import styles from './EventBriefSelectorModal.module.css';

interface EventBriefSelectorModalProps {
  isOpen:    boolean;
  onClose:   () => void;
  onSelect:  (brief: EventBrief) => void;
  subtitle?: string;
}

export const EventBriefSelectorModal = ({
  isOpen,
  onClose,
  onSelect,
  subtitle = 'Choose an event to auto-populate this calculator',
}: EventBriefSelectorModalProps) => {
  const { data: briefs = [], isLoading } = useEventBriefs();

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-brief-modal-title"
      >

        {/* ── Header ── */}
        <div className={styles.header}>
          <h2 id="event-brief-modal-title" className={styles.title}>
            Select Event Brief
          </h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        {/* ── Scrollable list ── */}
        <div className={styles.list}>
          {isLoading && (
            <div className={styles.loadingState}>Loading events…</div>
          )}

          {!isLoading && briefs.length === 0 && (
            <div className={styles.emptyState}>No event briefs found.</div>
          )}

          {briefs.map((brief) => (
            <button
              key={brief.id}
              type="button"
              className={styles.item}
              onClick={() => onSelect(brief)}
            >
              <div className={styles.itemTop}>
                <span className={styles.itemName}>{brief.eventName}</span>
                <EventBriefStatusTag status={brief.status} />
              </div>
              <div className={styles.itemMetaLine}>
                {brief.client} · {formatGuestCount(brief.guestCount)} guests · {brief.eventType} · {brief.venue}
              </div>
              <div className={styles.itemMetaLine}>
                {formatEventDate(brief.eventDate)} · {brief.durationHours}h · {brief.barType}
              </div>
            </button>
          ))}
        </div>

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};