# Portfolio Redesign — Design Spec
**Date:** 2026-03-25
**Status:** Approved

---

## Overview

A complete visual and structural redesign of aidil-safwan-vite — a single-page React portfolio for Aidil Safwan, Senior Software Engineer. The goal is to elevate the design from a generic dark-card-with-indigo-accent template to a distinctive, editorial-quality portfolio that reflects genuine frontend craft.

---

## Design Direction

**Vibe:** Interactive (B) + Refined/Studio (D) + Editorial touches (A)
The portfolio itself should demonstrate frontend skill — not just list it.

---

## Design Tokens

### Palette — Tailwind v4 (`styles.css` under `@theme`)
```css
@theme {
  --color-cream: #f5efe4;
  --color-dark: #1a1208;
  --color-amber: #c9852a;
  --color-amber-hover: #b8741f;
  --color-cream-muted: #f0e8d8;
  --color-text-body: #6b5a40;
  --color-text-secondary: #a08060;
  --color-text-muted: #8a7a6a;
  --color-text-on-dark: #f5efe4;
  --color-border-cream: rgba(26, 18, 8, 0.07);
  --color-border-amber: rgba(201, 133, 42, 0.18);
  --color-amber-tint: rgba(201, 133, 42, 0.08);
}
```

These tokens are used in Tailwind classes as `bg-cream`, `text-amber`, `border-amber`, etc.

### Typography — loaded in `styles.css`
```css
@import '@fontsource/playfair-display/900.css';
@import '@fontsource/space-grotesk/400.css';
@import '@fontsource/space-grotesk/600.css';
@import '@fontsource/space-grotesk/700.css';
```

| Role | Font | Weight |
|---|---|---|
| Display / Headings | Playfair Display | 900 |
| Body / UI / Labels | Space Grotesk | 400, 600, 700 |

Remove existing `--font-sans: Inter` from `styles.css`. Set:
```css
:root {
  --font-display: 'Playfair Display', Georgia, serif;
  --font-sans: 'Space Grotesk', system-ui, sans-serif;
}
```

---

## DOM Structure (App.tsx rewrite)

The current `max-w-4xl mx-auto` wrapper is **removed**. New top-level structure:

```tsx
<div className="flex h-screen overflow-hidden">
  {/* Fixed sidebar — desktop only */}
  <Sidebar className="hidden md:flex w-[160px] flex-shrink-0" />

  {/* Snap-scroll content area */}
  <main
    id="scroll-container"
    className="flex-1 overflow-y-auto"
    style={{ scrollSnapType: 'y mandatory' }}
  >
    <SnapSection id="about"><Hero /></SnapSection>
    <SnapSection id="skills"><Skills /></SnapSection>
    <SnapSection id="experience"><Experience /></SnapSection>
    <SnapSection id="education"><Education /></SnapSection>
    <SnapSection id="projects"><Projects /></SnapSection>
    <SnapSection id="contact"><Contact /></SnapSection>
  </main>

  {/* Mobile nav — hidden on desktop */}
  <FloatingDock className="flex md:hidden" />
</div>
```

**Key points:**
- `overflow-hidden` on the outer div prevents double scrollbars
- The `<main>` element is the scroll container — NOT `window`
- `FloatingDock` gets `className="flex md:hidden"` — hidden when sidebar is visible
- Sidebar gets `className="hidden md:flex"` — hidden on mobile

---

## Active Section State — Shared Hook

Both `Sidebar` and `FloatingDock` share a single `useActiveSection` hook to avoid conflicting scroll listeners.

```ts
// src/hooks/useActiveSection.ts
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const container = document.getElementById('scroll-container');
    if (!container) return;

    const observers = sectionIds.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { root: container, threshold: 0.5 }
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach(o => o?.disconnect());
  }, [sectionIds]);

  return activeId;
}
```

`FloatingDock` is updated to use this hook instead of its current `window.scrollY` listener. The `root` is the `#scroll-container` element, not `window`.

---

## Component Specs

### `SnapSection.tsx`
```tsx
interface SnapSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}
// Renders: <section id={id} style={{ scrollSnapAlign: 'start', height: '100dvh' }} ...>
```

