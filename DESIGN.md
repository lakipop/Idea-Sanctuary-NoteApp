# DESIGN.md — Idea Sanctuary
# Location: /Idea-Sanctuary/DESIGN.md
# Purpose: Project-specific design tokens and creative aesthetic rules.

---

## Project Identity
- **Project name:** Idea Sanctuary
- **Type:** Creative Productivity Board
- **Stack:** React 19, TypeScript 5.7, Vite 6.0
- **UI framework:** Tailwind CSS v4 (Masonry Grid)
- **State management:** useNotes Hook (LocalStorage Sync)

---

## Color Tokens (Planner & Space)
Derived from `noteappcolors.jpg`.

### Light Mode (Planner)
```css
--color-planner-bg:     #F2F0E9;   /* Vintage Paper Base */
--color-planner-yellow: #E8AF4A;   /* Ochre Accent */
--color-planner-green:  #82B2A7;   /* Sage Accent */
--color-planner-dark:   #1E1E1E;   /* Deep Charcoal Text */
```

### Dark Mode (Space)
```css
--color-bg-page:        #0c0d12;   /* Deep Midnight */
--color-bg-surface:     #16171f;   /* Matte Gray Card */
--color-accent:         #6c63ff;   /* Neon Indigo */
```

---

## Visual Features
- **Dynamic Masonry**: 6 card sizes including the new 'Half-Tall' orientation.
- **Crisp Aesthetic**: High-clarity visuals with NO blur effects on overlays or backdrops.
- **Opacity Controls**: Global slider for card transparency (0.1 to 1.0).
- **Custom Upload**: Support for local image uploads via Base64.
- **Font Colors**: Theme-resilient font choices (Ochre, Sage, Space Black, Pure White).

---

## Folder Structure
```
/src
  /components       # Masonry grid, editor modal, card widgets
  /hooks            # useNotes state engine
  /utils            # LocalStorage persistence wrappers
  /types            # Note schemas and Color enums
```

---
**Developer:** LakiDev (LSR Vidanaarachchi)<br>
**Portfolio:** [lakidev.me](https://lakidev.me/)<br>
**GitHub:** [lakipop](https://github.com/lakipop)<br>

*A Personal Portfolio Project*
