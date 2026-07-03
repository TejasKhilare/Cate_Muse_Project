import { Users, Save, Download, FileText, X } from 'lucide-react';
import { Switch } from 'antd';
import { MuseLayout }      from '@/muse/components/layout/MuseLayout/MuseLayout';
import { StaffSummaryBar } from '@/muse/components/staff-calculator/StaffSummaryBar/StaffSummaryBar';
import { StaffRoleTable }  from '@/muse/components/staff-calculator/StaffRoleTable/StaffRoleTable';
import { useStaffCalculator } from '@/muse/hooks/staff/useStaffCalculator';
import { formatCurrency }  from '@/muse/utils/formatters';
import type { EventBriefOption } from '@/muse/types/staff.types';
import styles from './StaffCalculatorPage.module.css';

// Status badge config for event brief modal
const STATUS_CONFIG = {
  confirmed: { label: 'confirmed', color: '#16a34a', bg: '#f0fdf4' },
  'in-review': { label: 'in-review', color: '#d97706', bg: '#fffbeb' },
  draft:      { label: 'draft',     color: '#64748b', bg: '#f8fafc' },
};

const SERVICE_STYLES = [
  'Cocktail Reception',
  'Plated Dinner',
  'Stations & Passed',
  'Passed & Buffet Dinner',
  'All Day Catering',
] as const;

const DAY_TYPES = ['Standard', 'Sunday/Premium', 'Holiday'] as const;
const BAR_TYPES = ['Full Bar', 'Beer/Wine Only', 'None'] as const;
const MODES     = ['Standalone', 'Pull from Event Brief'] as const;

