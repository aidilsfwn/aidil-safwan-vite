# aidilsfwn.dev Design System

Version 1.0 · 31 August 2026

## 1. Purpose

This document is the fixed visual and structural source of truth for rebuilding `aidilsfwn.dev`.

The goal is a dark, editorial, code-native portfolio that borrows the composition principles of Janay Rawal's live portfolio—an IDE-like navigation rail, full-viewport chapters, strong typographic hierarchy, sparse surfaces, and purposeful motion—while remaining unmistakably Aidil's portfolio.

This is not permission to copy Janay Rawal's name, text, project data, illustrations, album art, file names, avatar, or other identity assets. Preserve the content, links, data, and working behavior of `aidilsfwn.dev` as described by its README and implemented in the repository.

## 2. Source hierarchy

When sources disagree, use this order:

1. The repository and README for facts, content, routes, links, interactions, and technical constraints.
2. This document for visual language, composition, responsive behavior, and motion.
3. The existing implementation only to discover content and behavior—not to inherit its JSX, CSS, bento composition, class names, or component boundaries.
4. Janay Rawal's site only as a structural and visual reference.

Never invent personal facts to fill a layout. If a field is absent, omit or redesign that element.

## 3. Reference observations

The live reference was inspected at desktop and mobile widths on 31 August 2026.

### Desktop composition

- A persistent explorer rail occupies roughly one quarter of the viewport, while the main stage owns the remaining width.
- The rail is visually denser and darker than the stage. It uses a profile lockup followed by a bordered file explorer whose nested folders mirror the page's information architecture.
- The main stage behaves as a sequence of cinematic chapters rather than a conventional document full of cards.
- The hero is intentionally sparse: a small role label, a very large condensed name, a one-line promise, a compact animated status pill, an understated explore cue, and one personality graphic near an edge.
- The background is near black with a barely visible engineering grid. Large empty regions create focus.
- About uses an asymmetric editorial split: prose dominates one side and a connected-node illustration supports it.
- Skills begin with a centered section title and explanatory line, followed by a horizontal or wrapped field of icon tiles. The icons are supporting content, not equal-weight cards competing with the heading.
- Projects are presented as large, ruled editorial rows. The title is dominant; the category is a small eyebrow. They read like a selectable index, not a bento grid.
- Experience is a vertical journey. Large light cards alternate across an implied center line, creating pace and hierarchy.
- A personal-interest section uses imagery as atmosphere and a single clear outbound action.
- Contact combines a decisive closing statement, social destinations, and a code-shaped personal status object.

### Mobile composition

- The desktop explorer rail disappears and becomes a circular menu button in the upper-right corner.
- The hero remains close to one viewport tall, with centered typography and generous vertical separation.
- Content becomes a single reading column, but the chapter model remains; it does not collapse into a stack of identical cards.
- Display text scales down aggressively while eyebrows, body text, and touch targets remain legible.
- Decorative material is reduced or repositioned so that the main message remains dominant.
- A navigation drawer, when opened, should retain the explorer metaphor without forcing the desktop rail into the mobile viewport.

## 4. Integration thesis — the third design language

The final portfolio must not look like Janay's interface populated with Aidil's data, nor like Aidil's current bento site with an explorer attached. It should read as one authored system: **Aidil's Warm Engineering Studio**.

### What each side contributes

| Source | Keep as design DNA | Translate rather than copy |
|---|---|---|
| Janay reference | strong rail/stage proportion, chapter pacing, negative space, editorial project index, journey rhythm, precise technical navigation | literal file names, black/white identity, centered one-line hero, pixel character, node illustration, album gallery |
| Aidil portfolio | ink/cream/amber warmth, Playfair + Space Grotesk voice, real product density, selected-project behavior, snap-scroll rhythm, memoji, mobile command access, Spotify data | equal bento tiles, repeated rounded cards, undersized type, content squeezed to fit one viewport |

### Fusion rules

1. **Every borrowed structure must solve an Aidil-specific content problem.** The rail exists because there are seven sections and twelve projects; project rows exist because link/media states vary; the journey exists because experience records have unequal depth.
2. **Every Aidil element must inherit the same spatial grammar.** Amber, cream surfaces, memoji, Spotify, project images, and Playfair headings all use the same fine rules, grid alignment, corner logic, and motion timing as the workspace shell.
3. **No imported pattern may remain visually isolated.** A paper experience dossier, Spotify signal, project preview, and navigation active state must share tokens and alignment—not look like components from separate templates.
4. **Preserve hierarchy before metaphor.** The IDE/workspace language supports scanning; it never turns labels into jokes, hides plain language, or overpowers Aidil's career story.
5. **Use selective contrast, not alternating templates.** The site is a dark warm workspace with cream “working documents” appearing where depth is useful. It is not a dark Janay section followed by a cream Aidil section.

