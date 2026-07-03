// src/muse/components/muse-board-result/MuseBoardHeader/MuseBoardHeader.tsx

import { Link } from 'react-router';
import { Save, Download, Presentation, ArrowLeft } from 'lucide-react';
import type { MuseBoardResult } from '@/muse/types/museBoard.types';
import { MUSE_ROUTES } from '@/muse/constants/routes';
import styles from './MuseBoardHeader.module.css';

interface MuseBoardHeaderProps {
  board: MuseBoardResult;
}

export const MuseBoardHeader = ({ board }: MuseBoardHeaderProps) => {
  const themeShort =
    board.themeDirection.length > 50
      ? board.themeDirection.slice(0, 50) + '…'
      : board.themeDirection;

  const subtitle = [
    themeShort,
    board.vibeTags.join(', '),
    `${board.productCount} products from ${board.vendorCount} vendors`,
  ].join(' · ');

  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <Link to={MUSE_ROUTES.BOARD} className={styles.backLink}>
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Brief
        </Link>
      </div>

      <div className={styles.row}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>{board.eventName} — MUSE Board</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.actionBtn}>
            <Save size={14} aria-hidden="true" />
            <span>Save</span>
          </button>
          <button type="button" className={styles.actionBtn}>
            <Download size={14} aria-hidden="true" />
            <span>PDF</span>
          </button>
          <button type="button" className={styles.actionBtn}>
            <Presentation size={14} aria-hidden="true" />
            <span>PPTX</span>
          </button>
        </div>
      </div>
    </div>
  );
};