export const StaffCalculatorPage = () => {
  const {
    mode, input, updateInput,
    selectedBrief, showBriefModal, setShowBriefModal,
    handleModeChange, handleSelectBrief, handleChangeBrief,
    summary, eventBriefs,
  } = useStaffCalculator();

  return (
    <MuseLayout>
      <div className={styles.page}>

        {/* ── Page header ── */}
        <div className={styles.pageHeader}>
          <div className={styles.pageHeaderLeft}>
            <div className={styles.titleRow}>
              <Users size={26} color="var(--muse-gold)" aria-hidden="true" />
              <h1 className={styles.pageTitle}>Staff Calculator</h1>
            </div>
            <p className={styles.pageSubtitle}>
              Calculate staffing roster with arrival times, person-hours, and pricing based on Ridgewells operational ratios.
            </p>
          </div>

          {/* Mode selector top-right */}
          <div className={styles.modeWrapper}>
            <div className={styles.selectWrapper}>
              <select
                className={styles.modeSelect}
                value={mode}
                onChange={(e) => handleModeChange(e.target.value as typeof mode)}
              >
                {MODES.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <span className={styles.selectChevron}>▾</span>
            </div>
          </div>
        </div>

        {/* ── Event Brief Banner (Pull from Event Brief mode) ── */}
        {mode === 'Pull from Event Brief' && selectedBrief && (
          <div className={styles.briefBanner}>
            <FileText size={18} color="var(--muse-gold)" aria-hidden="true" />
            <div className={styles.briefInfo}>
              <span className={styles.briefName}>{selectedBrief.name}</span>
              <span className={styles.briefMeta}>
                {selectedBrief.client} · {selectedBrief.guests} guests · {selectedBrief.venue} · {selectedBrief.date}
              </span>
            </div>
            <button
              type="button"
              className={styles.changeEventBtn}
              onClick={handleChangeBrief}
            >
              Change Event
            </button>
          </div>
        )}

        {/* ── Main split layout ── */}
        <div className={styles.layout}>

          {/* ── LEFT: Input forms ── */}
          <div className={styles.formCol}>

            {/* EVENT INFORMATION */}
            <div className={styles.section}>
              <span className={styles.sectionLabel}>EVENT INFORMATION</span>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Guest Count</label>
                <input
                  type="number"
                  className={styles.inputNumber}
                  value={input.guestCount}
                  min="1"
                  onChange={(e) => updateInput({ guestCount: e.target.value })}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Service Style</label>
                <div className={styles.selectWrapper}>
                  <select
                    className={styles.select}
                    value={input.serviceStyle}
                    onChange={(e) => updateInput({ serviceStyle: e.target.value as typeof input.serviceStyle })}
                  >
                    {SERVICE_STYLES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <span className={styles.selectChevron}>▾</span>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Event Duration (hours)</label>
                <input
                  type="number"
                  className={styles.inputNumber}
                  value={input.eventDurationHours}
                  min="1"
                  onChange={(e) => updateInput({ eventDurationHours: e.target.value })}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Day Type</label>
                <div className={styles.selectWrapper}>
                  <select
                    className={styles.select}
                    value={input.dayType}
                    onChange={(e) => updateInput({ dayType: e.target.value as typeof input.dayType })}
                  >
                    {DAY_TYPES.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <span className={styles.selectChevron}>▾</span>
                </div>
              </div>
            </div>

            {/* BAR SETUP */}
            <div className={styles.section}>
              <span className={styles.sectionLabel}>BAR SETUP</span>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}># of Bars</label>
                <input
                  type="number"
                  className={styles.inputNumber}
                  value={input.numberOfBars}
                  min="0"
                  onChange={(e) => updateInput({ numberOfBars: e.target.value })}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Bar Type</label>
                <div className={styles.selectWrapper}>
                  <select
                    className={styles.select}
                    value={input.barType}
                    onChange={(e) => updateInput({ barType: e.target.value as typeof input.barType })}
                  >
                    {BAR_TYPES.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                  <span className={styles.selectChevron}>▾</span>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Bar Hours</label>
                <input
                  type="number"
                  className={styles.inputNumber}
                  value={input.barHours}
                  min="0"
                  onChange={(e) => updateInput({ barHours: e.target.value })}
                />
              </div>

              <div className={styles.toggleRow}>
                <span className={styles.toggleLabel}>Specialty Cocktails?</span>
                <Switch
                  checked={input.specialtyCocktails}
                  onChange={(v) => updateInput({ specialtyCocktails: v })}
                  size="small"
                />
              </div>
            </div>

            {/* SERVICE & COMPLEXITY */}
            <div className={styles.section}>
              <span className={styles.sectionLabel}>SERVICE & COMPLEXITY</span>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}># Action Stations</label>
                <input
                  type="number"
                  className={styles.input}
                  value={input.actionStations}
                  min="0"
                  placeholder=""
                  onChange={(e) => updateInput({ actionStations: e.target.value })}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Setup Hours (Pre-Event Day)</label>
                <input
                  type="number"
                  className={styles.input}
                  value={input.setupHoursPreEvent}
                  min="0"
                  placeholder=""
                  onChange={(e) => updateInput({ setupHoursPreEvent: e.target.value })}
                />
              </div>

              {[
                { key: 'coatCheck',           label: 'Coat Check?' },
                { key: 'multiServiceArea',    label: 'Multi-Service-Area?' },
                { key: 'multiKitchen',        label: 'Multi-Kitchen?' },
                { key: 'winterHeavyCoats',    label: 'Winter / Heavy Coats?' },
                { key: 'staggerServiceStaff', label: 'Stagger Service Staff?' },
              ].map(({ key, label }) => (
                <div key={key} className={styles.toggleRow}>
                  <span className={styles.toggleLabel}>{label}</span>
                  <Switch
                    checked={input[key as keyof typeof input] as boolean}
                    onChange={(v) => updateInput({ [key]: v })}
                    size="small"
                  />
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT: Results ── */}
          <div className={styles.resultsCol}>

            {/* Summary bar */}
            <StaffSummaryBar summary={summary} />

            {/* Role table */}
            <StaffRoleTable summary={summary} />

            {/* Bottom actions */}
            <div className={styles.actions}>
              <button type="button" className={styles.saveBtn}>
                <Save size={15} aria-hidden="true" />
                Save to Proposal
              </button>
              <button type="button" className={styles.exportBtn}>
                <Download size={15} aria-hidden="true" />
                Export
              </button>
              <span className={styles.attribution}>
                ⓘ Based on Ridgewells Staff Calculator v9 ratios
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* ── Event Brief Selection Modal ── */}
      {showBriefModal && (
        <div className={styles.modalOverlay} onClick={() => setShowBriefModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h2 className={styles.modalTitle}>Select Event Brief</h2>
                <p className={styles.modalSubtitle}>
                  Choose an event to auto-populate the staff calculator
                </p>
              </div>
            </div>

            <div className={styles.briefList}>
              {eventBriefs.map((brief) => {
                const sc = STATUS_CONFIG[brief.status];
                return (
                  <button
                    key={brief.id}
                    type="button"
                    className={styles.briefItem}
                    onClick={() => handleSelectBrief(brief)}
                  >
                    <div className={styles.briefItemTop}>
                      <span className={styles.briefItemName}>{brief.name}</span>
                      <span
                        className={styles.briefStatusBadge}
                        style={{ color: sc.color, background: sc.bg }}
                      >
                        {sc.label}
                      </span>
                    </div>
                    <p className={styles.briefItemMeta}>
                      {brief.client} · {brief.guests} guests · {brief.notes} · {brief.venue}
                    </p>
                    <p className={styles.briefItemDate}>
                      {brief.date} · {brief.durationHours}h · {brief.barType.toLowerCase()}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => {
                  setShowBriefModal(false);
                  if (!selectedBrief) handleModeChange('Standalone');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </MuseLayout>
  );
};