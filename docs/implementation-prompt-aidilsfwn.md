# Implementation Prompt — aidilsfwn.dev Structural Rebuild

## Goal

Complete a visual and structural rebuild of `aidilsfwn.dev` using `design-system-aidilsfwn.md` as the fixed source of truth, especially its **Composition Reference**, **Motion**, **Responsive behavior**, **Avoid list**, and **Acceptance checklist** sections.

This is a teardown-and-rebuild of the presentation layer and its layout structure—not a reskin of the existing bento composition.

Preserve the portfolio's real content and working functionality from the README and repository. Preserve the existing React + Vite + Tailwind CSS + Framer Motion stack unless the repository proves otherwise. Do not copy Janay Rawal's identity, copy, projects, file names, avatar, illustrations, or assets.

## Content freeze — no copy amendments required

The repository has already been audited. Treat all existing copy and data as final. The implementation must adapt to it; do not ask Aidil to shorten, rewrite, add, or remove content.

Preserve exactly:

- Section order/IDs: `about`, `skills`, `experience`, `education`, `projects`, `beyond`, `contact`.
- Profile: Aidil Safwan; Senior Software Engineer @ The Access Group; Kuala Lumpur, MY; `aidilsafwan.aas@gmail.com`; the complete existing bio; GitHub, LinkedIn, and `/CV-AidilSafwan.pdf`.
- Skills: all five categories and all 19 displayed entries from `constants/index.tsx`. Do not invent proficiency levels.
- Experience: four roles. The current The Access Group record has three achievement bullets and 12 tech tags; previous records have descriptions instead. Do not force equal content shapes.
- Education: all three records, the `Incomplete` USM label, the bilingual Twitter sentiment-analysis FYP sentence, and the existing pivot paragraph.
- Projects: all 12 records—seven professional and five personal—their exact descriptions, technologies, archive state/note, media paths, and every populated URL.
- Beyond: Spotify's live/loading/error/not-playing states, top-three tracks, both teams, and all `play`/`watch`/`also` values.
- Contact: the current invitation copy, `mailto:` behavior, email, GitHub, LinkedIn, location/remote line, copyright, and React + Vite footer credit. There is no contact form.

Known variable content shapes that the design must solve without editorial changes:

- Personal projects have no image assets.
- `COVID-19 MY Dashboard` is archived, has no link, and has an archive note.
- Some professional projects have a website only; some have App Store and Play Store links.
- ChangeGPS has 17 technology tags.
- Spotify album art is remote and nullable; live content changes over time.
- The existing bio is the only About prose; do not create a separate About essay.
- Preserve the current **“6 yrs · 4 companies”** display label alongside the bio's **“5+ years”** wording; do not pause the redesign for copy normalization.

Project titles are locked:

- Professional: ChangeGPS, in1bank, KWSP i-Akaun, MyPB, PBeXperience, n9.digital, invokeisdata.
- Personal: ElakHujan, 9mo., Dah Qada?, Aidil & Farhana's First Anniversary, COVID-19 MY Dashboard.

Beyond values are locked:

- Teams: Arsenal FC; Mercedes AMG Petronas F1 Team.
- Play: Football, Futsal, Badminton, Ultimate Frisbee.
- Watch: Football, Badminton, F1.
- Also: Photography, Music.

## Important reference instruction

The structural reference is Janay Rawal's live portfolio at `https://www.janayrawal.in/`.

Study the actual composition:

- fixed IDE-style explorer rail on desktop
- expansive main stage made of chapter-like scenes
- sparse, dominant hero rather than a card dashboard
- asymmetric About composition
- compact toolkit field beneath a strong heading
- ruled editorial project index rather than equal project tiles
- alternating journey/timeline treatment for experience
- decisive closing/contact scene
- mobile replacement of the rail with a compact menu/drawer

Use these as composition principles, not as content to copy. The desired result is Aidil's portfolio expressed through that structural logic.

## Synthesis mandate — do not merely combine the two

The target is a third, coherent language: **Aidil's Warm Engineering Studio**.

