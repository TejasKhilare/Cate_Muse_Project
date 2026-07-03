export type ServiceStyle =
  | 'Cocktail Reception'
  | 'Plated Dinner'
  | 'Stations & Passed'
  | 'Passed & Buffet Dinner'
  | 'All Day Catering';

export type DayType =
  | 'Standard'
  | 'Sunday/Premium'
  | 'Holiday';

export type BarType =
  | 'Full Bar'
  | 'Beer/Wine Only'
  | 'None';

export type CalculatorMode = 'Standalone' | 'Pull from Event Brief';

export interface StaffInput {
  guestCount:          string;
  serviceStyle:        ServiceStyle;
  eventDurationHours:  string;
  dayType:             DayType;
  numberOfBars:        string;
  barType:             BarType;
  barHours:            string;
  specialtyCocktails:  boolean;
  actionStations:      string;
  setupHoursPreEvent:  string;
  coatCheck:           boolean;
  multiServiceArea:    boolean;
  multiKitchen:        boolean;
  winterHeavyCoats:    boolean;
  staggerServiceStaff: boolean;
}

export interface StaffRole {
  role:         string;
  rationale:    string;
  count:        number;
  hours:        number;
  ratePerHour:  number;
  clientCharge: number;
  hireCost:     number;
  margin:       number;
}

export interface StaffSummary {
  totalStaff:    number;
  clientCharge:  number;
  hireCost:      number;
  grossMargin:   number;
  marginPercent: number;
  activeRoles:   number;
  roles:         StaffRole[];
}

export interface EventBriefOption {
  id:           string;
  name:         string;
  client:       string;
  guests:       number;
  venue:        string;
  date:         string;
  durationHours: number;
  serviceStyle: ServiceStyle;
  barType:      BarType;
  numberOfBars: number;
  status:       'confirmed' | 'in-review' | 'draft';
  notes:        string;
}

export const INITIAL_STAFF_INPUT: StaffInput = {
  guestCount:          '280',
  serviceStyle:        'Plated Dinner',
  eventDurationHours:  '5',
  dayType:             'Standard',
  numberOfBars:        '4',
  barType:             'Full Bar',
  barHours:            '3',
  specialtyCocktails:  false,
  actionStations:      '',
  setupHoursPreEvent:  '',
  coatCheck:           false,
  multiServiceArea:    false,
  multiKitchen:        false,
  winterHeavyCoats:    false,
  staggerServiceStaff: false,
};