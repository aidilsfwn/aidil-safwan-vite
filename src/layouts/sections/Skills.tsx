import { motion, type Variants } from "framer-motion";
import { skills } from "../../constants";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const Skills = () => (
  <div className="md:flex-1 flex flex-col gap-3 p-4 overflow-y-auto md:overflow-hidden">
    <div className="flex items-baseline justify-between flex-shrink-0 px-0.5">
      <h2 className="font-display text-[26px] font-black text-ink tracking-[-1px]">
        Craft.
      </h2>
      <p className="font-sans text-[10px] text-ink/40 tracking-[0.12em] uppercase">
        What I build with
      </p>
    </div>

    <motion.div
      className="md:flex-1 min-h-0 grid grid-cols-2 md:grid-cols-[1.7fr_1fr] md:grid-rows-2 gap-3"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {/* Frontend + Mobile hero — spans full height */}
      <motion.div
        variants={card}
        className="col-span-2 md:col-span-1 md:row-span-2 bg-ink rounded-xl p-5 flex flex-col justify-between relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber/[0.06] blur-3xl pointer-events-none" />
        <div>
          <p className="font-sans text-[9px] font-semibold text-amber tracking-[0.2em] uppercase">
            ↗ Core Expertise
          </p>
          <h3 className="font-display text-[22px] font-black text-cream leading-none tracking-[-0.5px] mt-1.5 mb-4">
            Frontend &<br />
            Mobile
          </h3>

          <div className="flex flex-col gap-4">
            {/* Core row */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <p className="font-sans text-[9px] font-semibold text-cream/30 tracking-[0.16em] uppercase">
                  Core
                </p>
                <div className="flex-1 h-px bg-amber/[0.1]" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.core.map((s) => (
                  <span
                    key={s}
                    className="font-sans text-[10px] font-semibold text-amber/80 bg-amber/[0.08] border border-amber/[0.15] px-2.5 py-1 rounded-[3px]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Web row */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <p className="font-sans text-[9px] font-semibold text-cream/30 tracking-[0.16em] uppercase">
                  Web
                </p>
                <div className="flex-1 h-px bg-amber/[0.1]" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.web.map((s) => (
                  <span
                    key={s}
                    className="font-sans text-[10px] font-semibold text-amber bg-amber/[0.15] border border-amber/[0.25] px-2.5 py-1 rounded-[3px]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile row */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <p className="font-sans text-[9px] font-semibold text-cream/30 tracking-[0.16em] uppercase">
                  Mobile
                </p>
                <div className="flex-1 h-px bg-amber/[0.1]" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.mobile.map((s) => (
                  <span
                    key={s}
                    className="font-sans text-[10px] font-semibold text-cream/60 bg-cream/[0.07] border border-cream/[0.1] px-2.5 py-1 rounded-[3px]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="font-sans text-[10px] text-cream/30 leading-relaxed border-t border-amber/[0.1] pt-3 mb-2">
            Same component mindset, two platforms. Shipped to production across
            both.
          </p>
          <div className="flex justify-between items-end">
            <span className="font-display text-[44px] font-black text-amber/[0.08] leading-none">
              {skills.core.length + skills.web.length + skills.mobile.length}
            </span>
            <div className="flex gap-1.5">
              <span className="font-sans text-[9px] font-bold text-amber/70 bg-amber/[0.08] border border-amber/[0.15] px-2 py-1 rounded-[3px]">
                Core
              </span>
              <span className="font-sans text-[9px] font-bold text-amber bg-amber/[0.12] px-2 py-1 rounded-[3px]">
                Web
              </span>
              <span className="font-sans text-[9px] font-bold text-cream/40 border border-cream/[0.15] px-2 py-1 rounded-[3px]">
                Mobile
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Backend card */}
      <motion.div
        variants={card}
        className="bg-amber/[0.07] border border-amber/[0.14] rounded-xl p-4 flex flex-col justify-between"
      >
        <div>
          <p className="font-sans text-[9px] font-semibold text-amber/60 tracking-[0.18em] uppercase">
            Backend
          </p>
          <h3 className="font-display text-[15px] font-bold text-ink mt-0.5 mb-2">
            Server-side
          </h3>
          <div className="flex flex-wrap gap-1">
            {skills.backend.map((s) => (
              <span
                key={s}
                className="font-sans text-[9px] font-semibold text-ink/60 bg-ink/[0.05] px-1.5 py-0.5 rounded-[2px]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <p className="font-sans text-[9px] text-ink/30">
          Supporting the frontend. Properly.
        </p>
      </motion.div>

      {/* DevOps card */}
      <motion.div
        variants={card}
        className="bg-amber/[0.07] border border-ink/[0.07] rounded-xl p-4 flex flex-col justify-between"
      >
        <div>
          <p className="font-sans text-[9px] font-semibold text-amber/60 tracking-[0.18em] uppercase">
            DevOps & Infra
          </p>
          <h3 className="font-display text-[15px] font-bold text-ink mt-0.5 mb-2">
            Toolchain
          </h3>
          <div className="flex flex-wrap gap-1">
            {skills.devops.map((s) => (
              <span
                key={s}
                className="font-sans text-[9px] font-semibold text-ink/60 bg-ink/[0.05] px-1.5 py-0.5 rounded-[2px]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <p className="font-sans text-[9px] text-ink/30">Ship it. Reliably.</p>
      </motion.div>
    </motion.div>
  </div>
);