### Cohesion test

For every section, answer yes to all four:

- Does it feel native to the same warm workspace as the rail?
- Is Aidil's real content—not the reference composition—the reason for its proportions?
- Would removing the amber/cream palette still leave a distinctive hierarchy rather than a generic card layout?
- Would removing the explorer rail still leave the section visibly related through typography, rules, alignment, and motion?

## 5. Brand translation for aidilsfwn.dev

### Design idea

**Aidil's Warm Engineering Studio.** Visitors enter a living product workspace: the precision of an engineering environment, the warmth of Aidil's amber/cream identity, and the credibility of products that shipped in the real world.

### Brand attributes

- Technical, not sterile
- Personal, not performative
- Confident, not loud
- Editorial, not template-like
- Experimental, not difficult to use
- Dark, not muddy

### Content contract

The repository was audited directly. Its copy and data are **content-locked**: the redesign must fit them without asking Aidil to shorten, rewrite, add, or remove content.

#### Locked section order and anchors

1. `about` — combined Hero/About content
2. `skills`
3. `experience`
4. `education`
5. `projects`
6. `beyond`
7. `contact`

Keep these IDs because active-section tracking and `scrollToSection()` depend on them. A redesigned explorer may change labels or file metaphors visually, but must target these anchors.

#### Locked profile content

- Name: **Aidil Safwan**
- Title: **Senior Software Engineer @ The Access Group**
- Location: **Kuala Lumpur, MY**
- Email: **aidilsafwan.aas@gmail.com**
- Bio: **“Frontend engineer at heart, fullstack in practice. 5+ years turning ideas into digital products — from mobile banking apps to government platforms. Currently leading frontend at The Access Group.”**
- GitHub: `https://github.com/aidilsfwn`
- LinkedIn: `https://linkedin.com/in/aidilsafwan`
- Resume: `/CV-AidilSafwan.pdf`
- Memoji asset: `src/assets/memoji.png`

Do not introduce a second About biography. The existing bio is the complete About copy and must fit naturally inside the Hero/About chapter.

#### Locked skills inventory

- Core: TypeScript, JavaScript
- Web: React, Vite
- Mobile: React Native, Expo, Flutter, iOS, Android
- Backend: Laravel, .NET, Express.js, MySQL, MS SQL, Firebase, Supabase
- DevOps: AWS, Azure, Docker

There are five real categories and 19 displayed skill entries. Do not invent proficiency levels, years, percentages, or additional technologies.

#### Locked experience shape

- Four roles in reverse chronology.
- The current role at The Access Group has three achievement bullets and a long 12-item technology list, but no general description.
- The three previous roles—Aleph-Labs, Public Bank, and INVOKE—each have one description and a shorter technology list.
- The composition must support these unequal record shapes without requiring copy edits or equal-height cards.
- Preserve the displayed **“6 yrs · 4 companies”** label even though the bio says **“5+ years”**; do not make the redesign contingent on normalizing that copy.

#### Locked education shape

- Three records: Computer Science at UiTM, Foundation in Engineering at UiTM, and an incomplete Electronic Engineering degree at USM.
- Preserve the component's FYP sentence about bilingual Twitter sentiment analysis.
- Preserve the existing “The pivot” paragraph explaining the move from Electronic Engineering to Computer Science.
- Do not hide or euphemize the `Incomplete` label.

#### Locked project shape

- Twelve projects: seven professional and five personal.
- Professional: ChangeGPS, in1bank, KWSP i-Akaun, MyPB, PBeXperience, n9.digital, invokeisdata.
- Personal: ElakHujan, 9mo., Dah Qada?, Aidil & Farhana's First Anniversary, COVID-19 MY Dashboard.
- Preserve the Professional/Personal tabs, with Professional selected initially.
- Preserve selected-project state: the first project in the active category is featured until another project is selected; changing tabs resets the selection.
- ChangeGPS has 17 technology tags. The layout must handle this through wrapping, a summary plus disclosure, or a scroll-safe detail region—not truncation or copy deletion.
- Professional projects have image assets; personal projects currently do not. Never require a replacement image from Aidil and do not invent screenshots.
- Link combinations vary: website only, App Store + Play Store, website + repository, or no destination.
- `COVID-19 MY Dashboard` is archived, has no outbound link, and must show: **“Data no longer maintained — pandemic has ended.”**
- Preserve every populated `demoUrl`, `repoUrl`, `appStoreUrl`, and `playStoreUrl`. The design must support App Store and Play Store together.