- Janay supplies spatial DNA: rail/stage hierarchy, cinematic chapters, negative space, editorial rows, and journey rhythm.
- Aidil supplies identity and operating reality: ink/cream/amber warmth, Playfair + Space Grotesk, memoji, dense shipped-product history, selected-project logic, snap navigation, and live Spotify data.
- Every reference pattern must be transformed to solve a specific Aidil content shape. If it could be copied unchanged from Janay, it is not integrated enough.
- Every Aidil feature must inherit the same rules, alignment, surface meaning, and motion grammar. Do not leave Spotify, Education, personal projects, or the mobile dock looking like remnants of the old site.

Use this translation model:

| Aidil content need | Reference principle | Integrated result |
|---|---|---|
| Seven sections + twelve projects | explorer information architecture | Aidil-specific warm workspace index derived from real anchors and project IDs |
| Longer bio + current-role metadata | sparse dominant hero | asymmetric identity dossier with a narrow manifest column |
| Five skill categories, no proficiency data | toolkit field | connected capability map with Web/Mobile emphasis and no invented ratings |
| Selected-project interaction + mixed media/links | ruled project index | work ledger whose selected row opens an inline dossier |
| Unequal experience records | alternating journey | career signal with one expanded current-role dossier |
| Three education records + pivot story | connected narrative visual | education pivot diagram using the same signal-line grammar |
| Live Spotify + teams + hobbies | atmospheric personal chapter | off-duty signal board with Spotify as the live channel |
| Existing bottom navigation + full seven-section tree | mobile explorer drawer | compact command dock with a More/explorer sheet |

Reject any concept that can be described as “Janay shell + Aidil content” or “Aidil site + Janay sidebar.”

## Non-negotiable working sequence

Do not begin implementation immediately. Complete Steps 1 and 2 in plain text first. No JSX, CSS, Tailwind classes, component code, or file edits are allowed during Steps 1 and 2.

### Step 1 — Describe composition in plain text

Inspect:

1. `design-system-aidilsfwn.md`
2. the portfolio README
3. every current route and major viewport state
4. Janay Rawal's live site or supplied reference captures

Then produce a composition report for each reference chapter:

- What is the dominant/largest element?
- What is secondary?
- What is grouped, separated, fixed, or allowed to float?
- Where does negative space do the work?
- What are the approximate proportions between rail and stage, text and media, and primary and supporting elements?
- How does the composition change on mobile?

For each observation, add two more fields:

- **Aidil pressure:** which real content shape prevents direct copying?
- **Synthesis:** how the pattern changes so it belongs to the warm engineering studio.

Next, map that hierarchy to Aidil's actual portfolio:

- Global shell/navigation
- Hero/About (one combined section; no new biography)
- Skills/Toolbox
- Projects/Selected Work
- Experience
- Education
- Beyond/live personal signals
- Contact/Footer
- Any real modal, filter, theme, resume, assistant, or other interactive state

Reference the **Integration thesis** and **Composition Reference** sections of `design-system-aidilsfwn.md` explicitly in every mapping.

For every major section, describe mobile and desktop side by side. State what becomes dominant, what becomes subordinate, and what disappears or moves. Explicitly state both how the proposal avoids the current bento grid and how it avoids a literal Janay clone.

### Step 2 — Extract content and logic only, in plain text

Create a complete preservation inventory from the README and codebase.

#### Content inventory

List the exact source of truth for:

- display name and role
- hero statement and CTA labels
- biography and highlights
- project titles, summaries, outcomes, tags, media, statuses, live URLs, repositories, and case-study links
- work experience, education, achievements, dates, and descriptions
- skills/tools and their existing categories
- resume/CV asset and action
- contact copy, `mailto:` destination, location/remote line, and social links
- footer/legal copy
- any status, availability, interests, personal content, or code-object copy

Use the **Content freeze** above as the baseline and verify it against the code. Do not rewrite or “improve” personal facts, section copy, project descriptions, or labels during extraction. Identify any contradiction or missing value instead of guessing.

#### Logic inventory

List every managed state and behavior, including where present:

- active section and scroll-spy state
- desktop explorer folder expansion and active file
- mobile drawer open/close and focus return
- project filters, selection, previews, modals, and outbound actions
- theme preference and persistence
- animations and viewport/reduced-motion behavior
- email-link behavior and external-target behavior
- resume download/open behavior
- assistant/chat behavior
- analytics events
- URL hashes, routing, and deep-link behavior
- lazy loading and media states

For each item, state:

- where its data comes from
- which component currently owns it
- which actions change it
- what side effects occur
- what must remain identical after the rebuild

