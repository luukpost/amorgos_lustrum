# Amorgos Lustrum — Stijlgids

## Kleuren
| Naam         | Hex       | Gebruik                        |
|--------------|-----------|-------------------------------|
| Geel         | `#FFD200` | Primaire tekstkleur, accenten  |
| Rood         | `#E30613` | Secundaire kleur (reserve)     |
| Lichtblauw   | `#f0f6fc` | Achtergrond pagina             |
| Blauw licht  | `#b8d4e8` | Gradient achtergrond (onder)   |
| Blauw zacht  | `#d6e9f7` | Gradient achtergrond (boven)   |

## Typografie
- **Lettertype:** Open Sans (Google Fonts)
- **Gewicht:** 700 (bold) en 800 (extrabold)
- **Coming Soon tekst:** `font-weight: 800`, `text-transform: uppercase`, `letter-spacing: 0.04em`
- **Minimale fontgrootte:** `clamp(40px, 8vw, 80px)` voor hoofdtekst

## Logo
- Bestandsnaam: `logo.png`
- Breedte: `min(560px, 90vw)` — responsief
- Effect: `drop-shadow(0 8px 32px rgba(90, 140, 180, 0.18))`

## Achtergrond
Lichte luchtige gradiënt via twee radiale cirkels:
```css
background:
  radial-gradient(ellipse 120% 60% at 50% 110%, #b8d4e8 0%, transparent 60%),
  radial-gradient(ellipse 80% 40% at 20% 0%, #d6e9f7 0%, transparent 50%);
background-color: #f0f6fc;
```

## Animaties
- **Inkomend:** `floatIn` — elementen schuiven van `translateY(24px)` + `opacity: 0` naar zichtbaar, `0.9s cubic-bezier(0.22, 1, 0.36, 1)`
- **Logo:** geen vertraging
- **Coming Soon tekst:** `animation-delay: 0.15s`
- **Pulserende stippen:** 3 stippen (⌀10px, kleur `#FFD200`), animeren met `pulse` op `1.4s ease-in-out infinite`, delays: 0s / 0.2s / 0.4s

## Layout
- Volledig gecentreerd: `display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh`
- Verticale tussenruimte tussen logo en tekst: `gap: 48px`
- `overflow: hidden` op body

## Tone of voice / copy
- Taal: Nederlands (maar "Coming Soon" in het Engels)
- Simpel en rustig — geen overbodige tekst
- Paginatitel: `Coming soon`
