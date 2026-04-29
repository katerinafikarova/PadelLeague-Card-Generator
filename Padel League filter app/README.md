# PadelLeague Card Generator

Vanilla HTML/CSS/JavaScript aplikace pro generování stylových karet pro padelovou ligu s pokročilými obrazovými filtry a editovatelnými údaji o hráči.

## Funkce

**Upload a zpracování obrázku**

- Nahrání obrázku kurtu z disku (FileReader → data URL)
- Automatické color grading: `brightness(.7) contrast(1.6) saturate(2.2)`

**Filtry**

- **Grain** — zrnitá textura (SVG noise overlay)
- **Grid** — světlá mřížka 30×30 px
- **Blur** — směrový (motion) blur 0–10 přes SVG `feGaussianBlur` s horizontální `stdDeviation`
- **Tint** — diagonální gradient s `mix-blend-mode: hard-light`

**Karta výsledku**

- Velké jméno hráče (Bungee font)
- Skill level
- Match result (VICTORY/DEFEAT/DRAW) v neonové žluté
- Glassmorphism (`backdrop-filter: blur(12px)`)
- Badge vpravo dole se SVG zaobleným textem "Matches Won" a kruhem `won/total`

**Ovládací panel**

- File upload, čtyři toggle tlačítka, slider intenzity blur
- Inputy pro jméno / level / result / matches won / total

## Spuštění

Žádné závislosti, žádný build. Stačí:

```bash
open index.html
```

Nebo otevřít přímo dvojklikem v souborovém manažeru. Pokud chceš lokální server (např. kvůli `file://` omezením):

```bash
npx serve .
```

## Struktura projektu

```
Padel League filter app/
├── index.html         HTML struktura
├── styles.css         Vzhled (CSS proměnné, layout, overlays, controls, responsive)
├── app.js             Logika (state, event listenery, filtry, update karty)
├── README.md
└── IMPLEMENTATION.md
```

## Barevná paleta

| Proměnná           | Hodnota | Použití                          |
| ------------------ | ------- | -------------------------------- |
| `--midnight-court` | #05070A | Pozadí, tint overlay             |
| `--neon-strike`    | #E2FF00 | Výsledek, aktivní toggle, akcent |
| `--marbella-blue`  | #007BFF | (rezervováno)                    |
| `--line-white`     | #FFFFFF | Primární text                    |
| `--secondary-gray` | #333333 | Pozadí inputů                    |
| `--border-gray`    | #222222 | Okraje inputů a tlačítek         |

## Customizace

**Color grading obrázku** — uprav `filter` v `.base-image` v [styles.css](styles.css), případně řetězec v `applyFilters()` v [app.js](app.js).

**Velikost mřížky** — `background-size: 30px 30px` u `.overlay-grid` v [styles.css](styles.css).

**Fonty** — Google Fonts import v `<head>` v [index.html](index.html) (aktuálně Inter + Bungee).

**Intenzita motion blur** — koeficient v `updateMotionBlur` v [app.js](app.js) (`${v * 2} 0` = horizontální `stdDeviation`).

## Podpora prohlížečů

Chrome/Edge/Firefox/Safari (latest), mobilní prohlížeče. Vyžaduje podporu `backdrop-filter`, SVG filtrů a `mix-blend-mode`.
