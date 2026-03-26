# Beyond the Code — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Beyond the Code" snap-scroll section between Projects and Contact, featuring a live Spotify now-playing widget (with top-tracks fallback) and two personality tiles (My Teams, Outside the IDE).

**Architecture:** A Netlify Function handles Spotify OAuth token refresh server-side and returns a unified now-playing/top-tracks response. A `useSpotify` hook polls that function and feeds data into a `Beyond.tsx` bento-grid section component. Desktop sidebar gets a new nav entry; mobile dock is unchanged.

**Tech Stack:** React, TypeScript, Tailwind CSS, Framer Motion, Netlify Functions, Spotify Web API

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `netlify.toml` | Create | Enable esbuild bundler for TypeScript Netlify Functions |
| `netlify/functions/spotify.ts` | Create | Server-side Spotify token refresh + API proxy |
| `src/hooks/useSpotify.ts` | Create | Fetch + poll Spotify function, expose state to components |
| `src/layouts/sections/Beyond.tsx` | Create | "Beyond the Code" bento-grid section component |
| `src/layouts/sections/index.ts` | Modify | Export `Beyond` |
| `src/constants/index.tsx` | Modify | Add `beyond` data constant |
| `src/hooks/useActiveSection.ts` | Modify | Add `"beyond"` to `SECTION_IDS` |
| `src/components/Sidebar.tsx` | Modify | Add "Beyond" to `NAV_ITEMS` |
| `src/App.tsx` | Modify | Add `<SnapSection id="beyond"><Beyond /></SnapSection>` |

---

## Task 1: netlify.toml — Enable TypeScript Functions

**Files:**
- Create: `netlify.toml`

- [ ] **Step 1: Create netlify.toml**

```toml
[functions]
  node_bundler = "esbuild"
```

- [ ] **Step 2: Verify build still works**

```bash
npm run build
```

Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add netlify.toml
git commit -m "chore: add netlify.toml with esbuild for TypeScript functions"
```

---

## Task 2: Spotify Credentials Setup (manual one-time step)

This task is manual — it does not produce code. It must be done before Task 3 can be tested locally.

- [ ] **Step 1: Create a Spotify app**

Go to https://developer.spotify.com/dashboard → "Create app". Set redirect URI to `http://localhost:3000/callback` (or any URI you control). Note down `Client ID` and `Client Secret`.

- [ ] **Step 2: Get a refresh token**

Run this in your browser — replace `YOUR_CLIENT_ID` and `YOUR_REDIRECT_URI`:

```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_REDIRECT_URI&scope=user-read-currently-playing%20user-top-read
```

After authorising, you'll be redirected to your redirect URI with a `?code=...` query param. Copy that code.

- [ ] **Step 3: Exchange code for refresh token**

Run this in a terminal — replace `YOUR_CLIENT_ID`, `YOUR_CLIENT_SECRET`, `YOUR_CODE`, and `YOUR_REDIRECT_URI`:

```bash
curl -X POST https://accounts.spotify.com/api/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic $(echo -n 'YOUR_CLIENT_ID:YOUR_CLIENT_SECRET' | base64)" \
  -d "grant_type=authorization_code&code=YOUR_CODE&redirect_uri=YOUR_REDIRECT_URI"
```

The response will contain `"refresh_token"`. Copy it.

- [ ] **Step 4: Set environment variables**

Locally — create or update `.env` (do not commit this file — confirm it is in `.gitignore`):

```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token
```

In Netlify dashboard — go to Site → Environment Variables and add the same three keys.

---

## Task 3: Netlify Function — Spotify API Proxy

**Files:**
- Create: `netlify/functions/spotify.ts`

- [ ] **Step 1: Create the functions directory**

```bash
mkdir -p netlify/functions
```

- [ ] **Step 2: Write the function**

Create `netlify/functions/spotify.ts`:

```typescript
import type { Handler } from "@netlify/functions";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const TOP_TRACKS_URL = "https://api.spotify.com/v1/me/top/tracks?limit=3&time_range=medium_term";

async function getAccessToken(): Promise<string> {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });
  const data = await res.json();
  return data.access_token;
}

export const handler: Handler = async () => {
  try {
    const token = await getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };

    // Try currently playing
    const npRes = await fetch(NOW_PLAYING_URL, { headers });

    let isPlaying = false;
    let current = null;

    if (npRes.status === 200) {
      const npData = await npRes.json();
      if (npData.is_playing && npData.item) {
        isPlaying = true;
        current = {
          title: npData.item.name,
          artist: npData.item.artists.map((a: { name: string }) => a.name).join(", "),
          albumArt: npData.item.album.images[2]?.url ?? null,
        };
      }
    }

    // Always fetch top tracks (shown below now-playing)
    const ttRes = await fetch(TOP_TRACKS_URL, { headers });
    const ttData = await ttRes.json();
    const topTracks = (ttData.items ?? []).map((t: {
      name: string;
      artists: { name: string }[];
    }) => ({
      title: t.name,
      artist: t.artists.map((a) => a.name).join(", "),
    }));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPlaying, current, topTracks }),
    };
  } catch (err) {
    console.error("Spotify function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch Spotify data" }),
    };
  }
};
```

