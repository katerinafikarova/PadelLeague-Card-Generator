# PadelLeague Card Generator — Implementace

Aplikace je čistě statická vanilla HTML/CSS/JavaScript. Žádný build krok, žádné závislosti, žádné `node_modules`.

## Soubory

### `index.html`

HTML struktura aplikace:

- `<head>` — meta, title, Google Fonts (Inter, Bungee), `<link>` na `styles.css`
- `<body>` — `.app-wrapper` s telefon-simulátorem nahoře a `.controls-panel` pod ním
- `<svg>` s `<filter id="motion-blur">` definovaným v rootu telefon-simulátoru — používá se přes `filter: url(#motion-blur)` na obrázku
- `<script src="./app.js" defer>` před `</body>`

### `styles.css`

Veškeré styly:

- CSS proměnné v `:root` (paleta)
- Reset (`*`, `html`, `body`)
- Layout: `.app-wrapper`, `.padel-generator` (telefon 400×800), `.preview-container`, `.base-image`
- Overlays: `.overlay`, `.overlay-grain` (SVG noise), `.overlay-grid` (linear-gradient mřížka), `.overlay-tint` (diagonální gradient + `mix-blend-mode: hard-light`)
- Karta: `.result-card` (glassmorphism), `.player-name`, `.info-label`, `.info-value`, `.info-value.winner`
- Badge: `.badge-container`, `.badge-circle`, `.curved-text-svg`
- Controls: `.controls-panel`, `.control-group`, `.toggle-btn`, `.toggle-btn.active`, `.slider-input`
- `@media (max-width: 520px)` — zmenšení telefon-simulátoru a badge

### `app.js`

Logika aplikace:

- `state.filters` — single source of truth: `{ grain, grid, blur, tint }`
- DOM reference na image, overlay divy, badge text a controls
- `toggleFilter(name)` — pro `blur` přepíná mezi 0 a 3, pro ostatní toggluje boolean
- `applyFilters()` — staví CSS `filter` string pro obrázek (`brightness(.7) contrast(1.6) saturate(2.2)` + případně `url(#motion-blur)`); skrývá/odkrývá overlay divy přes `.hidden`
- `updateMotionBlur(v)` — nastaví `stdDeviation="${v*2} 0"` na `<feGaussianBlur>` (horizontální motion blur)
- `updateButtonVisuals()` — togluje `.active` na tlačítkách filtrů
- `updateCard()` — zapisuje upper-case hodnoty inputů do karty a `${won}/${tot}` do badge
- Event listenery: tlačítka, slider, file upload (FileReader → data URL → `img.src`), inputy
- Inicializace na konci souboru

## Datové toky

### Toggle filtru

```
button click → toggleFilter(name) → state.filters mutated → applyFilters() + updateButtonVisuals()
```

### Změna intenzity blur

```
range input → state.filters.blur set → updateMotionBlur(v) → SVG <feGaussianBlur stdDeviation> → applyFilters() (přidá url(#motion-blur) do CSS filter)
```

### Upload obrázku

```
file input change → FileReader.readAsDataURL → img.src = data URL
```

### Změna textu karty

```
input/select change → updateCard() → textContent na #display-* a #badge-text
```

## Spuštění

```bash
open index.html
```

Nebo `npx serve .` pro lokální server.

## Rozšiřitelnost

Přidání dalšího filtru:

1. Doplnit do `state.filters` (default `false`).
2. V [styles.css](styles.css) přidat třídu `.overlay-<name>` se stylem.
3. V [index.html](index.html) přidat `<div id="filter-<name>" class="overlay overlay-<name> hidden"></div>` do `.preview-container`.
4. V [index.html](index.html) přidat `<button id="btn-<name>" class="toggle-btn">` do `.toggle-grid`.
5. V [app.js](app.js) doplnit DOM referenci, listener `btn<Name>.addEventListener("click", () => toggleFilter("<name>"))`, a v `applyFilters()` + `updateButtonVisuals()` zpracovat nový klíč.
