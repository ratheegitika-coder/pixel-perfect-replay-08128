import { useEffect, useRef } from "react";
import type { Place } from "@/lib/places";
import "leaflet/dist/leaflet.css";

export default function PlacesMap({ places }: { places: Place[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !ref.current) return;
      const pts = places.filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng));
      map = L.map(ref.current, { scrollWheelZoom: false });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap" }).addTo(map);
      pts.forEach((p, i) => {
        const icon = L.divIcon({
          className: "",
          html: `<div style="background:var(--primary);color:var(--primary-foreground);width:28px;height:28px;border-radius:999px;display:grid;place-items:center;font-weight:700;font-size:13px;border:2px solid var(--card)">${i + 1}</div>`,
          iconSize: [28, 28],
        });
        L.marker([p.lat, p.lng], { icon }).addTo(map!).bindPopup(p.name);
      });
      if (pts.length) map.fitBounds(L.latLngBounds(pts.map((p) => [p.lat, p.lng])), { padding: [40, 40], maxZoom: 14 });
      else map.setView([28.61, 77.2], 11);
    })();
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [places]);
  return <div ref={ref} className="h-full min-h-[320px] w-full overflow-hidden rounded-2xl border" />;
}