- [ ] **Step 3: Install Netlify Functions types**

```bash
npm install --save-dev @netlify/functions
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npm run build
```

Expected: build succeeds. The Netlify function is not bundled by Vite — it's only used at deploy time, so a clean Vite build is sufficient verification here.

- [ ] **Step 5: Test the function locally (optional but recommended)**

Install Netlify CLI if not already installed:

```bash
npm install -g netlify-cli
```

Run:

```bash
netlify dev
```

Visit `http://localhost:8888/.netlify/functions/spotify` — you should see JSON with `isPlaying`, `current`, and `topTracks`.

- [ ] **Step 6: Commit**

```bash
git add netlify/functions/spotify.ts package.json package-lock.json
git commit -m "feat: add Spotify Netlify function"
```

---

## Task 4: useSpotify Hook

**Files:**
- Create: `src/hooks/useSpotify.ts`

- [ ] **Step 1: Write the hook**

Create `src/hooks/useSpotify.ts`:

```typescript
import { useEffect, useRef, useState } from "react";

export interface SpotifyTrack {
  title: string;
  artist: string;
  albumArt?: string | null;
}

export interface SpotifyState {
  isPlaying: boolean;
  current: SpotifyTrack | null;
  topTracks: Pick<SpotifyTrack, "title" | "artist">[];
  loading: boolean;
  error: boolean;
}

async function fetchSpotify(): Promise<Omit<SpotifyState, "loading" | "error">> {
  const res = await fetch("/.netlify/functions/spotify");
  if (!res.ok) throw new Error("Spotify fetch failed");
  return res.json();
}

export function useSpotify(): SpotifyState {
  const [state, setState] = useState<SpotifyState>({
    isPlaying: false,
    current: null,
    topTracks: [],
    loading: true,
    error: false,
  });

  const isPlayingRef = useRef(false);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    async function load() {
      try {
        const data = await fetchSpotify();
        isPlayingRef.current = data.isPlaying;
        setState({ ...data, loading: false, error: false });
      } catch {
        setState((prev) => ({ ...prev, loading: false, error: true }));
      }
    }

    function scheduleNext() {
      // Poll every 30s when playing, 60s otherwise
      const delay = isPlayingRef.current ? 30_000 : 60_000;
      intervalId = setTimeout(async () => {
        await load();
        scheduleNext();
      }, delay);
    }

    load().then(scheduleNext);

    return () => clearTimeout(intervalId);
  }, []);

  return state;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build
```

Expected: no type errors.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useSpotify.ts
git commit -m "feat: add useSpotify polling hook"
```

---

## Task 5: Add `beyond` Constant

**Files:**
- Modify: `src/constants/index.tsx`

> **Note:** `Sidebar.tsx` uses its own hardcoded `NAV_ITEMS` array — it does NOT consume the `menu` constant from `constants/index.tsx`. The `menu` constant is not used anywhere for nav rendering, so it does not need a new entry. The sidebar update happens in Task 7.

- [ ] **Step 1: Add the `beyond` constant**

At the bottom of `src/constants/index.tsx`, before the `menu` block, add:

```typescript
// ─── Beyond ────────────────────────────────────────────────────────────────────