#### Locked Beyond content and live states

- This is not a photography gallery. It contains a live Spotify panel plus text-based teams and hobbies.
- Spotify states: loading, error, currently playing, last played/not playing, optional album art, and top-three tracks.
- The frontend polls `/.netlify/functions/spotify` every 30 seconds while playing and 60 seconds otherwise.
- Preserve the two teams: Arsenal FC and Mercedes AMG Petronas F1 Team, including their existing league/tagline text and icons.
- Preserve `play`: Football, Futsal, Badminton, Ultimate Frisbee.
- Preserve `watch`: Football, Badminton, F1.
- Preserve `also`: Photography, Music.
- Do not require fixed album artwork; Spotify media is remote, nullable, and changes over time.

#### Locked contact behavior

- Contact is a `mailto:` action, not a form.
- Preserve the existing invitation paragraph, Kuala Lumpur/remote availability line, email, LinkedIn, GitHub, CV link, copyright, and “Built with React + Vite” footer statement.
- Do not add form fields, a submission service, calendaring, phone number, testimonials, or a contact API.

#### Locked platform behavior

- React 19 + TypeScript + Vite 8 + Tailwind CSS v4 + Framer Motion + Lucide.
- Desktop uses a viewport-height internal `#scroll-container` with mandatory section snap.
- Mobile uses free vertical scrolling and safe-area-aware navigation.
- `IntersectionObserver` tracks the active section with `#scroll-container` as root.
- Motion honors `prefers-reduced-motion` through `MotionProvider`.
- Spotify is backed by a Netlify Function and three environment variables: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN`.

The present bento grid is content inventory, not composition. Its cards may be dismantled and redistributed, but none of the locked content or behaviors above may be lost.

## 6. Composition Reference

This section governs layout decisions. It takes precedence over the existing bento arrangement.

### Global frame

#### Desktop, 1024 px and above

- Use a two-part application frame: a fixed explorer rail and a scrollable content stage.
- Rail width: `clamp(248px, 23vw, 336px)`.
- Main stage starts after the rail and occupies all remaining width.
- Rail remains fixed to the viewport; the full remaining stage is the existing `#scroll-container`. Retain mandatory desktop snap scrolling and make each chapter fill the available stage height.
- Main stage chapters use a content width of `min(1120px, calc(100vw - rail - 8vw))`.
- Most chapters should be at least `min-height: 88svh`; the hero should target `100svh`.
- Use one dominant compositional idea per chapter. Avoid filling available space merely because it exists.

#### Tablet, 768–1023 px

- Replace the persistent rail with a compact top bar or menu trigger.
- Maintain the chapter model and asymmetric internal layouts where space permits.
- Use two columns selectively for About, featured work, or contact; do not force them everywhere.

#### Mobile, below 768 px

- Retain Aidil's fast bottom navigation as a slim command dock for the most-used anchors, and include a clearly labeled `More`/explorer control for the full seven-section tree. This is the mobile fusion of Aidil's dock and Janay's explorer—not two independent navigation systems.
- The full explorer opens as a drawer or sheet from that command dock. Do not add a second floating hamburger that competes with it.
- Main content is one column with `20–24px` side padding.
- Preserve hierarchy using scale, whitespace, rules, and media—not equal-sized cards.
- Hero height: `min-height: 100svh`, with safe-area-aware padding.

### Explorer rail

The rail is navigation plus identity, not decoration.

- Top lockup: Aidil's avatar/monogram, name, and `PORTFOLIO` label.
- Explorer window: a warm technical index with a thin border, one amber system marker, and a plain `workspace` or `portfolio` label. Avoid cloning the reference's exact three-dot window chrome.
- Top-level groups represent `profile`, `career`, `work`, `off-duty`, and `contact`; child rows map to real sections or project IDs.
- Active section uses brighter text, a subtle tinted row, and a narrow accent indicator.
- Indentation and connector lines clarify hierarchy.
- File extensions may reflect content type, but derive them from Aidil's real material: for example `profile.ts`, `career.log`, `education.md`, project titles under `work/`, `spotify.live`, and `contact.json`. These are presentation labels only; pair them with plain-language accessible names.
- Clicking a file scrolls to the corresponding section and updates URL hash where the current app supports deep links.
- Do not make every tiny label a separate focus stop. Only actionable rows receive interactive semantics.

