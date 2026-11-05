import { createFileRoute, Link } from "@tanstack/react-router";
import { X, Clock, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/SiteNav";
import { LazyMap } from "@/components/LazyMap";
import { useStore } from "@/lib/store";
import { buildItinerary } from "@/lib/planner";

export const Route = createFileRoute("/route")({
  head: () => ({
    meta: [
      { title: "Your smart route — LocalLens AI" },
      { name: "description", content: "A timed itinerary of your chosen hidden gems that fits your time and budget." },
      { property: "og:title", content: "Your smart route — LocalLens AI" },
      { property: "og:description", content: "A timed itinerary of your chosen hidden gems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SmartRoute,
});

function SmartRoute() {
  const { route, prefs, removeFromRoute } = useStore();
  const it = buildItinerary(route, prefs.hours, prefs.budget);
  const h = Math.floor(it.totalMinutes / 60);
  const m = it.totalMinutes % 60;

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-5 py-12">
        <h1 className="text-4xl font-semibold md:text-5xl">Your smart route</h1>
        <p className="mt-2 text-muted-foreground">Planned for {prefs.hours} hours and ₹{prefs.budget}, starting at 10:00.</p>

        {route.length === 0 ? (
          <div className="mt-12 rounded-3xl border bg-card p-10 text-center">
            <p className="text-lg">No places added yet.</p>
            <Button asChild className="mt-5 rounded-full"><Link to="/explore">Find hidden gems</Link></Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-ink p-5 text-ink-foreground">
                  <Clock className="h-5 w-5 text-gold" /><p className="mt-2 text-3xl font-semibold">{h}h {m}m</p><p className="text-sm opacity-70">Total time</p>
                </div>
                <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
                  <Wallet className="h-5 w-5" /><p className="mt-2 text-3xl font-semibold">₹{it.totalCost}</p><p className="text-sm opacity-80">Estimated cost</p>
                </div>
              </div>
              <ol className="relative space-y-6 border-l-2 border-primary/30 pl-6">
                {it.stops.map((s, i) => (
                  <li key={s.place.id} className="animate-rise relative" style={{ animationDelay: `${i * 80}ms` }}>
                    <span className="absolute -left-[33px] top-1 grid h-4 w-4 place-items-center rounded-full bg-primary ring-4 ring-background" />
                    <p className="font-display text-2xl font-semibold text-primary">{s.start}</p>
                    <div className="mt-1 flex items-start justify-between gap-3">
                      <div>
                        <Link to="/place/$id" params={{ id: s.place.id }} className="text-lg font-semibold hover:underline">{s.place.name}</Link>
                        <p className="text-sm text-muted-foreground">{s.place.category} · {s.place.duration} min · {s.place.cost === 0 ? "Free" : `₹${s.place.cost}`}</p>
                      </div>
                      <Button variant="ghost" size="icon" aria-label={`Remove ${s.place.name}`} onClick={() => removeFromRoute(s.place.id)}><X className="h-4 w-4" /></Button>
                    </div>
                  </li>
                ))}
              </ol>
              {it.skipped.length > 0 && (
                <div className="mt-8 rounded-2xl border border-dashed p-4 text-sm">
                  <p className="font-semibold">Didn't fit your time or budget:</p>
                  <ul className="mt-2 space-y-1">
                    {it.skipped.map((p) => (
                      <li key={p.id} className="flex items-center justify-between text-muted-foreground">
                        {p.name}
                        <button className="text-xs underline" onClick={() => removeFromRoute(p.id)}>Remove</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="h-[460px] lg:sticky lg:top-24"><LazyMap places={it.stops.map((s) => s.place)} /></div>
          </div>
        )}
      </main>
    </div>
  );
}
