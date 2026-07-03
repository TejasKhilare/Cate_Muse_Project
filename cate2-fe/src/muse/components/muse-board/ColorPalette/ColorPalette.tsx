import { useState, useRef, useEffect } from 'react';
import { ColorPicker } from 'antd';
import type { Color } from 'antd/es/color-picker';
import styles from './ColorPalette.module.css';

interface ColorPaletteProps {
  colors:   string[];
  onUpdate: (index: number, hex: string) => void;
  onAdd:    () => void;
  onRemove: (index: number) => void;
}

export const ColorPalette = ({
  colors,
  onUpdate,
  onAdd,
  onRemove,
}: ColorPaletteProps) => {
  /*
   * Single flat row — all swatches same size, same height.
   * Last swatch = active (has color picker).
   * Confirmed swatches = all except last (no picker, only × remove).
   * "+" sits after last swatch, hidden when colors.length >= 6.
   *
   * Max total swatches = 6. When 6 reached, both active picker
   * and "+" are hidden — last swatch becomes confirmed too.
   */

  const activeIndex       = colors.length - 1;
  const isAtMax           = colors.length >= 7;

  // Track which index has picker open — only activeIndex can open
  const [pickerOpen, setPickerOpen] = useState(false);

  // Track previous length to detect when "+" was clicked
  const prevLengthRef = useRef(colors.length);

  useEffect(() => {
    // Auto-open picker only when length increases (user clicked "+")
    if (colors.length > prevLengthRef.current) {
      setPickerOpen(true);
    }
    prevLengthRef.current = colors.length;
  }, [colors.length]);

  const handleColorChange = (color: Color) => {
    onUpdate(activeIndex, `#${color.toHex()}`);
  };

  const handleAdd = () => {
    if (isAtMax) return;
    setPickerOpen(false);  // close current picker first
    onAdd();               // parent adds new color → length increases → useEffect opens picker
  };

  const handleRemove = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (index === activeIndex) setPickerOpen(false);
    onRemove(index);
  };

  return (
    <div className={styles.row}>

      {colors.map((hex, index) => {
        const isActive    = index === activeIndex && !isAtMax;
        const isConfirmed = !isActive;

        return (
          <div key={index} className={styles.swatchItem}>

            {isActive ? (
              /* Active swatch — has color picker */
              <ColorPicker
                value={hex}
                onChange={handleColorChange}
                open={pickerOpen}
                onOpenChange={setPickerOpen}
                showText={false}
                disabledAlpha
                getPopupContainer={() => document.body}
                trigger="click"
              >
                <div className={styles.swatchWrapper}>
                  <button
                    type="button"
                    className={styles.swatch}
                    style={{ background: hex }}
                    aria-label={`Edit color ${hex}`}
                    onClick={() => setPickerOpen((v) => !v)}
                  />
                  {/* Remove only if more than 1 swatch */}
                  {colors.length > 1 && (
                    <button
                      type="button"
                      className={styles.removeBtn}
                      aria-label={`Remove color ${hex}`}
                      onClick={(e) => handleRemove(index, e)}
                    >
                      ×
                    </button>
                  )}
                </div>
              </ColorPicker>
            ) : (
              /* Confirmed swatch — no picker, only × remove */
              <div className={styles.swatchWrapper}>
                <div
                  className={styles.swatch}
                  style={{ background: hex }}
                  role="img"
                  aria-label={`Color ${hex}`}
                />
                {colors.length > 1 && (
                  <button
                    type="button"
                    className={styles.removeBtn}
                    aria-label={`Remove color ${hex}`}
                    onClick={(e) => handleRemove(index, e)}
                  >
                    ×
                  </button>
                )}
              </div>
            )}

            <span className={styles.hexLabel}>{hex.toUpperCase()}</span>
          </div>
        );
      })}

      {/* "+" button — hidden when at max (6 swatches) */}
      {!isAtMax && (
        <div className={styles.addItem}>
          <button
            type="button"
            className={styles.addBtn}
            onClick={handleAdd}
            aria-label="Add color"
          >
            +
          </button>
        </div>
      )}

    </div>
  );
};