// src/muse/pages/EquipmentCalculatorPage/EquipmentCalculatorPage.tsx

import { Package, Save, Download } from 'lucide-react';
import { Switch } from 'antd';
import { MuseLayout }              from '@/components/layout/MuseLayout/MuseLayout';
import { EquipmentSummaryBar }     from '@/components/equipment-calculator/EquipmentSummaryBar/EquipmentSummaryBar';
import { EquipmentOrderTable }     from '@/components/equipment-calculator/EquipmentOrderTable/EquipmentOrderTable';
import { SelectedEventBanner }     from '@/components/shared/SelectedEventBanner/SelectedEventBanner';
import { EventBriefSelectorModal } from '@/components/shared/EventBriefSelectorModal/EventBriefSelectorModal';
import { useEquipmentCalculator }  from '@/hooks/equipment/useEquipmentCalculator';
import { useEventBriefPull }       from '@/hooks/eventBrief/useEventBriefPull';
import { mapEventBriefToEquipmentInput } from '@/utils/mapEventBriefToEquipment';
import type { CalculatorMode } from '@/types/eventBrief.types';
import styles from './EquipmentCalculatorPage.module.css';

const EVENT_TYPES   = ['Plated Dinner','Cocktail + Plated','Cocktail Reception','Buffet','Stations & Passed','All Day Catering'] as const;
const VENUES        = ['Mellon Auditorium','Museum','Cathedral','Embassy','Private Home','Hotel Ballroom','Outdoor Tent','Sands Capital','Other'] as const;
const SEASONS       = ['Standard','Fall/Winter','Holiday Season'] as const;
const SERVICE_MODES = ['Full Service','Drop-off/Delivered'] as const;
const BAR_TYPES     = ['Full Bar','Beer/Wine Only','None'] as const;
const COFFEE_STYLES = ['Tableside','Station'] as const;
const MODES: CalculatorMode[] = ['Standalone', 'Pull from Event Brief'];