### Hero/About chapter — identity dossier

The hero is the first proof of integration: Janay-like negative space and scale, shaped around Aidil's longer real bio and warm editorial voice.

- Use an asymmetric stage rather than copying the reference's perfectly centered hero. The oversized Playfair name and role occupy the dominant field; the bio forms a narrow “manifest” column aligned to the same baseline grid.
- This single chapter must hold the name, title, complete existing bio, location, resume action, current employer/role/period, and core-stack trio: React, React Native, TypeScript.
- Do not create a separate About essay or reduce the bio to a one-line slogan.
- Use the memoji as a small authored signature crossing the boundary between the dominant field and manifest column—not as a copied corner mascot.
- Render current-employer information as a compact amber-ruled annotation and the stack trio as inline metadata. They must feel embedded in the dossier, not like detached cards.
- The only major action is the existing resume link. The explore cue is a quiet navigation affordance, not another CTA.
- At mobile width, sequence name → role/bio → current-role annotation → resume/location. Preserve generous pauses between groups without forcing all content into one screen height.

### Skills/toolkit chapter

- Translate Janay's horizontal toolkit field into a **capability map** for Aidil's five actual categories.
- A single amber “spine” or baseline connects Core → Web → Mobile → Backend → DevOps, showing breadth without invented proficiency.
- Web and Mobile share the dominant lane because Aidil's bio and work history support that emphasis; Core acts as the entry node, while Backend and DevOps are secondary branches.
- Use words first. Icons are optional and must not require sourcing 19 new brand assets.
- Vary lane length and density according to item count, but keep every technology visible and legible.
- On mobile, the map becomes horizontally scrollable category lanes or a stepped vertical sequence—not five rounded cards.

### Work/projects chapter

Projects are the portfolio's proof and should carry more weight than skills.

- Build a unified **work ledger**: Janay's ruled editorial rows become the navigation surface for Aidil's existing selected-project state.
- Preserve the Professional/Personal tabs. The selected row opens a cream or deep-ink dossier in the same ledger grid rather than switching to a visually unrelated feature card.
- The dossier contains the existing title, unedited description, available media, technology context, archive note, and all populated destination actions.
- Professional images appear as evidence inside the dossier, aligned to its document grid. Image-less personal work uses expressive type, project ID, and metadata; it does not show a fake folder illustration.
- Each row contains a small category/status eyebrow, large title, concise description or result, and explicit destinations.
- On hover/focus, reveal a preview, metadata, or directional affordance without shifting surrounding layout.
- Use thin horizontal rules to create rhythm.
- Present all seven professional or all five personal rows inside their selected tab without deleting records.
- Handle records with no image, no links, two store links, or many technology tags as first-class states.
- Keep the tab controls as a compact command strip above the index.

### Experience chapter

- Use a vertical **career signal** anchored by a fine amber line and four chronological stations.
- The current The Access Group station expands into a cream working dossier holding its three achievements and long technology list. Previous stations remain concise but use the same rule, label, and tag grammar.
- Alternate alignment only to pace the eye; do not mimic the reference's card positions when Aidil's copy length makes the result lopsided.
- On mobile, place all entries on one side of the line.
- Current or most important experience may use a light “document” surface against the dark stage. Supporting entries can remain dark outlined panels.
- Every entry preserves organization, role, date, summary, detail, and skill tags from source content.
- Use cards of content-driven height; never force equal heights.

### Education chapter — the pivot diagram

Education has no direct counterpart in the reference and therefore proves whether the synthesis is genuine.

- Visualize the three records as one path that begins in engineering, branches through foundation, and resolves in Computer Science—not as three school cards.
- Make the existing “The pivot” paragraph the connective narrative running beside or through the path.
- The Computer Science record is dominant and owns the FYP note. Foundation and the incomplete USM record are supporting stations with explicit dates and labels.
- Use the same amber signal line as Experience so the two chapters feel related, but change the geometry from career chronology to an intentional branch/pivot.
- Mobile becomes a single vertical route with the pivot paragraph placed at the turn.

