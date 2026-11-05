import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Sparkles, MapPin } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteNav } from "@/components/SiteNav";
import { PlaceCard } from "@/components/PlaceCard";
import { LazyMap } from "@/components/LazyMap";
import { INTERESTS, type Interest } from "@/lib/places";
import { useStore } from "@/lib/store";
import { discoverPlaces } from "@/lib/ai.functions";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore hidden gems — LocalLens AI" },
      { name: "description", content: "Enter your location, interests, time and budget to get 5 AI-picked hidden local places." },
      { property: "og:title", content: "Explore hidden gems — LocalLens AI" },
      { property: "og:description", content: "AI-picked hidden local places based on your interests, time and budget." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Explore,
});

function Explore() {
  const store = useStore();
  const [form, setForm] = useState(store.prefs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const discover = useServerFn(discoverPlaces);

  const toggle = (i: Interest) =>
    setForm((f) => ({ ...f, interests: f.interests.includes(i) ? f.interests.filter((x) => x !== i) : [...f.interests, i] }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.location.trim()) return setError("Please enter a location.");
    setError(null);
    setLoading(true);
    store.setPrefs(form);
    try {
      const res = await discover({ data: form });
      store.setResults(res.places, res.source);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-5 py-12">
        <h1 className="text-4xl font-semibold md:text-5xl">Where are you today?</h1>
        <p className="mt-2 text-muted-foreground">We'll skip the obvious and find what locals love.</p>

        <form onSubmit={submit} className="mt-8 grid gap-6 rounded-3xl border bg-card p-6 shadow-card md:grid-cols-2 md:p-8">
          <div className="space-y-2">
            <Label htmlFor="loc">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="loc" className="h-11 pl-9" value={form.location} maxLength={120} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Delhi, Jaipur, Lisbon" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hours">Time (hours)</Label>
              <Input id="hours" type="number" min={1} max={16} className="h-11" value={form.hours} onChange={(e) => setForm({ ...form, hours: Math.min(16, Math.max(1, Number(e.target.value) || 1)) })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (₹)</Label>
              <Input id="budget" type="number" min={0} step={50} className="h-11" value={form.budget} onChange={(e) => setForm({ ...form, budget: Math.max(0, Number(e.target.value) || 0) })} />
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Interests</Label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((i) => {
                const on = form.interests.includes(i);
                return (
                  <button type="button" key={i} onClick={() => toggle(i)} aria-pressed={on}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${on ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:bg-secondary"}`}>
                    {i}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-4 md:col-span-2">
            <Button type="submit" size="lg" className="h-12 rounded-full px-7" disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Discovering…</> : <><Sparkles className="h-4 w-4" /> Discover with AI</>}
            </Button>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        </form>

        {store.results.length > 0 && (
          <section className="mt-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold">Your hidden gems</h2>
                <p className="text-sm text-muted-foreground">
                  {store.source === "ai" ? "Curated by AI for " + store.prefs.location : "Showing demo picks from Delhi (AI unavailable)"}
                </p>
              </div>
              {store.route.length > 0 && (
                <Button asChild variant="default" className="rounded-full">
                  <Link to="/route">Build my route ({store.route.length})</Link>
                </Button>
              )}
            </div>
            <div className="mt-6 h-[360px]"><LazyMap places={store.results} /></div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {store.results.map((p, i) => <PlaceCard key={p.id} place={p} index={i} />)}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
