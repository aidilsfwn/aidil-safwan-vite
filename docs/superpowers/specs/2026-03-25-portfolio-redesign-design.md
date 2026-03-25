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

### Palette
| Token | Value | Usage |
|---|---|---|
| `cream` | `#f5efe4` | Main content background |
| `dark` | `#1a1208` | Sidebar, dark cards, contact section bg |
| `amber` | `#c9852a` | Primary accent — borders, highlights, active states, CTAs |
| `amber-muted` | `rgba(201,133,42,0.12)` | Card tints, pill backgrounds |
| `text-primary` | `#1a1208` | Headings on cream bg |
| `text-body` | `#6b5a40` | Body copy |
| `text-secondary` | `#a08060` | Labels, metadata, subtitles |
| `text-on-dark` | `#f5efe4` | All text on dark bg |
| `text-muted-dark` | `#8a7a6a` | Secondary text on dark bg |
| `border-cream` | `rgba(26,18,8,0.07)` | Subtle borders on cream bg |
| `border-amber` | `rgba(201,133,42,0.18)` | Amber-tinted card borders |

### Typography
| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Headings | Playfair Display | 900 | Section titles, names, card headlines |
| Body / UI | Space Grotesk | 400, 600, 700 | All body copy, labels, nav, pills |

Both fonts loaded via `@fontsource` packages (no Google Fonts CDN dependency).

---

## Layout Architecture

### Desktop (≥ `md` breakpoint)
```
┌─────────────────┬──────────────────────────────────┐
│  Fixed Sidebar  │  Snap-scroll content area        │
│   160px wide    │  Full remaining width            │
│   bg: #1a1208   │  bg: varies per section          │
│                 │                                  │
│  - Monogram     │  ┌──────────────────────────┐    │
│  - Nav items    │  │  Section progress bar    │    │
│  - Social links │  │  (pip dots + label)      │    │
│  - Open status  │  ├──────────────────────────┤    │
│                 │  │                          │    │
│                 │  │  Bento grid content      │    │
│                 │  │  (unique per section)    │    │
│                 │  │                          │    │
│                 │  └──────────────────────────┘    │
└─────────────────┴──────────────────────────────────┘
```

**Sidebar** is `position: fixed`, full viewport height. Never scrolls.
**Content area** uses `scroll-snap-type: y mandatory` — each section is `height: 100vh` and snaps into view.
**Sidebar nav** active item updates via `IntersectionObserver` as sections snap.

### Mobile (< `md` breakpoint)
- Sidebar hidden (`hidden md:flex`)
- Existing `FloatingDock` component handles navigation (already built)
- Bento grids collapse to single-column stacked cards
- Snap-scroll retained — works natively on iOS Safari and Android

---

## Navigation Structure

6 sections, 6 nav items:

| # | Label | Anchor | Sidebar dot colour |
|---|---|---|---|
| 1 | About | `#about` | amber (active) |
| 2 | Skills | `#skills` | amber (active) |
| 3 | Work | `#experience` | amber (active) |
| 4 | Education | `#education` | amber (active) |
| 5 | Projects | `#projects` | amber (active) |
| 6 | Contact | `#contact` | amber (active) |

---

## Section Designs

### Section 1 — About (Hero)

**Background:** cream (`#f5efe4`)
**Bento grid:** `grid-template-columns: 1.3fr 1fr` / `grid-template-rows: 1fr 1fr`

| Card | Position | Background | Content |
|---|---|---|---|
| Name card | col 1, row 1–2 (full height) | `#1a1208` | Eyebrow label, "Aidil Safwan" in Playfair 900, amber rule, short bio, circular avatar (44px) bottom-left, Resume button bottom-right |
| Role card | col 2, row 1 | amber-tinted | "Currently at" label, company name in Playfair, title, period, year in large faded amber, arrow |
| Stack card | col 2, row 2 | `#f0e8d8` | "Core Stack" label, tech pills (React, TypeScript, JavaScript, Redux, Next.js), location |

