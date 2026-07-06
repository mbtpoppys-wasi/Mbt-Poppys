// Stored opening hours, one entry per day of week (0 = Sunday ... 6 = Saturday).
// Kept as data rather than a hardcoded "OPEN 24 HOURS" string so the Open Now
// indicator is computed, not asserted — if hours ever change for one day
// (e.g. a holiday), only this table needs to change.
export interface DayHours {
  opensMinutes: number; // minutes since midnight
  closesMinutes: number; // minutes since midnight; 24:00 == 1440 means "open through midnight"
}

export const OPENING_HOURS: Record<number, DayHours> = {
  0: { opensMinutes: 0, closesMinutes: 1440 },
  1: { opensMinutes: 0, closesMinutes: 1440 },
  2: { opensMinutes: 0, closesMinutes: 1440 },
  3: { opensMinutes: 0, closesMinutes: 1440 },
  4: { opensMinutes: 0, closesMinutes: 1440 },
  5: { opensMinutes: 0, closesMinutes: 1440 },
  6: { opensMinutes: 0, closesMinutes: 1440 },
};

export function isOpenNow(now: Date = new Date()): boolean {
  const day = now.getDay();
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const hours = OPENING_HOURS[day];
  if (!hours) return false;
  return minutesNow >= hours.opensMinutes && minutesNow < hours.closesMinutes;
}

export function isOpen24Hours(): boolean {
  return Object.values(OPENING_HOURS).every(
    (h) => h.opensMinutes === 0 && h.closesMinutes === 1440
  );
}
