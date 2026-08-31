import { motion } from "framer-motion";
import { Activity, Headphones, Radio } from "lucide-react";
import { beyond } from "../../constants";
import { useSpotify } from "../../hooks/useSpotify";

function SpotifySignal() {
  const { isPlaying, current, recentStatus, topTracks, loading, error } = useSpotify();
  return (
    <section className={`spotify-signal ${isPlaying ? "is-live" : ""}`} aria-label="Spotify listening signal" aria-busy={loading}>
      <header><span className="signal-pulse" aria-hidden="true" /><p>{isPlaying ? "Live / Now playing" : "Spotify / Last played"}</p><Headphones aria-hidden="true" /></header>
      <div className="spotify-signal__current">
        <div className="album-frame">{current?.albumArt ? <img src={current.albumArt} width="180" height="180" alt={`Album art for ${current.title}`} /> : <Radio aria-hidden="true" />}</div>
        <div>{loading ? <><span className="loading-line" /><span className="loading-line loading-line--short" /></> : error ? <><h3>Signal unavailable</h3><p>Couldn't connect to Spotify</p></> : current ? <><h3>{current.title}</h3><p>{current.artist}</p><small>{isPlaying ? "Listening now" : "Last played"}</small></> : recentStatus === "authorization_required" ? <><h3>History not connected</h3><p>Spotify needs permission to share recent plays</p></> : <><h3>Quiet channel</h3><p>No recent plays yet</p></>}</div>
      </div>
      <div className="top-tracks"><p>Top tracks · last 4 weeks</p>{topTracks.length ? <ol>{topTracks.map((track) => <li key={`${track.title}-${track.artist}`}><span>{track.title}</span><small>{track.artist}</small></li>)}</ol> : <p className="top-tracks__empty">Top-three signal pending</p>}</div>
      <footer><Activity aria-hidden="true" /> via Spotify API</footer>
    </section>
  );
}

export function Beyond() {
  return (
    <div className="off-duty-board">
      <header className="section-heading"><div><p className="eyebrow">06 / Off-duty signals</p><h2>Beyond the code.</h2></div><p className="section-stat">Off the clock</p></header>
      <div className="off-duty-board__grid"><SpotifySignal /><motion.div className="loyalty-channels" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><p className="signal-label">Loyalty channels</p>{beyond.teams.map((team) => <article key={team.name}><span aria-hidden="true">{team.icon}</span><div><h3>{team.name}</h3><p>{team.league} · {team.tagline}</p></div></article>)}</motion.div><div className="field-notes"><p className="signal-label">Field notes</p>{([ ["I play", beyond.play], ["I watch", beyond.watch], ["Also", beyond.also] ] as const).map(([label, values]) => <div key={label}><span>{label}</span><p>{values.join(" · ")}</p></div>)}</div></div>
    </div>
  );
}
