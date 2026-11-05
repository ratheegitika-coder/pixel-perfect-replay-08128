import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";
import type { Place } from "@/lib/places";

const PlacesMap = lazy(() => import("./PlacesMap"));

export function LazyMap({ places }: { places: Place[] }) {
  const fallback = <div className="h-full min-h-[320px] w-full animate-pulse rounded-2xl bg-muted" />;
  return (
    <ClientOnly fallback={fallback}>
      <Suspense fallback={fallback}>
        <PlacesMap places={places} />
      </Suspense>
    </ClientOnly>
  );
}