**Avatar:** Small circular element (`44px`) embedded in bottom-left of the Name card. No standalone photo card.
**Resume button:** Amber-bordered text button bottom-right of Name card.

**Content (optimised):**
- Bio: *"Full-stack engineer who actually gives a damn about the frontend. Building digital products across web and mobile."*
- Core stack pills: React, TypeScript, JavaScript, Redux, Next.js

---

### Section 2 — Skills

**Background:** cream
**Section title:** "Craft." (Playfair, with full stop)
**Bento grid:** `grid-template-columns: 1.7fr 1fr` / `grid-template-rows: 1fr 1fr`

| Card | Position | Background | Content |
|---|---|---|---|
| Frontend & Mobile hero | col 1, row 1–2 | `#1a1208` | Eyebrow "↗ Core Expertise", title "Frontend & Mobile", two internal sections (Web / Mobile) each with a divider line and pills, short note, tech count "11" |
| Backend | col 2, row 1 | amber-tinted | "Backend" label, "Server-side" title, pills |
| DevOps & Infra | col 2, row 2 | `#f0e8d8` | "DevOps & Infra" label, "Toolchain" title, pills |

**Skills content (corrected):**

| Category | Skills |
|---|---|
| Web (Frontend) | React, TypeScript, JavaScript, Redux, Next.js |
| Mobile | React Native, Expo, Flutter, iOS, Android |
| Backend | Laravel, Node.js, Express, MySQL, MongoDB, PHP |
| DevOps & Infra | AWS, Azure DevOps, Docker, GitHub Actions, CI/CD |

Note: Google Cloud removed; Azure DevOps added.

---

### Section 3 — Work Experience

**Background:** cream
**Section title:** "Experience." with subtitle "6 years · 4 companies"
**Bento grid:** `grid-template-columns: 1.2fr 1fr`

| Card | Position | Background | Content |
|---|---|---|---|
| Current role hero | col 1, full height | `#1a1208` | "Current" label with pulsing dot, company name, title, period, 3 distilled achievements, tech stack tags, faded year number |
| Previous role 1 | col 2, row 1 | amber-tinted | Company, title, period, one-line highlight |
| Previous role 2 | col 2, row 2 | cream border | Company, title, period, one-line highlight |
| Previous role 3 | col 2, row 3 | cream border | Company, title, period, one-line highlight |

**Content (distilled):**

| Role | Company | Period | Highlight |
|---|---|---|---|
| Senior Software Engineer | The Access Group | Mar 2025 – Present | Leading ChangeGPS integration; microfrontend + microservices architecture; GitHub Actions CI/CD migration; Scrum Master |
| Frontend Developer | Aleph-Labs | May 2022 – Feb 2025 | Led mobile team on large-scale banking apps; micro frontend migration for payment modules; shipped to Australian digital bank |
| Analyst Programmer | Public Bank | Oct 2020 – May 2022 | Led full HRMS redesign & refactor; built eKYC + registration modules for MyPB banking app |
| Software Engineer | INVOKE | Feb 2020 – Oct 2020 | Intern-to-permanent; built company site, state-citizen mobile app, and AI-powered job portal |

---

### Section 4 — Education

**Background:** cream
**Section title:** "Education." with subtitle "UiTM · 2014 – 2020"
**Bento grid:** `grid-template-columns: 1.4fr 1fr` / `grid-template-rows: 1.3fr 1fr`

| Card | Position | Background | Content |
|---|---|---|---|
| Bachelor's degree hero | col 1, row 1 | `#1a1208` | "Bachelor's Degree" eyebrow, "Computer Science (Hons.)", UiTM, 2017–2020, CGPA 3.42 displayed prominently, FYP mention |
| Foundation | col 2, row 1 | amber-tinted | "Foundation in Engineering", UiTM, 2014–2015, CGPA 3.78 |
| Pivot story | col 1–2, row 2 | `#f0e8d8` | Full-width. Text: "Started in Electronic Engineering — switched to Computer Science when the pull towards coding became impossible to ignore." Stat block: 3.78 / 3.42 / 6yr |

