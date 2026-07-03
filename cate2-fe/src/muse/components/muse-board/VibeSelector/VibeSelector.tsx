import classNames from 'classnames';
import { Check } from 'lucide-react';
import type { VibeTag } from '@/muse/types/museBoard.types';
import { VIBE_TAGS } from '@/muse/types/museBoard.types';
import styles from './VibeSelector.module.css';

interface VibeSelectorProps {
  selected: VibeTag[];
  onToggle: (tag: VibeTag) => void;
}

export const VibeSelector = ({ selected, onToggle }: VibeSelectorProps) => (
  <div className={styles.tagRow}>
    {VIBE_TAGS.map((tag) => {
      const isSelected = selected.includes(tag);
      return (
        <button
          key={tag}
          type="button"
          onClick={() => onToggle(tag)}
          className={classNames(styles.tag, {
            [styles.tagSelected]: isSelected,
          })}
          aria-pressed={isSelected}
        >
          {isSelected && (
            <Check size={12} className={styles.checkIcon} aria-hidden="true" />
          )}
          {tag}
        </button>
      );
    })}
  </div>
);