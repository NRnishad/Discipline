import { format, isBefore, parseISO, startOfDay, subDays } from "date-fns";

export function getTodayKey() {
  return format(new Date(), "yyyy-MM-dd");
}

export function toDateKey(value) {
  if (!value) return getTodayKey();
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }
  return format(new Date(value), "yyyy-MM-dd");
}

export function formatDisplayDate(dateKey) {
  return format(parseISO(dateKey), "EEE, MMM d");
}

export function getPastDateKeys(days, endDate = getTodayKey()) {
  const end = parseISO(endDate);
  return Array.from({ length: days }, (_, index) => {
    const offset = days - 1 - index;
    return format(subDays(end, offset), "yyyy-MM-dd");
  });
}

export function isDateBefore(a, b) {
  return isBefore(startOfDay(parseISO(a)), startOfDay(parseISO(b)));
}

export function createId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function formatMinutes(minutes) {
  const value = Number.isFinite(minutes) ? minutes : 0;
  const rounded = Math.round(value * 10) / 10;
  return `${rounded} min`;
}

export function clampNumber(value, min = 0) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return min;
  return Math.max(min, parsed);
}
