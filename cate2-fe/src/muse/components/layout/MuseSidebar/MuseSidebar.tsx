// src/muse/components/layout/MuseSidebar/MuseSidebar.tsx

import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  FilePlus,
  FileText,
  Palette,
  Users,
  Package,
  ShieldCheck,
} from 'lucide-react';
import classNames from 'classnames';
import { useShallow } from 'zustand/react/shallow';
import { useUserStore } from '@/stores/userStore/userStore';
import { SIDEBAR_NAV_ITEMS } from '@/muse/constants/sidebar';
import type { SidebarNavItem } from '@/muse/constants/sidebar';
import styles from './MuseSidebar.module.css';

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={18} />,
  FilePlus:        <FilePlus size={18} />,
  FileText:        <FileText size={18} />,
  Palette:         <Palette size={18} />,
  Users:           <Users size={18} />,
  Package:         <Package size={18} />,
  ShieldCheck:     <ShieldCheck size={18} />,
};

interface MuseSidebarProps {
  isOpen:  boolean;
  onClose: () => void;
}

export const MuseSidebar = ({ isOpen, onClose }: MuseSidebarProps) => {
  const { userData } = useUserStore(
    useShallow((s) => ({ userData: s.userData })),
  );

  const isAdmin = userData?.roles.includes('admin') ?? false;

  const initials = userData?.name
    ? userData.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  const fullName = userData?.name ?? '';

  const roleLabel = userData?.roles[0]
    ? userData.roles[0].replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : '';

  const regularItems = SIDEBAR_NAV_ITEMS.filter(
    (item: SidebarNavItem) => !item.adminOnly,
  );
  const adminItems = SIDEBAR_NAV_ITEMS.filter(
    (item: SidebarNavItem) => item.adminOnly && isAdmin,
  );

  return (
    <aside
      className={classNames(styles.sidebar, { [styles.sidebarOpen]: isOpen })}
      aria-label="Main navigation"
    >

      {/* ── Logo ── */}
      <div className={styles.logoArea}>
        <div className={styles.logoText}>
          <span className={styles.logoCate}>CATE</span>
          <span className={styles.logoPlus}> + </span>
          <span className={styles.logoMuse}>MUSE</span>
        </div>
        <div className={styles.logoSubtext}>EVENT DESIGN PLATFORM</div>
      </div>

      {/* ── Navigation ── */}
      <nav className={styles.nav}>
        {regularItems.map((item: SidebarNavItem) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}     /* close drawer on nav on tablet/mobile */
            className={({ isActive }) =>
              classNames(styles.navItem, { [styles.navItemActive]: isActive })
            }
          >
            <span className={styles.navIcon}>{ICON_MAP[item.iconName]}</span>
            <span className={styles.navLabel}>{item.label}</span>
          </NavLink>
        ))}

        {adminItems.length > 0 && (
          <>
            <div className={styles.divider} />
            {adminItems.map((item: SidebarNavItem) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  classNames(styles.navItem, { [styles.navItemActive]: isActive })
                }
              >
                <span className={styles.navIcon}>{ICON_MAP[item.iconName]}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </NavLink>
            ))}
          </>
        )}
      </nav>

      {/* ── User card ── */}
      <div className={styles.bottomArea}>
        <div className={styles.userCard}>
          <div className={styles.userAvatar}>{initials}</div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{fullName}</div>
            <div className={styles.userRole}>{roleLabel}</div>
          </div>
        </div>
      </div>

    </aside>
  );
};