### Personal/behind-the-work chapter

- This is the required `beyond` chapter, not an optional gallery.
- Treat it as an **off-duty signal board**, using the same line-and-dossier system in a looser rhythm.
- Spotify is the live signal and dominant region. Album art, when present, becomes the only saturated square; the rest of the panel remains ink/cream/amber. All data states must hold the same geometry without layout shift.
- Arsenal and Mercedes become two “loyalty channels” on the shared baseline rather than standalone cards.
- `I play`, `I watch`, and `Also` become small field notes connected to that baseline—not three pill collections floating separately.
- Do not add photography assets, a playlist link, playback controls, or other content that does not exist.

### Contact/final chapter

- End with a large forward-looking question or invitation based on Aidil's existing copy.
- Place social/contact links in a clean row or two-column cluster with clear accessible names.
- The primary action is the existing `mailto:aidilsafwan.aas@gmail.com` link. There is no form.
- Preserve email, LinkedIn, GitHub, resume access, location/remote availability, copyright, and the React + Vite credit.
- A code-object panel is optional and may only reformat existing values; it cannot introduce new availability or interest claims.
- The final action should be obvious without becoming a generic oversized gradient button.

### Cross-chapter continuity

- A single 1 px alignment/rule system runs from rail rows through project ledger, career signal, education pivot, Beyond channels, and contact links.
- Cream surfaces always mean “open document/detail”; amber always means “active/live/connected”; neither role changes by section.
- The memoji appears once. Project images appear only in Work. Spotify album art appears only in Beyond. This prevents decorative motifs from competing.
- Section transitions may carry one small shared artifact—an amber cursor line, progress marker, or section index—so snap changes feel like moving within one workspace.
- Avoid giving each chapter a new background recipe. Use one continuous warm-ink field with controlled cream documents and low-opacity grid variation.

## 7. Visual tokens

### Color

Use CSS custom properties so themes and states are systematic.

```css
:root {
  --ink-950: #100b05;
  --ink-900: #1a1208;
  --ink-850: #21170b;
  --ink-800: #2a1d0e;
  --line-subtle: rgba(255, 255, 255, 0.075);
  --line-strong: rgba(255, 255, 255, 0.16);
  --text-primary: #f5efe4;
  --text-secondary: #cbbda8;
  --text-muted: #8a7a6a;
  --paper: #f5efe4;
  --paper-ink: #1a1208;
  --accent: #c9852a;
  --accent-bright: #dfa34e;
  --success: #6cc59b;
  --warning: #e7b45c;
  --danger: #ef746f;
}
```

Rules:

- Near-black surfaces should differ by only a few luminance points.
- Use accent color for active state, selected text, meaningful emphasis, and focus—not as ambient decoration everywhere.
- Light document cards are rare high-contrast events, primarily for experience or a flagship case study.
- Body copy must meet WCAG AA contrast.
- Project-specific colors may appear inside project media, not across the global chrome.

### Background system

- Stage base: `--ink-850`.
- Rail base: `--ink-950`.
- Add a low-contrast engineering grid using two 1 px gradients, 64–96 px apart.
- Grid opacity: 2–4%. It should disappear before it becomes texture noise.
- Optional radial lighting may sit behind the hero or featured work at no more than 8% opacity.
- Avoid star fields, neon fog, constant glow, and noisy grain overlays.

### Typography

Use the fonts already bundled in the repository. Do not require Aidil to source or license replacements.

- Display: `Playfair Display`, weight 900.
- Body/UI: `Space Grotesk`, weights 400, 600, and 700.
- Explorer/code metadata: `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`; no new font package is required.

Type scale:

```css
--type-display: clamp(3.25rem, 8.5vw, 8.5rem);
--type-h1: clamp(2.75rem, 6vw, 6.5rem);
--type-h2: clamp(2.25rem, 4.4vw, 4.75rem);
--type-h3: clamp(1.5rem, 2.4vw, 2.75rem);
--type-body-lg: clamp(1.05rem, 1.2vw, 1.3rem);
--type-body: 1rem;
--type-small: 0.8125rem;
--type-micro: 0.6875rem;
```

- Display headings: uppercase or title case according to source brand, `0.01–0.035em` tracking, `0.85–0.95` line-height.
- Eyebrows: mono, uppercase, `0.18–0.28em` tracking.
- Body: `1.55–1.75` line-height.
- Avoid long paragraphs in the display or italic face.
- Italic display is reserved for a promise line or quotation, never general UI copy.

