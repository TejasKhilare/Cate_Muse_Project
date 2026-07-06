// src/muse/components/muse-board-result/PaletteTab/PaletteTab.tsx

import { useState } from 'react';
import type { MuseBoardResult } from '@/types/museBoard.types';
import styles from './PaletteTab.module.css';

// _hex is intentionally unused — name by position only
const getSwatchName = (_hex: string, index: number): string => {
  const names = ['Gold', 'Dark', 'Light', 'Accent', 'Neutral', 'Warm'];
  return names[index] ?? `Color ${index + 1}`;
};

const extractProductColors = (products: MuseBoardResult['products']): string[] => {
  const set = new Set<string>();
  products.forEach((p) => p.colors.forEach((c) => set.add(c)));
  return Array.from(set)
    .filter((c) => c.length > 0)
    .map((c) => c.charAt(0).toUpperCase() + c.slice(1));
};

interface PaletteTabProps {
  board: MuseBoardResult;
}

export const PaletteTab = ({ board }: PaletteTabProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const productColors = extractProductColors(board.products);

  return (
    <div className={styles.tab}>

      {/* ── Board Color Palette — same swatches as form ── */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Board Color Palette</h3>
        <div className={styles.paletteRow}>
          {board.colorPalette.map((hex, i) => (
            <div key={i} className={styles.paletteItem}>
              <div
                className={styles.paletteSwatch}
                style={{ background: hex }}
              />
              <span className={styles.paletteHex}>{hex.toUpperCase()}</span>
              <span className={styles.paletteName}>{getSwatchName(hex, i)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Colors from Products ── */}
      {productColors.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Colors from Products</h3>
          <div className={styles.colorPills}>
            {productColors.map((color) => (
              <span key={color} className={styles.colorPill}>{color}</span>
            ))}
          </div>
        </div>
      )}

      {/* ── Palette in Context ── */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Palette in Context</h3>
        <div className={styles.contextBar}>
          {board.colorPalette.map((hex, i) => (
            <div
              key={i}
              className={styles.contextSegment}
              style={{
                background: hex,
                flex:       hoveredIndex === i ? 3 : 1,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
        <p className={styles.contextHint}>
          Hover over sections to expand. This palette will be used in the
          exported PDF cover and throughout the board presentation.
        </p>
      </div>

    </div>
  );
};