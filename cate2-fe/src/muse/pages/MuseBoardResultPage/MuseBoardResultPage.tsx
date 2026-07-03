// src/muse/pages/MuseBoardResultPage/MuseBoardResultPage.tsx

import { useState } from 'react';
import { useParams } from 'react-router';
import { Spin } from 'antd';
import { MuseLayout }         from '@/muse/components/layout/MuseLayout/MuseLayout';
import { MuseBoardHeader }    from '@/muse/components/muse-board-result/MuseBoardHeader/MuseBoardHeader';
import { MuseBoardTabs }      from '@/muse/components/muse-board-result/MuseBoardTabs/MuseBoardTabs';
import { InspirationTab }     from '@/muse/components/muse-board-result/InspirationTab/InspirationTab';
import { ProductsTab }        from '@/muse/components/muse-board-result/ProductsTab/ProductsTab';
import { PaletteTab }         from '@/muse/components/muse-board-result/PaletteTab/PaletteTab';
import { useMuseBoardResult } from '@/muse/hooks/muse-board/useMuseBoardResult';
import type { MuseBoardTab }  from '@/muse/types/museBoard.types';
import styles from './MuseBoardResultPage.module.css';

export const MuseBoardResultPage = () => {
  const { id = 'mb-001' }          = useParams<{ id: string }>();
  const { data: board, isLoading } = useMuseBoardResult(id);
  const [activeTab, setActiveTab]  = useState<MuseBoardTab>('inspiration');

  if (isLoading || !board) {
    return (
      <MuseLayout>
        <div className={styles.loader}>
          <Spin size="large" />
        </div>
      </MuseLayout>
    );
  }

  return (
    <MuseLayout>
      <div className={styles.page}>

        <MuseBoardHeader board={board} />

        <MuseBoardTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          productCount={board.productCount}
        />

        <div className={styles.tabContent}>
          {activeTab === 'inspiration' && <InspirationTab board={board} />}
          {activeTab === 'products'    && <ProductsTab    board={board} />}
          {activeTab === 'palette'     && <PaletteTab     board={board} />}
        </div>

      </div>
    </MuseLayout>
  );
};