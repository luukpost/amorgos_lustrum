---
applyTo: "**"
description: Amorgos Lustrum Project Conventions
---

# Amorgos Lustrum — Project Conventions

## Project Overview
Static website for the Amorgos sailing association's lustrum trip 2027.
Domain: `lustrum.amorgos.nl` (GitHub Pages)
Stack: Plain HTML + CSS. Vanilla JavaScript only if interaction ever needs it. No frameworks, no build step.
**Design approach: Mobile-first.** All layouts and styles are designed for small screens first, then enhanced for larger screens using `min-width` media queries.

## File Structure
```
index.html          # Coming soon page (static HTML)
programma.html      # Programme page (draft, redirects to / until live)
404.html            # Redirects to the homepage
assets/
  css/
    main.css        # All global styles
uploads/            # Static assets (images, logo)
.github/
  instructions/     # Agent instruction files
```

## HTML, CSS and JavaScript
- Every page is a plain `.html` file in the root; write content directly in the HTML
- Links between pages are normal links without `.html` (GitHub Pages serves `programma.html` at `/programma`), e.g. `<a href="/programma">`
- No Vue, React or other frameworks, no router, no templating
- JavaScript only for interaction that HTML/CSS cannot do; plain JS, loaded with `defer`, in `assets/js/`
- Drafts: a page with `<script>window.location.replace('/');</script>` in the head is not live yet; remove that line to publish it

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
  - `#ffffff` — Page background (plain white, no gradient)
- Font: Open Sans 700/800 (Google Fonts CDN)
- Responsive logo width: `min(560px, 90vw)`

## Naming Conventions
- JS files: kebab-case, e.g. `menu-toggle.js`
- CSS classes: kebab-case, e.g. `.coming-soon`, `.logo-wrap`
- Page files: lowercase kebab, e.g. `programma.html`, `contact.html`

## Language
- UI language: Dutch
- Exception: "Coming Soon" stays in English
- Page titles: Dutch

## Do NOT
- Add a build system (webpack, vite, etc.) without explicit request
- Use TypeScript — plain JS only
- Add frameworks or libraries (Vue, React, jQuery, ...)
- Commit or push without explicit user permission