export const EquipmentCalculatorPage = () => {
  const { input, updateInput, summary } = useEquipmentCalculator();

  const {
    mode,
    setMode,
    selectedBrief,
    isModalOpen,
    openModal,
    closeModal,
    selectBrief,
  } = useEventBriefPull({
    onApply: (brief) => updateInput(mapEventBriefToEquipmentInput(brief)),
  });

  return (
    <MuseLayout>
      <div className={styles.page}>

        {/* ── Page header ── */}
        <div className={styles.pageHeader}>
          <div className={styles.pageHeaderLeft}>
            <div className={styles.titleRow}>
              <Package size={26} color="var(--muse-gold)" aria-hidden="true" />
              <h1 className={styles.pageTitle}>Equipment Calculator</h1>
            </div>
            <p className={styles.pageSubtitle}>
              Calculate rental equipment orders — linens, glassware, flatware, china, bars, and BOH — with smart pricing tiers.
            </p>
          </div>

          {/* Mode selector */}
          <div className={styles.modeWrapper}>
            <div className={styles.selectWrapper}>
              <select
                className={styles.modeSelect}
                value={mode}
                onChange={(e) => setMode(e.target.value as CalculatorMode)}
              >
                {MODES.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <span className={styles.selectChevron}>▾</span>
            </div>
          </div>
        </div>

        {/* ── Selected event banner — only when pulled from a brief ── */}
        {mode === 'Pull from Event Brief' && selectedBrief && (
          <SelectedEventBanner
            brief={selectedBrief}
            onChangeEvent={openModal}
          />
        )}

        {/* ── Main layout ── */}
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
                <label className={styles.fieldLabel}>Seated Dinner Guests</label>
                <input
                  type="number"
                  className={styles.inputNumber}
                  value={input.seatedDinnerGuests}
                  min="0"
                  onChange={(e) => updateInput({ seatedDinnerGuests: e.target.value })}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Event Type</label>
                <div className={styles.selectWrapper}>
                  <select
                    className={styles.select}
                    value={input.eventType}
                    onChange={(e) => updateInput({ eventType: e.target.value as typeof input.eventType })}
                  >
                    {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <span className={styles.selectChevron}>▾</span>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Venue</label>
                <div className={styles.selectWrapper}>
                  <select
                    className={styles.select}
                    value={input.venue}
                    onChange={(e) => updateInput({ venue: e.target.value as typeof input.venue })}
                  >
                    {VENUES.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                  <span className={styles.selectChevron}>▾</span>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Season</label>
                <div className={styles.selectWrapper}>
                  <select
                    className={styles.select}
                    value={input.season}
                    onChange={(e) => updateInput({ season: e.target.value as typeof input.season })}
                  >
                    {SEASONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <span className={styles.selectChevron}>▾</span>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Service Mode</label>
                <div className={styles.selectWrapper}>
                  <select
                    className={styles.select}
                    value={input.serviceMode}
                    onChange={(e) => updateInput({ serviceMode: e.target.value as typeof input.serviceMode })}
                  >
                    {SERVICE_MODES.map((s) => <option key={s} value={s}>{s}</option>)}
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
                    {BAR_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
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
                <span className={styles.toggleLabel}>Specialty Champagne Flute?</span>
                <Switch
                  checked={input.specialtyChampagneFlute}
                  onChange={(v) => updateInput({ specialtyChampagneFlute: v })}
                  size="small"
                />
              </div>
            </div>

            {/* RECEPTION & ADD-ONS */}
            <div className={styles.section}>
              <span className={styles.sectionLabel}>RECEPTION & ADD-ONS</span>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}># High Top Tables</label>
                <input
                  type="number"
                  className={styles.inputNumber}
                  value={input.highTopTables}
                  min="0"
                  onChange={(e) => updateInput({ highTopTables: e.target.value })}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}># Hors d'Oeuvre Types (Passed)</label>
                <input
                  type="number"
                  className={styles.inputNumber}
                  value={input.horsOeuvreTypes}
                  min="0"
                  onChange={(e) => updateInput({ horsOeuvreTypes: e.target.value })}
                />
              </div>

              {[
                { key: 'coatCheck',          label: 'Coat Check?' },
                { key: 'coatCheckPipeDrape', label: 'Coat Check Pipe & Drape?' },
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

              <div className={styles.toggleRow}>
                <span className={styles.toggleLabel}>Coffee Service?</span>
                <Switch
                  checked={input.coffeeService}
                  onChange={(v) => updateInput({ coffeeService: v })}
                  size="small"
                />
              </div>

              {input.coffeeService && (
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Coffee Style</label>
                  <div className={styles.selectWrapper}>
                    <select
                      className={styles.select}
                      value={input.coffeeStyle}
                      onChange={(e) => updateInput({ coffeeStyle: e.target.value as typeof input.coffeeStyle })}
                    >
                      {COFFEE_STYLES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <span className={styles.selectChevron}>▾</span>
                  </div>
                </div>
              )}

              {[
                { key: 'teaService',     label: 'Tea Service?' },
                { key: 'cakeService',    label: 'Cake Service?' },
                { key: 'champagneToast', label: 'Champagne Toast?' },
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

            {/* VENDOR & OVERRIDES */}
            <div className={styles.section}>
              <span className={styles.sectionLabel}>VENDOR & OVERRIDES</span>

              {[
                { key: 'fohLinensByVendor', label: 'FOH Linens by Décor Vendor?' },
                { key: 'taxExempt',         label: 'Tax Exempt? (501c3, gov)' },
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

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>BOH / Disposables ($/Guest)</label>
                <input
                  type="number"
                  className={styles.inputNumber}
                  value={input.bohDisposablesPerGuest}
                  min="0"
                  step="0.5"
                  onChange={(e) => updateInput({ bohDisposablesPerGuest: e.target.value })}
                />
              </div>
            </div>

          </div>

          {/* ── RIGHT: Results ── */}
          <div className={styles.resultsCol}>
            <EquipmentSummaryBar summary={summary} />
            <EquipmentOrderTable summary={summary} />

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
                ⓘ Based on Ridgewells Equipment Calculator v9
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Event brief picker modal ── */}
      <EventBriefSelectorModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelect={selectBrief}
        subtitle="Choose an event to auto-populate the equipment calculator"
      />
    </MuseLayout>
  );
};