import { useUserStore } from '@/stores/userStore/userStore';
import { useShallow } from 'zustand/react/shallow';
import { useDashboardStats } from '@/hooks/dashboard/useDashboard';
import { MuseLayout }       from '@/components/layout/MuseLayout/MuseLayout';
import { MuseStatCard }     from '@/components/dashboard/MuseStatCard/MuseStatCard';
import { QuickTools }       from '@/components/dashboard/QuickTools/QuickTools';
import { ProposalPipeline } from '@/components/dashboard/ProposalPipeline/ProposalPipeline';
import { UpcomingEvents }   from '@/components/dashboard/UpcomingEvents/UpcomingEvents';
import { MUSE_ROUTES }      from '@/constants/routes';
import { Link }             from 'react-router';
import styles from './DashboardPage.module.css';

export const DashboardPage = () => {
  const { userData } = useUserStore(
    useShallow((s) => ({ userData: s.userData })),
  );

  const { data: stats = [] } = useDashboardStats();

  // First name only for greeting
  const firstName = userData?.name?.split(' ')[0] ?? 'there';

  // Time-based greeting
  const hour     = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <MuseLayout>
      <div className={styles.page}>

        {/* ── Greeting ── */}
        <div className={styles.greeting}>
          <h1 className={styles.greetingTitle}>
            {greeting}, <em>{firstName}</em>
          </h1>
          <p className={styles.greetingSubtitle}>
            You have{' '}
            <strong>3 proposals</strong> awaiting review and{' '}
            <strong>2 events</strong> this week.
          </p>
        </div>

        {/* ── KPI Cards ── */}
        <div className={styles.kpiRow}>
          {stats.map((stat) => (
            <MuseStatCard key={stat.id} stat={stat} />
          ))}
        </div>

        {/* ── Quick Tools ── */}
        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Quick Tools</h2>
            <Link to={MUSE_ROUTES.NEW_PROPOSAL} className={styles.sectionLink}>
              New Proposal →
            </Link>
          </div>
          <QuickTools />
        </section>

        {/* ── Bottom row ── */}
        <div className={styles.bottomRow}>
          <div className={styles.pipelineCol}>
            <h2 className={styles.sectionTitle}>Proposal Pipeline</h2>
            <ProposalPipeline />
          </div>
          <div className={styles.eventsCol}>
            <h2 className={styles.sectionTitle}>Upcoming Events</h2>
            <UpcomingEvents />
          </div>
        </div>

      </div>
    </MuseLayout>
  );
};