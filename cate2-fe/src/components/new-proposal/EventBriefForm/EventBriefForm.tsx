import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import type { NewProposalFormData, EventType } from '@/types/new-proposal.types';
import { EVENT_TYPE_OPTIONS } from '@/types/new-proposal.types';
import styles from './EventBriefForm.module.css';

interface EventBriefFormProps {
  form:        NewProposalFormData;
  updateField: <K extends keyof NewProposalFormData>(
    field: K,
    value: NewProposalFormData[K],
  ) => void;
}

export const EventBriefForm = ({ form, updateField }: EventBriefFormProps) => (
  <div className={styles.card}>

    <span className={styles.sectionLabel}>EVENT BRIEF</span>

    <div className={styles.formGrid}>

      {/* Event Name */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Event Name</label>
        <input
          type="text"
          className={styles.input}
          placeholder="e.g. Morrison Wedding Reception"
          value={form.eventName}
          onChange={(e) => updateField('eventName', e.target.value)}
        />
      </div>

      {/* Client Name */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Client Name</label>
        <input
          type="text"
          className={styles.input}
          placeholder="e.g. Morrison Family"
          value={form.clientName}
          onChange={(e) => updateField('clientName', e.target.value)}
        />
      </div>

      {/* Guest Count — inputNumber class keeps browser spinner arrows visible */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Guest Count</label>
        <input
          type="number"
          className={styles.inputNumber}
          placeholder="280"
          min="1"
          max="99999"
          step="1"
          value={form.guestCount}
          onChange={(e) => updateField('guestCount', e.target.value)}
        />
      </div>

      {/* Event Date */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Event Date</label>
        <div className={styles.datePickerWrapper}>
          <DatePicker
            value={form.eventDate}
            onChange={(date: Dayjs | null) => updateField('eventDate', date)}
            format="DD/MM/YYYY"
            placeholder="dd-mm-yyyy"
            style={{ width: '100%' }}
            getPopupContainer={() => document.body}
          />
        </div>
      </div>

      {/* Event Type — native select, zero double border */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Event Type</label>
        <div className={styles.selectWrapper}>
          <select
            className={styles.nativeSelect}
            value={form.eventType}
            onChange={(e) => updateField('eventType', e.target.value as EventType)}
          >
            {EVENT_TYPE_OPTIONS.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <span className={styles.selectChevron} aria-hidden="true">▾</span>
        </div>
      </div>

      {/* Venue */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Venue</label>
        <input
          type="text"
          className={styles.input}
          placeholder="e.g. Meridian House"
          value={form.venue}
          onChange={(e) => updateField('venue', e.target.value)}
        />
      </div>

      {/* Event Notes — full width */}
      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
        <label className={styles.label}>Event Notes / Special Requests</label>
        <textarea
          className={styles.textarea}
          placeholder="Describe the event vision, special dietary needs, service preferences, or any other details..."
          rows={5}
          value={form.notes}
          onChange={(e) => updateField('notes', e.target.value)}
        />
      </div>

    </div>
  </div>
);