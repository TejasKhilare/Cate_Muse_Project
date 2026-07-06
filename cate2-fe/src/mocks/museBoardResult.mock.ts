// src/muse/mocks/museBoardResult.mock.ts

import type { MuseBoardResult } from '@/types/museBoard.types';

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`;

export const MOCK_MUSE_BOARD_RESULT: MuseBoardResult = {
  id:             'mb-001',
  eventName:      'Amalfi Coast Gala',
  themeDirection: 'Amalfi Coast warmth with elevated tabletop, lemons, bougainvillea, natural texture, and client-ready sourcing',
  vibeTags:       ['editorial', 'modern', 'rustic', 'minimalist'],
  colorPalette:   ['#DAA520', '#1C1C1C', '#F5F5DC'],
  heroImageUrl:   U('1414235077428-338989a02e84'),
  aiPromptUsed:
    'A stunning editorial photograph of an elegant Amalfi Coast warmth with elevated tabletop, lemons, bougainvillea, natural texture, and client-ready sourcing event tablescape. Color palette featuring #DAA520, #1C1C1C, #F5F5DC. The mood is editorial, modern, rustic, minimalist. Shot from a 45-degree angle with soft natural lighting, shallow depth of field. Professional event photography style, no text or watermarks. Luxury catering aesthetic with fine china, crystal glassware, and fresh florals.',
  supportingImages: [
    U('1519225421980-6b4f8b55f9af'),
    U('1530103862676-de8c9debad1d'),
    U('1464366400600-7168b8af9bc3'),
    U('1555244162-09c340d38b4d'),
    U('1414235077428-338989a02e84'),
    U('1551024739-78b58b3c2024'),
  ],
  products: [
    // LINEN
    {
      id: 'p1', name: 'Navy Velvet Linen', vendor: 'BBJ La Tavola',
      sku: 'BBJ-LIN-NAVY-VEL', price: 95.00, category: 'Linen',
      imageUrl: U('1519225421980-6b4f8b55f9af'),
      colors: ['dark', 'navy'], styles: ['editorial', 'modern'], themes: [],
    },
    {
      id: 'p2', name: 'Gold Jacquard Linen', vendor: 'BBJ La Tavola',
      sku: 'BBJ-LIN-GOLD-JACQ', price: 110.00, category: 'Linen',
      imageUrl: U('1464366400600-7168b8af9bc3'),
      colors: ['gold'], styles: ['editorial'], themes: ['with'],
    },
    {
      id: 'p3', name: 'Ivory Satin Linen', vendor: 'BBJ La Tavola',
      sku: 'BBJ-LIN-IVORY-SAT', price: 65.00, category: 'Linen',
      imageUrl: U('1555244162-09c340d38b4d'),
      colors: ['ivory', 'cream'], styles: [], themes: ['and'],
    },
    // CHARGER
    {
      id: 'p4', name: 'Black & Gold Charger', vendor: 'Party Rental Ltd.',
      sku: 'PRL-CHG-BLKGLD-13', price: 5.25, category: 'Charger',
      imageUrl: U('1414235077428-338989a02e84'),
      colors: ['black', 'gold'], styles: ['modern', 'editorial'], themes: [],
    },
    {
      id: 'p5', name: 'Gold Rim Charger', vendor: 'Party Rental Ltd.',
      sku: 'PRL-CHG-WHTGLD-13', price: 4.50, category: 'Charger',
      imageUrl: U('1530103862676-de8c9debad1d'),
      colors: ['gold'], styles: [], themes: ['with', 'and'],
    },
    {
      id: 'p6', name: 'Natural Wicker Charger', vendor: 'DC Rental',
      sku: 'DCR-CHG-WICKER-NAT', price: 3.50, category: 'Charger',
      imageUrl: U('1414235077428-338989a02e84'),
      colors: [], styles: ['rustic'], themes: ['warmth', 'natural', 'texture'],
    },
    {
      id: 'p7', name: 'Gold Glass Charger', vendor: 'Table Manners DC',
      sku: 'TMDC-CHG-GLASS-GLD', price: 5.00, category: 'Charger',
      imageUrl: U('1551024739-78b58b3c2024'),
      colors: ['gold'], styles: ['modern'], themes: [],
    },
    // GLASSWARE
    {
      id: 'p8', name: 'Gold Rim Coupe Glass', vendor: 'Party Rental Ltd.',
      sku: 'PRL-GLS-COUPE-GLD', price: 3.75, category: 'Glassware',
      imageUrl: U('1519225421980-6b4f8b55f9af'),
      colors: ['gold', 'clear'], styles: ['modern'], themes: ['with'],
    },
    // FURNITURE
    {
      id: 'p9', name: 'Gold Bar Cart', vendor: 'DC Rental',
      sku: 'DCR-FRN-BAR-GOLD', price: 95.00, category: 'Furniture',
      imageUrl: U('1555244162-09c340d38b4d'),
      colors: ['gold'], styles: ['modern', 'editorial'], themes: [],
    },
    {
      id: 'p10', name: 'Gold Chiavari Chair', vendor: 'Party Rental Ltd.',
      sku: 'PRL-FRN-CHVGLD-01', price: 12.00, category: 'Furniture',
      imageUrl: U('1464366400600-7168b8af9bc3'),
      colors: ['gold'], styles: [], themes: ['with'],
    },
    // LIGHTING
    {
      id: 'p11', name: 'Crystal Chandelier', vendor: 'Party Rental Ltd.',
      sku: 'PRL-LGT-CHAND-GLD', price: 350.00, category: 'Lighting',
      imageUrl: U('1530103862676-de8c9debad1d'),
      colors: ['crystal', 'gold'], styles: ['editorial'], themes: [],
    },
    {
      id: 'p12', name: 'Warm String Lights', vendor: 'Party Rental Ltd.',
      sku: 'PRL-LGT-STRING-WRM', price: 45.00, category: 'Lighting',
      imageUrl: U('1414235077428-338989a02e84'),
      colors: ['warm', 'amber'], styles: ['rustic'], themes: [],
    },
    {
      id: 'p13', name: 'Pillar Candle Cluster', vendor: 'DC Rental',
      sku: 'DCR-LGT-CANDLE-PIL', price: 28.00, category: 'Lighting',
      imageUrl: U('1551024739-78b58b3c2024'),
      colors: ['ivory', 'white'], styles: ['rustic', 'minimalist'], themes: [],
    },
    {
      id: 'p14', name: 'Brass Lantern', vendor: 'DC Rental',
      sku: 'DCR-LGT-LANTERN-BRS', price: 32.00, category: 'Lighting',
      imageUrl: U('1519225421980-6b4f8b55f9af'),
      colors: ['brass', 'gold'], styles: ['rustic'], themes: [],
    },
    // FLORALS-ACCENT
    {
      id: 'p15', name: 'Brass Bud Vase', vendor: 'Table Manners DC',
      sku: 'TMDC-ACC-BRASS-VASE', price: 12.00, category: 'Florals-Accent',
      imageUrl: U('1464366400600-7168b8af9bc3'),
      colors: ['gold', 'brass'], styles: ['modern', 'minimalist'], themes: [],
    },
    // OTHER
    {
      id: 'p16', name: 'Matte Black Ceramic Plate', vendor: 'Table Manners DC',
      sku: 'TMDC-PLT-CERAMIC-BLK', price: 6.50, category: 'Other',
      imageUrl: U('1555244162-09c340d38b4d'),
      colors: ['black'], styles: ['modern', 'editorial', 'minimalist'], themes: [],
    },
    {
      id: 'p17', name: 'Marble Serving Tray', vendor: 'Table Manners DC',
      sku: 'TMDC-ACC-MARBLE-TRAY', price: 35.00, category: 'Other',
      imageUrl: U('1530103862676-de8c9debad1d'),
      colors: [], styles: ['modern', 'minimalist', 'editorial'], themes: ['with', 'and'],
    },
    {
      id: 'p18', name: 'Gold Rim Dinner Plate', vendor: 'Table Manners DC',
      sku: 'TMDC-PLT-GOLD-RIM10', price: 5.50, category: 'Other',
      imageUrl: U('1414235077428-338989a02e84'),
      colors: ['gold'], styles: [], themes: ['with'],
    },
  ],
  productCount: 18,
  vendorCount:  4,
  createdAt:    '2026-05-18T14:45:00Z',
};