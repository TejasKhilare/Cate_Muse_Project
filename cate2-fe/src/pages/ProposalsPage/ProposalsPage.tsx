import { Link } from 'react-router';
import { Spin } from 'antd';
import { MuseLayout }        from '@/components/layout/MuseLayout/MuseLayout';
import { ProposalTable }     from '@/components/proposals/ProposalTable/ProposalTable';
import { useProposals }      from '@/hooks/proposals/useProposals';
import { useProposalFilters } from '@/hooks/proposals/useProposalFilters';
import { MUSE_ROUTES }       from '@/constants/routes';
import styles from './ProposalsPage.module.css';

export const ProposalsPage = () => {
  const { data: proposals = [], isLoading } = useProposals();
  const { filtered } = useProposalFilters(proposals);

  return (
    <MuseLayout>
      <div className={styles.page}>

        {/* ── Page header ── */}
        <div className={styles.pageHeader}>
          <div className={styles.pageHeaderLeft}>
            <h1 className={styles.pageTitle}>Proposals</h1>
            <p className={styles.pageSubtitle}>
              Manage and track all your event proposals in one place.
            </p>
          </div>
          <Link to={MUSE_ROUTES.NEW_PROPOSAL} className={styles.newBtn}>
            + New Proposal
          </Link>
        </div>

        {/* ── Table section ── */}
        <div className={styles.tableSection}>
          {isLoading ? (
            <div className={styles.loader}>
              <Spin size="large" />
            </div>
          ) : (
            <ProposalTable proposals={filtered} />
          )}
        </div>

      </div>
    </MuseLayout>
  );
};