# Beyond the Code — Personal Section Design

**Date:** 2026-03-26
**Status:** Approved

---

## Overview

Add a new snap-scroll section called **"Beyond the Code"** to the portfolio, placed between the existing Projects and Contact sections. The section injects personality by surfacing hobbies, team loyalties, and a live Spotify integration — all rendered as a bento grid matching the existing ink/amber/cream visual language.

---

## Placement

`App.tsx` section order (after change):

1. About (Hero)
2. Skills
3. Experience
4. Education
5. Projects
6. **Beyond the Code** ← new, `<SnapSection id="beyond"><Beyond /></SnapSection>` (no `dark` prop)
7. Contact (retains `dark` prop)

A new nav entry is inserted into the `menu` array in `src/constants/index.tsx` at index 5 (between Projects and Contact), with `label: "Beyond"`, `link: "#beyond"`, and a `Heart` icon from lucide-react.

**Mobile nav (FloatingDock):** The `beyond` section is intentionally excluded from `FloatingDock`'s `navItems`. The dock uses its own hardcoded list (not the `menu` constant), so no change is needed there. On mobile, users reach the section by scrolling past Projects. The desktop sidebar gets the full 7-item nav.

---

## Layout

Bento grid: `grid-cols-1 md:grid-cols-[1.3fr_1fr] md:grid-rows-2`, matching the Hero section structure exactly.

### Tile 1 — Spotify (left, spans 2 rows)

- **Style:** `tile-dark` — ink background, amber border
- **Now Playing state** (when user is actively listening):
  - Tag: `▶ NOW PLAYING`
  - Large heading: `Spotify`
  - Album art (48×48, fetched from Spotify API) + track name + artist name
  - Animated waveform bars (CSS animation, green `#1DB954`)
- **Fallback state** (not currently listening):
  - Tag: `LAST PLAYED` (muted)
  - Same layout but no waveform animation
  - Sub-label: "Not listening right now"
- **Bottom section (always visible):**
  - Divider
  - Tag: `TOP TRACKS`
  - Numbered list of top 3 tracks (name + artist), fetched from Spotify API
  - Footer: green dot + "via Spotify API"

### Tile 2 — My Teams (top-right)

- **Style:** `tile-amber` — amber tinted background
- **Tag:** `MY TEAMS`
- Two team rows, each with emoji icon + team name + sub-label:
  - 🔴 **Arsenal FC** — "Premier League · Proud Gooner"
  - ⬛ **Mercedes AMG Petronas** — "Formula 1 · Still believing"
- Decorative 🏎️ emoji at bottom-right, low opacity

### Tile 3 — Outside the IDE (bottom-right)

- **Style:** `tile-muted` — subtle amber background
- **Tag:** `OUTSIDE THE IDE`
- Three sub-sections with small uppercase labels:
  - **I play:** Football, Futsal, Badminton, Pickleball, Frisbee (pill tags)
  - **I watch:** Football, Badminton, F1 (pill tags)
  - **Also:** Photography (pill tag)

---

## Spotify Integration Architecture

### Netlify Function

**File:** `netlify/functions/spotify.ts`

**Endpoint:** `GET /.netlify/functions/spotify`

**Logic:**
1. Use stored refresh token to obtain a fresh access token from Spotify (`POST https://accounts.spotify.com/api/token`)
2. Call `GET https://api.spotify.com/v1/me/player/currently-playing`
3. If a track is actively playing (`is_playing: true`), return it
4. Otherwise, call `GET https://api.spotify.com/v1/me/top/tracks?limit=3&time_range=medium_term`
5. Return a unified response shape

**Response shape:**
```ts
{
  isPlaying: boolean;
  current: {
    title: string;
    artist: string;
    albumArt: string;  // URL
  } | null;
  topTracks: Array<{
    title: string;
    artist: string;
  }>; // always 3 items (limit=3 in API call)
}
```

Album art URL: use `images[2].url` (64px thumbnail) from the Spotify track object — displayed at 48×48px.

**Environment variables (Netlify dashboard):**
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

### Frontend Hook

**File:** `src/hooks/useSpotify.ts`

- Fetches `/.netlify/functions/spotify` on mount
- Polls every 60 seconds unconditionally (covers the case where the user starts playing a track mid-visit)
- When `isPlaying` is true, the interval tightens to 30 seconds for a more responsive now-playing display
- Uses `useEffect` cleanup to clear the interval on unmount (no memory leaks)
- Exposes `{ isPlaying, current, topTracks, loading, error }`

### Component

**File:** `src/layouts/sections/Beyond.tsx`

- Consumes `useSpotify` hook
- Renders the 3-tile bento grid described above
- Framer Motion stagger animation (matching existing section pattern)
- **Loading state:** Tile 1 renders with reduced opacity (`opacity-40`) and no content — a subtle dim rather than a skeleton, keeping the grid layout intact
- **Error state:** Tile 1 remains in the grid (preserving the 2-row span) but shows a muted message: "Couldn't connect to Spotify" — Tiles 2 and 3 render normally

---

## Constants

Add to `src/constants/index.tsx`:

```ts
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

---

## Spotify Setup (one-time manual step)

Before deployment, the developer must:

1. Create a Spotify app at [developer.spotify.com](https://developer.spotify.com)
2. Obtain `client_id` and `client_secret`
3. Run the OAuth Authorization Code flow once to get a `refresh_token` with scopes: `user-read-currently-playing user-top-read`
4. Store all three values in Netlify environment variables

---

## Styling Note

Tile styles use Tailwind utility classes, not custom class names. The shorthand used in this spec maps as follows:
- `tile-dark` → `bg-ink border border-amber/[0.08]`
- `tile-amber` → `bg-amber/[0.08] border border-amber/[0.18]`
- `tile-muted` → `bg-amber/[0.07] border border-ink/[0.07]`

These match the exact values used in `Hero.tsx`.

## Netlify Function Setup

Add a `netlify.toml` at the project root (or update if it exists) with:

```toml
[functions]
  node_bundler = "esbuild"
```

This ensures TypeScript in `netlify/functions/spotify.ts` is compiled correctly at deploy time.

## Files Changed / Created

| File | Change |
|------|--------|
| `src/layouts/sections/Beyond.tsx` | New section component |
| `src/layouts/sections/index.ts` | Export `Beyond` |
| `src/hooks/useSpotify.ts` | New hook |
| `netlify/functions/spotify.ts` | New Netlify Function |
| `src/constants/index.tsx` | Add `beyond` constant, add menu entry |
| `src/App.tsx` | Add `<SnapSection id="beyond"><Beyond /></SnapSection>` |
| `src/hooks/useActiveSection.ts` | Add `"beyond"` to `SECTION_IDS` array (between `"projects"` and `"contact"`) |

---

## Out of Scope

- Actual photography images (simple passion card only)
- Spotify playback controls
- Linking to Spotify profile or tracks
