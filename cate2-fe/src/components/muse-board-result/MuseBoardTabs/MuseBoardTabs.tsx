// src/muse/components/muse-board-result/MuseBoardTabs/MuseBoardTabs.tsx

import classNames from 'classnames';
import { LayoutTemplate, Package, Palette } from 'lucide-react';
import type { MuseBoardTab } from '@/types/museBoard.types';
import styles from './MuseBoardTabs.module.css';

interface MuseBoardTabsProps {
  activeTab:    MuseBoardTab;
  onChange:     (tab: MuseBoardTab) => void;
  productCount: number;
}

export const MuseBoardTabs = ({
  activeTab,
  onChange,
  productCount,
}: MuseBoardTabsProps) => (
  <div className={styles.wrapper}>
    <div className={styles.tabsScroll}>

      <button
        type="button"
        className={classNames(styles.tab, { [styles.active]: activeTab === 'inspiration' })}
        onClick={() => onChange('inspiration')}
      >
        <LayoutTemplate size={14} aria-hidden="true" />
        Inspiration
      </button>

      <button
        type="button"
        className={classNames(styles.tab, { [styles.active]: activeTab === 'products' })}
        onClick={() => onChange('products')}
      >
        <Package size={14} aria-hidden="true" />
        Products
        <span className={styles.badge}>{productCount}</span>
      </button>

      <button
        type="button"
        className={classNames(styles.tab, { [styles.active]: activeTab === 'palette' })}
        onClick={() => onChange('palette')}
      >
        <Palette size={14} aria-hidden="true" />
        Palette
      </button>

    </div>
  </div>
);