Uses `100dvh` (dynamic viewport height) instead of `100vh` to prevent overflow on mobile browsers with dynamic address bars.

### `Sidebar.tsx`
```tsx
interface SidebarProps {
  className?: string;
}
```
- `position: fixed` (via Tailwind `fixed`), full height, `z-index: 40` (`z-40`)
- Internally calls `useActiveSection(['about','skills','experience','education','projects','contact'])`
- Renders: brand monogram, nav items, divider, social links, open-to-work status

### `BentoGrid.tsx`
Thin layout primitive — a named `div` with consistent gap and padding. Each section defines its own `grid-template-columns` and `grid-template-rows` inline (they are all different). `BentoGrid` only provides:
```tsx
interface BentoGridProps {
  children: React.ReactNode;
  className?: string; // caller supplies grid-cols, grid-rows
}
// Renders: <div className={cn('grid gap-2.5 p-3.5 flex-1 overflow-hidden', className)}>
```

### `FloatingDock.tsx` (updated)
- Add `className?: string` prop — consumed as `className="flex md:hidden"` from App.tsx
- Replace `window` scroll listener with `useActiveSection` hook
- `z-index: 50` (`z-50`) — above sidebar's `z-40`

---

## Z-Index Layering

| Element | z-index | Class |
|---|---|---|
| Sidebar | 40 | `z-40` |
| FloatingDock | 50 | `z-50` |
| Tooltips / overlays | 60 | `z-60` |

---

## Section Designs

### Section 1 — About (Hero)

**Background:** `bg-cream`
**Bento grid spec:**
```
grid-template-columns: 1.3fr 1fr
grid-template-rows: 1fr 1fr
────────────────────────────
│  Name card      │ Role   │
│  (col 1, r 1-2) │ card   │
│                 ├────────│
│                 │ Stack  │
│                 │ card   │
────────────────────────────
```

| Card | Grid area | Background | Content |
|---|---|---|---|
| Name card | col 1 / row 1-2 | `#1a1208` | Eyebrow label, "Aidil Safwan" Playfair 900, amber rule, short bio, 44px circular avatar bottom-left, Resume pill button bottom-right |
| Role card | col 2 / row 1 | `bg-amber-tint border-border-amber` | "Currently at" label, company name Playfair, title, period, faded year number, ↗ arrow |
| Stack card | col 2 / row 2 | `bg-cream-muted border-border-cream` | "Core Stack" label, tech pills, 📍 location |

**Avatar:** 44px circle embedded bottom-left of Name card. Uses `memoji.png` from assets. `object-cover`, `rounded-full`.
**Resume button:** Amber-bordered text button (`border border-amber text-amber text-xs font-semibold px-3 py-1.5 rounded`) links to `/AidilSafwanResume.pdf`.

**Bio (optimised):**
> "Six years building things people actually use. Senior engineer who happens to care about pixels — frontend by instinct, full-stack by necessity. Based in KL, across web and mobile."

**Core Stack pills:** React, TypeScript, JavaScript, Redux, Next.js

---

### Section 2 — Skills

**Background:** `bg-cream`
**Section title:** "Craft." (Playfair 900 with full stop)
**Bento grid spec:**
```
grid-template-columns: 1.7fr 1fr
grid-template-rows: 1fr 1fr
────────────────────────────────────
│  Frontend & Mobile hero           │ Backend │
│  (col 1, row 1-2)                 ├─────────│
│                                   │ DevOps  │
────────────────────────────────────
```

**Skills data — restructure `constants/index.tsx`:**
```ts
export const skills = {
  web: ['React', 'TypeScript', 'JavaScript', 'Redux', 'Next.js'],
  mobile: ['React Native', 'Expo', 'Flutter', 'iOS', 'Android'],
  backend: ['Laravel', 'Node.js', 'Express', 'MySQL', 'MongoDB', 'PHP'],
  devops: ['AWS', 'Azure DevOps', 'Docker', 'GitHub Actions', 'CI/CD'],
};
```

