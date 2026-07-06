import type { StaffInput, StaffRole, StaffSummary } from '@/types/staff.types';

// Ridgewells Staff Calculator v9 ratios
const RATES: Record<string, { client: number; hire: number }> = {
  'Server Supervisor':     { client: 78.50, hire: 36.00 },
  'Captain':               { client: 63.50, hire: 32.00 },
  'Dinner Server':         { client: 51.50, hire: 24.80 },
  'Passing/Clearing Server':{ client: 51.50, hire: 24.80 },
  'Coat Check Attendant':  { client: 45.50, hire: 21.00 },
  'Bar Manager':           { client: 61.50, hire: 29.40 },
  'Bartender (Full Bar)':  { client: 56.50, hire: 29.00 },
  'Bartender (Beer/Wine)': { client: 51.50, hire: 24.00 },
  'Bar Back':              { client: 56.50, hire: 22.40 },
  'Kitchen Supervisor':    { client: 78.50, hire: 36.00 },
  'Kitchen Lead':          { client: 55.50, hire: 36.00 },
  'Kitchen Assistant':     { client: 51.50, hire: 26.00 },
  'Pantry Attendant':      { client: 46.50, hire: 24.00 },
  'Kitchen Expeditor':     { client: 51.50, hire: 24.00 },
  'Staff Manager':         { client: 51.50, hire: 32.00 },
};

function makeRole(
  role: string,
  rationale: string,
  count: number,
  hours: number,
): StaffRole {
  const rate   = RATES[role] ?? { client: 51.50, hire: 24.80 };
  const client = parseFloat((count * hours * rate.client).toFixed(2));
  const hire   = parseFloat((count * hours * rate.hire).toFixed(2));
  return {
    role, rationale, count, hours,
    ratePerHour:  rate.client,
    clientCharge: client,
    hireCost:     hire,
    margin:       parseFloat((client - hire).toFixed(2)),
  };
}