**FYP note:** Final year project — Twitter sentiment analysis, bilingual Malay/English NLP classification model with visualisation.

---

### Section 5 — Projects

**Background:** cream
**Section title:** "Projects." with Professional / Personal toggle
**Bento grid:** `grid-template-columns: 1.3fr 1fr`

**Toggle interaction:** Framer Motion `AnimatePresence` fades the featured card and list when switching tabs. No page reload.

**Layout:**
- Left: Featured project card (image, name, description, tags, contextual links)
- Right: Scrollable project list (thumbnail, name, type, tags, arrow). Clicking a row swaps the featured card.

#### Professional Work (7 projects)

| # | Project | Type | Tech | Links |
|---|---|---|---|---|
| 1 | ChangeGPS | Web App | React, Laravel, AWS, Microservices | Live |
| 2 | in1bank | Mobile | React Native, Redux | App Store, Play Store, Live |
| 3 | KWSP i-Akaun | Mobile | React Native, Redux | App Store, Play Store, Live |
| 4 | MyPB | Mobile | React Native, Redux, iOS, Android | App Store, Play Store, Live |
| 5 | PBeXperience | Mobile | React Native, Redux | App Store, Play Store |
| 6 | n9.digital | Mobile | React Native, Expo | App Store, Play Store, Live |
| 7 | invokeisdata | Web | React, Express | Live |

#### Personal Projects (6 projects)

| # | Project | Type | Tech | Links | Notes |
|---|---|---|---|---|---|
| 1 | Elak Hujan | PWA | React 19, TanStack Query, Zustand, Deno Edge, MET API | Live, GitHub | Rain avoidance for Malaysian scooter commuters |
| 2 | Dah Qada | PWA | React, TypeScript, IndexedDB, Dexie.js | GitHub | Islamic missed prayer (qada) tracker, fully local/private |
| 3 | 9mo | PWA | React 19, Firebase, Recharts, shadcn/ui | GitHub | Pregnancy tracker — kicks, weight, contractions, dashboard |
| 4 | af-1-anniversary | Web | React, TypeScript, Vite, Tailwind | GitHub | Personal anniversary web app |
| 5 | COVID-19 Malaysia Dashboard | Web (Archived) | Google Data Studio, Google Sheets | — | Real-time pandemic stats dashboard; referenced by a government official. Taken down post-pandemic. |
| 6 | This Portfolio | Web | React 19, Vite, Tailwind CSS v4, Framer Motion | GitHub | The site you're looking at |

**Archived badge:** COVID-19 dashboard shows an "Archived" badge instead of live/store links, with the government reference called out in the featured card description.

---

### Section 6 — Contact

**Background:** `#1a1208` (full dark — content area inverts for the first time, signalling end of journey)
**Layout:** `grid-template-columns: 1.1fr 1fr`

| Column | Content |
|---|---|
| Left | Eyebrow "↗ Let's talk", Playfair heading "Got something in mind?", amber rule, sub-copy, primary email CTA button (amber bg), footer text "Based in Kuala Lumpur, MY · Available remotely" |
| Right | Three contact cards (Email, LinkedIn, GitHub) — each with icon, label, value, arrow. Hover reveals amber arrow. |

**Footer strip:** Thin bar at the very bottom. Left: copyright. Right: "Built with React + Vite" (amber highlight).

**Contact details:**
- Email: aidilsafwan.aas@gmail.com
- LinkedIn: linkedin.com/in/aidilsafwan
- GitHub: github.com/aidilsfwn

---

## Animation System (Approach 1 — Polished & Shippable)

All animations via **Framer Motion**. No GSAP, no custom cursor, no WebGL.

