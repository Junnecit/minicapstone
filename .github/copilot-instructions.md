<!-- GitHub Copilot instructions for the project: laravel_react/react_laravel -->
# Copilot / AI agent instructions — Laravel + React (Vite) starter

Keep guidance concise and actionable: reference files, scripts, and patterns the repo actually uses.

- Project type: Laravel backend (PHP 8.2, Laravel 12) + React frontend using Inertia + Vite.
- Frontend entry: `resources/js/app.tsx` (Inertia app). Pages live under `resources/js/pages/*.tsx`.
- Route rendering: server routes are in `routes/web.php` and render Inertia pages (example: `dashboard` -> `resources/js/pages/dashboard.tsx`).

Quick contract (what your changes should do):
- Inputs: edits to PHP, TSX, or config files in this repo.
- Outputs: keep app route names, Inertia page resolution, and Tailwind/Vite build intact.
- Error modes: avoid changing route names or Inertia page paths without updating `routes` or `resources/js` helpers.

Essential commands (examples found in `composer.json` and `package.json`):
- Local dev (full stack): `composer run-script dev` — runs `php artisan serve`, queue listener, and `npm run dev` concurrently.
- Frontend only dev: `npm run dev` (Vite dev server).
- Build frontend: `npm run build` (or `npm run build:ssr` for SSR+client builds).
- Setup (bootstrap): `composer run-script setup` (installs composer/npm deps, migrates, builds assets).
- Run tests: `composer run-script test` (calls `php artisan test`). Tests use Pest and an in-memory sqlite DB (see `phpunit.xml`).

Patterns & conventions to follow (concrete examples):
- Inertia pages: create page components at `resources/js/pages/<Name>.tsx`. `resources/js/app.tsx` resolves pages with `resolvePageComponent('./pages/${name}.tsx', import.meta.glob('./pages/**/*.tsx'))` — use default exports.
- Shared types: look under `resources/js/types` (this repo uses `SharedData`/`BreadcrumbItem` types referenced in pages like `dashboard.tsx`).
- Layouts & components: common layouts live in `resources/js/layouts` and UI components under `resources/js/components`. Pages import with `@/layouts/...` or `@/components/...` (alias configured by Vite).
- Routes helper: frontend route helpers live under `resources/js/routes` (used by pages: e.g., `import { dashboard } from '@/routes'`); keep route name changes synchronized between `routes/web.php` and frontend helper files.

Testing and CI specifics:
- Tests use Pest (`pestphp/pest`) and Laravel's testing helpers. `phpunit.xml` sets DB to sqlite in-memory and uses `RefreshDatabase` (see `tests/Pest.php`).
- CI workflows: check `.github/workflows/*` for lint and test jobs (`.github/workflows/tests.yml`, `.github/workflows/lint.yml`). Mirror local commands used there.

Dev notes & gotchas seen in the codebase:
- Vite SSR: `vite.config.ts` exports an SSR entry `resources/js/ssr.tsx`. If modifying SSR behavior, update both `vite` and `composer` scripts (see `dev:ssr`).
- Wayfinder plugin: `@laravel/vite-plugin-wayfinder` is used (forms & route helpers). Changing route naming or form variants may require regenerating or adjusting wayfinder config.
- Composer scripts use `concurrently` and `npx` — on Windows (PowerShell) ensure `npx` is available; dev scripts are invoked via `composer run-script` to maintain consistency.

When making changes, prefer small, focused edits and include a short test plan in the PR description listing:
1. Commands to run locally (e.g., `npm run dev` + visit http://localhost:5173 or `php artisan serve`).
2. Route/page names to check (exact URLs and expected Inertia pages).
3. Any DB migration or seeder required.

Files to inspect for examples or when touching related areas:
- `composer.json` (scripts & PHP deps)
- `package.json` (frontend scripts & deps)
- `vite.config.ts` (aliases, SSR, plugins)
- `resources/js/app.tsx` (Inertia bootstrap)
- `resources/js/pages/dashboard.tsx` (real example of page + layout + types)
- `routes/web.php` (route -> inertia mappings)
- `phpunit.xml` & `tests/Pest.php` (testing environment)

If you see missing details while editing (e.g., unsure where a frontend route helper is generated), ask for the exact file under `resources/js/routes/` or a sample route name — do not guess route naming.

If a merge with an existing `.github/copilot-instructions.md` is required, preserve any project-specific scripts or CI notes already present and merge this file's short guidance under a "Project-specific guidance" header.

---
If anything in this file is unclear or you'd like more examples (e.g., an example PR checklist tailored to this repo), tell me which area to expand.