### Spacing

Base unit: 4 px.

```text
1: 4   2: 8   3: 12   4: 16   5: 20   6: 24
8: 32  10: 40  12: 48  16: 64  20: 80  24: 96
32: 128
```

- Mobile section padding: `88–112px` block.
- Desktop section padding: `120–176px` block.
- Main-stage inline padding: `clamp(24px, 5vw, 88px)`.
- Use whitespace as hierarchy; do not solve every gap by drawing a container.

### Shape and borders

- Standard radius: 12 px.
- Compact controls: 999 px pill only where semantics suggest a status or tag.
- Large document cards: 18–24 px.
- Rules: 1 px `--line-subtle`.
- Avoid excessive rounded rectangles. Text, whitespace, and rules may stand alone.

### Shadows and effects

- Dark surfaces: little or no shadow; use borders and luminance.
- Light document card: `0 24px 80px rgba(0,0,0,.32)`.
- Focus ring: 2 px `--accent-bright` plus 2 px offset.
- Blur is optional and localized; never depend on backdrop blur for legibility.

## 8. Components

### Section heading

- Mono eyebrow
- Playfair display heading
- Optional one-line description
- Alignment may be centered for Skills and left-aligned for Work/Experience

### Editorial project row

- Minimum 112 px desktop, 96 px mobile
- Thin top border; final row also gets bottom border
- Category eyebrow above or beside the title
- Title occupies most visual weight
- Arrow or link group appears at the far edge
- Preview media is absolutely positioned or shown in a dedicated adjacent pane; it must not cause reflow

### Document card

- Used selectively for featured experience or case study
- Light surface with dark text
- Compact metadata line, readable body, flexible tags
- Content-driven height

### Tags

- Mono label, 11–12 px
- Subtle filled or outlined surface
- Keep the default tag summary to two lines; when a record has more—especially ChangeGPS—provide an accessible disclosure or scroll-safe detail view containing every tag

### Buttons and links

- Primary action: dark or light pill with a directional icon; no gratuitous gradient
- Secondary action: underlined or rule-based text link
- Icon-only control: 44 px minimum, tooltip and accessible name required
- External links indicate destination without noisy repeated icons

### Navigation drawer

- Full-height dark sheet with the same explorer hierarchy
- Opens from the right or covers the viewport
- Clear close control and focus trap
- Selecting an item closes the drawer and moves focus appropriately

### Optional AI/chat or assistant control

- Preserve only if it exists in the current portfolio.
- Keep it as a small fixed launcher that does not obscure navigation, contact actions, or mobile content.
- Include accessible expanded/collapsed state and keyboard operation.

## 9. Motion

Motion should suggest software coming online, not a perpetual demo reel.

### Timing

```text
micro feedback: 120–180ms
controls/pills: 180–240ms
content reveal: 420–650ms
chapter transition: 600–900ms
ambient loop: 12–30s
```

Preferred easing:

```js
const easeOut = [0.22, 1, 0.36, 1]
const easeInOut = [0.65, 0, 0.35, 1]
```

### Patterns

- Hero: role fades first, name reveals by line or clip, manifest/bio follows, and the current-role annotation and resume action resolve last.
- Section entry: 16–28 px vertical travel with stagger under 80 ms per item.
- Explorer: active indicator glides; folders expand with height/opacity transition.
- Project rows: title shifts 4–8 px, arrow advances, preview fades/scales subtly.
- Experience: line draws as entries enter; cards alternate with short lateral travel on desktop.
- Skills: the capability-map spine draws once; category nodes resolve outward from Core without perpetual movement.
- Education: the path draws to the pivot, then resolves toward Computer Science.

### Reduced motion

- Honor `prefers-reduced-motion` globally.
- Replace scroll-linked transforms with simple opacity changes.
- Stop marquees and decorative loops.
- Avoid smooth scrolling when reduced motion is requested.
- Content must never depend on an animation completing to become available.

## 10. Responsive behavior

### 320–479 px

- 20 px inline gutters
- One-column chapters
- Name fits within two lines at most
- Project previews move below the active row or become static thumbnails
- Experience uses one-sided timeline
- Social links wrap in two columns or a vertical list

### 480–767 px

- 24–32 px gutters
- Selected internal two-column arrangements are allowed only when touch targets remain generous
- Capability-map lanes may become a stepped vertical sequence

### 768–1023 px

