# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio from a basic scrolling page to a polished bento-grid layout with fixed sidebar, CSS scroll-snap sections, Warm Cream + Amber + Near-Black palette, and Playfair Display / Space Grotesk typography.

**Architecture:** Fixed dark sidebar (desktop, 160px, z-40) + CSS `scroll-snap-type: y mandatory` main content area + FloatingDock (mobile only, z-50). Six 100dvh snap sections each with a unique bento grid. Framer Motion stagger animations triggered by `whileInView`. Shared `useActiveSection` hook drives both sidebar and dock. MotionProvider respects `prefers-reduced-motion`.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion (already installed), @fontsource/playfair-display, @fontsource/space-grotesk. Remove: keen-slider.

**Spec:** `docs/superpowers/specs/2026-03-25-portfolio-redesign-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/styles.css` | Modify | Tailwind @theme tokens: `--color-cream`, `--color-ink`, `--color-amber`, `--font-display`, `--font-sans` |
| `src/main.tsx` | Modify | Import @fontsource font weight CSS files |
| `src/constants/index.tsx` | Modify | TypeScript interfaces + updated skills/projects/experiences/bio |
| `src/hooks/useActiveSection.ts` | **Create** | IntersectionObserver on `#scroll-container`, exports hook + `scrollToSection` |
| `src/context/MotionContext.tsx` | **Create** | `useReducedMotion()` provider, exports `useMotion()` |
| `src/components/SnapSection.tsx` | **Create** | 100dvh section wrapper with snap progress bar |
| `src/components/BentoGrid.tsx` | **Create** | Grid layout primitive |
| `src/components/Sidebar.tsx` | **Create** | Fixed desktop nav (z-40, 160px) |
| `src/components/FloatingDock.tsx` | Modify | Add `className` prop, remove window listeners, use `useActiveSection`, add Education |
| `src/App.tsx` | Modify | Full rewrite — flex layout, Sidebar+SnapSections+FloatingDock, MotionProvider |
| `src/components/index.ts` | Modify | Remove dead exports, add new component exports |
| `src/layouts/sections/Hero.tsx` | Modify | Full rewrite — bento: name card + role card + stack card |
| `src/layouts/sections/Skills.tsx` | Modify | Full rewrite — bento: frontend+mobile hero + backend + devops |
| `src/layouts/sections/Experience.tsx` | Modify | Full rewrite — bento: current role hero + 3 previous role cards |
| `src/layouts/sections/Education.tsx` | Modify | Full rewrite — bento: degree hero + foundation card + pivot story bar |
| `src/layouts/sections/Projects.tsx` | Modify | Full rewrite — Professional/Personal toggle + featured + list + AnimatePresence |
| `src/layouts/sections/Contact.tsx` | Modify | Full rewrite — full dark, typographic CTA + contact cards + footer strip |
| `src/components/Timeline.tsx` | **Delete** | Replaced by bento experience layout |
| `src/components/Footer.tsx` | **Delete** | Footer inlined into Contact section |
| `src/components/SectionWrapper.tsx` | **Delete** | Replaced by SnapSection |
| `src/components/MobileMenu.tsx` | **Delete** | Replaced by FloatingDock |
| `src/components/DesktopSidebar.tsx` | **Delete** | Replaced by Sidebar |

---

## Task 1: Foundation — Fonts, Dependencies, CSS Tokens

**Files:**
- Modify: `package.json` (via npm)
- Modify: `src/styles.css`
- Modify: `src/main.tsx`

- [ ] **Step 1: Uninstall keen-slider**

```bash
npm uninstall keen-slider
```

- [ ] **Step 2: Install @fontsource font packages**

```bash
npm install @fontsource/playfair-display @fontsource/space-grotesk
```

- [ ] **Step 3: Rewrite src/styles.css**

```css
@import "tailwindcss";

@theme {
  --color-cream: #f5efe4;
  --color-ink: #1a1208;
  --color-amber: #c9852a;
  --font-display: "Playfair Display", Georgia, serif;
  --font-sans: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  background-color: #1a1208;
}
```

- [ ] **Step 4: Update src/main.tsx with font imports**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/900.css";
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "./styles.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 5: Verify build passes**

```bash
npm run build
```

Expected: 0 TypeScript errors, 0 build errors.

- [ ] **Step 6: Commit**

```bash
git add src/styles.css src/main.tsx package.json package-lock.json
git commit -m "feat: install fontsource fonts, remove keen-slider, add theme tokens"
```

---

## Task 2: Content Layer — Constants

**Files:**
- Modify: `src/constants/index.tsx`

- [ ] **Step 1: Rewrite src/constants/index.tsx**

Replace the entire file with the following. New TypeScript interfaces, updated skills structure, reordered/expanded projects with `category` field, updated experiences with `featuredAchievements`, corrected bio, and 5 personal projects added.

