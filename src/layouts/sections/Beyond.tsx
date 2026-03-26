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
              <div
                key={`${t.title}-${t.artist}`}
                className="flex items-center gap-2"
              >
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
  <div className="flex-1 flex flex-col gap-3 p-4 overflow-y-auto md:overflow-hidden">
    <div className="flex items-baseline justify-between flex-shrink-0 px-0.5">
      <h2 className="font-display text-[26px] font-black text-ink tracking-[-1px]">
        Beyond The Code.
      </h2>
      <p className="font-sans text-[10px] text-ink/40 tracking-[0.12em] uppercase">
        Off the clock
      </p>
    </div>
    <motion.div
      className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] md:grid-rows-2 gap-3 overflow-y-auto md:overflow-hidden"
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
      </motion.div>

      {/* Outside the IDE */}
      <motion.div
        variants={card}
        className="bg-amber/[0.07] border border-ink/[0.07] rounded-xl p-4 flex flex-col"
      >
        <p className="font-sans text-[9px] font-semibold text-ink/50 tracking-[0.18em] uppercase mb-2">
          Outside the IDE
        </p>

        <div className="flex flex-col gap-2">
          <div>
            <p className="font-sans text-[7px] font-bold text-ink/40 tracking-[0.15em] uppercase mb-1">
              I play
            </p>
            <div className="flex flex-wrap gap-1">
              {beyond.play.map((s) => (
                <span
                  key={s}
                  className="font-sans text-[9px] font-semibold text-ink/60 bg-ink/[0.08] px-2 py-0.5 rounded-[3px]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="font-sans text-[7px] font-bold text-ink/40 tracking-[0.15em] uppercase mb-1">
              I watch
            </p>
            <div className="flex flex-wrap gap-1">
              {beyond.watch.map((s) => (
                <span
                  key={s}
                  className="font-sans text-[9px] font-semibold text-ink/60 bg-ink/[0.08] px-2 py-0.5 rounded-[3px]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="font-sans text-[7px] font-bold text-ink/40 tracking-[0.15em] uppercase mb-1">
              Also
            </p>
            <div className="flex flex-wrap gap-1">
              {beyond.also.map((s) => (
                <span
                  key={s}
                  className="font-sans text-[9px] font-semibold text-ink/60 bg-ink/[0.08] px-2 py-0.5 rounded-[3px]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </div>
);
