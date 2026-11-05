import { Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";

export function SiteNav({ overlay = false }: { overlay?: boolean }) {
  const { route } = useStore();
  const base = overlay ? "text-ink-foreground" : "text-foreground";
  return (
    <header className={`${overlay ? "absolute inset-x-0 top-0 z-20" : "border-b bg-background/80 backdrop-blur sticky top-0 z-20"}`}>
      <nav className={`mx-auto flex max-w-6xl items-center justify-between px-5 py-4 ${base}`}>
        <Link to="/" className="font-display text-xl font-semibold">
          LocalLens<span className="text-primary">.</span>AI
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/explore" className="opacity-80 hover:opacity-100" activeProps={{ className: "opacity-100 text-primary" }}>
            Explore
          </Link>
          <Link to="/itinerary" className="opacity-80 hover:opacity-100" activeProps={{ className: "opacity-100 text-primary" }}>
            My Route{route.length > 0 && <span className="ml-1.5 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">{route.length}</span>}
          </Link>
        </div>
      </nav>
    </header>
  );
}
