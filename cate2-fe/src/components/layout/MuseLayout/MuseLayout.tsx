// src/muse/components/layout/MuseLayout/MuseLayout.tsx

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { useShallow } from 'zustand/react/shallow';
import { useGetMe } from '@/hooks/api/useGetMe/useGetMe';
import { useUserStore } from '@/stores/userStore/userStore';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import { museAntdTheme } from '@/config/muse.config';
import { MuseSidebar } from '../MuseSidebar/MuseSidebar';
import { MuseTopHeader } from '../MuseTopHeader/MuseTopHeader';
import '@/styles/tokens.css';
import styles from './MuseLayout.module.css';

interface MuseLayoutProps {
  children: ReactNode;
}

export const MuseLayout = ({ children }: MuseLayoutProps) => {
  const { data } = useGetMe();
  const { setUserData } = useUserStore(
    useShallow((s) => ({ setUserData: s.setUserData })),
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (data) setUserData(data);
  }, [data, setUserData]);

  // Auto-close drawer when viewport becomes desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!data) {
    return (
      <ConfigProvider theme={museAntdTheme}>
        <PageLoader />
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider theme={museAntdTheme}>
      <div className={styles.root}>

        <MuseSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Dark overlay — only mounts on tablet/mobile when drawer is open */}
        {sidebarOpen && (
          <div
            className={styles.overlay}
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        <div className={styles.main}>
          <MuseTopHeader onMenuClick={() => setSidebarOpen((v) => !v)} />
          <main className={styles.content}>
            {children}
          </main>
        </div>

      </div>
    </ConfigProvider>
  );
};