export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style:                 'currency',
    currency:              'USD',
    maximumFractionDigits: 0,
  }).format(value);
// formatCurrency(84200)  → "$84,200"
// formatCurrency(192000) → "$192,000"

export const formatEventDate = (iso: string): string => {
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day:   'numeric',
    year:  'numeric',
  });
};
// formatEventDate("2026-06-22") → "Jun 22, 2026"

export const formatGuestCount = (count: number): string =>
  count.toLocaleString('en-US');
// formatGuestCount(1200) → "1,200"