Also document the current data flow, dependencies, environment variables, APIs, static data modules, and build/deployment assumptions. No code in this step.

### Review checkpoint before coding

Present Steps 1 and 2 as a concise review package. Include a two-column mobile/desktop composition table for every major section and a content/behavior preservation checklist.

Stop and ask for approval before Step 3 if this is an interactive workflow. If approval is already explicitly granted for the whole implementation, record the checkpoint in the work log and continue.

### Step 3 — Rebuild from scratch, mobile and desktop

Using only the approved outputs of Steps 1–2 and `design-system-aidilsfwn.md` as design inputs, write entirely new presentation components with a new layout structure.

Do not reference, copy, reuse, or allow the current JSX/CSS/composition to influence:

- new markup hierarchy
- component boundaries
- class names
- grid/flex layout decisions
- card dimensions
- responsive composition
- motion choreography

You may reuse verified data, copy, links, assets, business logic, hooks, API clients, types, and tested utility functions when doing so preserves behavior. If logic is tangled inside presentational components, extract it before deleting the old presentation.

## Required composition

### Desktop, 1024 px and above

- Build a persistent warm workspace index with width `clamp(248px, 23vw, 336px)`.
- Put Aidil's identity lockup at the top and a bordered, hierarchical section/project index below it. Use one amber system marker; do not clone the reference's exact three-dot explorer chrome.
- Map explorer items to real portfolio sections and real projects.
- Use active-section highlighting and accessible navigation semantics.
- Make the remaining viewport a genuine main stage, not a centered mobile column with extra margins.
- Give major sections chapter-like height and individual composition.
- Cap readable content width on very large screens.
- Preserve the existing `#scroll-container` as the Intersection Observer root and mandatory desktop snap-scrolling surface.

### Tablet, 768–1023 px

- Remove the persistent rail.
- Use a compact navigation bar or menu trigger.
- Preserve asymmetric layouts where they remain readable.
- Do not jump directly from desktop rail to a cramped mobile stack.

### Mobile, below 768 px

- Transform the current bottom navigation into a slim command dock with primary anchors plus a 44 px `More`/explorer action.
- Open the full seven-section workspace tree as an accessible drawer/sheet from that dock. Do not also add a floating hamburger.
- Use one reading column with 20–24 px side gutters.
- Preserve the full-viewport hero, editorial hierarchy, project rules, and journey structure.
- Reposition or simplify decorative visuals; never allow them to overlap text or controls.
- Handle safe areas and small-height mobile screens.
- Preserve free vertical scrolling. The new drawer must expose all seven sections, including Beyond, while retaining the current active-section and smooth-scroll behavior.

### Hero/Home

- One dominant hero only.
- This is the existing `about` anchor and must absorb all current Hero/About content; do not create another About section.
- Use an asymmetric identity dossier: oversized Playfair name/role in the dominant field; complete bio in a narrow aligned manifest column; current employer and stack as amber-ruled annotations.
- Preserve content order and reading logic: “Senior Software Engineer” → Aidil Safwan → complete bio → location/current role/core stack → resume → restrained explore cue.
- Use `src/assets/memoji.png` as the one personality asset if a visual is needed.
- Do not add project cards, metric cards, or a technology wall to the hero.
- Keep the resume target exactly `/CV-AidilSafwan.pdf`.
- Do not invent availability, status, metrics, or additional biography text.
- Do not imitate Janay's centered one-line hero; Aidil's longer bio is the reason for the asymmetric composition.

### Skills/Toolbox

- Treat skills as supporting evidence.
- Preserve exact technologies and categories from source content.
- Build a connected capability map: Core feeds Web/Mobile as the dominant lane, with Backend and DevOps as secondary branches.
- Use text-first nodes on a common amber baseline. Do not require 19 new logos, proficiency bars, or five separate cards.
- On mobile, use a stepped vertical map or horizontally scrollable category lanes with visible labels.

### Projects/Selected Work

