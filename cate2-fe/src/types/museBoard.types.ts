// src/muse/types/museBoard.types.ts

// ── Tab type ───────────────────────────────────────────────────
export type MuseBoardTab = 'inspiration' | 'products' | 'palette';

// ── Vibe tags ──────────────────────────────────────────────────
export type VibeTag =
  | 'editorial'
  | 'romantic'
  | 'modern'
  | 'rustic'
  | 'opulent'
  | 'minimalist'
  | 'organic'
  | 'classic';

export const VIBE_TAGS: VibeTag[] = [
  'editorial', 'romantic', 'modern',      'rustic',
  'opulent',   'minimalist', 'organic',   'classic',
];

// ── Approved vendors ───────────────────────────────────────────
export const APPROVED_VENDORS: string[] = [
  'Party Rental Ltd.',
  'Perfect Settings',
  'DC Rental',
  'BBJ La Tavola',
  'Table Manners DC',
  'Nuage',
  'Something Vintage',
];

// ── Form data ──────────────────────────────────────────────────
export interface MuseBoardFormData {
  eventName:       string;
  themeDirection:  string;
  colorPalette:    string[];
  vibeTags:        VibeTag[];
  mustUseItems:    string;
  approvedVendors: string[];
  guestCount:      string;
}

export const INITIAL_MUSE_BOARD_FORM: MuseBoardFormData = {
  eventName:       '',
  themeDirection:  '',
  colorPalette:    ['#DAA520', '#1C1C1C', '#907b47'],
  vibeTags:        [],
  mustUseItems:    '',
  approvedVendors: [],
  guestCount:      '',
};

// ── Board result product ───────────────────────────────────────
export interface MuseBoardProduct {
  id:       string;
  name:     string;
  vendor:   string;
  sku:      string;
  price:    number;
  category: string;
  imageUrl: string;
  colors:   string[];
  styles:   string[];
  themes:   string[];
}

// ── Board result ───────────────────────────────────────────────
export interface MuseBoardResult {
  id:               string;
  eventName:        string;
  themeDirection:   string;
  vibeTags:         string[];
  colorPalette:     string[];
  heroImageUrl:     string | null;
  aiPromptUsed:     string;
  supportingImages: string[];
  products:         MuseBoardProduct[];
  productCount:     number;
  vendorCount:      number;
  createdAt:        string;
}