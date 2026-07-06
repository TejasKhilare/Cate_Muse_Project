import classNames from 'classnames';
import { Check } from 'lucide-react';
import { APPROVED_VENDORS } from '@/types/museBoard.types';
import styles from './VendorRecommendations.module.css';

interface VendorRecommendationsProps {
  selected: string[];
  onToggle: (vendor: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  areAllSelected: boolean;
}

export const VendorRecommendations = ({
  selected,
  onToggle,
  onSelectAll,
  onDeselectAll,
  areAllSelected,
}: VendorRecommendationsProps) => (
  <div className={styles.wrapper}>

    {/* Header row: label + Select All */}
    <div className={styles.header}>
      <span className={styles.sectionLabel}>APPROVED VENDORS</span>
      <button
        type="button"
        className={styles.selectAllBtn}
        onClick={areAllSelected ? onDeselectAll : onSelectAll}
      >
        {areAllSelected ? 'Deselect All' : 'Select All'}
      </button>
    </div>

    {/* 2-column vendor grid */}
    <div className={styles.grid}>
      {APPROVED_VENDORS.map((vendor) => {
        const isSelected = selected.includes(vendor);
        return (
          <button
            key={vendor}
            type="button"
            onClick={() => onToggle(vendor)}
            className={classNames(styles.vendorItem, {
              [styles.vendorSelected]: isSelected,
            })}
            aria-pressed={isSelected}
          >
            <span className={styles.checkWrapper}>
              {isSelected && (
                <Check size={13} className={styles.checkIcon} aria-hidden="true" />
              )}
            </span>
            <span className={styles.vendorName}>{vendor}</span>
          </button>
        );
      })}
    </div>
  </div>
);