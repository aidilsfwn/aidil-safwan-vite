import { motion, type Variants } from "framer-motion";
import { profile } from "../../constants";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const Hero = () => (
  <motion.div
    className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] md:grid-rows-2 gap-3 p-4 overflow-y-auto md:overflow-hidden"
    variants={stagger}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.4 }}
  >
    {/* Name card — spans full height, dark */}
    <motion.div
      variants={card}
      className="md:row-span-2 bg-ink rounded-xl p-5 flex flex-col justify-between relative overflow-hidden border border-amber/[0.08]"
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber/[0.06] blur-3xl pointer-events-none" />
      <div>
        <p className="font-sans text-[10px] font-semibold text-amber tracking-[0.2em] uppercase">
          ↗ Senior Software Engineer
        </p>
        <h1 className="font-display text-[40px] md:text-[52px] font-black text-cream leading-[0.85] tracking-[-3px] mt-2">
          {profile.name.split(" ")[0]}
          <br />
          {profile.name.split(" ")[1]}
        </h1>
        <div className="h-px w-[55%] bg-gradient-to-r from-amber to-transparent mt-3" />
        <p className="font-sans text-[11px] text-cream/50 leading-relaxed mt-3 md:max-w-[200px]">
          {profile.bio}
        </p>
      </div>
      <div className="flex">
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
            ),
          )}
        </div>
      </div>
      <p className="font-sans text-[11px] text-ink/40">📍 {profile.location}</p>
    </motion.div>
  </motion.div>
);
