import { Link } from "@tanstack/react-router";
import { Clock, Wallet, Sparkles, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { imageFor, type Place } from "@/lib/places";
import { useStore } from "@/lib/store";

export function PlaceCard({ place, index }: { place: Place; index: number }) {
  const { route, toggleRoute } = useStore();
  const added = route.some((r) => r.id === place.id);
  return (
    <article className="animate-rise overflow-hidden rounded-2xl border bg-card shadow-card" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={imageFor(place.category)} alt={place.name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold">{place.category}</span>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold text-gold">
          <Sparkles className="h-3 w-3" /> Gem {place.gemScore}/100
        </span>
      </div>
      <div className="space-y-3 p-5">
        <h3 className="text-xl font-semibold">{place.name}</h3>
        <p className="text-sm text-muted-foreground">{place.description}</p>
        <p className="text-sm"><span className="font-semibold text-accent">Why visit: </span>{place.whyVisit}</p>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Wallet className="h-3.5 w-3.5" />{place.cost === 0 ? "Free" : `₹${place.cost}`}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{place.duration} min</span>
        </div>
        <div className="flex gap-2 pt-1">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link to="/place/$id" params={{ id: place.id }}>View Story</Link>
          </Button>
          <Button size="sm" className="flex-1" variant={added ? "secondary" : "default"} onClick={() => toggleRoute(place)}>
            {added ? <><Check className="h-4 w-4" /> Added</> : <><Plus className="h-4 w-4" /> Add to Route</>}
          </Button>
        </div>
      </div>
    </article>
  );
}
