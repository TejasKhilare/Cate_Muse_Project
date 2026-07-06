// src/muse/components/layout/MuseTopHeader/MuseTopHeader.tsx

import { Search, Sparkles, Bell, Menu } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useUserStore } from '@/stores/userStore/userStore';
import styles from './MuseTopHeader.module.css';

interface MuseTopHeaderProps {
  onMenuClick: () => void;
}

export const MuseTopHeader = ({ onMenuClick }: MuseTopHeaderProps) => {
  const { userData } = useUserStore(
    useShallow((s) => ({ userData: s.userData })),
  );

  const initials = userData?.name
    ? userData.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  const shortName = userData?.name
    ? (() => {
        const parts = userData.name.trim().split(' ');
        return parts.length > 1
          ? `${parts[0]} ${parts[parts.length - 1][0]}.`
          : parts[0];
      })()
    : '';

  return (
    <header className={styles.header}>

      {/* Hamburger — hidden on desktop via CSS */}
      <button
        className={styles.hamburger}
        type="button"
        onClick={onMenuClick}
        aria-label="Toggle navigation"
      >
        <Menu size={20} />
      </button>

      {/* Native search — zero Ant Design, zero double border */}
      <div className={styles.searchBox}>
        <Search size={15} className={styles.searchIcon} aria-hidden="true" />
        <input
          type="search"
          placeholder="Search proposals, events, menus..."
          className={styles.searchInput}
          aria-label="Search proposals, events, menus"
        />
      </div>

      {/* Right actions */}
      <div className={styles.actions}>
        <button className={styles.iconBtn} type="button" aria-label="AI features">
          <Sparkles size={18} />
        </button>
        <button className={styles.iconBtn} type="button" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <div
          className={styles.userChip}
          role="button"
          tabIndex={0}
          aria-label="User menu"
        >
          <div className={styles.userAvatar}>{initials}</div>
          <span className={styles.userName}>{shortName}</span>
          <span className={styles.chevron} aria-hidden="true">▾</span>
        </div>
      </div>

    </header>
  );
};