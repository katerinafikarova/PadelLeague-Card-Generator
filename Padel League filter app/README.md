# PadelLeague Card Generator

A modern React component for creating stunning padel court cards with advanced image filters and customizable player data.

## Features

✨ **Image Upload & Processing**

- Drag-and-drop or click to upload court images
- Pre-applied CSS filters (brightness 0.7, contrast 1.2)
- Real-time filter adjustments

🎨 **Advanced Filters**

- **Grain**: Adds realistic noise texture overlay
- **Grid**: Displays 12-column grid pattern overlay
- **Blur**: Adjustable blur effect (0-10px)
- **Tint**: Dark color tint (#05070A) overlay

📊 **Result Card**

- Large bold player name (Bungee font - Unicase style)
- Skill level display with neon green (#E2FF00) styling
- Match result indicator (Victory/Defeat/Draw)
- Smooth slide-up animation on load
- Professional glassmorphism effect with backdrop blur

🏷️ **PadelLeague Branding**

- Absolute positioned logo badge in corner
- Neon yellow branding with shadow effects

🎛️ **Control Panel**

- Real-time preview
- Filter toggle buttons with active states
- Blur intensity slider
- Player data input fields
- Responsive design for all screen sizes

## Technical Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS3** with CSS Grid, Flexbox, and modern filters
- **SVG-based grain texture** for authentic noise effect

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Building

```bash
npm run build
```

## Project Structure

```
/src
  ├── PadelCardGenerator.tsx    # Main component
  ├── PadelCardGenerator.css    # Component styles
  ├── App.tsx                   # App wrapper
  ├── main.tsx                  # React entry point
  └── index.css                 # Global styles
```

## Color Palette

| Variable           | Color   | Usage                           |
| ------------------ | ------- | ------------------------------- |
| `--midnight-court` | #05070A | Backgrounds, tint overlay       |
| `--neon-strike`    | #E2FF00 | Logo, skill level text, accents |
| `--marbella-blue`  | #007BFF | Grid overlay, titles            |
| `--line-white`     | #FFFFFF | Primary text                    |
| `--success-green`  | #00FF00 | Match results                   |

## Customization

### Adjust Filter Defaults

Edit `getImageFilters()` in `PadelCardGenerator.tsx`:

```typescript
let filterString = "brightness(0.7) contrast(1.2)";
```

### Change Grid Size

Modify the `background-size` in the grid overlay:

```css
background-size: 30px 30px; /* Change to desired grid spacing */
```

### Modify Fonts

The component uses:

- **Bungee** for player names (unicase effect)
- **Inter** for UI elements

Update `index.html` to change Google Fonts imports.

## Features Breakdown

### Image Filters

1. **Brightness**: 0.7 (70% original brightness)
2. **Contrast**: 1.2 (120% contrast)
3. **Blur**: 0-10px (adjustable)
4. **Grain**: SVG-based noise texture with 15% opacity
5. **Grid**: 30x30px light blue grid overlay
6. **Tint**: Dark overlay with multiply blend mode

### Result Card

- Positioned absolutely at the bottom of preview
- Contains: player name, skill level, and match result
- Features glassmorphic design with backdrop blur
- Neon yellow left border accent

### Logo Badge

- Top-right corner positioning
- Neon yellow background
- PadelLeague branding text

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT
