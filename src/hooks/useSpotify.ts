import { useEffect, useRef, useState } from "react";

export interface SpotifyTrack {
  title: string;
  artist: string;
  albumArt?: string | null;
}

export interface SpotifyState {
  isPlaying: boolean;
  current: SpotifyTrack | null;
  recentStatus: "available" | "empty" | "authorization_required" | "unknown";
  topTracks: Pick<SpotifyTrack, "title" | "artist">[];
  loading: boolean;
  error: boolean;
}

async function fetchSpotify(): Promise<Omit<SpotifyState, "loading" | "error">> {
  const endpoint = "/.netlify/functions/spotify";
  const res = await fetch(endpoint);

  if (!res.ok) throw new Error(`Spotify fetch failed (${res.status})`);
  const data = await res.json();
  return {
    isPlaying: Boolean(data.isPlaying),
    current: data.current ?? null,
    recentStatus: data.recentStatus ?? (data.current ? "available" : "unknown"),
    topTracks: Array.isArray(data.topTracks) ? data.topTracks.slice(0, 3) : [],
  };
}

export function useSpotify(): SpotifyState {
  const [state, setState] = useState<SpotifyState>({
    isPlaying: false,
    current: null,
    recentStatus: "unknown",
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
      intervalId = setTimeout(() => {
        load().then(scheduleNext);
      }, delay);
    }

    load().then(scheduleNext);

    return () => clearTimeout(intervalId);
  }, []);

  return state;
}