- Make projects the dominant proof chapter.
- Feature one project only when the source content supports a clear priority.
- Build one work ledger. Ruled rows are both project navigation and the surface that opens the selected project's inline dossier.
- Preserve all existing project actions and destinations.
- Preserve Professional/Personal tabs, Professional as the initial tab, selected-project state, first-project fallback, and selection reset on tab change.
- Render seven professional or five personal index rows without deleting records.
- Support every link combination: website, repository, App Store, Play Store, paired stores, and no destination.
- For ChangeGPS, keep all 17 tags available without dumping them into an unreadable wall; use wrapping, disclosure, or a scroll-safe detail region.
- For personal projects, use title, project ID, rules, and metadata—do not show a generic fake folder or require screenshots.
- Show the archived COVID project's note and disabled/no-destination state clearly.
- Ensure hover previews have keyboard and touch equivalents.
- Do not recreate the current bento grid under different colors.

### Experience/Education

Treat these as related but distinct chapters using one amber signal-line grammar.

- Experience: four chronological stations; expand the current The Access Group role into a cream working dossier and keep prior roles concise.
- Education: create a branch/pivot diagram joining engineering, foundation, and Computer Science; attach the pivot paragraph at the turn and the FYP note to the dominant Computer Science station.
- Alternate placement only when copy length remains balanced. Mobile uses one clear vertical path.
- Preserve all dates, roles, descriptions, tags, labels, and the incomplete USM status.

### Personal/behind-the-work

- Implement the required `beyond` section as data-driven content, not a gallery.
- Build an off-duty signal board using the same line/dossier grammar as Work and Experience in a looser rhythm.
- Make Spotify the live dominant channel and support loading, error, currently playing, last played, missing album art, and top-track states without layout shift. Album art is the only saturated square.
- Present Arsenal and Mercedes as two loyalty channels on the shared baseline.
- Present `play`, `watch`, and `also` as connected field notes, not three leftover card/pill clusters.
- Preserve 30-second polling while playing and 60-second polling otherwise.
- Do not add photography media, a playlist link, playback controls, or fixed album art.

### Contact/Footer

- Create a decisive final scene using Aidil's existing invitation/contact copy.
- Preserve the existing `mailto:aidilsafwan.aas@gmail.com` action; do not add a form or submission service.
- Keep social and resume links clear and keyboard accessible.
- Preserve the exact location/remote line, copyright, and React + Vite credit.
- A code-object panel is allowed only when every value comes from existing content; it must not invent availability or interests.

## Visual requirements

- Use Aidil's existing warm ink `#1a1208`, cream `#f5efe4`, and amber `#c9852a` identity through the layered palette, subtle engineering grid, spacing scale, borders, and rare light document surfaces from `design-system-aidilsfwn.md`.
- Keep the bundled `Playfair Display` for major headings and `Space Grotesk` for body/UI. Use a system monospace stack for explorer labels without adding a font dependency.
- Maintain body contrast at WCAG AA.
- Use rounded rectangles selectively. Do not put every text group inside a container.
- Keep the grid nearly invisible.
- Project media may retain its own colors; global chrome remains restrained.
- Use one continuous warm-ink workspace. Cream surfaces always mean an opened document/detail; amber always means active, live, or connected.
- Reuse one fine-rule alignment system across navigation, project ledger, career signal, education pivot, Beyond channels, and contact links.
- The memoji appears once; project images stay in Work; Spotify album art stays in Beyond.

## Motion requirements

Use Framer Motion according to the design system's **Motion** section.

- Stagger the hero in semantic order.
- Reveal chapters with short opacity/translation transitions.
- Animate the explorer's active indicator and folder expansion.
- Give project rows subtle directional feedback and stable previews.
- Draw or reveal the experience journey progressively.
- Use transforms and opacity only for scroll-linked visual motion.
- Keep ambient loops slow and optional.
- Implement a full `prefers-reduced-motion` path: no marquees, no scroll-linked transforms, no required animation gates, and no forced smooth scrolling.

Do not use motion to hide slow loading or delay access to content.

## Functional constraints

