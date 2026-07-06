import type {
  EquipmentInput,
  EquipmentLineItem,
  EquipmentSummary,
} from '@/types/equipment.types';

const MARKUP      = 0.35;
const DAMAGE_PCT  = 0.07;
const DELIVERY    = 750;
const SALES_TAX   = 0.06;

function item(
  category: string,
  name: string,
  note: string,
  qty: number,
  unitCost: number,
): EquipmentLineItem {
  return {
    category,
    item:      name,
    note,
    qty:       Math.max(0, Math.round(qty)),
    unitCost,
    lineTotal: parseFloat((Math.max(0, Math.round(qty)) * unitCost).toFixed(2)),
  };
}

export const calculateEquipment = (input: EquipmentInput): EquipmentSummary => {
  const g      = parseInt(input.guestCount)         || 0;
  const seated = parseInt(input.seatedDinnerGuests) || 0;
  const bars   = parseInt(input.numberOfBars)       || 0;
  const highs  = parseInt(input.highTopTables)      || 0;
  const hd     = parseInt(input.horsOeuvreTypes)    || 0;
  const tables = Math.ceil(seated / 10);

  const isPlated   = input.eventType === 'Plated Dinner' || input.eventType === 'Cocktail + Plated';
  const isBuffet   = input.eventType === 'Buffet' || input.eventType === 'All Day Catering';
  const hasBar     = input.barType !== 'None' && bars > 0;

  const items: EquipmentLineItem[] = [];

  // ── COAT CHECK ────────────────────────────────────────────────
  if (input.coatCheck) {
    items.push(item('COAT CHECK', "Table-Round 3'", '108" twill', 1, 9.25));
    items.push(item('COAT CHECK', "Table-Rectangular 30\" x 6'", '90"x132"', 1, 9.75));
    items.push(item('COAT CHECK', 'Coat Hangers', '70% of guest count', Math.ceil(g * 0.7), 0.50));
    if (input.coatCheckPipeDrape) {
      items.push(item('COAT CHECK', 'Pipe & Drape Kit', '8ft panels', 4, 45.00));
    }
  }

  // ── HIGH TOPS ─────────────────────────────────────────────────
  if (highs > 0) {
    items.push(item('HIGH TOPS', "Table-Cab-Pole 42\" Tall", '', highs, 12.25));
    if (!input.fohLinensByVendor) {
      items.push(item('HIGH TOPS', 'Linen 132" Round (Cab)', 'Suppressed if FOH linens by vendor', highs + Math.ceil(highs * 0.2), 29.00));
    }
    items.push(item('HIGH TOPS', 'Votive-Straight (Cab)', '2 per cab', highs * 2, 1.80));
  }

  // ── PASSED HD (Hors d'Oeuvre) ─────────────────────────────────
  if (hd > 0) {
    items.push(item('PASSED HD', 'Ceramic Square Plate 9.5"x9.5"', '2/type + extras', hd * 2 + 5, 1.40));
    items.push(item('PASSED HD', 'Ceramic Rectangle Platter 15.5"x5"', '2/type minimum', Math.max(hd * 2, hd), 13.25));
  }

  // ── PLATED TABLES ─────────────────────────────────────────────
  if (isPlated && tables > 0) {
    items.push(item('PLATED - TABLES', "Table-Round 6' (Seating)", '+1 extra', tables + 1, 14.25));
    items.push(item('PLATED - TABLES', 'Felt Pad 80" Round Ivory', '1 per table', tables, 7.00));
    if (!input.fohLinensByVendor) {
      items.push(item('PLATED - TABLES', 'Linen 132" Round (Dinner)', '', tables + Math.ceil(tables * 0.05), 29.00));
    }
  }

  // ── PLACE SETTINGS ────────────────────────────────────────────
  if (isPlated) {
    const ps = seated + 10; // +10 backup
    items.push(item('PLACE SETTINGS', 'Baseplate', '+10 backup', ps, 5.95));
    items.push(item('PLACE SETTINGS', 'Salad Fork', 'Plated: 2x', seated * 2, 1.30));
    items.push(item('PLACE SETTINGS', 'Salad Knife', '', seated, 1.30));
    items.push(item('PLACE SETTINGS', 'Dinner Fork', '', seated, 1.30));
    items.push(item('PLACE SETTINGS', 'Dinner Knife', '', seated, 1.30));
    items.push(item('PLACE SETTINGS', 'Dessert Spoon', '', seated, 1.30));
    items.push(item('PLACE SETTINGS', 'Butter Knife', '1/table + 5', tables + 5, 1.30));
    items.push(item('PLACE SETTINGS', 'Teaspoon', 'Coffee + dessert', seated, 1.30));
    items.push(item('PLACE SETTINGS', 'Napkin Twill White 20"x20"', '', seated, 1.30));
  }

  // ── GLASSWARE ─────────────────────────────────────────────────
  {
    const gw = isPlated ? seated : g;
    items.push(item('GLASSWARE', 'City Red Wine 12oz', '', gw, 1.30));
    items.push(item('GLASSWARE', 'City Water/Bordeaux 18oz', '', gw, 1.30));
    items.push(item('GLASSWARE', 'City White Wine 8oz', '', gw, 1.30));
    if (isPlated) {
      items.push(item('GLASSWARE', 'A/P Water Pitcher 61oz', '1 per table', tables, 4.30));
      items.push(item('GLASSWARE', 'Water Pitcher Plastic 64oz (Ice)', '1 per table', tables, 4.65));
    }
    if (input.specialtyChampagneFlute) {
      items.push(item('GLASSWARE', 'Champagne Flute Specialty', '1 per guest', g, 2.50));
    }
  }

  // ── BAR ───────────────────────────────────────────────────────
  if (hasBar) {
    const barGlass = Math.ceil(g * 1.25);
    items.push(item('BAR', 'Rocks Glass 10oz', '30% of bar glass total', Math.ceil(barGlass * 0.30), 1.10));
    items.push(item('BAR', 'Highball Glass 12oz', '40% of bar glass total', Math.ceil(barGlass * 0.40), 1.10));
    items.push(item('BAR', 'Wine Glass (Bar) 12oz', '30% of bar glass total', Math.ceil(barGlass * 0.30), 1.30));
    items.push(item('BAR', "Bar Table 6'", '1 per bar', bars, 14.25));
    if (!input.fohLinensByVendor) {
      items.push(item('BAR', 'Bar Linen 90"x132"', '', bars + 1, 29.00));
    }
  }

  // ── TABLE TOP ─────────────────────────────────────────────────
  if (isPlated) {
    items.push(item('TABLE TOP', 'Table Stand SS 14" w/ Number', '1/table + 5', tables + 5, 6.25));
    items.push(item('TABLE TOP', 'Votive-Straight (Dinner)', '5 per table', tables * 5, 1.80));
  }

  // ── SEATING ───────────────────────────────────────────────────
  if (isPlated) {
    items.push(item('SEATING', 'Chiavari Chair (Dinner)', '+5 extras', seated + 5, 8.25));
    items.push(item('SEATING', 'Chair Felt Tips', '4 per chair — venue required', (seated + 5) * 4, 0.21));
  }

  // ── SERVICE ───────────────────────────────────────────────────
  if (isPlated) {
    const svcTables = Math.ceil(tables / 4);
    items.push(item('SERVICE', "Table-Rectangular 18\" x 6'", '1 per 3-5 tables', svcTables, 8.75));
    items.push(item('SERVICE', 'Silver Tray Round 15"', '1 per service station', svcTables, 9.75));
    items.push(item('SERVICE', 'S & P Shaker Silver Tip', '2 per station', svcTables * 2, 2.50));
    items.push(item('SERVICE', 'Silver Water Pitcher Euro', '1 per table', tables, 8.75));
  }

  // ── COFFEE & TEA ──────────────────────────────────────────────
  if (input.coffeeService) {
    const coffeeG = isPlated ? seated : g;
    if (input.coffeeStyle === 'Tableside') {
      items.push(item('COFFEE & TEA', 'White Tea Cup', 'Tableside: 1/guest+10', coffeeG + 10, 0.75));
      items.push(item('COFFEE & TEA', 'White Tea Saucer', 'Match tea cup', coffeeG + 10, 0.75));
      items.push(item('COFFEE & TEA', 'Coffee Pourer 64oz (Regular)', '1/table', tables, 8.75));
      items.push(item('COFFEE & TEA', 'Coffee Pourer 64oz (Decaf)', '1/2 tables', Math.ceil(tables / 2), 8.75));
      items.push(item('COFFEE & TEA', 'Coffee Pourer 64oz (Hot Water)', '1/4 tables', Math.ceil(tables / 4), 8.75));
    } else {
      items.push(item('COFFEE & TEA', 'Coffee Urn 100-cup', '1 per station', Math.ceil(coffeeG / 100), 35.00));
      items.push(item('COFFEE & TEA', 'White Tea Cup', 'Station: 1/guest', coffeeG, 0.75));
      items.push(item('COFFEE & TEA', 'White Tea Saucer', 'Match tea cup', coffeeG, 0.75));
    }
    if (input.teaService) {
      items.push(item('COFFEE & TEA', 'Coffee Kit (Box for Tea)', 'Tea bags', Math.ceil(tables / 10), 5.00));
    }
  }

  // ── BOH KITCHEN ───────────────────────────────────────────────
  if (input.serviceMode === 'Full Service') {
    const crescorCount = isPlated
      ? Math.ceil(seated / 40) + 2
      : Math.ceil(g / 50) + 1;
    items.push(item('BOH - KITCHEN', 'Crescor w/ 10 Pans + 6 Sterno', 'Plated:1/40+2 | Buffet:1/50+1', crescorCount, 87.50));
    items.push(item('BOH - KITCHEN', 'Sterno Grill', 'Menu-dependent', Math.ceil(crescorCount * 0.55), 41.20));
    items.push(item('BOH - KITCHEN', 'Xtra Gel Sterno', '6 per Sterno Grill', Math.ceil(crescorCount * 0.55) * 6, 3.10));
  }

  // ── BOH DISPOSABLES ───────────────────────────────────────────
  const bohDispo = parseFloat(input.bohDisposablesPerGuest) || 0;
  if (bohDispo > 0) {
    items.push(item('BOH - DISPOSABLES', 'Disposables Package', `$${bohDispo}/guest`, g, bohDispo));
  }

  // ── Totals ────────────────────────────────────────────────────
  const filteredItems = items.filter((i) => i.qty > 0);
  const subtotal      = filteredItems.reduce((s, i) => s + i.lineTotal, 0);
  const markup        = subtotal * MARKUP;
  const damageWaiver  = subtotal * DAMAGE_PCT;
  const delivery      = DELIVERY;
  const bohConsumables= isBuffet ? 1500 : subtotal > 15000 ? 1500 : 750;
  const preTaxTotal   = subtotal + markup + damageWaiver + delivery + bohConsumables;
  const salesTaxAmt   = input.taxExempt ? 0 : preTaxTotal * SALES_TAX;
  const grandTotal    = preTaxTotal + salesTaxAmt;

  return {
    subtotal:       parseFloat(subtotal.toFixed(2)),
    markup:         parseFloat(markup.toFixed(2)),
    preTaxTotal:    parseFloat(preTaxTotal.toFixed(2)),
    grandTotal:     parseFloat(grandTotal.toFixed(2)),
    damageWaiver:   parseFloat(damageWaiver.toFixed(2)),
    delivery,
    bohConsumables,
    salesTax:       parseFloat(salesTaxAmt.toFixed(2)),
    lineItemCount:  filteredItems.length,
    items:          filteredItems,
  };
};