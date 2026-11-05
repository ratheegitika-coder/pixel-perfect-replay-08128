import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, BookOpen, Route as RouteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/SiteNav";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LocalLens AI — Find the places your map forgot" },
      { name: "description", content: "AI-powered discovery of hidden local heritage, food, culture and nature near you." },
      { property: "og:title", content: "LocalLens AI — Find the places your map forgot" },
      { property: "og:description", content: "AI-powered discovery of hidden local heritage, food, culture and nature near you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const steps = [
  { icon: Compass, title: "Discover", text: "Tell us where you are and what you love. AI finds 5 hidden gems." },
  { icon: BookOpen, title: "Hear the story", text: "History, meaning and the details locals notice." },
  { icon: RouteIcon, title: "Walk the route", text: "A timed itinerary that fits your hours and budget." },
];

function Home() {
  return (
    <div>
      <section className="relative min-h-[92vh] overflow-hidden">
        <img src={hero} alt="Old city gateway at golden hour" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <SiteNav overlay />
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-5 pb-20 text-ink-foreground">
          <p className="animate-rise mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gold">AI travel companion</p>
          <h1 className="animate-rise max-w-3xl text-6xl font-semibold leading-[0.95] md:text-8xl">LocalLens AI</h1>
          <p className="animate-rise mt-5 max-w-xl text-xl opacity-90 md:text-2xl" style={{ animationDelay: "120ms" }}>
            Find the places your map forgot.
          </p>
          <div className="animate-rise mt-8" style={{ animationDelay: "240ms" }}>
            <Button asChild size="lg" className="h-12 rounded-full px-7 text-base">
              <Link to="/explore">Explore My Area <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.title} className="space-y-3">
            <s.icon className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-semibold">{s.title}</h2>
            <p className="text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
