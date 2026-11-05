import type { Place, Preferences } from "./places";

/** Local fallback ranking: interests first, then hidden-gem score, within budget/time. */
export function recommendLocal(places: Place[], prefs: Preferences, count = 5): Place[] {
  const wanted = new Set(prefs.interests);
  const maxMinutes = prefs.hours * 60;
  return [...places]
    .filter((p) => p.cost <= prefs.budget && p.duration <= maxMinutes)
    .map((p) => ({ p, score: p.gemScore + (wanted.size === 0 || wanted.has(p.category) ? 100 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((x) => x.p);
}

export type Stop = { place: Place; start: string };
export type Itinerary = { stops: Stop[]; skipped: Place[]; totalMinutes: number; totalCost: number };

const TRAVEL_MIN = 20;

function fmt(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Sequential itinerary from 10:00 with 20-min travel between stops, capped by time and budget. */
export function buildItinerary(places: Place[], hours: number, budget: number, startMinutes = 600): Itinerary {
  const stops: Stop[] = [];
  const skipped: Place[] = [];
  let clock = startMinutes;
  let used = 0;
  let cost = 0;
  for (const p of places) {
    const travel = stops.length ? TRAVEL_MIN : 0;
    if (used + travel + p.duration > hours * 60 || cost + p.cost > budget) {
      skipped.push(p);
      continue;
    }
    clock += travel;
    used += travel;
    stops.push({ place: p, start: fmt(clock) });
    clock += p.duration;
    used += p.duration;
    cost += p.cost;
  }
  return { stops, skipped, totalMinutes: used, totalCost: cost };
}
