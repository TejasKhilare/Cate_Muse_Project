import { FileText } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import type { EquipmentSummary } from '@/types/equipment.types';
import styles from './EquipmentOrderTable.module.css';

interface EquipmentOrderTableProps {
  summary: EquipmentSummary;
}

export const EquipmentOrderTable = ({ summary }: EquipmentOrderTableProps) => {
  let lastCategory = '';

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <FileText size={16} color="var(--muse-gold)" aria-hidden="true" />
          <span className={styles.title}>Equipment Order</span>
        </div>
        <span className={styles.itemCount}>{summary.lineItemCount} items</span>
      </div>

      <div className={styles.scrollWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={`${styles.th} ${styles.catCol}`}>Category</th>
              <th className={`${styles.th} ${styles.itemCol}`}>Item</th>
              <th className={`${styles.th} ${styles.numCol}`}>Qty</th>
              <th className={`${styles.th} ${styles.numCol}`}>Unit Cost</th>
              <th className={`${styles.th} ${styles.numCol}`}>Line Total</th>
            </tr>
          </thead>
          <tbody>
            {summary.items.map((lineItem, i) => {
              const showCategory = lineItem.category !== lastCategory;
              lastCategory = lineItem.category;

              return (
                <tr key={i} className={styles.row}>
                  <td className={`${styles.td} ${styles.catCell}`}>
                    {showCategory && (
                      <span className={styles.categoryLabel}>
                        {lineItem.category}
                      </span>
                    )}
                  </td>
                  <td className={styles.td}>
                    <span className={styles.itemName}>{lineItem.item}</span>
                    {lineItem.note && (
                      <span className={styles.itemNote}>{lineItem.note}</span>
                    )}
                  </td>
                  <td className={`${styles.td} ${styles.num}`}>
                    {lineItem.qty.toLocaleString()}
                  </td>
                  <td className={`${styles.td} ${styles.num}`}>
                    ${lineItem.unitCost.toFixed(2)}
                  </td>
                  <td className={`${styles.td} ${styles.num} ${styles.lineTotal}`}>
                    {formatCurrency(lineItem.lineTotal)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};