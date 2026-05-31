# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn                        # Install dependencies
quasar dev                  # Start dev server (SPA, HTTPS on port 8080)
quasar dev -m ssr           # Start dev server in SSR mode (port 8888 for Netlify parity)
quasar build                # Build SPA
quasar build -m ssr         # Build SSR (used by Netlify)
quasar build -m pwa         # Build PWA
yarn lint:fix               # Run ESLint with auto-fix
```

There are no tests in this project.

## Architecture

**Stack**: Quasar v1 (Vue 2) + SSR + PWA, deployed to Netlify. Requires Node >= 22.

**Page structure**: Pages live under `src/pages/<feature>/` and split their component options across three files:
- `Feature.vue` — template and `<script>` that imports from the `.js` file
- `feature.js` — component options object (data, computed, methods, lifecycle hooks, meta)
- `feature.css` — scoped styles

**Service layer**: `src/services/http.js` is a thin custom fetch wrapper (no axios). Services are class instances injected as `this.$services` via `src/boot/services.js`. Usage: `this.$services.events().listByCategory(category)`. Available services: `users`, `category`, `files`, `events`, `tourism`.

**API**: `https://polished-snowflake-9723.fly.dev/api` — defined in `quasar.conf.js` as `process.env.URI_API` (same URL for dev and prod). `GOOGLE_API_KEY` is the only value read from `.env`.

**Static data in constants**: Trip schedules, places, and local services are hardcoded JS arrays, not fetched from the API:
- `src/constants/trips/` — bus schedules between cities (e.g., Abaetetuba↔Belém)
- `src/constants/places/` — categorized points of interest (hotels, pharmacies, restaurants, banks, etc.)
- `src/constants/services/` — local services (gas, water, DJ, locksmith, etc.)

**Authentication**: JWT token stored in `localStorage` under key `abaete-fest-token`. Admin flag stored as JSON in `abaete-manage`. The `auth-router` boot file guards routes with `meta.requiresAuth` and `meta.admin`.

**Routing**: `src/router/routes.js` uses lazy loading with named webpack chunks (`events`, `tourism`, `map`, `media`, `utilities`, `info`, `user`, `admin`). Several routes are SEO aliases pointing to the same component (e.g., `/festas`, `/festas-abaetetuba`, and `/events` all render `Events.vue`).

**Boot file execution order** (defined in `quasar.conf.js`): `global-meta` → `services` → `i18n` → `fetch` → `notify` → `auth-router` (client-only) → `mixpanel` (client-only) → `auto-migration` (client-only) → `sw-migration` (client-only) → `leaflet` (non-SSR only) → `google-maps` (non-SSR only).

**Auto-migration system** (`src/boot/auto-migration.js`): Handles the historical migration from hash-mode router (`#/`) to history mode. Runs on client startup, unregisters old service workers, and cleans legacy caches. Tracks completion in localStorage under `ssr-migration-completed`.

**PWA/SSR**: The app runs SSR+PWA combined (`ssr.pwa: true` in `quasar.conf.js`). The service worker uses `GenerateSW` (Workbox) with `NetworkFirst` for API calls and `CacheFirst` for images/fonts.

**Analytics**: Mixpanel tracking via `this.$mixpanel` (injected globally). OneSignal for push notifications via `onesignal-vue`.

**Maps**: Leaflet (`vue2-leaflet`) for the map page; Google Maps (`vue2-google-maps`) for tourism details. Both are excluded from SSR builds.

**i18n**: `vue-i18n` v8, primary locale is `pt-br`. Translations in `src/i18n/en-us/index.js` (English is secondary).

**Linting**: ESLint with `plugin:vue/essential` + `standard` config. Rules: `indent` and `template-curly-spacing` are disabled to avoid conflicts with Babel/template literals.