- Preserve every piece of functionality identified in Step 2.
- Preserve mandatory snap scrolling at `min-width: 768px`, free scrolling below 768 px, section `100dvh` behavior, and safe-area handling.
- Preserve `useActiveSection`, `scrollToSection`, the `#scroll-container` observer root, and the seven section IDs even if their presentation components are replaced.
- Preserve `useSpotify`, its cleanup behavior and polling cadence, the Netlify Function endpoint, and the three Spotify environment-variable names.
- Preserve all real content and outbound destinations.
- Preserve route and deep-link behavior.
- Preserve existing analytics, SEO metadata, structured data, sitemap, robots directives, and social preview metadata unless demonstrably broken.
- Keep the app deployable through its existing workflow.
- Do not add a backend, CMS, third-party service, or new runtime dependency without necessity and explicit approval.
- Do not replace working local assets with hotlinked copies.
- Do not invent content to complete the reference composition.
- Do not move copy into a content rewrite backlog or make completion contingent on Aidil supplying new text or imagery.
- Keep the first viewport lightweight; lazy-load below-the-fold media.
- Maintain TypeScript correctness if TypeScript is in use.
- Keep console output free of new warnings and errors.

## Accessibility requirements

- Add a skip link past fixed navigation.
- Use semantic landmarks and one logical `h1`.
- Make all explorer and drawer actions keyboard operable.
- Trap focus in the mobile drawer and return it to the trigger on close.
- Provide visible focus styles and 44×44 px mobile targets.
- Use meaningful alt text for informative media and empty alt text for decoration.
- Never communicate state through color alone.
- Test keyboard order, 200% zoom, reduced motion, and screen-reader names.

## Performance requirements

- Target LCP below 2.5 s, CLS below 0.1, and INP below 200 ms on a representative mid-range phone.
- Give media explicit dimensions and responsive sources.
- Avoid continuous scroll event handlers and layout animation.
- Remove dead components and styles from the prior presentation only after the new implementation is verified.
- Do not add WebGL/3D merely to emulate the reference.

## Avoid list

Reject the implementation if it contains any of the following:

- the old bento grid with new colors or fonts
- a Janay clone with Aidil's strings substituted
- an Aidil reskin with Janay's explorer bolted onto the side
- sections that use incompatible component languages, surface meanings, or motion styles
- literal copies of the reference's three-dot explorer chrome, pixel mascot placement, node graphic, or album-gallery treatment
- a uniform grid/vertical stack of equal rounded cards
- copied Janay Rawal identity, text, projects, avatar, illustrations, or file names
- a desktop view that is merely a stretched mobile column
- a permanent desktop explorer forced into mobile
- a crowded hero with stats, badges, logos, and several CTAs
- invented personal facts, achievements, clients, availability, or metrics
- ubiquitous gradients, neon glow, glass panels, or heavy blur
- star fields, Matrix/code-rain effects, terminal clichés, or noisy scan lines
- scroll hijacking or mandatory parallax
- cursor followers or effects that interfere with interaction
- project hover states with no keyboard/touch equivalent
- low-contrast microcopy or unlabeled icon buttons
- infinite animation that ignores reduced-motion settings
- equal-height experience cards that clip or pad real content
- technology logos replacing meaningful project outcomes

## Review before finalizing

Before declaring the rebuild complete:

1. Run the app and review every route/state.
2. Compare the implementation against the approved Step 1 composition report—not against the old JSX.
3. Show or capture each major section at:
   - 390×844 mobile
   - 768×1024 tablet
   - 1280×800 desktop
   - 1440×900 wide desktop
4. Present mobile and desktop side by side for Hero/About, Skills, Experience, Education, Projects, Beyond, and Contact.
5. For each pair, explain:
   - the dominant element
   - supporting hierarchy
   - what moved, collapsed, or disappeared
   - how it follows the **Integration thesis** and **Composition Reference**
   - how it avoids both the old bento structure and a literal Janay clone
6. Verify every content item and interaction against the Step 2 inventory.
7. Test all project tabs/selections, links, Spotify states, downloads, navigation, and deep links.
8. Test keyboard-only use, focus states, reduced motion, 200% zoom, and 320 px width.
9. Check for horizontal overflow, clipped text, content behind fixed UI, layout shift, missing media, console errors, and broken routes.
10. Run the repository's lint, type-check, test, and production build commands.

If any review item fails, fix it and repeat the affected checks before finalizing.

## Final output

Deliver:

- the completed new implementation
- a concise file/change summary
- the Step 1 composition report
- the Step 2 content/logic preservation inventory
- mobile/desktop review captures for every major section
- verification results for build, lint, types, tests, accessibility, responsive behavior, links, and motion reduction
- a short list of any intentionally deferred items, with reasons

Do not call the work complete until the presentation structure is genuinely new, the portfolio's real content/functionality is preserved, and the review package demonstrates both mobile and desktop composition.