export const calculateStaffRoles = (input: StaffInput): StaffSummary => {
  const g     = parseInt(input.guestCount)          || 0;
  const hours = parseFloat(input.eventDurationHours) || 0;
  const bars  = parseInt(input.numberOfBars)         || 0;
  const barH  = parseFloat(input.barHours)           || 0;
  const svcH  = hours + 1; // service hours = event + 1 setup

  const roles: StaffRole[] = [];

  // ── Server Supervisor ──────────────────────────────────────────
  {
    let count = 1;
    if (input.multiServiceArea) count += 1;
    roles.push(makeRole(
      'Server Supervisor',
      'From ratios; +1 if Multi-Service-Area',
      count, svcH,
    ));
  }

  // ── Captain ───────────────────────────────────────────────────
  {
    let count = Math.max(1, Math.ceil(g / 100));
    if (input.multiServiceArea) count += 1;
    if (bars > 1) count += Math.floor((bars - 1) / 4);
    roles.push(makeRole(
      'Captain',
      'From ratios; +1 MSA; +1 per 4 bars beyond first',
      count, svcH,
    ));
  }

  // ── Service staff based on style ──────────────────────────────
  const isPlated = input.serviceStyle === 'Plated Dinner' ||
                   input.serviceStyle === 'Passed & Buffet Dinner' ||
                   input.serviceStyle === 'All Day Catering';

  if (isPlated) {
    const tables  = Math.ceil(g / 10);
    roles.push(makeRole(
      'Dinner Server',
      '1 per 10 guests (1 per table)',
      tables, svcH - 1,
    ));
  } else {
    const servers = Math.ceil(g / 25);
    roles.push(makeRole(
      'Passing/Clearing Server',
      'From ratios by service style',
      servers, svcH,
    ));
  }

  // ── Coat Check ────────────────────────────────────────────────
  if (input.coatCheck || input.winterHeavyCoats) {
    const count = g < 200 ? 1 : g < 500 ? 2 : 3;
    const extra = input.winterHeavyCoats ? 2 : 0;
    roles.push(makeRole(
      'Coat Check Attendant',
      'Bracket: <200=1, 200-499=2, 500+=3; ×2 winter',
      count + extra, svcH,
    ));
  }

  // ── Bar Manager ───────────────────────────────────────────────
  if (input.barType !== 'None' && bars > 0) {
    if (g >= 500 || bars >= 4 || input.specialtyCocktails) {
      roles.push(makeRole(
        'Bar Manager',
        'Fires at 500+ guests, 4+ bars, or specialty cocktails',
        1, barH + 2,
      ));
    }

    // ── Bartenders ────────────────────────────────────────────
    if (input.barType === 'Full Bar') {
      const count = Math.max(bars, Math.ceil(g / 65));
      roles.push(makeRole(
        'Bartender (Full Bar)',
        'MAX(floor × bars, 1 per 65 guests)',
        count, barH + 1,
      ));
    } else if (input.barType === 'Beer/Wine Only') {
      const count = Math.max(bars, Math.ceil(g / 80));
      roles.push(makeRole(
        'Bartender (Beer/Wine)',
        '1 per 80 guests or 1 per bar',
        count, barH + 1,
      ));
    }

    // ── Bar Back ─────────────────────────────────────────────
    if (g >= 200) {
      const count = 1 + (input.multiServiceArea ? 1 : 0);
      roles.push(makeRole(
        'Bar Back',
        '1 if 200+ guests; +1 if MSA',
        count, barH + 2,
      ));
    }
  }

  // ── Kitchen ───────────────────────────────────────────────────
  {
    let kitSup = 1;
    if (input.multiKitchen) kitSup += 1;
    roles.push(makeRole('Kitchen Supervisor', 'From ratios; +1 if Multi-Kitchen', kitSup, svcH + 2));
  }

  if (g < 1000) {
    roles.push(makeRole('Kitchen Lead', 'From ratios; zeroes at 1,000+ (folds into KitSup)', 1, svcH + 2));
  }

  {
    let kitAss = Math.ceil(g / 40);
    if (input.multiKitchen) kitAss += 2;
    roles.push(makeRole('Kitchen Assistant', 'From ratios; +2 if Multi-Kitchen', kitAss, svcH));
  }

  if (g >= 200) {
    roles.push(makeRole('Pantry Attendant', 'Fires at 200+ guests; from ratios', Math.ceil(g / 140), svcH));
  }

  if (g < 1000) {
    roles.push(makeRole('Kitchen Expeditor', 'From ratios; zeroes at 1,000+', 1, svcH));
  }

  // ── Staff Manager ─────────────────────────────────────────────
  {
    const total   = roles.reduce((s, r) => s + r.count, 0);
    const smCount = total >= 50 ? 2 : total >= 30 ? 1 : 0;
    if (smCount > 0) {
      roles.push(makeRole('Staff Manager', '1 if 30+ staff; 2 if 50+; zero at 1,000+', smCount, svcH + 2));
    }
  }

  const filteredRoles = roles.filter((r) => r.count > 0);

  const totalStaff   = filteredRoles.reduce((s, r) => s + r.count, 0);
  const clientCharge = filteredRoles.reduce((s, r) => s + r.clientCharge, 0);
  const hireCost     = filteredRoles.reduce((s, r) => s + r.hireCost, 0);
  const grossMargin  = clientCharge - hireCost;
  const marginPct    = clientCharge > 0 ? (grossMargin / clientCharge) * 100 : 0;

  return {
    totalStaff,
    clientCharge:  parseFloat(clientCharge.toFixed(2)),
    hireCost:      parseFloat(hireCost.toFixed(2)),
    grossMargin:   parseFloat(grossMargin.toFixed(2)),
    marginPercent: parseFloat(marginPct.toFixed(1)),
    activeRoles:   filteredRoles.length,
    roles:         filteredRoles,
  };
};