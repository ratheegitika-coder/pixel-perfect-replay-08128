# LocalLens AI
**Find the places your map forgot.**

AI-powered local tourism MVP: enter a location, interests, time and budget → get 5 hidden gems → read each place's local story and ask questions → build a timed Smart Route.

## Flow
User Input (`/explore`) → AI Discovery → Hidden Gem cards → Local Story (`/place/:id`) → Smart Route (`/itinerary`)

## Stack
TanStack Start (React 19), Tailwind CSS v4, Leaflet + OpenStreetMap, Lovable AI Gateway (`@lovable.dev/ai-gateway`).

## Run
```bash
bun install
cp .env.example .env   # add LOVABLE_API_KEY (optional)
bun run dev
```

## AI fallback
If the AI key is missing or a call fails, the app uses 12 demo destinations in Delhi (`src/lib/places.ts`) ranked by interests and hidden-gem score, so the demo always works.

## Tests
```bash
bunx vitest run
```
