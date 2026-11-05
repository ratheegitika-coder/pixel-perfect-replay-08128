import { describe, expect, it } from "vitest";
import { DEMO_PLACES } from "@/lib/places";
import { buildItinerary, recommendLocal } from "@/lib/planner";

describe("planner", () => {
  it("recommends 5 places", () => {
    expect(recommendLocal(DEMO_PLACES, { location: "Delhi", interests: ["Food"], hours: 8, budget: 1000 })).toHaveLength(5);
  });
  it("puts chosen interests first", () => {
    const r = recommendLocal(DEMO_PLACES, { location: "Delhi", interests: ["Food"], hours: 8, budget: 1000 });
    expect(r.slice(0, 3).every((p) => p.category === "Food")).toBe(true);
  });
  it("itinerary starts at 10:00 and respects budget", () => {
    const it = buildItinerary(DEMO_PLACES.slice(0, 3), 8, 100);
    expect(it.stops[0].start).toBe("10:00");
    expect(it.totalCost).toBeLessThanOrEqual(100);
    expect(it.skipped.map((p) => p.id)).toContain("paranthe-gali");
  });
});