```tsx
import {
  BriefcaseBusiness,
  GraduationCap,
  Contact,
  Laptop,
  User,
  FolderKanban,
} from "lucide-react";

// ─── Interfaces ────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  demoUrl?: string;
  repoUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  category: "professional" | "personal";
  isArchived?: boolean;
  archivedNote?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description?: string;
  achievements: string[];
  featuredAchievements?: string[];
  tech?: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  details: string;
}

// ─── Profile ───────────────────────────────────────────────────────────────────

export const profile = {
  name: "Aidil Safwan",
  title: "Senior Software Engineer @ The Access Group",
  location: "Kuala Lumpur, MY",
  email: "aidilsafwan.aas@gmail.com",
  bio: "Frontend engineer at heart, fullstack in practice. 5+ years turning ideas into digital products — from mobile banking apps to government platforms. Currently leading frontend at The Access Group.",
  githubUrl: "https://github.com/aidilsfwn",
  linkedinUrl: "https://linkedin.com/in/aidilsafwan",
  resumeUrl: "/AidilSafwanResume.pdf",
};

// ─── Skills ────────────────────────────────────────────────────────────────────

export const skills: {
  web: string[];
  mobile: string[];
  backend: string[];
  devops: string[];
} = {
  web: ["React", "TypeScript", "JavaScript", "Redux", "Next.js", "UI/UX"],
  mobile: ["React Native", "Expo", "Flutter", "iOS", "Android"],
  backend: ["Laravel", "Node.js", "Express", "MySQL", "MongoDB", "PHP"],
  devops: ["AWS", "Azure DevOps", "Docker", "GitHub Actions", "CI/CD"],
};

// ─── Experience ────────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    title: "Senior Software Engineer",
    company: "The Access Group",
    period: "Mar 2025 - Present",
    featuredAchievements: [
      "Inherited a vendor-built codebase — led migration of CI/CD pipelines from Bitbucket to GitHub Actions from scratch.",
      "Rebuilding the ChangeGPS accounting suite as Access Evo: a modular React + .NET + Azure SSO platform in a monorepo.",
      "Served as interim technical lead through a leadership gap, maintaining delivery continuity across cross-functional teams.",
    ],
    tech: ["React", ".NET", "Azure", "GitHub Actions"],
    achievements: [
      "Build and maintain full-stack systems using React + Vite, PHP Laravel, MySQL, and AWS.",
      "Collaborate closely with the Product Manager to translate business requirements into technical solutions.",
      "Mentor and guide engineers to optimize development workflows and uphold code quality.",
      "Utilize AI-assisted development tools—Devin, Claude, GitHub Copilot—to accelerate delivery.",
      "Lead the integration of ChangeGPS into the Access ecosystem as a modular APAC platform.",
      "Implement microfrontend and microservices architecture for independent deployments.",
      "Spearhead redevelopment of the ChangeGPS accounting suite on an AI-augmented foundation.",
      "Oversee CI/CD migration from Bitbucket to GitHub Actions.",
      "Serve as interim technical lead during leadership transitions.",
      "Act as Scrum Master facilitating sprint planning, retrospectives, and capacity management.",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Aleph-Labs",
    period: "May 2022 - Feb 2025",
    featuredAchievements: [
      "First mobile team member for a large-scale banking app — built the component library and led project-wide mobile coordination.",
      "Drove micro frontend migration for a banking web app payment module.",
      "Delivered features for an Australian digital bank (in1bank), collaborating directly with product owners.",
    ],
    tech: ["React", "React Native", "Flutter", "Redux"],
    achievements: [
      "First member of the mobile team for a large-scale app project, leading mobile development including component library creation.",
      "Worked on end-to-end implementation, collaborating with product owners, analysts, stakeholders, and testing teams.",
      "Actively onboarded new developers, reviewed code, resolved bugs, handled change requests, and assisted with deployments.",
      "Played a role in a micro frontend migration for a banking web app payment module, including unit test refactoring.",
      "Maintained a Flutter component library for a banking app and assisted with an internal banking solution MVP.",
      "Supported new feature implementation and bug fixes for an Australian digital bank app.",
    ],
  },
  {
    title: "Analyst Programmer",
    company: "Public Bank",
    period: "Oct 2020 - May 2022",
    featuredAchievements: [
      "Built registration and eKYC modules for MyPB — a next-gen mobile banking app with native SDK bridge.",
      "Led a complete redesign and codebase refactor of the internal HRMS app.",
    ],
    tech: ["React Native", "Redux", "iOS", "Android"],
    achievements: [
      "Progressed from trainee to full-fledged analyst programmer within a year.",
      "Designed festive-themed UI elements for the HRMS app, coordinating with internal clients.",
      "Led a complete redesign and codebase refactor for the HRMS app.",
      "Developed registration and eKYC modules for a new banking app with native SDK integration.",
      "Conducted code reviews, identified bugs, and enhanced overall app functionality.",
    ],
  },
  {
    title: "Software Engineer",
    company: "INVOKE",
    period: "Feb 2020 - Oct 2020",
    featuredAchievements: [
      "Converted from intern to full-time hire based on performance.",
      "Built n9.digital — the Negeri Sembilan state digital gateway connecting citizens, businesses, and government.",
    ],
    tech: ["React", "React Native", "Expo"],
    achievements: [
      "Initially joined as an intern; secured a permanent role due to high performance.",
      "Collaborated with various teams to deliver client-focused solutions including landing pages for a UK real estate client.",
      "Built the company website, integrating form handling, security features, and notifications.",
      "Developed a mobile solution for state-citizen engagement and an AI-powered job portal.",
      "Practiced agile methodology, participated in scrums, and assisted with code reviews.",
    ],
  },
];

// ─── Education ─────────────────────────────────────────────────────────────────

export const education: EducationEntry[] = [
  {
    degree: "Bachelor of Computer Science (Hons.)",
    institution: "Universiti Teknologi MARA (UiTM)",
    period: "2017 - 2020",
    details: "CGPA: 3.42",
  },
  {
    degree: "Foundation in Engineering",
    institution: "Universiti Teknologi MARA (UiTM)",
    period: "2014 - 2015",
    details: "CGPA: 3.78",
  },
];

// ─── Projects ──────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  // Professional
  {
    id: "changegps",
    title: "ChangeGPS",
    description:
      "A modern platform for accountants, offering practice management and compliance tools tailored to firms of all sizes.",
    tech: ["React", "Laravel", "AWS"],
    image: "/images/cgps.webp",
    demoUrl: "https://changegps.com.au",
    category: "professional",
  },
  {
    id: "in1bank",
    title: "in1bank",
    description:
      "A digital-first Australian banking app with seamless in-app account creation and the same government guarantees as traditional banks.",
    tech: ["React Native", "Redux", "iOS", "Android"],
    image: "/images/in1bank.webp",
    demoUrl: "https://in1bank.com.au",
    appStoreUrl: "https://apps.apple.com/au/app/in1bank/id1490235916",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.in1bank.mobile",
    category: "professional",
  },
  {
    id: "kwsp",
    title: "KWSP i-Akaun",
    description:
      "The refreshed KWSP i-Akaun app empowers users to monitor their retirement savings, manage transactions, and locate branches.",
    tech: ["React Native", "Redux", "iOS", "Android"],
    image: "/images/kwsp.webp",
    demoUrl: "https://www.kwsp.gov.my/en/member/i-akaun",
    appStoreUrl: "https://apps.apple.com/my/app/kwsp-i-akaun/id1396563336",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=my.gov.kwsp.iakaun",
    category: "professional",
  },
  {
    id: "mypb",
    title: "MyPB",
    description:
      "Public Bank's next-gen mobile banking app, combining financial services and lifestyle features in a sleek, unified experience.",
    tech: ["React Native", "Redux", "iOS", "Android"],
    image: "/images/mypb.webp",
    demoUrl: "https://www.pbebank.com",
    appStoreUrl:
      "https://apps.apple.com/my/app/mypb-by-public-bank/id1527807753",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.publicbank.mypb",
    category: "professional",
  },
  {
    id: "pbexperience",
    title: "PBeXperience",
    description:
      "An internal productivity app by Public Bank, delivering a secure suite of digital tools to enhance employee efficiency on the go.",
    tech: ["React Native", "Redux"],
    image: "/images/pbx.webp",
    appStoreUrl: "https://apps.apple.com/my/app/pbexperience/id1181226879",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.publicbank.pbe.mobile",
    category: "professional",
  },
  {
    id: "n9digital",
    title: "n9.digital",
    description:
      "The official digital gateway for Negeri Sembilan, enabling seamless interactions between citizens, businesses, and government agencies.",
    tech: ["React Native", "Expo"],
    image: "/images/n9.webp",
    demoUrl: "https://n9.digital",
    appStoreUrl: "https://apps.apple.com/my/app/n9-digital/id1481541604",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=my.n9.digital",
    category: "professional",
  },
  {
    id: "invokeisdata",
    title: "invokeisdata",
    description:
      "A sleek landing page for Invoke, showcasing the firm's capabilities in data analytics, insights, and political intelligence.",
    tech: ["React", "Express"],
    image: "/images/invoke.jpg",
    demoUrl: "https://invokeisdata.com",
    category: "professional",
  },
  // Personal
  {
    id: "covid-dashboard",
    title: "COVID-19 MY Dashboard",
    description:
      "A real-time COVID-19 statistics dashboard for Malaysia — automated data pipeline via Google Sheets, visualised in Google Data Studio. Referenced by government officials during the pandemic.",
    tech: ["Google Data Studio", "Google Sheets"],
    category: "personal",
    isArchived: true,
    archivedNote: "Data no longer maintained — pandemic has ended.",
  },
  {
    id: "dah-qada",
    title: "dah-qada",
    description:
      "A prayer qada tracker for Muslims — keep track of missed prayers and make them up, one at a time.",
    tech: ["React", "Vite", "TypeScript"],
    repoUrl: "https://github.com/aidilsfwn/dah-qada",
    category: "personal",
  },
  {
    id: "9mo",
    title: "9mo",
    description:
      "A pregnancy and milestone tracker for the journey from conception to birth. 9 months, documented.",
    tech: ["React", "TypeScript"],
    repoUrl: "https://github.com/aidilsfwn/9mo",
    category: "personal",
  },
  {
    id: "elak-hujan",
    title: "elak-hujan",
    description:
      "A rain prediction and avoidance tool built for Kuala Lumpur commuters — know before you go.",
    tech: ["React"],
    repoUrl: "https://github.com/aidilsfwn/elak-hujan",
    category: "personal",
  },
  {
    id: "af-1-anniversary",
    title: "af-1-anniversary",
    description:
      "A mobile-first digital anniversary card — background music plays on load, shareable, with a PDF export option.",
    tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS"],
    repoUrl: "https://github.com/aidilsfwn/af-1-anniversary",
    category: "personal",
  },
];

// ─── Menu ──────────────────────────────────────────────────────────────────────

export const menu = [
  { label: "About", link: "#about", icon: <User /> },
  { label: "Skills", link: "#skills", icon: <Laptop /> },
  { label: "Experience", link: "#experience", icon: <BriefcaseBusiness /> },
  { label: "Education", link: "#education", icon: <GraduationCap /> },
  { label: "Projects", link: "#projects", icon: <FolderKanban /> },
  { label: "Contact", link: "#contact", icon: <Contact /> },
];
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/constants/index.tsx
git commit -m "feat: update constants with TypeScript interfaces, personal projects, and revised experiences"
```

