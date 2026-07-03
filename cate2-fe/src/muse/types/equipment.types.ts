export type EquipmentEventType =
  | 'Plated Dinner'
  | 'Cocktail + Plated'
  | 'Cocktail Reception'
  | 'Buffet'
  | 'Stations & Passed'
  | 'All Day Catering';

export type EquipmentVenue =
  | 'Mellon Auditorium'
  | 'Museum'
  | 'Cathedral'
  | 'Embassy'
  | 'Private Home'
  | 'Hotel Ballroom'
  | 'Outdoor Tent'
  | 'Sands Capital'
  | 'Other';

export type EquipmentSeason =
  | 'Standard'
  | 'Fall/Winter'
  | 'Holiday Season';

export type EquipmentServiceMode =
  | 'Full Service'
  | 'Drop-off/Delivered';

export type EquipmentBarType =
  | 'Full Bar'
  | 'Beer/Wine Only'
  | 'None';

export type EquipmentCoffeeStyle =
  | 'Tableside'
  | 'Station';

export interface EquipmentInput {
  guestCount:              string;
  seatedDinnerGuests:      string;
  eventType:               EquipmentEventType;
  venue:                   EquipmentVenue;
  season:                  EquipmentSeason;
  serviceMode:             EquipmentServiceMode;
  numberOfBars:            string;
  barType:                 EquipmentBarType;
  barHours:                string;
  specialtyChampagneFlute: boolean;
  highTopTables:           string;
  horsOeuvreTypes:         string;
  coatCheck:               boolean;
  coatCheckPipeDrape:      boolean;
  coffeeService:           boolean;
  coffeeStyle:             EquipmentCoffeeStyle;
  teaService:              boolean;
  cakeService:             boolean;
  champagneToast:          boolean;
  fohLinensByVendor:       boolean;
  taxExempt:               boolean;
  bohDisposablesPerGuest:  string;
}

export interface EquipmentLineItem {
  category:  string;
  item:      string;
  note:      string;
  qty:       number;
  unitCost:  number;
  lineTotal: number;
}

export interface EquipmentSummary {
  subtotal:       number;
  markup:         number;
  preTaxTotal:    number;
  grandTotal:     number;
  damageWaiver:   number;
  delivery:       number;
  bohConsumables: number;
  salesTax:       number;
  lineItemCount:  number;
  items:          EquipmentLineItem[];
}

export const INITIAL_EQUIPMENT_INPUT: EquipmentInput = {
  guestCount:              '500',
  seatedDinnerGuests:      '280',
  eventType:               'Cocktail + Plated',
  venue:                   'Mellon Auditorium',
  season:                  'Standard',
  serviceMode:             'Full Service',
  numberOfBars:            '4',
  barType:                 'Full Bar',
  barHours:                '3',
  specialtyChampagneFlute: false,
  highTopTables:           '10',
  horsOeuvreTypes:         '4',
  coatCheck:               false,
  coatCheckPipeDrape:      false,
  coffeeService:           false,
  coffeeStyle:             'Tableside',
  teaService:              false,
  cakeService:             false,
  champagneToast:          false,
  fohLinensByVendor:       false,
  taxExempt:               false,
  bohDisposablesPerGuest:  '3',
};