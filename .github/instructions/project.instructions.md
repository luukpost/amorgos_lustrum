---
applyTo: "**"
description: Amorgos Lustrum Project Conventions
---

# Amorgos Lustrum — Project Conventions

## Project Overview
Static website for the Amorgos sailing association's lustrum trip 2027.
Domain: `lustrum.amorgos.nl` (GitHub Pages)
Stack: Vanilla HTML + CSS + Vue 3 (CDN) + Vue Router 4 (CDN) — no build step.
**Design approach: Mobile-first.** All layouts and styles are designed for small screens first, then enhanced for larger screens using `min-width` media queries.

## File Structure
```
index.html          # App shell — loads CDN libs + src files
assets/
  css/
    main.css        # All global styles
src/
  app.js            # Vue app init + mount
  router/
    index.js        # Route definitions (hash history for GitHub Pages)
  views/            # Page-level Vue components (plain JS objects, no SFC)
  components/       # Reusable UI components (plain JS objects)
uploads/            # Static assets (images, logo)
.github/
  instructions/     # Agent instruction files
```

## Vue Architecture (CDN, no build step)
- Vue 3 and Vue Router 4 loaded from unpkg CDN (pinned versions)
- Components are plain JS objects with `template` string, NOT Single File Components
- All views live in `src/views/`, all reusable components in `src/components/`
- `src/app.js` mounts the app; `src/router/index.js` defines routes
- Script load order in index.html: components → views → router → app

## Routing
- Hash history (`createWebHashHistory`) — required for GitHub Pages static hosting
- Route meta `title` drives `document.title` via `router.afterEach`
- Add new routes in `src/router/index.js`

## Mobile-First
- **Always design for mobile first** — base styles target small screens (≥320px)
- Use `min-width` media queries to scale up, never `max-width` to scale down
- Touch targets must be at least 44×44px
- Test layouts at 375px (iPhone), 768px (tablet), and 1280px (desktop) as reference breakpoints
- Use relative units (`rem`, `em`, `%`, `vw`, `vh`) over fixed `px` where possible
- Use `clamp()` for fluid typography and spacing

## Styling
- **Single global stylesheet:** `assets/css/main.css`
- Color tokens (use these, do not invent new colors):
  - `#FFD200` — Primary yellow (text, accents)
  - `#E30613` — Secondary red (reserve)
  - `#f0f6fc` — Page background
  - `#b8d4e8` — Gradient bottom
  - `#d6e9f7` — Gradient top
- Font: Open Sans 700/800 (Google Fonts CDN)
- Responsive logo width: `min(560px, 90vw)`

## Naming Conventions
- View files: PascalCase JS objects, e.g. `ComingSoon.js`, `ProgramPage.js`
- Component files: PascalCase, e.g. `NavBar.js`
- CSS classes: kebab-case, e.g. `.coming-soon`, `.logo-wrap`
- Router paths: lowercase kebab, e.g. `/programma`, `/contact`

## Language
- UI language: Dutch
- Exception: "Coming Soon" stays in English
- Page titles: Dutch

## Do NOT
- Add a build system (webpack, vite, etc.) without explicit request
- Use TypeScript — plain JS only
- Use npm packages — CDN only
- Commit or push without explicit user permission