export const beyond = {
  teams: [
    { name: "Arsenal FC", league: "Premier League", tagline: "Proud Gooner", icon: "🔴" },
    { name: "Mercedes AMG Petronas", league: "Formula 1", tagline: "Still believing", icon: "⬛" },
  ],
  play: ["Football", "Futsal", "Badminton", "Pickleball", "Frisbee"],
  watch: ["Football", "Badminton", "F1"],
  also: ["Photography"],
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/constants/index.tsx
git commit -m "feat: add beyond section constants"
```

---

## Task 6: Beyond.tsx Section Component

**Files:**
- Create: `src/layouts/sections/Beyond.tsx`

This component uses the same Framer Motion `stagger` + `card` pattern as `Hero.tsx`. Reference `Hero.tsx` for the animation variants — they are identical.

- [ ] **Step 1: Write the component**

Create `src/layouts/sections/Beyond.tsx`:

```typescript
import { motion, type Variants } from "framer-motion";
import { beyond } from "../../constants";
import { useSpotify } from "../../hooks/useSpotify";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function SpotifyCard() {
  const { isPlaying, current, topTracks, loading, error } = useSpotify();

  if (error) {
    return (
      <motion.div
        variants={card}
        className="md:row-span-2 bg-ink rounded-xl p-5 flex flex-col border border-amber/[0.08]"
      >
        <p className="font-sans text-[9px] font-semibold text-amber/40 tracking-[0.18em] uppercase">
          Spotify
        </p>
        <p className="font-sans text-[11px] text-cream/30 mt-3">
          Couldn't connect to Spotify
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={card}
      className={`md:row-span-2 bg-ink rounded-xl p-5 flex flex-col border border-amber/[0.08] transition-opacity duration-500 ${loading ? "opacity-40" : "opacity-100"}`}
    >
      {/* Now playing / last played */}
      <div>
        <p className="font-sans text-[9px] font-semibold text-amber tracking-[0.18em] uppercase">
          {isPlaying ? "▶ Now Playing" : "Last Played"}
        </p>
        <h2 className="font-display text-[28px] font-black text-cream leading-none tracking-[-1px] mt-1">
          Spotify
        </h2>

        {current && (
          <div className="flex items-center gap-3 mt-3">
            {current.albumArt && (
              <img
                src={current.albumArt}
                alt={current.title}
                className="w-12 h-12 rounded-md flex-shrink-0 object-cover"
              />
            )}
            <div className="min-w-0">
              <p className="font-sans text-[11px] font-bold text-cream truncate">
                {current.title}
              </p>
              <p className="font-sans text-[10px] text-cream/45 truncate">
                {current.artist}
              </p>
            </div>
          </div>
        )}

        {isPlaying && (
          <div className="flex items-end gap-[3px] h-4 mt-2">
            {[6, 12, 8, 14, 5, 10, 7].map((h, i) => (
              <span
                key={i}
                className="w-[3px] rounded-sm bg-[#1DB954] animate-pulse"
                style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )}

        {!isPlaying && current && (
          <p className="font-sans text-[9px] text-cream/25 mt-2">
            Not listening right now
          </p>
        )}
      </div>

      {/* Top tracks */}
      {topTracks.length > 0 && (
        <div className="mt-auto pt-4">
          <div className="h-px w-full bg-amber/[0.08] mb-3" />
          <p className="font-sans text-[8px] font-semibold text-cream/30 tracking-[0.18em] uppercase mb-2">
            Top Tracks
          </p>
          <div className="flex flex-col gap-1.5">
            {topTracks.map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="font-sans text-[8px] font-bold text-amber/40 w-3 flex-shrink-0">
                  {i + 1}
                </span>
                <p className="font-sans text-[9px] text-cream/50 truncate">
                  <span className="text-cream/75 font-semibold">{t.title}</span>
                  {" — "}
                  {t.artist}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spotify badge */}
      <div className="mt-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
        <span className="font-sans text-[8px] font-semibold text-[#1DB954]/50">
          via Spotify API
        </span>
      </div>
    </motion.div>
  );
}

export const Beyond = () => (
  <motion.div
    className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] md:grid-rows-2 gap-3 p-4 overflow-y-auto md:overflow-hidden"
    variants={stagger}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.4 }}
  >
    <SpotifyCard />

    {/* My Teams */}
    <motion.div
      variants={card}
      className="bg-amber/[0.08] border border-amber/[0.18] rounded-xl p-4 flex flex-col relative overflow-hidden"
    >
      <p className="font-sans text-[9px] font-semibold text-ink/50 tracking-[0.18em] uppercase mb-3">
        My Teams
      </p>
      {beyond.teams.map((team, i) => (
        <div key={team.name}>
          {i > 0 && <div className="h-px bg-ink/[0.1] my-2.5" />}
          <div className="flex items-center gap-2.5">
            <span className="text-xl leading-none">{team.icon}</span>
            <div>
              <p className="font-sans text-[10px] font-bold text-ink/70 leading-tight">
                {team.name}
              </p>
              <p className="font-sans text-[9px] text-ink/40">
                {team.league} · {team.tagline}
              </p>
            </div>
          </div>
        </div>
      ))}
      <span className="absolute bottom-2 right-3 text-4xl opacity-[0.07] pointer-events-none select-none">
        🏎️
      </span>
    </motion.div>

    {/* Outside the IDE */}
    <motion.div
      variants={card}
      className="bg-amber/[0.07] border border-ink/[0.07] rounded-xl p-4 flex flex-col"
    >
      <p className="font-sans text-[9px] font-semibold text-cream/40 tracking-[0.18em] uppercase mb-2">
        Outside the IDE
      </p>

      <div className="flex flex-col gap-2">
        <div>
          <p className="font-sans text-[7px] font-bold text-cream/30 tracking-[0.15em] uppercase mb-1">
            I play
          </p>
          <div className="flex flex-wrap gap-1">
            {beyond.play.map((s) => (
              <span
                key={s}
                className="font-sans text-[9px] font-semibold text-cream/60 bg-white/[0.06] px-2 py-0.5 rounded-[3px]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="font-sans text-[7px] font-bold text-cream/30 tracking-[0.15em] uppercase mb-1">
            I watch
          </p>
          <div className="flex flex-wrap gap-1">
            {beyond.watch.map((s) => (
              <span
                key={s}
                className="font-sans text-[9px] font-semibold text-cream/60 bg-white/[0.06] px-2 py-0.5 rounded-[3px]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="font-sans text-[7px] font-bold text-cream/30 tracking-[0.15em] uppercase mb-1">
            Also
          </p>
          <div className="flex flex-wrap gap-1">
            {beyond.also.map((s) => (
              <span
                key={s}
                className="font-sans text-[9px] font-semibold text-cream/60 bg-white/[0.06] px-2 py-0.5 rounded-[3px]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build
```

Expected: no errors (the component is not yet wired into the app, so it won't render yet).

- [ ] **Step 3: Commit**

```bash
git add src/layouts/sections/Beyond.tsx
git commit -m "feat: add Beyond section component"
```

---

## Task 7: Wire Up — Export, Routing, Nav

**Files:**
- Modify: `src/layouts/sections/index.ts`
- Modify: `src/hooks/useActiveSection.ts`
- Modify: `src/components/Sidebar.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Export Beyond from sections index**

In `src/layouts/sections/index.ts`, add:

```typescript
export * from "./Beyond";
```

- [ ] **Step 2: Add "beyond" to SECTION_IDS**

In `src/hooks/useActiveSection.ts`, update the `SECTION_IDS` array:

```typescript
const SECTION_IDS = [
  "about",
  "skills",
  "experience",
  "education",
  "projects",
  "beyond",   // ← add this
  "contact",
] as const;
```

- [ ] **Step 3: Add "Beyond" to Sidebar NAV_ITEMS**

In `src/components/Sidebar.tsx`, update the `NAV_ITEMS` array (insert between `projects` and `contact`):

```typescript
const NAV_ITEMS = [
  { id: "about",      label: "About" },
  { id: "skills",     label: "Skills" },
  { id: "experience", label: "Work" },
  { id: "education",  label: "Education" },
  { id: "projects",   label: "Projects" },
  { id: "beyond",     label: "Beyond" },   // ← add this
  { id: "contact",    label: "Contact" },
] as const;
```

- [ ] **Step 4: Add SnapSection to App.tsx**

In `src/App.tsx`, import `Beyond` and add the snap section between Projects and Contact:

```typescript
import {
  Contact,
  Education,
  Experience,
  Hero,
  Projects,
  Skills,
  Beyond,     // ← add
} from "./layouts/sections";
```

In the JSX, between `<SnapSection id="projects">` and `<SnapSection id="contact">`:

```jsx
<SnapSection id="beyond">
  <Beyond />
</SnapSection>
```

- [ ] **Step 5: Run dev server and visually verify**

```bash
npm run dev
```

Check:
- Scrolling to the Beyond section highlights "Beyond" in the desktop sidebar
- Spotify card shows loading state (dimmed) then real data
- My Teams shows Arsenal + Mercedes
- Outside the IDE shows all three sub-groups
- Mobile: 6-item bottom dock unchanged, section is reachable by scrolling

- [ ] **Step 6: Verify build passes**

```bash
npm run build
```

Expected: no errors, no TypeScript issues.

- [ ] **Step 7: Commit**

```bash
git add src/layouts/sections/index.ts src/hooks/useActiveSection.ts src/components/Sidebar.tsx src/App.tsx
git commit -m "feat: wire up Beyond the Code section"
```

---

## Task 8: Deploy to Netlify

- [ ] **Step 1: Confirm env vars are set in Netlify dashboard**

In Netlify → Site → Environment Variables, verify these exist:
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

- [ ] **Step 2: Push and deploy**

```bash
git push origin main
```

- [ ] **Step 3: Smoke test deployed site**

Visit the live URL and check:
- The Beyond section renders
- `/.netlify/functions/spotify` returns valid JSON
- Spotify card shows real data (or graceful fallback)
