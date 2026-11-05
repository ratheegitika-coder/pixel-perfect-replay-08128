<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- AI calls live only in `src/lib/ai.functions.ts` server functions and must fall back to `DEMO_PLACES` on failure — demo must always work.
- App state (prefs, results, route) lives in `src/lib/store.tsx` context persisted to sessionStorage — no backend by design.
- Leaflet is loaded only via `LazyMap` (ClientOnly + lazy) — it breaks SSR if imported directly.
