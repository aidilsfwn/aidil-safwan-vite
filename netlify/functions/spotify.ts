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
