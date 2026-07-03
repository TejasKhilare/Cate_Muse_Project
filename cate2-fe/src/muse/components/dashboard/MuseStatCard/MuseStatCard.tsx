import {
  FileText,
  Clock,
  TrendingUp,
  DollarSign,
} from 'lucide-react';
import type { DashboardKpiStat } from '@/muse/types/dashboard.types';
import styles from './MuseStatCard.module.css';

const ICON_MAP = {
  proposals: <FileText  size={18} color="#c9a84c" />,
  clock:     <Clock     size={18} color="#10b981" />,
  chart:     <TrendingUp size={18} color="#6366f1" />,
  dollar:    <DollarSign size={18} color="#c9a84c" />,
};

interface MuseStatCardProps {
  stat: DashboardKpiStat;
}

export const MuseStatCard = ({ stat }: MuseStatCardProps) => (
  <div className={styles.card}>
    <div className={styles.top}>
      <span className={styles.label}>{stat.label}</span>
      <span className={styles.icon}>{ICON_MAP[stat.icon]}</span>
    </div>
    <div className={styles.value}>{stat.value}</div>
    <div className={styles.subtext}>{stat.subtext}</div>
  </div>
);