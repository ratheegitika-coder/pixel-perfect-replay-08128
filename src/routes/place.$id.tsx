import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Loader2, Send, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteNav } from "@/components/SiteNav";
import { DEMO_PLACES, imageFor } from "@/lib/places";
import { findPlace, useStore } from "@/lib/store";
import { askAboutPlace } from "@/lib/ai.functions";

export const Route = createFileRoute("/place/$id")({
  head: () => ({
    meta: [
      { title: "Local story — LocalLens AI" },
      { name: "description", content: "History, cultural significance and local secrets of a hidden gem." },
      { property: "og:title", content: "Local story — LocalLens AI" },
      { property: "og:description", content: "History, cultural significance and local secrets of a hidden gem." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Story,
});

function Story() {
  const { id } = Route.useParams();
  const store = useStore();
  const place = findPlace(id, store, DEMO_PLACES);
  const ask = useServerFn(askAboutPlace);
  const [q, setQ] = useState("");
  const [chat, setChat] = useState<{ q: string; a: string }[]>([]);
  const [loading, setLoading] = useState(false);

  if (!place) {
    return (
      <div className="min-h-screen"><SiteNav />
        <div className="mx-auto max-w-xl px-5 py-24 text-center">
          <h1 className="text-3xl font-semibold">Place not found</h1>
          <Button asChild className="mt-6 rounded-full"><Link to="/explore">Back to Explore</Link></Button>
        </div>
      </div>
    );
  }

  const added = store.route.some((r) => r.id === place.id);
  const sections = [
    ["History", place.history], ["Cultural significance", place.significance], ["Interesting fact", place.fact],
    ["Why it matters", place.whyMatters], ["What to notice", place.notice],
  ] as const;

  const onAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    const question = q.trim();
    if (!question || loading) return;
    setLoading(true);
    setQ("");
    try {
      const ctx = sections.map(([k, v]) => `${k}: ${v}`).join(" ");
      const { answer } = await ask({ data: { place: place.name, context: ctx, question } });
      setChat((c) => [...c, { q: question, a: answer }]);
    } catch {
      setChat((c) => [...c, { q: question, a: "Sorry, I couldn't answer that right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="relative h-[46vh] min-h-[320px] overflow-hidden">
        <img src={imageFor(place.category)} alt={place.name} width={1024} height={768} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto flex h-full max-w-4xl flex-col justify-end px-5 pb-10 text-ink-foreground">
          <Link to="/explore" className="mb-4 flex items-center gap-1 text-sm opacity-80 hover:opacity-100"><ArrowLeft className="h-4 w-4" /> Back</Link>
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">{place.category} · Gem {place.gemScore}/100</p>
          <h1 className="mt-2 text-5xl font-semibold">{place.name}</h1>
        </div>
      </div>
      <main className="mx-auto max-w-4xl px-5 py-12">
        <p className="text-lg">{place.description}</p>
        <Button className="mt-5 rounded-full" variant={added ? "secondary" : "default"} onClick={() => store.toggleRoute(place)}>
          {added ? <><Check className="h-4 w-4" /> In your route</> : <><Plus className="h-4 w-4" /> Add to Route</>}
        </Button>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {sections.map(([k, v], i) => (
            <section key={k} className={`animate-rise ${i === 0 ? "md:col-span-2" : ""}`} style={{ animationDelay: `${i * 60}ms` }}>
              <h2 className="text-2xl font-semibold text-primary">{k}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{v}</p>
            </section>
          ))}
        </div>

        <section className="mt-14 rounded-3xl bg-ink p-6 text-ink-foreground md:p-8">
          <h2 className="text-2xl font-semibold">Ask LocalLens</h2>
          <div className="mt-4 space-y-4">
            {chat.map((m, i) => (
              <div key={i} className="space-y-1">
                <p className="text-sm font-semibold text-gold">{m.q}</p>
                <p className="text-sm leading-relaxed opacity-90">{m.a}</p>
              </div>
            ))}
          </div>
          <form onSubmit={onAsk} className="mt-5 flex gap-2">
            <Input value={q} maxLength={500} onChange={(e) => setQ(e.target.value)} placeholder="Ask LocalLens about this place…" className="h-11 border-ink-foreground/20 bg-ink-foreground/10 text-ink-foreground placeholder:text-ink-foreground/50" />
            <Button type="submit" size="icon" className="h-11 w-11 shrink-0" disabled={loading || !q.trim()} aria-label="Ask">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
}
