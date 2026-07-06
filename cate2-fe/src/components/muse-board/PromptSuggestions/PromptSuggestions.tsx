import { Sparkles, ChevronRight } from 'lucide-react';
import { Check } from 'lucide-react';
import styles from './PromptSuggestions.module.css';

const PROMPT_TIPS = [
  'Be specific about the event vision and mood',
  'Include color, texture, and material direction',
  'Name key elements like linens, lighting, florals',
  'Specify the number of looks or options',
  'Ask for product pulls using approved vendors',
];

const OUTPUT_ITEMS = [
  'Hero rendering (AI-generated)',
  'Color palette extraction',
  'Product pulls from vendor catalog',
  'Linen, charger, glassware, flatware recs',
  'Sourcing sheet with SKUs & pricing',
];

export const PromptSuggestions = () => (
  <div className={styles.wrapper}>

    {/* Prompt Tips card */}
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <Sparkles size={15} className={styles.sparkle} aria-hidden="true" />
        <span>Prompt Tips</span>
      </div>
      <p className={styles.cardSubtitle}>
        The more detail you provide, the more tailored your board will be.
      </p>
      <ul className={styles.tipList}>
        {PROMPT_TIPS.map((tip) => (
          <li key={tip} className={styles.tipItem}>
            <Check size={13} className={styles.tipCheck} aria-hidden="true" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Output Includes card */}
    <div className={styles.card}>
      <div className={styles.outputTitle}>Output Includes</div>
      <ul className={styles.outputList}>
        {OUTPUT_ITEMS.map((item) => (
          <li key={item} className={styles.outputItem}>
            <ChevronRight size={13} className={styles.outputArrow} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

  </div>
);