---

## Task 3: Hooks and MotionContext

**Files:**
- Create: `src/hooks/useActiveSection.ts`
- Create: `src/context/MotionContext.tsx`

- [ ] **Step 1: Create src/hooks/useActiveSection.ts**

```ts
import { useEffect, useState } from "react";

const SECTION_IDS = [
  "about",
  "skills",
  "experience",
  "education",
  "projects",
  "contact",
] as const;

export function useActiveSection(): string {
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { root: container, threshold: 0.5 }
    );

    const elements = SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function scrollToSection(id: string): void {
  const container = document.getElementById("scroll-container");
  const el = document.getElementById(id);
  if (!container || !el) return;
  // Scroll the snap container, not the window, for reliable snap behavior
  container.scrollTo({ top: el.offsetTop, behavior: "smooth" });
}
```

- [ ] **Step 2: Create src/context/MotionContext.tsx**

```tsx
import { createContext, useContext } from "react";
import { useReducedMotion } from "framer-motion";

interface MotionContextType {
  shouldAnimate: boolean;
}

const MotionContext = createContext<MotionContextType>({ shouldAnimate: true });

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  return (
    <MotionContext.Provider value={{ shouldAnimate: !prefersReduced }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion(): MotionContextType {
  return useContext(MotionContext);
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useActiveSection.ts src/context/MotionContext.tsx
git commit -m "feat: add useActiveSection hook and MotionContext"
```

---

## Task 4: UI Primitives — SnapSection and BentoGrid

**Files:**
- Create: `src/components/SnapSection.tsx`
- Create: `src/components/BentoGrid.tsx`

- [ ] **Step 1: Create src/components/SnapSection.tsx**

Each section is 100dvh with scroll-snap-align start. A progress bar at the top shows which of 6 sections is active.

