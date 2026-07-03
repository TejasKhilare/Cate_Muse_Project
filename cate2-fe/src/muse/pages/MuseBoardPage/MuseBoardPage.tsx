import { Sparkles } from 'lucide-react';
import { MuseLayout }             from '@/muse/components/layout/MuseLayout/MuseLayout';
import { ColorPalette }           from '@/muse/components/muse-board/ColorPalette/ColorPalette';
import { VibeSelector }           from '@/muse/components/muse-board/VibeSelector/VibeSelector';
import { VendorRecommendations }  from '@/muse/components/muse-board/VendorRecommendations/VendorRecommendations';
import { PromptSuggestions }      from '@/muse/components/muse-board/PromptSuggestions/PromptSuggestions';
import { useMuseBoard }           from '@/muse/hooks/muse-board/useMuseBoard';
import styles from './MuseBoardPage.module.css';

export const MuseBoardPage = () => {
  const {
    form,
    updateField,
    updateColor,
    addColor,
    removeColor,
    toggleVibeTag,
    toggleVendor,
    selectAllVendors,
    deselectAllVendors,
    areAllVendorsSelected,
    isGenerating,
    handleGenerate,
  } = useMuseBoard();

  return (
    <MuseLayout>
      <div className={styles.page}>

        {/* ── Page header ── */}
        <div className={styles.pageHeader}>
          <div className={styles.titleRow}>
            <Sparkles size={clampSize()} className={styles.sparkleIcon} aria-hidden="true" />
            <h1 className={styles.pageTitle}>
              Create <em className={styles.museWord}>MUSE</em> Board
            </h1>
          </div>
          <p className={styles.pageSubtitle}>
            Describe the event vision, look directions, and sourcing goals to generate a client-ready mood board.
          </p>
        </div>

        {/* ── 2-column layout ── */}
        <div className={styles.layout}>

          {/* ── LEFT: form sections ── */}
          <div className={styles.formCol}>

            {/* Event Name */}
            <div className={styles.section}>
              <span className={styles.sectionLabel}>EVENT NAME</span>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g., Amalfi Coast Gala, Morrison Wedding, Embassy Spring Soirée"
                value={form.eventName}
                onChange={(e) => updateField('eventName', e.target.value)}
              />
            </div>

            {/* Theme / Design Direction */}
            <div className={styles.section}>
              <span className={styles.sectionLabel}>THEME / DESIGN DIRECTION</span>
              <textarea
                className={styles.textarea}
                placeholder="e.g., Amalfi Coast warmth with elevated tabletop, lemons, bougainvillea, natural texture, and client-ready sourcing"
                rows={4}
                value={form.themeDirection}
                onChange={(e) => updateField('themeDirection', e.target.value)}
              />
            </div>

            {/* Color Palette */}
            <div className={styles.section}>
              <span className={styles.sectionLabel}>COLOR PALETTE (3–6 SWATCHES)</span>
              <ColorPalette
                colors={form.colorPalette}
                onUpdate={updateColor}
                onAdd={addColor}
                onRemove={removeColor}
              />
            </div>

            {/* Vibe Tags */}
            <div className={styles.section}>
              <span className={styles.sectionLabel}>VIBE TAGS</span>
              <VibeSelector
                selected={form.vibeTags}
                onToggle={toggleVibeTag}
              />
            </div>

            {/* Must-Use Items */}
            <div className={styles.section}>
              <span className={styles.sectionLabel}>MUST-USE ITEMS (OPTIONAL)</span>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g., gold chargers, amber goblets, farm tables"
                value={form.mustUseItems}
                onChange={(e) => updateField('mustUseItems', e.target.value)}
              />
            </div>

            {/* Approved Vendors */}
            <div className={styles.section}>
              <VendorRecommendations
                  selected={form.approvedVendors}
                  onToggle={toggleVendor}
                  onSelectAll={selectAllVendors}
                  onDeselectAll={deselectAllVendors}
                  areAllSelected={areAllVendorsSelected}
                />
            </div>

            {/* Guest Count */}
            <div className={styles.section}>
              <div className={styles.guestCountRow}>
                <span className={styles.sectionLabel}>GUEST COUNT (OPTIONAL)</span>
                <input
                  type="number"
                  className={styles.guestCountInput}
                  placeholder="200"
                  min="1"
                  max="99999"
                  step="1"
                  value={form.guestCount}
                  onChange={(e) => updateField('guestCount', e.target.value)}
                />
              </div>
            </div>

          </div>

          {/* ── RIGHT: sticky prompt tips panel ── */}
          <div className={styles.sideCol}>
            <PromptSuggestions />
          </div>

        </div>

        {/* ── Generate button — full width ── */}
        <button
          type="button"
          className={styles.generateBtn}
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          <Sparkles size={17} aria-hidden="true" />
          {isGenerating ? 'Generating…' : 'Generate MUSE Board'}
        </button>

      </div>
    </MuseLayout>
  );
};

// Helper — returns a reasonable icon size (not clamp in JSX props)
function clampSize() {
  return 26;
}