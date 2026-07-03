// src/muse/components/muse-board-result/InspirationTab/InspirationTab.tsx

import { RefreshCw } from 'lucide-react';
import type { MuseBoardResult } from '@/muse/types/museBoard.types';
import styles from './InspirationTab.module.css';

interface InspirationTabProps {
  board: MuseBoardResult;
}

export const InspirationTab = ({ board }: InspirationTabProps) => {
  const heroSubtitle =
    board.themeDirection.length > 70
      ? board.themeDirection.slice(0, 70) + '…'
      : board.themeDirection;

  return (
    <div className={styles.tab}>

      {/* ── Hero Image — large reserved space for AI-generated image ── */}
      <div className={styles.heroWrapper}>
        {board.heroImageUrl ? (
          <img
            src={board.heroImageUrl}
            alt={`${board.eventName} hero rendering`}
            className={styles.heroImage}
          />
        ) : (
          <div className={styles.heroPlaceholder}>
            <span className={styles.placeholderText}>
              AI-Generated Hero Image Will Appear Here
            </span>
          </div>
        )}

        {/* Bottom gradient + event name overlay */}
        <div className={styles.heroOverlay}>
          <div className={styles.heroTextBlock}>
            <span className={styles.heroTitle}>{board.eventName}</span>
            <span className={styles.heroSubtitle}>{heroSubtitle}</span>
          </div>
        </div>

        {/* Regenerate button — top right */}
        <button type="button" className={styles.regenerateBtn}>
          <RefreshCw size={14} aria-hidden="true" />
          <span>Regenerate</span>
        </button>
      </div>

      {/* ── AI Prompt Used ── */}
      <div className={styles.promptCard}>
        <span className={styles.promptLabel}>AI PROMPT USED</span>
        <p className={styles.promptText}>{board.aiPromptUsed}</p>
      </div>

      {/* ── Supporting Imagery — dynamic: renders whatever the API returns ── */}
      {board.supportingImages.length > 0 && (
        <div className={styles.supportingSection}>
          <h3 className={styles.supportingTitle}>Supporting Imagery</h3>
          <div className={styles.supportingGrid}>
            {board.supportingImages.map((url, i) => (
              <div key={i} className={styles.supportingImageWrapper}>
                <img
                  src={url}
                  alt={`Supporting image ${i + 1}`}
                  className={styles.supportingImage}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};