| Animation | Trigger | Spec |
|---|---|---|
| Bento card entrance | Section snaps into view (`IntersectionObserver`) | `opacity: 0→1`, `y: 20→0`, staggered 80ms between cards, 0.4s duration |
| Sidebar nav indicator | Scroll / snap | Smooth `background-color` transition on active dot, 200ms |
| Project featured card swap | Row click | Framer `AnimatePresence` fade, 250ms |
| Project tab toggle | Toggle button click | Framer `AnimatePresence` fade, 200ms |
| Contact cards hover | Mouse enter | `border-color` + arrow `opacity` transition, 200ms CSS |
| Sidebar social/status | Page load | Spring entrance, 0.5s delay (existing FloatingDock pattern) |

**`prefers-reduced-motion`:** All Framer Motion animations respect this via `useReducedMotion()` hook — durations set to 0 when active.

---

## Component Changes

### New / Replaced
| Component | Action | Notes |
|---|---|---|
| `SectionWrapper.tsx` | Replace | New snap-scroll wrapper with `IntersectionObserver` for active section detection |
| `Sidebar.tsx` | New | Fixed left sidebar — monogram, nav, social links, open status |
| `SnapSection.tsx` | New | `height: 100vh`, `scroll-snap-align: start` wrapper per section |
| `BentoGrid.tsx` | New | Thin wrapper for CSS grid with gap and padding |
| `ProjectsSection.tsx` | Replace | Full rewrite — featured + list layout with tab toggle state |
| `FloatingDock.tsx` | Keep | Mobile nav, no changes needed |

### Removed
| Component | Reason |
|---|---|
| `Timeline.tsx` / `TimelineItem.tsx` | Replaced by bento card layout in Experience and Education |
| `MobileMenu.tsx` | Was already unused; FloatingDock handles mobile nav |
| `DesktopSidebar.tsx` | Was unused; replaced by new `Sidebar.tsx` |
| `keen-slider` dependency | Replaced by click-to-feature interaction |

### Content Updates (`constants/index.tsx`)
- Google Cloud → Azure DevOps in DevOps skills
- Bio shortened to: *"Full-stack engineer who actually gives a damn about the frontend. Building digital products across web and mobile."*
- Personal projects array added (6 entries, see above)
- Professional / personal flag added to each project entry
- COVID dashboard description: references government official citation

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
```

---

## Tailwind Configuration

Extend `tailwind.config.js` (or CSS variables in `styles.css` for Tailwind v4):

```css
:root {
  --color-cream: #f5efe4;
  --color-dark: #1a1208;
  --color-amber: #c9852a;
  --color-amber-muted: rgba(201, 133, 42, 0.12);
  --color-text-body: #6b5a40;
  --color-text-secondary: #a08060;
  --color-text-on-dark: #f5efe4;
}
```

---

## File Structure (additions only)

```
src/
├── components/
│   ├── Sidebar.tsx          (new)
│   ├── SnapSection.tsx      (new)
│   └── BentoGrid.tsx        (new)
├── layouts/sections/
│   ├── Hero.tsx             (rewrite)
│   ├── Skills.tsx           (rewrite)
│   ├── Experience.tsx       (rewrite)
│   ├── Education.tsx        (rewrite)
│   ├── Projects.tsx         (rewrite)
│   └── Contact.tsx          (rewrite)
└── constants/
    └── index.tsx            (update — personal projects, skill corrections, bio)
```

---

## Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `< md` (< 768px) | No sidebar. Snap sections full width. Bento → single column. FloatingDock for nav. |
| `≥ md` (≥ 768px) | Fixed sidebar (160px) + snap content area. Full bento grids. |

---

## Open Questions / Decisions Made

| Question | Decision |
|---|---|
| Light vs dark mode | Light mode (cream) throughout, dark sidebar always, contact section fully dark. No toggle. |
| Custom cursor | No — adds complexity, removed by touch on mobile anyway |
| GSAP vs Framer Motion | Framer Motion only — cleaner, already in stack |
| Education as own section | Yes — confirmed by user |
| `af-1-anniversary` include? | Yes — included in personal projects |
| COVID dashboard (taken down) | Yes — included with "Archived" badge, government reference in description |
| `Google Cloud` in DevOps | Removed, replaced with Azure DevOps |
