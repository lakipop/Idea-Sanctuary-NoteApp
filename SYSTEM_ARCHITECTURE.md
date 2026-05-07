# System Architecture: Notes App

## 1. High-Level Overview
The SyntecXhub Notes application implements an entirely local, persistence-first architecture. Instead of relying on a network connection, the state is tightly coupled to the browser's `localStorage` HTML5 API. The UI scales efficiently using CSS column features for a masonry format.

## 2. Technology Stack
- **Core:** React 19, TypeScript 5.7
- **Bundler:** Vite 6.0
- **Styling:** Tailwind CSS v4 (Masonry & Modals)
- **Data Persistence:** DOM Web Storage API (localStorage)

## 3. Persistent State Flow

```mermaid
graph TD
    A[User Add/Edit Action] --> B[React DOM]
    B -->|Dispatches Change| C(useNotes Hook)
    C -->|Commits State| D[React Virtual Layer]
    C -->|Side Effect Trigger| E(storage.ts)
    
    E -->|JSON Stringify| F[(Browser localStorage)]
    
    G[App Mount] -->|Reads| E
    E -->|JSON Parse| C
# SYSTEM_ARCHITECTURE.md — Idea Sanctuary
# Location: /Idea-Sanctuary/SYSTEM_ARCHITECTURE.md
# Purpose: Technical breakdown of the note-taking engine and masonry grid.

The Idea Sanctuary application implements an entirely local, persistence-first architecture. Instead of relying on a network connection, the state is tightly coupled to the browser's `localStorage` HTML5 API. The UI scales efficiently using CSS column features for a masonry format.

---

## 1. Data Layer & Persistence Strategy
- **Primary Store:** `localStorage` (JSON serialized).
- **Initialization:** The `useNotes` hook initializes state by attempting to parse the `laki_notes` key.
- **Sync Mechanism:** A dedicated `useEffect` in the hook monitors the `notes` state. Any mutation (add/edit/delete/pin) triggers an immediate `localStorage.setItem` call.

## 2. Component Hierarchy (Masonry Logic)
- **Grid Container:** Uses `column-count` and `column-gap` for fluid masonry layout.
- **Note Cards:** Uses `break-inside: avoid` to prevent cards from splitting across columns.
- **Dynamic Orientation:** Cards support 6 size classes (Small to Tall) via dynamic CSS classes.

## 3. Modal State & Accessibility
- **Note Editor:** Controlled via `editingId`. When set, the `NoteEditor` component renders via a portal/overlay.
- **Focus Management:** Uses `useRef` (titleRef). Upon mounting, the editor executes a side-effect to focus the title input for immediate user interaction.

## 4. Performance Optimizations
- **Search Filtering:** The `filteredNotes` array is derived using `useMemo`, ensuring the search logic only re-runs if the `searchQuery` or `notes` array changes.
- **Memoized Callbacks:** All CRUD operations are wrapped in `useCallback` to prevent unnecessary re-renders of the child `NoteCard` components.

---

## 5. Directory Structure
```text
src/
├── components/
│   ├── NoteCard.tsx     # Specialized card with color/size logic
│   ├── NoteEditor.tsx   # Modal for deep editing
│   └── ...
├── hooks/
│   └── useNotes.ts      # Core state engine & sync logic
├── types/
│   └── note.types.ts    # Enums for Color/Size/Type
└── utils/
    └── storage.ts       # LocalStorage abstraction layer
```

---
**Developer:** LakiDev (LSR Vidanaarachchi)<br>
**Portfolio:** [lakidev.me](https://lakidev.me/)<br>
**GitHub:** [lakipop](https://github.com/lakipop)<br>

*A Personal Portfolio Project*