- Compact command navigation; no persistent rail
- 40–56 px gutters
- About and featured work may use asymmetric two-column layouts
- Project index remains full-width

### 1024–1439 px

- Persistent explorer rail
- Main stage uses 48–72 px gutters
- Full chapter system active

### 1440 px and above

- Rail may grow only to 336 px
- Main content stays capped; additional width becomes breathing room
- Do not scale all text and media indefinitely

## 11. Accessibility

- Semantic landmarks: `aside`, `nav`, `main`, `section`, and `footer`.
- One logical `h1`; ordered headings thereafter.
- Provide a skip link that bypasses the fixed rail.
- Explorer navigation must work with keyboard, screen reader, touch, and pointer.
- Visible focus state on every interactive element.
- Minimum touch target: 44×44 px.
- Do not use color alone for active, status, or error state.
- Images need meaningful alt text; decorative imagery gets empty alt text.
- External links and new tabs are disclosed appropriately.
- Maintain readable contrast over the grid and all media.
- Test at 200% zoom and with text-only enlargement.

## 12. Performance

- Keep the first viewport mostly HTML, CSS, and text.
- Lazy-load below-the-fold project media.
- Serve AVIF/WebP with explicit dimensions and responsive `srcset`.
- Use transform and opacity for animation; avoid layout-thrashing scroll handlers.
- Prefer Intersection Observer and Framer Motion viewport controls over continuous JS scroll calculations.
- Do not ship a 3D/WebGL scene unless it is already core functionality and passes mobile performance budgets.
- Target Core Web Vitals: LCP under 2.5 s, CLS under 0.1, INP under 200 ms on a representative mid-range mobile device.
- Ensure the full experience remains intelligible if animation, custom fonts, or JavaScript enhancements fail.

## 13. Avoid list

Do not produce:

- a reskin of the existing bento grid
- a Janay-style shell with Aidil's content merely poured into it
- an Aidil-style page with a reference explorer merely attached to it
- section-specific visual languages that make Work, Education, Beyond, or Contact feel imported from different templates
- a uniform stack or grid of equal-sized rounded cards
- a stretched mobile layout posing as desktop
- copied Janay Rawal content, identity, avatar, file names, illustrations, or project data
- decorative code snippets that contain invented claims about Aidil
- a hero crowded with stats, badges, tech logos, and three competing CTAs
- gradients on every surface
- neon cyberpunk glow, glassmorphism soup, or star-field backgrounds
- excessive blur, grain, parallax, cursor followers, or scroll hijacking
- hidden navigation that only appears on hover
- auto-playing motion that ignores reduced-motion preferences
- illegible microcopy, low-contrast gray text, or icons without labels
- technology logos as the primary proof of ability
- project cards with no result, role, or clear destination
- invented content added merely to imitate the reference

## 14. Acceptance checklist

### Composition

- [ ] Desktop has a true fixed explorer rail and independent main-stage composition.
- [ ] Mobile transforms the current dock into a coherent command dock with an accessible full explorer drawer.
- [ ] Hero is the single strongest visual moment.
- [ ] Projects use a featured treatment plus editorial index/asymmetric rows.
- [ ] Experience reads as a journey, not a generic card grid.
- [ ] Education reads as a pivot path using the same signal-line grammar without copying Experience.
- [ ] Beyond reads as part of the same workspace rather than a surviving bento block.
- [ ] Cream consistently means open detail/document and amber consistently means active/live/connected.
- [ ] Chapters have distinct compositions and generous negative space.

### Content and behavior

- [ ] Every README/current-site content item is accounted for.
- [ ] All project tabs/selections, links, Spotify states, resume access, navigation, downloads, and external actions still work.
- [ ] No personal facts were invented or copied from the reference.
- [ ] Deep links and navigation states remain reliable.

### Quality

- [ ] Tested at 390×844, 768×1024, 1280×800, and 1440×900.
- [ ] Keyboard, focus order, screen-reader labels, and reduced motion verified.
- [ ] No horizontal overflow from 320 px upward.
- [ ] Hover states have touch and keyboard equivalents.
- [ ] Performance targets are measured, not assumed.

## 15. Final principle

The reference's most valuable idea is not “make a portfolio look like an IDE.” It is the discipline of giving each chapter one dominant job. Aidil's contribution is the warmth, density, interaction, and real product history that changes how those jobs must be composed. The result should feel inevitable—as though the warm engineering studio was designed around this exact content from the beginning.