```tsx
type SectionId =
  | "about"
  | "skills"
  | "experience"
  | "education"
  | "projects"
  | "contact";

const SECTION_DATA: Record<SectionId, { index: number; label: string }> = {
  about:      { index: 0, label: "01 — About" },
  skills:     { index: 1, label: "02 — Skills" },
  experience: { index: 2, label: "03 — Work" },
  education:  { index: 3, label: "04 — Education" },
  projects:   { index: 4, label: "05 — Projects" },
  contact:    { index: 5, label: "06 — Contact" },
};

const TOTAL = Object.keys(SECTION_DATA).length;

interface SnapSectionProps {
  id: SectionId;
  children: React.ReactNode;
  dark?: boolean;
}

export const SnapSection = ({ id, children, dark = false }: SnapSectionProps) => {
  const { index, label } = SECTION_DATA[id];

  return (
    <section
      id={id}
      style={{ height: "100dvh", scrollSnapAlign: "start" }}
      className={`flex flex-col overflow-hidden ${dark ? "bg-ink" : "bg-cream"}`}
    >
      {/* Snap progress bar */}
      <div
        className={`flex-shrink-0 flex items-center gap-1.5 px-5 py-2.5 border-b ${
          dark ? "border-amber/[0.08]" : "border-ink/[0.07]"
        }`}
      >
        {Array.from({ length: TOTAL }, (_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === index
                ? "bg-amber"
                : dark
                ? "bg-cream/10"
                : "bg-ink/10"
            }`}
          />
        ))}
        <span
          className={`ml-2 font-sans text-[10px] tracking-[0.14em] uppercase ${
            dark ? "text-amber/40" : "text-ink/30"
          }`}
        >
          {label}
        </span>
      </div>

      {/* Content slot */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Create src/components/BentoGrid.tsx**

```tsx
interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid = ({ children, className = "" }: BentoGridProps) => (
  <div className={`flex-1 grid p-4 gap-3 ${className}`}>{children}</div>
);
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/SnapSection.tsx src/components/BentoGrid.tsx
git commit -m "feat: add SnapSection and BentoGrid primitives"
```

---

## Task 5: Sidebar Component

**Files:**
- Create: `src/components/Sidebar.tsx`

- [ ] **Step 1: Create src/components/Sidebar.tsx**

Fixed desktop sidebar with brand, nav (driven by `useActiveSection`), availability dot, and social links. Hidden on mobile — the `className` prop passes `"hidden md:flex"` from App.

```tsx
import { useActiveSection, scrollToSection } from "../hooks/useActiveSection";
import { profile } from "../constants";

const NAV_ITEMS = [
  { id: "about",      label: "About" },
  { id: "skills",     label: "Skills" },
  { id: "experience", label: "Work" },
  { id: "education",  label: "Education" },
  { id: "projects",   label: "Projects" },
  { id: "contact",    label: "Contact" },
] as const;

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className = "" }: SidebarProps) => {
  const active = useActiveSection();

  return (
    <aside
      className={`w-[160px] flex-shrink-0 bg-ink flex-col justify-between px-[18px] py-6 border-r border-amber/[0.12] z-40 relative overflow-hidden ${className}`}
    >
      {/* Decorative ambient glow */}
      <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-amber/[0.05] blur-3xl pointer-events-none" />

      {/* Brand + Nav */}
      <div>
        <div>
          <p className="font-sans text-[9px] font-semibold text-amber tracking-[0.2em] uppercase">
            Portfolio
          </p>
          <h2 className="font-display text-[20px] font-black text-cream tracking-[-0.5px] leading-[1.05] mt-0.5">
            Aidil
            <br />
            Safwan
          </h2>
        </div>

        <div className="h-px bg-gradient-to-r from-amber/40 to-transparent my-4" />

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`flex items-center gap-2.5 px-2 py-[7px] rounded-md text-left transition-colors ${
                  isActive ? "bg-amber/10" : "hover:bg-amber/5"
                }`}
              >
                <span
                  className={`w-1 h-1 rounded-full flex-shrink-0 transition-all ${
                    isActive
                      ? "bg-amber shadow-[0_0_5px_rgba(201,133,42,0.6)]"
                      : "bg-cream/20"
                  }`}
                />
                <span
                  className={`font-sans text-[9px] tracking-[0.1em] uppercase transition-colors ${
                    isActive ? "text-cream font-semibold" : "text-cream/30"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom — availability + social links */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
          <span className="font-sans text-[10px] text-cream/40">
            Open to work
          </span>
        </div>
        <div className="flex gap-2.5">
          {[
            { label: "GH", href: profile.githubUrl },
            { label: "LI", href: profile.linkedinUrl },
            { label: "CV", href: profile.resumeUrl },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[9px] font-semibold text-cream/25 tracking-[0.1em] uppercase hover:text-amber/70 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Sidebar.tsx
git commit -m "feat: add Sidebar component with IntersectionObserver-driven active state"
```

---

## Task 6: FloatingDock Update and App.tsx Rewrite

**Files:**
- Modify: `src/components/FloatingDock.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Rewrite src/components/FloatingDock.tsx**

Remove window scroll listener, use `useActiveSection`. Add `className` prop. Add Education item. Restyle to new palette.

```tsx
import { Home, User, Code, Briefcase, Mail, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { useActiveSection, scrollToSection } from "../hooks/useActiveSection";

const navItems = [
  { id: "about",      icon: Home,          label: "About" },
  { id: "skills",     icon: User,          label: "Skills" },
  { id: "experience", icon: Briefcase,     label: "Work" },
  { id: "education",  icon: GraduationCap, label: "Education" },
  { id: "projects",   icon: Code,          label: "Projects" },
  { id: "contact",    icon: Mail,          label: "Contact" },
];

interface FloatingDockProps {
  className?: string;
}

export const FloatingDock = ({ className = "" }: FloatingDockProps) => {
  const active = useActiveSection();

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 ${className}`}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center gap-1.5 px-4 py-3 rounded-full bg-ink/80 backdrop-blur-xl border border-amber/10 shadow-2xl"
      >
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative p-2.5 rounded-full transition-all duration-300 group ${
                isActive
                  ? "text-cream bg-amber/20"
                  : "text-cream/40 hover:text-cream hover:bg-amber/10"
              }`}
            >
              <item.icon size={17} />
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-ink text-cream text-[10px] rounded border border-amber/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="dock-active-pill"
                  className="absolute inset-0 bg-amber/20 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
};
```

- [ ] **Step 2: Rewrite src/App.tsx**

```tsx
import {
  Contact,
  Education,
  Experience,
  Hero,
  Projects,
  Skills,
} from "./layouts/sections";
import { FloatingDock, Sidebar, SnapSection } from "./components";
import { MotionProvider } from "./context/MotionContext";

export default function App() {
  return (
    <MotionProvider>
      <div className="flex overflow-hidden bg-ink" style={{ height: "100dvh" }}>
        <Sidebar className="hidden md:flex" />
        <main
          id="scroll-container"
          className="flex-1 overflow-y-scroll"
          style={{ scrollSnapType: "y mandatory", height: "100dvh" }}
        >
          <SnapSection id="about">
            <Hero />
          </SnapSection>
          <SnapSection id="skills">
            <Skills />
          </SnapSection>
          <SnapSection id="experience">
            <Experience />
          </SnapSection>
          <SnapSection id="education">
            <Education />
          </SnapSection>
          <SnapSection id="projects">
            <Projects />
          </SnapSection>
          <SnapSection id="contact" dark>
            <Contact />
          </SnapSection>
        </main>
        <FloatingDock className="flex md:hidden" />
      </div>
    </MotionProvider>
  );
}
```

- [ ] **Step 3: Update src/components/index.ts to export new components**

```ts
export * from "./FloatingDock";
export * from "./Sidebar";
export * from "./SnapSection";
export * from "./BentoGrid";
```

Note: `Timeline`, `Footer`, `SectionWrapper`, `MobileMenu`, `DesktopSidebar` are removed from the export. They still exist as files for now — they get deleted in Task 13.

- [ ] **Step 4: Verify build passes**

```bash
npm run build
```

Expected: 0 errors. If TypeScript complains about missing exports from old components that sections import, check individual section files — they may need updating (covered in Tasks 7-12).

- [ ] **Step 5: Visual smoke test**

```bash
npm run dev
```

Expected: App loads. Sidebar visible on desktop (≥768px). Scroll-snap works — sections snap into place. FloatingDock hidden on desktop, visible on mobile. No console errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/FloatingDock.tsx src/App.tsx src/components/index.ts
git commit -m "feat: rewrite App with snap-scroll layout, new Sidebar and FloatingDock"
```

---

## Task 7: Hero Section

**Files:**
- Modify: `src/layouts/sections/Hero.tsx`

Bento grid: left column full-height dark name card (avatar + bio + resume button), right column stacked role card (amber tinted) + stack card (warm cream).

- [ ] **Step 1: Rewrite src/layouts/sections/Hero.tsx**

```tsx
import { motion } from "framer-motion";
import { profile } from "../../constants";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const card = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const Hero = () => (
  <motion.div
    className="flex-1 grid grid-cols-[1.3fr_1fr] grid-rows-2 gap-3 p-4"
    variants={stagger}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.4 }}
  >
    {/* Name card — spans full height, dark */}
    <motion.div
      variants={card}
      className="row-span-2 bg-ink rounded-xl p-5 flex flex-col justify-between relative overflow-hidden border border-amber/[0.08]"
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber/[0.06] blur-3xl pointer-events-none" />
      <div>
        <p className="font-sans text-[10px] font-semibold text-amber tracking-[0.2em] uppercase">
          ↗ Senior Software Engineer
        </p>
        <h1 className="font-display text-[52px] font-black text-cream leading-[0.85] tracking-[-3px] mt-2">
          Aidil
          <br />
          Safwan
        </h1>
        <div className="h-px w-[55%] bg-gradient-to-r from-amber to-transparent mt-3" />
        <p className="font-sans text-[11px] text-cream/50 leading-relaxed mt-3 max-w-[200px]">
          {profile.bio}
        </p>
      </div>
      <div className="flex items-end justify-between">
        <div className="w-11 h-11 rounded-full bg-amber/20 border-2 border-amber/30 flex items-center justify-center text-xl select-none">
          👤
        </div>
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-[10px] font-bold text-amber tracking-[0.12em] uppercase border border-amber/35 px-3 py-1.5 rounded-[3px] hover:bg-amber/10 transition-colors"
        >
          ↓ Resume
        </a>
      </div>
    </motion.div>

    {/* Role card */}
    <motion.div
      variants={card}
      className="bg-amber/[0.08] border border-amber/[0.18] rounded-xl p-4 flex flex-col justify-between"
    >
      <div>
        <p className="font-sans text-[9px] font-semibold text-amber tracking-[0.18em] uppercase">
          Currently at
        </p>
        <h2 className="font-display text-[18px] font-bold text-ink leading-tight mt-1">
          The Access
          <br />
          Group
        </h2>
        <p className="font-sans text-[11px] text-ink/50 mt-1">
          Senior Software Engineer
        </p>
      </div>
      <div className="flex justify-between items-end">
        <span className="font-display text-[32px] font-black text-amber/[0.15] leading-none">
          2025
        </span>
        <span className="text-amber text-xl">↗</span>
      </div>
    </motion.div>

    {/* Stack card */}
    <motion.div
      variants={card}
      className="bg-amber/[0.07] border border-ink/[0.07] rounded-xl p-4 flex flex-col justify-between"
    >
      <div>
        <p className="font-sans text-[9px] font-semibold text-ink/50 tracking-[0.18em] uppercase">
          Core Stack
        </p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {["React", "TypeScript", "React Native", "Laravel", "Next.js"].map(
            (tech) => (
              <span
                key={tech}
                className="font-sans text-[10px] font-semibold text-ink bg-ink/[0.08] px-2 py-0.5 rounded-[3px]"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </div>
      <p className="font-sans text-[11px] text-ink/40">📍 Kuala Lumpur, MY</p>
    </motion.div>
  </motion.div>
);
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

- [ ] **Step 3: Visual check**

```bash
npm run dev
```

Expected: Hero section shows name card on left, role card top-right, stack card bottom-right. Name card is dark, other cards are warm-tinted. Cards fade up on first view.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/sections/Hero.tsx
git commit -m "feat: rewrite Hero section with bento grid layout"
```

---

## Task 8: Skills Section

**Files:**
- Modify: `src/layouts/sections/Skills.tsx`

Bento: left column full-height dark card (Frontend + Mobile unified, with Web/Mobile sub-rows) + right column stacked Backend card + DevOps card.

- [ ] **Step 1: Rewrite src/layouts/sections/Skills.tsx**

```tsx
import { motion } from "framer-motion";
import { skills } from "../../constants";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const card = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const Skills = () => (
  <div className="flex-1 flex flex-col gap-3 p-4 overflow-hidden">
    <div className="flex items-baseline justify-between flex-shrink-0 px-0.5">
      <h2 className="font-display text-[26px] font-black text-ink tracking-[-1px]">
        Craft.
      </h2>
      <p className="font-sans text-[10px] text-ink/40 tracking-[0.12em] uppercase">
        What I build with
      </p>
    </div>

    <motion.div
      className="flex-1 grid grid-cols-[1.7fr_1fr] grid-rows-2 gap-3"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {/* Frontend + Mobile hero — spans full height */}
      <motion.div
        variants={card}
        className="row-span-2 bg-ink rounded-xl p-5 flex flex-col justify-between relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber/[0.06] blur-3xl pointer-events-none" />
        <div>
          <p className="font-sans text-[9px] font-semibold text-amber tracking-[0.2em] uppercase">
            ↗ Core Expertise
          </p>
          <h3 className="font-display text-[22px] font-black text-cream leading-none tracking-[-0.5px] mt-1.5 mb-4">
            Frontend &<br />
            Mobile
          </h3>

          <div className="flex flex-col gap-4">
            {/* Web row */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <p className="font-sans text-[9px] font-semibold text-cream/30 tracking-[0.16em] uppercase">
                  Web
                </p>
                <div className="flex-1 h-px bg-amber/[0.1]" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.web.map((s) => (
                  <span
                    key={s}
                    className="font-sans text-[10px] font-semibold text-amber bg-amber/[0.15] border border-amber/[0.25] px-2.5 py-1 rounded-[3px]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile row */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <p className="font-sans text-[9px] font-semibold text-cream/30 tracking-[0.16em] uppercase">
                  Mobile
                </p>
                <div className="flex-1 h-px bg-amber/[0.1]" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.mobile.map((s) => (
                  <span
                    key={s}
                    className="font-sans text-[10px] font-semibold text-cream/60 bg-cream/[0.07] border border-cream/[0.1] px-2.5 py-1 rounded-[3px]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="font-sans text-[10px] text-cream/30 leading-relaxed border-t border-amber/[0.1] pt-3 mb-2">
            Same component mindset, two platforms. Shipped to production across
            both.
          </p>
          <div className="flex justify-between items-end">
            <span className="font-display text-[44px] font-black text-amber/[0.08] leading-none">
              {skills.web.length + skills.mobile.length}
            </span>
            <div className="flex gap-1.5">
              <span className="font-sans text-[9px] font-bold text-amber bg-amber/[0.12] px-2 py-1 rounded-[3px]">
                Web
              </span>
              <span className="font-sans text-[9px] font-bold text-cream/40 border border-cream/[0.15] px-2 py-1 rounded-[3px]">
                Mobile
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Backend card */}
      <motion.div
        variants={card}
        className="bg-amber/[0.07] border border-amber/[0.14] rounded-xl p-4 flex flex-col justify-between"
      >
        <div>
          <p className="font-sans text-[9px] font-semibold text-amber/60 tracking-[0.18em] uppercase">
            Backend
          </p>
          <h3 className="font-display text-[15px] font-bold text-ink mt-0.5 mb-2">
            Server-side
          </h3>
          <div className="flex flex-wrap gap-1">
            {skills.backend.map((s) => (
              <span
                key={s}
                className="font-sans text-[9px] font-semibold text-ink/60 bg-ink/[0.05] px-1.5 py-0.5 rounded-[2px]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <p className="font-sans text-[9px] text-ink/30">
          Supporting the frontend. Properly.
        </p>
      </motion.div>

      {/* DevOps card */}
      <motion.div
        variants={card}
        className="bg-amber/[0.07] border border-ink/[0.07] rounded-xl p-4 flex flex-col justify-between"
      >
        <div>
          <p className="font-sans text-[9px] font-semibold text-amber/60 tracking-[0.18em] uppercase">
            DevOps & Infra
          </p>
          <h3 className="font-display text-[15px] font-bold text-ink mt-0.5 mb-2">
            Toolchain
          </h3>
          <div className="flex flex-wrap gap-1">
            {skills.devops.map((s) => (
              <span
                key={s}
                className="font-sans text-[9px] font-semibold text-ink/60 bg-ink/[0.05] px-1.5 py-0.5 rounded-[2px]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <p className="font-sans text-[9px] text-ink/30">Ship it. Reliably.</p>
      </motion.div>
    </motion.div>
  </div>
);
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

- [ ] **Step 3: Visual check**

```bash
npm run dev
```

Expected: Skills section. Left hero card is dark with amber Web pills and cream/muted Mobile pills. Backend and DevOps are side cards. Stagger animation on scroll-snap.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/sections/Skills.tsx
git commit -m "feat: rewrite Skills section with Frontend+Mobile hero bento"
```

---

## Task 9: Experience Section

**Files:**
- Modify: `src/layouts/sections/Experience.tsx`

Bento: left — current role hero card (dark, 3 featured achievements). Right — 3 previous roles stacked as scannable cards.

- [ ] **Step 1: Rewrite src/layouts/sections/Experience.tsx**

```tsx
import { motion } from "framer-motion";
import { experiences } from "../../constants";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const card = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const Experience = () => {
  const [current, ...previous] = experiences;

  return (
    <div className="flex-1 flex flex-col gap-3 p-4 overflow-hidden">
      <div className="flex items-baseline justify-between flex-shrink-0 px-0.5">
        <h2 className="font-display text-[26px] font-black text-ink tracking-[-1px]">
          Work.
        </h2>
        <p className="font-sans text-[10px] text-ink/40 tracking-[0.12em] uppercase">
          6 yrs · 4 companies
        </p>
      </div>

      <motion.div
        className="flex-1 grid grid-cols-[1.2fr_1fr] gap-3 overflow-hidden"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* Current role — full height, dark */}
        <motion.div
          variants={card}
          className="bg-ink rounded-xl p-5 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute -bottom-12 -right-12 w-44 h-44 rounded-full bg-amber/[0.05] blur-3xl pointer-events-none" />
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
              <span className="font-sans text-[9px] font-bold text-amber tracking-[0.2em] uppercase">
                Current
              </span>
            </div>
            <h3 className="font-display text-[20px] font-black text-cream leading-[1.1] tracking-[-0.5px]">
              {current.company}
            </h3>
            <p className="font-sans text-[11px] text-cream/50 mt-0.5">
              {current.title}
            </p>
            <p className="font-sans text-[10px] font-semibold text-cream/25 tracking-[0.08em] mt-0.5">
              {current.period}
            </p>
            <div className="h-px bg-amber/[0.12] my-3" />
            <div className="flex flex-col gap-2">
              {(current.featuredAchievements ?? current.achievements.slice(0, 3)).map(
                (ach, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="w-1 h-1 rounded-full bg-amber flex-shrink-0 mt-1.5" />
                    <p className="font-sans text-[10px] text-cream/50 leading-relaxed">
                      {ach}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="flex items-end justify-between mt-3">
            <div className="flex flex-wrap gap-1">
              {(current.tech ?? []).map((t) => (
                <span
                  key={t}
                  className="font-sans text-[8px] font-semibold text-amber bg-amber/[0.1] px-1.5 py-0.5 rounded-[2px]"
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="font-display text-[34px] font-black text-amber/[0.08] leading-none">
              25
            </span>
          </div>
        </motion.div>

        {/* Previous roles — stacked */}
        <div className="flex flex-col gap-2.5 overflow-hidden">
          {previous.map((exp, i) => (
            <motion.div
              key={exp.company}
              variants={card}
              className={`flex-1 rounded-xl px-4 py-3 flex flex-col gap-1 relative ${
                i === 0
                  ? "bg-amber/[0.05] border border-amber/[0.12]"
                  : "bg-ink/[0.03] border border-ink/[0.07]"
              }`}
            >
              <span className="absolute top-3 right-3 font-display text-[20px] font-black text-amber/[0.08] leading-none">
                {String(i + 2).padStart(2, "0")}
              </span>
              <h4 className="font-display text-[14px] font-bold text-ink leading-tight">
                {exp.company}
              </h4>
              <p className="font-sans text-[10px] text-amber/60">{exp.title}</p>
              <p className="font-sans text-[9px] font-semibold text-ink/30 tracking-[0.06em]">
                {exp.period}
              </p>
              {exp.featuredAchievements?.[0] && (
                <p className="font-sans text-[9px] text-ink/50 leading-relaxed border-t border-ink/[0.06] pt-1.5 mt-0.5">
                  {exp.featuredAchievements[0]}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts/sections/Experience.tsx
git commit -m "feat: rewrite Experience section with current-role hero bento"
```

---

## Task 10: Education Section

**Files:**
- Modify: `src/layouts/sections/Education.tsx`

Bento: top-left — degree hero (dark). Top-right — foundation card. Bottom — full-width pivot story bar with stats.

- [ ] **Step 1: Rewrite src/layouts/sections/Education.tsx**

```tsx
import { motion } from "framer-motion";
import { education } from "../../constants";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const card = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const Education = () => {
  const [degree, foundation] = education;
  const degreeCgpa = degree.details.replace("CGPA: ", "");
  const foundCgpa = foundation.details.replace("CGPA: ", "");

  return (
    <div className="flex-1 flex flex-col gap-3 p-4 overflow-hidden">
      <div className="flex items-baseline justify-between flex-shrink-0 px-0.5">
        <h2 className="font-display text-[26px] font-black text-ink tracking-[-1px]">
          Education.
        </h2>
        <p className="font-sans text-[10px] text-ink/40 tracking-[0.12em] uppercase">
          UiTM · 2014 – 2020
        </p>
      </div>

      <motion.div
        className="flex-1 grid grid-cols-[1.4fr_1fr] grid-rows-[1.3fr_1fr] gap-3"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* Degree hero */}
        <motion.div
          variants={card}
          className="bg-ink rounded-xl p-5 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-amber/[0.06] blur-3xl pointer-events-none" />
          <div>
            <p className="font-sans text-[9px] font-semibold text-amber tracking-[0.2em] uppercase">
              ↗ Bachelor's Degree
            </p>
            <h3 className="font-display text-[18px] font-black text-cream leading-[1.15] tracking-[-0.3px] mt-1.5">
              Computer Science
              <br />
              (Hons.)
            </h3>
            <p className="font-sans text-[11px] text-cream/50 mt-1">
              Universiti Teknologi MARA
            </p>
            <p className="font-sans text-[10px] font-semibold text-cream/25 tracking-[0.06em] mt-0.5">
              2017 – 2020
            </p>
            <div className="h-px bg-amber/[0.12] my-3" />
            <p className="font-sans text-[9px] font-semibold text-cream/30 tracking-[0.12em] uppercase mb-1">
              CGPA
            </p>
            <span className="font-display text-[32px] font-black text-amber leading-none">
              {degreeCgpa}
            </span>
          </div>
          <div className="flex items-end justify-between">
            <p className="font-sans text-[9px] text-cream/25 leading-relaxed max-w-[140px]">
              FYP: Twitter sentiment analysis — bilingual NLP classification
              model.
            </p>
            <span className="font-display text-[40px] font-black text-amber/[0.08] leading-none">
              20
            </span>
          </div>
        </motion.div>

        {/* Foundation card */}
        <motion.div
          variants={card}
          className="bg-amber/[0.07] border border-amber/[0.14] rounded-xl p-4 flex flex-col justify-between"
        >
          <div>
            <p className="font-sans text-[9px] font-semibold text-amber/60 tracking-[0.18em] uppercase">
              Foundation
            </p>
            <h3 className="font-display text-[15px] font-bold text-ink leading-[1.2] mt-1">
              Foundation in
              <br />
              Engineering
            </h3>
            <p className="font-sans text-[11px] text-ink/50 mt-1">
              Universiti Teknologi MARA
            </p>
            <p className="font-sans text-[10px] font-semibold text-amber/50 mt-0.5">
              2014 – 2015
            </p>
          </div>
          <div>
            <p className="font-sans text-[9px] text-ink/40 tracking-[0.1em] uppercase">
              CGPA
            </p>
            <span className="font-display text-[24px] font-black text-amber/70 leading-none">
              {foundCgpa}
            </span>
          </div>
        </motion.div>

        {/* Pivot story — spans full bottom width */}
        <motion.div
          variants={card}
          className="col-span-2 bg-amber/[0.07] border border-ink/[0.07] rounded-xl px-5 py-4 flex items-center gap-6"
        >
          <div className="flex-1">
            <p className="font-sans text-[9px] font-semibold text-amber/60 tracking-[0.18em] uppercase mb-1.5">
              The pivot
            </p>
            <p className="font-sans text-[11px] text-ink/60 leading-relaxed">
              Started in{" "}
              <strong className="text-ink font-semibold">
                Electronic Engineering
              </strong>{" "}
              — switched to{" "}
              <strong className="text-ink font-semibold">
                Computer Science
              </strong>{" "}
              when the pull towards coding became impossible to ignore. Never
              looked back.
            </p>
          </div>
          <div className="w-px h-12 bg-amber/[0.2] flex-shrink-0" />
          <div className="flex gap-5 flex-shrink-0">
            {[
              { num: foundCgpa, label: "Foundation" },
              { num: degreeCgpa, label: "Degree" },
              { num: "6yr",      label: "Academia" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-[22px] font-black text-ink leading-none">
                  {num}
                </p>
                <p className="font-sans text-[9px] text-ink/40 tracking-[0.1em] uppercase mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts/sections/Education.tsx
git commit -m "feat: rewrite Education section with bento grid and pivot story"
```

---

## Task 11: Projects Section

**Files:**
- Modify: `src/layouts/sections/Projects.tsx`

Professional/Personal tab toggle. Featured + list layout. `AnimatePresence` animates the featured card swap when clicking a list item or switching tabs.

- [ ] **Step 1: Rewrite src/layouts/sections/Projects.tsx**

```tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "../../constants";

type Tab = "professional" | "personal";

const FeaturedCard = ({ project }: { project: Project }) => (
  <div className="bg-ink rounded-xl overflow-hidden flex flex-col h-full">
    {/* Image area */}
    <div className="h-[110px] bg-amber/[0.08] flex items-center justify-center relative flex-shrink-0 overflow-hidden">
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <span className="text-5xl opacity-20">📁</span>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink pointer-events-none" />

      {/* Category badge */}
      <span className="absolute top-2.5 left-2.5 font-sans text-[9px] font-bold text-ink bg-amber px-2 py-0.5 rounded-[3px] tracking-[0.08em] uppercase">
        {project.tech[0]}
      </span>

      {/* Links */}
      <div className="absolute top-2.5 right-2.5 flex gap-1.5">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[9px] font-bold text-cream bg-ink/60 backdrop-blur-sm px-2 py-1 rounded-[3px] border border-cream/10 hover:bg-ink/80 transition-colors"
          >
            Live ↗
          </a>
        )}
        {project.appStoreUrl && (
          <a
            href={project.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[9px] font-bold text-cream bg-ink/60 backdrop-blur-sm px-2 py-1 rounded-[3px] border border-cream/10 hover:bg-ink/80 transition-colors"
          >
            App Store ↗
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[9px] font-bold text-cream bg-ink/60 backdrop-blur-sm px-2 py-1 rounded-[3px] border border-cream/10 hover:bg-ink/80 transition-colors"
          >
            Code ↗
          </a>
        )}
      </div>
    </div>

    {/* Body */}
    <div className="flex-1 flex flex-col justify-between p-4">
      <div>
        <h3 className="font-display text-[18px] font-black text-cream tracking-[-0.3px]">
          {project.title}
        </h3>
        <p className="font-sans text-[11px] text-cream/50 leading-relaxed mt-1.5">
          {project.description}
        </p>
        {project.isArchived && (
          <p className="font-sans text-[10px] text-amber/60 mt-1 italic">
            {project.archivedNote}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-sans text-[9px] font-semibold text-amber bg-amber/[0.1] px-2 py-0.5 rounded-[3px]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export const Projects = () => {
  const [tab, setTab] = useState<Tab>("professional");
  const [featuredId, setFeaturedId] = useState<string | null>(null);

  const filtered = projects.filter((p) => p.category === tab);
  const featured =
    (featuredId ? filtered.find((p) => p.id === featuredId) : null) ??
    filtered[0];
  const list = filtered.filter((p) => p.id !== featured?.id);

  const handleTabChange = (t: Tab) => {
    setTab(t);
    setFeaturedId(null);
  };

  return (
    <div className="flex-1 flex flex-col gap-3 p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0 px-0.5">
        <h2 className="font-display text-[26px] font-black text-ink tracking-[-1px]">
          Projects.
        </h2>
        <div className="flex bg-ink/[0.06] border border-ink/[0.08] rounded-md p-[3px] gap-0.5">
          {(["professional", "personal"] as const).map((t) => (
            <button
              key={t}
              onClick={() => handleTabChange(t)}
              className={`font-sans text-[9px] font-semibold tracking-[0.08em] px-3 py-1.5 rounded-[4px] transition-all capitalize ${
                tab === t
                  ? "bg-ink text-cream"
                  : "text-ink/50 hover:text-ink/70"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content grid */}
      <div className="flex-1 grid grid-cols-[1.3fr_1fr] gap-3 overflow-hidden">
        {/* Featured card with AnimatePresence */}
        <AnimatePresence mode="wait">
          {featured && (
            <motion.div
              key={featured.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <FeaturedCard project={featured} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project list */}
        <div className="flex flex-col gap-2 overflow-y-auto scrollbar-thin">
          <AnimatePresence mode="popLayout">
            {list.map((project, i) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ delay: i * 0.04, duration: 0.2 }}
                onClick={() => setFeaturedId(project.id)}
                className="flex gap-3 items-center bg-ink/[0.03] border border-ink/[0.07] rounded-xl px-3 py-2.5 text-left hover:border-amber/30 hover:bg-amber/[0.06] transition-all flex-shrink-0 group"
              >
                <div className="w-8 h-8 rounded-lg bg-ink/10 flex-shrink-0 flex items-center justify-center text-sm overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                  ) : (
                    "📁"
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-[13px] font-bold text-ink leading-tight truncate">
                    {project.title}
                  </p>
                  <div className="flex gap-1 mt-0.5 flex-wrap">
                    {project.tech.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="font-sans text-[8px] font-semibold text-ink/40 bg-ink/[0.05] px-1.5 py-0.5 rounded-[2px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-amber opacity-0 group-hover:opacity-100 transition-opacity text-sm flex-shrink-0">
                  ↗
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

- [ ] **Step 3: Visual check**

```bash
npm run dev
```

Expected: Projects section shows Professional tab by default. First professional project is featured left. List shows the rest on the right. Clicking a list item swaps the featured card with AnimatePresence. Clicking Personal tab shows personal projects.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/sections/Projects.tsx
git commit -m "feat: rewrite Projects section with Professional/Personal toggle and AnimatePresence"
```

---

## Task 12: Contact Section

**Files:**
- Modify: `src/layouts/sections/Contact.tsx`

Full dark section (SnapSection dark prop). Left: typographic CTA with email button. Right: 3 contact cards (Email, LinkedIn, GitHub). Bottom: inline footer strip.

- [ ] **Step 1: Rewrite src/layouts/sections/Contact.tsx**

```tsx
import { profile } from "../../constants";

export const Contact = () => (
  <div className="flex-1 flex flex-col overflow-hidden">
    {/* Main content */}
    <div className="flex-1 grid grid-cols-[1.1fr_1fr] gap-3 p-4 overflow-hidden">
      {/* Left — typographic CTA */}
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <p className="font-sans text-[9px] font-semibold text-amber tracking-[0.2em] uppercase">
            ↗ Let's talk
          </p>
          <div>
            <h2 className="font-display text-[40px] font-black text-cream leading-[0.88] tracking-[-2px]">
              Got something
            </h2>
            <h2 className="font-display text-[40px] font-black text-amber leading-[0.88] tracking-[-2px]">
              in mind?
            </h2>
          </div>
          <div className="h-[1.5px] w-[60%] bg-gradient-to-r from-amber to-transparent" />
          <p className="font-sans text-[11px] text-cream/50 leading-relaxed max-w-[280px]">
            Open to new opportunities, collaborations, or just a good
            conversation about tech, products, or frontend craft.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 bg-amber text-ink font-sans text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-2.5 rounded-[4px] self-start hover:bg-amber/90 transition-colors"
          >
            Send an email <span className="text-base">↗</span>
          </a>
        </div>
        <p className="font-sans text-[9px] text-cream/20 tracking-[0.06em]">
          Based in Kuala Lumpur, MY · Available remotely
        </p>
      </div>

      {/* Right — contact cards */}
      <div className="flex flex-col gap-3">
        {[
          {
            label: "Email",
            value: profile.email,
            href: `mailto:${profile.email}`,
            icon: "✉️",
          },
          {
            label: "LinkedIn",
            value: "linkedin.com/in/aidilsafwan",
            href: profile.linkedinUrl,
            icon: "💼",
          },
          {
            label: "GitHub",
            value: "github.com/aidilsfwn",
            href: profile.githubUrl,
            icon: "⌥",
          },
        ].map(({ label, value, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-amber/[0.12] rounded-xl px-4 py-3 flex-1 hover:border-amber/35 hover:bg-amber/[0.05] transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber/[0.12] flex items-center justify-center text-sm flex-shrink-0">
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-[9px] font-semibold text-amber/50 tracking-[0.14em] uppercase">
                {label}
              </p>
              <p className="font-sans text-[11px] font-semibold text-cream/70 truncate">
                {value}
              </p>
            </div>
            <span className="text-amber/30 group-hover:text-amber transition-colors text-base flex-shrink-0">
              ↗
            </span>
          </a>
        ))}
      </div>
    </div>

    {/* Footer strip */}
    <div className="flex-shrink-0 bg-amber/[0.06] border-t border-amber/[0.08] px-5 py-2.5 flex justify-between items-center">
      <p className="font-sans text-[9px] text-cream/20 tracking-[0.06em]">
        © 2025 Aidil Safwan. All rights reserved.
      </p>
      <p className="font-sans text-[9px] text-cream/20 tracking-[0.04em]">
        Built with <span className="text-amber/60">React + Vite</span>
      </p>
    </div>
  </div>
);
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

- [ ] **Step 3: Visual check**

```bash
npm run dev
```

Expected: Contact section is fully dark. Left side has large "Got something / in mind?" heading with amber "in mind?" line. Right has 3 card rows. Footer strip at bottom. Email CTA button is amber-filled.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/sections/Contact.tsx
git commit -m "feat: rewrite Contact section with full dark layout and footer strip"
```

---

## Task 13: Cleanup

**Files:**
- Delete: `src/components/Timeline.tsx`
- Delete: `src/components/Footer.tsx`
- Delete: `src/components/SectionWrapper.tsx`
- Delete: `src/components/MobileMenu.tsx`
- Delete: `src/components/DesktopSidebar.tsx`
- Verify: `src/components/index.ts` (should only export active components)
- Verify: `src/layouts/sections/index.ts` (should still export all 6 sections)

- [ ] **Step 1: Delete obsolete component files**

```bash
rm src/components/Timeline.tsx
rm src/components/Footer.tsx
rm src/components/SectionWrapper.tsx
rm src/components/MobileMenu.tsx
rm src/components/DesktopSidebar.tsx
```

- [ ] **Step 2: Verify src/components/index.ts exports only active components**

It should already be correct from Task 6 Step 3. Confirm it reads:

```ts
export * from "./FloatingDock";
export * from "./Sidebar";
export * from "./SnapSection";
export * from "./BentoGrid";
```

- [ ] **Step 3: Verify src/layouts/sections/index.ts still exports all 6 sections**

No changes needed — this file should already export all sections. Confirm it reads:

```ts
export * from "./Contact";
export * from "./Education";
export * from "./Experience";
export * from "./Hero";
export * from "./Projects";
export * from "./Skills";
```

- [ ] **Step 4: Final build verification**

```bash
npm run build
```

Expected: 0 TypeScript errors, 0 build errors, no dead imports.

- [ ] **Step 5: Final visual walkthrough**

```bash
npm run dev
```

Manually check each section by scrolling through all 6:

1. **Hero** — Dark name card (left, full height) + role card (top right) + stack card (bottom right). Avatar + resume button visible. Fonts are Playfair Display + Space Grotesk.
2. **Skills** — Dark Frontend+Mobile hero (left) with Web/Mobile pill rows. Backend + DevOps side cards.
3. **Work** — Dark current role card (left) with 3 amber-dotted achievements. 3 previous roles stacked right.
4. **Education** — Dark degree card (left) with CGPA 3.42. Foundation card (right). Pivot story bar spanning full bottom.
5. **Projects** — Professional tab default. Featured card left, project list right. Click a list item to swap featured card (AnimatePresence). Switch to Personal tab — personal projects load.
6. **Contact** — Entire section is dark. Typographic CTA left. Contact cards right. Footer strip at bottom.

Sidebar highlights correct section as you scroll. FloatingDock hidden on desktop (≥768px). FloatingDock visible on mobile, highlights correct section.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: cleanup obsolete components, complete portfolio redesign v3"
```

---

## Quick Reference

**Token names (use in Tailwind classes):**
- `bg-cream` / `text-cream` → `#f5efe4`
- `bg-ink` / `text-ink` → `#1a1208`
- `bg-amber` / `text-amber` → `#c9852a`
- `font-display` → Playfair Display
- `font-sans` → Space Grotesk

**Z-index:**
- Sidebar: `z-40`
- FloatingDock: `z-50`
- Tooltips in FloatingDock: positioned within dock, no extra z-index needed

**Opacity shortcuts (amber examples):**
- `bg-amber/[0.05]` → barely visible warm tint
- `bg-amber/[0.08]` → role card background
- `bg-amber/[0.12]` → card icon background
- `text-amber/40` → muted label
- `text-amber/60` → secondary amber text
- `border-amber/[0.12]` → subtle card border
- `border-amber/35` → interactive card border

**Scroll scroll detection:**
Both `Sidebar` and `FloatingDock` use `useActiveSection()` which queries `#scroll-container` as IntersectionObserver root. The observer fires on the section elements as they snap into view. `threshold: 0.5` means the section must be at least 50% visible before it becomes active.
