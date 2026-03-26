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
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify token request failed (${res.status}): ${text}`);
  }
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
        const images: { url: string }[] = npData.item.album.images ?? [];
        current = {
          title: npData.item.name,
          artist: npData.item.artists.map((a: { name: string }) => a.name).join(", "),
          albumArt: images.at(-1)?.url ?? null,
        };
      }
    } else if (npRes.status !== 204) {
      // 204 = nothing playing (expected); anything else is unexpected
      throw new Error(`Now-playing request failed (${npRes.status})`);
    }

    // Always fetch top tracks (shown below now-playing)
    const ttRes = await fetch(TOP_TRACKS_URL, { headers });
    if (!ttRes.ok) {
      throw new Error(`Top-tracks request failed (${ttRes.status})`);
    }
    const ttData = await ttRes.json();
    const topTracks = (ttData.items ?? []).map((t: {
      name: string;
      artists: { name: string }[];
    }) => ({
      title: t.name,
      artist: t.artists.map((a) => a.name).join(", "),
    }));

    const corsHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ isPlaying, current, topTracks }),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Spotify function error:", message);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: `Failed to fetch Spotify data: ${message}` }),
    };
  }
};
