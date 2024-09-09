import { isFriday, isMonday, isSaturday, isSunday, isThursday, isTuesday, isWednesday } from "date-fns";

export const DAYSFORM = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const
export const DAYSPL = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Niedz"]
export const dayCheckers: Record<string, (date: Date) => boolean> = {
  mon: isMonday,
  tue: isTuesday,
  wed: isWednesday,
  thu: isThursday,
  fri: isFriday,
  sat: isSaturday,
  sun: isSunday,
};