// src/muse/utils/mapEventBriefToEquipment.ts

import type { EventBrief } from '@/types/eventBrief.types';
import type {
  EquipmentInput,
  EquipmentEventType,
  EquipmentVenue,
  EquipmentBarType,
  EquipmentSeason,
} from '@/types/equipment.types';

const mapEventType = (raw: string): EquipmentEventType => {
  const s = raw.toLowerCase();
  if (s.includes('cocktail') && s.includes('plated'))                     return 'Cocktail + Plated';
  if (s.includes('cocktail'))                                              return 'Cocktail Reception';
  if (s.includes('buffet'))                                                return 'Buffet';
  if (s.includes('station'))                                               return 'Stations & Passed';
  if (s.includes('all day') || s.includes('conference'))                  return 'All Day Catering';
  if (s.includes('wedding') || s.includes('gala'))                        return 'Cocktail + Plated';
  if (s.includes('seated') || s.includes('dinner') || s.includes('plated')) return 'Plated Dinner';
  return 'Plated Dinner';
};

const mapVenue = (raw: string): EquipmentVenue => {
  const s = raw.toLowerCase();
  if (s.includes('mellon'))                                  return 'Mellon Auditorium';
  if (s.includes('embassy'))                                  return 'Embassy';
  if (s.includes('museum') || s.includes('gallery') || s.includes('smithsonian')) return 'Museum';
  if (s.includes('cathedral') || s.includes('church'))        return 'Cathedral';
  if (s.includes('home') || s.includes('residence'))          return 'Private Home';
  if (s.includes('hotel') || s.includes('ballroom'))           return 'Hotel Ballroom';
  if (s.includes('tent') || s.includes('garden') || s.includes('oaks') || s.includes('outdoor')) return 'Outdoor Tent';
  if (s.includes('sands'))                                    return 'Sands Capital';
  return 'Other';
};

const mapBarType = (raw: string): EquipmentBarType => {
  const s = raw.toLowerCase();
  if (s.includes('none'))                       return 'None';
  if (s.includes('beer') || s.includes('wine')) return 'Beer/Wine Only';
  return 'Full Bar'; // covers "full bar" and "signature cocktails"
};

const deriveSeason = (isoDate: string): EquipmentSeason => {
  const month = new Date(isoDate).getMonth() + 1; // 1–12
  if (month === 11 || month === 12)                return 'Holiday Season';
  if (month === 1 || month === 2 || month === 10)  return 'Fall/Winter';
  return 'Standard';
};

/**
 * Heuristic mapping from a free-text EventBrief to the Equipment Calculator's
 * structured input shape. These rules are easy to adjust once the real
 * backend brief schema is finalized.
 */
export const mapEventBriefToEquipmentInput = (
  brief: EventBrief,
): Partial<EquipmentInput> => {
  const eventType     = mapEventType(brief.eventType);
  const isPlatedStyle = eventType === 'Plated Dinner' || eventType === 'Cocktail + Plated';
  const seated         = isPlatedStyle ? brief.guestCount : 0;
  const bars            = Math.max(1, Math.ceil(brief.guestCount / 150));
  const barHours        = Math.max(1, brief.durationHours - 1);

  return {
    guestCount:         String(brief.guestCount),
    seatedDinnerGuests: String(seated),
    eventType,
    venue:              mapVenue(brief.venue),
    season:             deriveSeason(brief.eventDate),
    serviceMode:        'Full Service',
    numberOfBars:       String(bars),
    barType:            mapBarType(brief.barType),
    barHours:           String(barHours),
  };
};