Hero card displays `skills.web` under a "Web" divider and `skills.mobile` under a "Mobile" divider.

---

### Section 3 — Work Experience

**Background:** `bg-cream`
**Section title:** "Experience." — subtitle: "6 years · 4 companies"
**Bento grid spec:**
```
grid-template-columns: 1.2fr 1fr
grid-template-rows: 1fr 1fr 1fr   (right column only)
────────────────────────────────
│  Current role       │ Aleph  │
│  hero card          ├────────│
│  (col 1, row 1-3)   │ Pub Bk │
│                     ├────────│
│                     │ INVOKE │
────────────────────────────────
```

**Current role featured achievements (3 — most impactful):**
1. Inherited a vendor-built Laravel + React polyrepo mess; kept delivery running solo through a leadership gap (lead failed probation, one team member on 6-month maternity leave) until new lead onboarded
2. Singlehandedly migrated all CI/CD pipelines from Bitbucket to GitHub Actions — The Access Group had GitHub enterprise, not Bitbucket
3. Now rebuilding ChangeGPS from scratch in React + .NET on Azure, integrated into Access Evo (The Access Group's unified SSO platform), monorepo architecture

**Context note for hero card description:**
ChangeGPS is a practice management and compliance platform for accountants, originally running on vanilla PHP + JS. The revamp (Laravel + React polyrepo) was taken over from Philippine vendors post-acquisition and was ultimately scrapped after a new lead joined. The current greenfield rebuild uses React + .NET + Azure within the Access Evo ecosystem.

**Previous roles (one-line highlights):**

| Company | Highlight |
|---|---|
| Aleph-Labs | Led mobile team on large-scale banking apps; shipped micro frontend migration to Australian digital bank |
| Public Bank | Full HRMS redesign & codebase refactor; built eKYC + registration modules for MyPB |
| INVOKE | Intern-to-permanent; built company site, state-citizen mobile app, and AI-powered job portal |

---

### Section 4 — Education

**Background:** `bg-cream`
**Section title:** "Education." — subtitle: "UiTM · 2014 – 2020"
**Bento grid spec:**
```
grid-template-columns: 1.4fr 1fr
grid-template-rows: 1.3fr 1fr
───────────────────────────────────
│  Degree hero        │ Foundation │
│  (col 1, row 1)     │ (col 2, r1)│
├─────────────────────┴────────────│
│  Pivot story card (col 1-2, r 2) │
───────────────────────────────────
```

**Pivot story card copy (add to constants or hardcode in component):**
> "Started in Electronic Engineering — switched to Computer Science when the pull towards coding became impossible to ignore. Never looked back."

**FYP detail (in Degree hero card):**
> Final year: Twitter sentiment analysis — bilingual Malay/English NLP classification model with data visualisation.

**Stat block in pivot card:** 3.78 (Foundation CGPA) · 3.42 (Degree CGPA) · 6yr (total academia)

---

### Section 5 — Projects

**Background:** `bg-cream`
**Section title:** "Projects." with Professional / Personal tab toggle

**Tab toggle:**
- Renders two buttons: "Professional" | "Personal"
- State: `const [activeTab, setActiveTab] = useState<'professional' | 'personal'>('professional')`
- AnimatePresence key: the `activeTab` string value (`"professional"` / `"personal"`)
- Exit/enter animation: `opacity: 0↔1`, `x: ±10px`, 200ms ease

**Bento grid spec:**
```
grid-template-columns: 1.3fr 1fr
─────────────────────────────────
│  Featured card   │ Scrollable  │
│  (full height)   │ project     │
│                  │ list        │
─────────────────────────────────
```

**Featured card image fallback:** `onError` sets `src` to a placeholder div with the project emoji. No broken img element shown.

#### Data structure update (`constants/index.tsx`)

Add `category: 'professional' | 'personal'` to each project entry. Add `isArchived?: boolean`.

```ts
export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  category: 'professional' | 'personal';
  demoUrl?: string;
  repoUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  isArchived?: boolean;
  archivedNote?: string;
}
```

#### Professional Projects (7)

| Title | Description | Tech | Links |
|---|---|---|---|
| ChangeGPS | Modern accounting platform for accountants — practice management and compliance tools. Integrating into The Access Group ecosystem as a modular APAC platform. | React, Laravel, AWS, Microservices | demoUrl |
| in1bank | Digital-first Australian banking app with seamless in-app account creation and government guarantees. | React Native, Redux | demoUrl, appStoreUrl, playStoreUrl |
| KWSP i-Akaun | Refreshed EPF app — retirement savings monitoring, transactions, and branch locator. | React Native, Redux | demoUrl, appStoreUrl, playStoreUrl |
| MyPB | Public Bank's next-gen mobile banking app combining financial services and lifestyle features. | React Native, Redux | demoUrl, appStoreUrl, playStoreUrl |
| PBeXperience | Internal productivity app for Public Bank employees — secure suite of digital tools. | React Native, Redux | appStoreUrl, playStoreUrl |
| n9.digital | Official digital gateway for Negeri Sembilan — citizen, business, and government interactions. | React Native, Expo | demoUrl, appStoreUrl, playStoreUrl |
| invokeisdata | Landing page for INVOKE showcasing data analytics and political intelligence capabilities. | React, Express | demoUrl |

#### Personal Projects (6)

| Title | Description | Tech | Links | Notes |
|---|---|---|---|---|
| Elak Hujan | Rain avoidance PWA for Malaysian scooter commuters — ranks best office days and departure times based on MET Malaysia forecasts. | React 19, TypeScript, TanStack Query v5, Zustand, Deno Edge Functions | demoUrl, repoUrl | — |
| Dah Qada | Islamic missed prayer (qada) tracker. All data stored locally via IndexedDB — fully private, no server. | React, TypeScript, Dexie.js, JAKIM API | repoUrl | — |
| 9mo | Pregnancy tracker PWA — kicks, weight, contraction timing, live dashboard. | React 19, TypeScript, Firebase Firestore, Recharts, shadcn/ui | repoUrl | — |
| af-1-anniversary | A mobile-optimised digital anniversary card — background music, animated layout, and PDF export. Built for a person, not a portfolio. | React 19, TypeScript, Tailwind CSS | repoUrl | — |
| COVID-19 Malaysia Dashboard | Real-time pandemic statistics dashboard for Malaysia — automated data entry via Google Sheets with live visualisations. | Google Data Studio, Google Sheets | — | `isArchived: true`, `archivedNote: "Referenced by a government official during the pandemic. Taken down post-pandemic."` |
| This Portfolio | The site you're looking at. Built to showcase frontend craft, not just list it. | React 19, Vite, Tailwind CSS v4, Framer Motion | repoUrl | — |

---

### Section 6 — Contact

**Background:** `#1a1208` (full dark — first time content area matches sidebar, signals journey end)
**Bento grid spec:**
```
grid-template-columns: 1.1fr 1fr
─────────────────────────────────
│  Typographic CTA │  3 Contact  │
│  (left)          │  cards      │
│                  │  (right)    │
─────────────────────────────────
```

**Footer strip:** Thin `border-t border-amber/10` strip at the very bottom of the Contact section (not a separate component). Copyright left, "Built with React + Vite" right.

**Contact details:**
- Email: aidilsafwan.aas@gmail.com → `mailto:` link
- LinkedIn: linkedin.com/in/aidilsafwan → external link
- GitHub: github.com/aidilsfwn → external link

---

## Animation System

All animations via **Framer Motion** only. No GSAP.

| Animation | Trigger | Spec |
|---|---|---|
| Bento card entrance | Section enters viewport (`IntersectionObserver`, threshold 0.4) | `opacity: 0→1`, `y: 16→0`, stagger 80ms between cards, duration 0.4s, ease `easeOut` |
| Sidebar nav active dot | `useActiveSection` state change | `background-color` CSS transition 200ms |
| Project featured card swap | Row click | `AnimatePresence` with key = project title, `opacity: 0↔1` 250ms |
| Projects tab toggle | Toggle click | `AnimatePresence` with key = `activeTab`, `opacity: 0↔1`, `x: ±10→0` 200ms |
| Contact card hover | CSS only | `border-color` + arrow `opacity` 200ms transition |
| FloatingDock entrance | Page load | Existing spring animation, no change |

**`prefers-reduced-motion`:** Call `const shouldReduceMotion = useReducedMotion()` once in `App.tsx` and pass as a prop or via context to all animated components. When true, set all durations to `0`.

---

## Component Changes Summary

### New
| Component | Path | Notes |
|---|---|---|
| `Sidebar` | `src/components/Sidebar.tsx` | Fixed desktop nav |
| `SnapSection` | `src/components/SnapSection.tsx` | 100dvh snap wrapper |
| `BentoGrid` | `src/components/BentoGrid.tsx` | Grid layout primitive |
| `useActiveSection` | `src/hooks/useActiveSection.ts` | Shared IntersectionObserver hook |

### Rewrite (keep filename)
- `src/layouts/sections/Hero.tsx`
- `src/layouts/sections/Skills.tsx`
- `src/layouts/sections/Experience.tsx`
- `src/layouts/sections/Education.tsx`
- `src/layouts/sections/Projects.tsx`
- `src/layouts/sections/Contact.tsx`
- `src/App.tsx`
- `src/constants/index.tsx` (add personal projects, update interfaces, fix skills structure)

### Update
- `src/components/FloatingDock.tsx` — add `className` prop, switch to `useActiveSection`

### Delete
- `src/components/Timeline.tsx`
- `src/components/TimelineItem.tsx`
- `src/components/MobileMenu.tsx` (was unused)
- `src/components/DesktopSidebar.tsx` (was unused)
- `src/components/SectionWrapper.tsx` (replaced by SnapSection + Framer entrance pattern)

---

## Dependencies

### Add
```
@fontsource/playfair-display
@fontsource/space-grotesk
```

### Remove
```
keen-slider
```

### Keep
```
framer-motion
lucide-react
tailwindcss
@tailwindcss/vite
```

---

## TypeScript Interfaces

```ts
// src/constants/index.tsx

export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  category: 'professional' | 'personal';
  demoUrl?: string;
  repoUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  isArchived?: boolean;
  archivedNote?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
  featuredAchievements?: string[]; // max 3, shown in hero card
  tech?: string[];
}

export const skills: {
  web: string[];
  mobile: string[];
  backend: string[];
  devops: string[];
};
```

---

## Responsive Breakpoints

| Breakpoint | Sidebar | FloatingDock | Bento |
|---|---|---|---|
| `< md` (< 768px) | `hidden` | `flex` (bottom fixed) | Single column stacked cards |
| `≥ md` (≥ 768px) | `flex` fixed 160px | `hidden` | Full grid per section spec |

---

## Decisions Log

| Question | Decision |
|---|---|
| Light vs dark mode | Cream throughout, dark sidebar always, contact section fully dark. No toggle. |
| Custom cursor | No — meaningless on touch, adds bundle weight |
| GSAP vs Framer Motion | Framer Motion only — already in stack, sufficient |
| Education own section | Yes |
| `af-1-anniversary` include | Yes — personal tab |
| COVID dashboard (taken down) | Yes — `isArchived: true`, "Archived" badge, govt reference in description |
| Google Cloud in DevOps | Removed; replaced with Azure DevOps |
| ScrollSpy mechanism | IntersectionObserver on `#scroll-container` — shared via `useActiveSection` hook |
| FloatingDock on desktop | Hidden (`hidden md:hidden` → `className="flex md:hidden"` from App.tsx) |
| 100vh vs 100dvh | `100dvh` — prevents mobile browser chrome overflow |
| Font loading | `@import` in `styles.css` via `@fontsource` packages |
| Tailwind v4 tokens | Defined in `styles.css` under `@theme` block |
| Featured achievements | Add `featuredAchievements` field to Experience interface, max 3 items |
| AnimatePresence keys | Project featured: project `title`. Tab toggle: `activeTab` string |
| `useReducedMotion` | Called once in `App.tsx`, passed via context |
| Sidebar z-index | `z-40`; FloatingDock `z-50`; tooltips `z-60` |
