import { formatCurrency } from '@/muse/utils/formatters';
import type { EquipmentSummary } from '@/muse/types/equipment.types';
import styles from './EquipmentSummaryBar.module.css';

interface EquipmentSummaryBarProps {
  summary: EquipmentSummary;
}

export const EquipmentSummaryBar = ({ summary }: EquipmentSummaryBarProps) => (
  <div className={styles.wrapper}>

    {/* Top row — 4 main metrics */}
    <div className={styles.topRow}>
      <div className={styles.metric}>
        <span className={styles.label}>EQUIPMENT SUBTOTAL</span>
        <span className={styles.value}>{formatCurrency(summary.subtotal)}</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.metric}>
        <span className={styles.label}>MARKUP (35%)</span>
        <span className={styles.value}>{formatCurrency(summary.markup)}</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.metric}>
        <span className={styles.label}>PRE-TAX TOTAL</span>
        <span className={styles.value}>{formatCurrency(summary.preTaxTotal)}</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.metric}>
        <span className={styles.label}>GRAND TOTAL</span>
        <span className={`${styles.value} ${styles.grandTotal}`}>
          {formatCurrency(summary.grandTotal)}
        </span>
      </div>
    </div>

    {/* Bottom row — secondary breakdown */}
    <div className={styles.bottomRow}>
      <div className={styles.secondary}>
        <span className={styles.secLabel}>Damage Waiver (7%)</span>
        <span className={styles.secValue}>{formatCurrency(summary.damageWaiver)}</span>
      </div>
      <div className={styles.secondary}>
        <span className={styles.secLabel}>Delivery</span>
        <span className={styles.secValue}>{formatCurrency(summary.delivery)}</span>
      </div>
      <div className={styles.secondary}>
        <span className={styles.secLabel}>BOH Consumables</span>
        <span className={styles.secValue}>{formatCurrency(summary.bohConsumables)}</span>
      </div>
      <div className={styles.secondary}>
        <span className={styles.secLabel}>Sales Tax (6%)</span>
        <span className={styles.secValue}>{formatCurrency(summary.salesTax)}</span>
      </div>
      <div className={styles.secondary}>
        <span className={styles.secLabel}>Line Items</span>
        <span className={styles.secValue}>{summary.lineItemCount}</span>
      </div>
    </div>

  </div>
);