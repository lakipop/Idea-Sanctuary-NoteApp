# DESIGN.md — [Project Name]
# Location: /project-root/DESIGN.md
# Purpose: Project-specific design tokens, stack decisions, and conventions.
# The agent reads this alongside ~/.claude/CLAUDE.md (global rules).
# Fill every section before writing any code. Leave nothing as "TBD".

---

## Project Identity
- **Project name:** [e.g. Antigravity Dashboard]
- **Type:** [Web app / Mobile / API / Full-stack]
- **Stack:** [e.g. Next.js 14, TypeScript, Tailwind CSS, Prisma, PostgreSQL]
- **UI framework:** [e.g. shadcn/ui, Radix UI, Headless UI, custom]
- **Icon library:** [e.g. Lucide React — import { IconName } from 'lucide-react']
- **State management:** [e.g. Zustand — store in /src/stores/]
- **Data fetching:** [e.g. React Query v5 — all queries in /src/queries/]
- **Form library:** [e.g. React Hook Form + Zod — schemas in /src/schemas/]
- **Date library:** [e.g. date-fns — always UTC server-side, local display client-side]
- **i18n library:** [e.g. next-intl — translation files in /messages/]
- **Auth:** [e.g. NextAuth.js — HttpOnly cookies, session rotation enabled]
- **ORM:** [e.g. Prisma — all queries in /src/server/db/]
- **Error monitoring:** [e.g. Sentry — DSN in .env.local]

---

## Color Tokens
# Define every color used in the project here.
# Components reference these token names ONLY — never raw hex values.

### Brand
```css
--color-brand-primary:     #[hex];   /* Main CTA, links, active states */
--color-brand-secondary:   #[hex];   /* Hover, accent, highlights */
--color-brand-subtle:      #[hex];   /* Backgrounds, tags, chips */
```

### Surface
```css
--color-bg-page:           #[hex];   /* Page background */
--color-bg-surface:        #[hex];   /* Cards, panels, modals */
--color-bg-elevated:       #[hex];   /* Dropdowns, tooltips */
--color-bg-subtle:         #[hex];   /* Input fills, muted sections */
```

### Text
```css
--color-text-primary:      #[hex];   /* Body copy, headings */
--color-text-secondary:    #[hex];   /* Labels, captions, meta */
--color-text-muted:        #[hex];   /* Placeholders, disabled */
--color-text-inverse:      #[hex];   /* Text on dark/colored bg */
```

### Border
```css
--color-border-default:    #[hex];   /* Default input/card borders */
--color-border-strong:     #[hex];   /* Focus rings, emphasis */
--color-border-subtle:     #[hex];   /* Dividers, section separators */
```

### Semantic
```css
--color-success:           #[hex];
--color-success-bg:        #[hex];
--color-warning:           #[hex];
--color-warning-bg:        #[hex];
--color-danger:            #[hex];
--color-danger-bg:         #[hex];
--color-info:              #[hex];
--color-info-bg:           #[hex];
```

### Dark mode
```css
/* Repeat all tokens above for dark mode inside @media (prefers-color-scheme: dark) */
/* or under a [data-theme="dark"] selector if using theme toggle */
```

---

## Typography

### Font Families
```css
--font-display:   '[Display Font]', serif;    /* Large headings, hero text */
--font-body:      '[Body Font]', sans-serif;  /* All body copy, UI labels */
--font-mono:      '[Mono Font]', monospace;   /* Code, terminal, IDs */
```

### Type Scale
```css
--text-xs:    12px / 1.5;
--text-sm:    13px / 1.5;
--text-base:  15px / 1.6;
--text-lg:    17px / 1.5;
--text-xl:    20px / 1.4;
--text-2xl:   24px / 1.3;
--text-3xl:   30px / 1.2;
--text-4xl:   38px / 1.1;
```

### Font Weights
- Regular: 400 — body copy
- Medium: 500 — labels, UI elements
- Semibold: 600 — subheadings
- Bold: 700 — headings only

---

