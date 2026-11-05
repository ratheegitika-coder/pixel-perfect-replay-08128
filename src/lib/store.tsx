import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Place, Preferences } from "./places";

type State = {
  prefs: Preferences;
  results: Place[];
  source: "ai" | "demo" | null;
  route: Place[];
};

const initial: State = {
  prefs: { location: "Delhi", interests: ["Heritage", "Food"], hours: 5, budget: 800 },
  results: [],
  source: null,
  route: [],
};

type Ctx = State & {
  setPrefs: (p: Preferences) => void;
  setResults: (r: Place[], s: "ai" | "demo") => void;
  toggleRoute: (p: Place) => void;
  removeFromRoute: (id: string) => void;
};

const StoreCtx = createContext<Ctx | null>(null);
const KEY = "locallens-state";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) setState({ ...initial, ...JSON.parse(raw) });
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) sessionStorage.setItem(KEY, JSON.stringify(state));
  }, [state, loaded]);

  const value: Ctx = {
    ...state,
    setPrefs: (prefs) => setState((s) => ({ ...s, prefs })),
    setResults: (results, source) => setState((s) => ({ ...s, results, source })),
    toggleRoute: (p) =>
      setState((s) => ({
        ...s,
        route: s.route.some((r) => r.id === p.id) ? s.route.filter((r) => r.id !== p.id) : [...s.route, p],
      })),
    removeFromRoute: (id) => setState((s) => ({ ...s, route: s.route.filter((r) => r.id !== id) })),
  };
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore outside provider");
  return c;
}

export function findPlace(id: string, s: { results: Place[]; route: Place[] }, demo: Place[]) {
  return s.results.find((p) => p.id === id) ?? s.route.find((p) => p.id === id) ?? demo.find((p) => p.id === id);
}