## Spacing Scale
```css
--space-1:   4px
--space-2:   8px
--space-3:   12px
--space-4:   16px
--space-5:   20px
--space-6:   24px
--space-8:   32px
--space-10:  40px
--space-12:  48px
--space-16:  64px
--space-20:  80px
```

---

## Border Radius
```css
--radius-sm:   4px    /* Tags, badges, chips */
--radius-md:   8px    /* Buttons, inputs */
--radius-lg:   12px   /* Cards, panels */
--radius-xl:   16px   /* Modals, sheets */
--radius-full: 9999px /* Pills, avatars */
```

---

## Shadows
```css
--shadow-sm:  0 1px 2px rgba(0,0,0,0.05);
--shadow-md:  0 4px 6px rgba(0,0,0,0.07);
--shadow-lg:  0 10px 15px rgba(0,0,0,0.08);
--shadow-xl:  0 20px 25px rgba(0,0,0,0.09);
```

---

## Motion & Animation
```css
--duration-fast:    100ms
--duration-base:    200ms
--duration-slow:    350ms
--ease-default:     cubic-bezier(0.4, 0, 0.2, 1)
--ease-spring:      cubic-bezier(0.34, 1.56, 0.64, 1)
```
- Decorative animations: NEVER
- State transitions (hover, focus, open/close): --duration-base
- Page transitions: --duration-slow
- Always wrap all animation in: @media (prefers-reduced-motion: no-preference)

---

## Breakpoints
```css
--bp-sm:   640px   /* Large phones */
--bp-md:   768px   /* Tablets */
--bp-lg:   1024px  /* Small laptops */
--bp-xl:   1280px  /* Desktops */
--bp-2xl:  1536px  /* Large screens */
```
Build order: mobile → sm → md → lg → xl

---

## Folder Structure
```
/src
  /app              # Next.js app router pages
  /components
    /ui             # Primitive components (Button, Input, Badge)
    /layout         # Wrappers (PageLayout, Sidebar, Navbar)
    /features       # Feature-specific components
  /hooks            # Custom React hooks
  /lib              # Utility functions, helpers
  /queries          # React Query hooks (useUserQuery, etc.)
  /stores           # Zustand stores
  /schemas          # Zod validation schemas
  /server
    /db             # Prisma queries and mutations
    /api            # API route handlers
  /types            # Shared TypeScript interfaces
  /messages         # i18n translation files (en.json, etc.)
  /styles           # globals.css, token definitions
```

---

## Component Naming Conventions
- UI primitives: PascalCase — `Button`, `Input`, `Badge`
- Feature components: PascalCase with context — `UserProfileCard`, `InvoiceTable`
- Layout wrappers: PascalCase with suffix — `PageLayout`, `DashboardShell`
- Hooks: camelCase with "use" prefix — `useUserOrders`, `usePaymentStatus`
- Zustand stores: camelCase with "Store" suffix — `useAuthStore`, `useCartStore`
- Zod schemas: camelCase with "Schema" suffix — `userSchema`, `invoiceSchema`
- Server actions: camelCase with verb — `createInvoice`, `updateUserProfile`

---

## API Conventions
- Base URL: defined in `NEXT_PUBLIC_API_URL` env variable only
- All endpoints typed with shared interfaces in `/src/types/api.ts`
- All requests go through `/src/lib/api.ts` service layer
- Error format: `{ error: string, code: string, details?: object }`
- Pagination: cursor-based — `{ data: [], nextCursor: string | null, total: number }`
- Dates: always ISO 8601 UTC strings from server — format on client with date-fns

---

## Environment Variables Required
```
# Public (safe to expose to browser)
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_APP_URL=

# Server only (never in client bundles)
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
SENTRY_DSN=
[ADD ALL OTHERS HERE]
```

---

## DO NOT (project-specific additions)
# Add any project-specific rules here that extend the global CLAUDE.md
- [ ] List any patterns to specifically avoid in this project
- [ ] List any third-party services with specific integration rules
- [ ] List any performance budgets specific to this project
