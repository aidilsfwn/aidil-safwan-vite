import { motion, type Variants } from "framer-motion";
import { experiences } from "../../constants";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const Experience = () => {
  const [current, ...previous] = experiences;

  return (
    <div className="flex-1 flex flex-col gap-3 p-4 overflow-hidden">
      <div className="flex items-baseline justify-between flex-shrink-0 px-0.5">
        <h2 className="font-display text-[26px] font-black text-ink tracking-[-1px]">
          Work.
        </h2>
        <p className="font-sans text-[10px] text-ink/40 tracking-[0.12em] uppercase">
          6 yrs · 4 companies
        </p>
      </div>

      <motion.div
        className="flex-1 grid grid-cols-[1.2fr_1fr] gap-3 overflow-hidden"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* Current role — full height, dark */}
        <motion.div
          variants={card}
          className="bg-ink rounded-xl p-5 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute -bottom-12 -right-12 w-44 h-44 rounded-full bg-amber/[0.05] blur-3xl pointer-events-none" />
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
              <span className="font-sans text-[9px] font-bold text-amber tracking-[0.2em] uppercase">
                Current
              </span>
            </div>
            <h3 className="font-display text-[20px] font-black text-cream leading-[1.1] tracking-[-0.5px]">
              {current.company}
            </h3>
            <p className="font-sans text-[11px] text-cream/50 mt-0.5">
              {current.title}
            </p>
            <p className="font-sans text-[10px] font-semibold text-cream/25 tracking-[0.08em] mt-0.5">
              {current.period}
            </p>
            <div className="h-px bg-amber/[0.12] my-3" />
            <div className="flex flex-col gap-2">
              {(current.featuredAchievements ?? current.achievements.slice(0, 3)).map(
                (ach, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="w-1 h-1 rounded-full bg-amber flex-shrink-0 mt-1.5" />
                    <p className="font-sans text-[10px] text-cream/50 leading-relaxed">
                      {ach}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="flex items-end justify-between mt-3">
            <div className="flex flex-wrap gap-1">
              {(current.tech ?? []).map((t) => (
                <span
                  key={t}
                  className="font-sans text-[8px] font-semibold text-amber bg-amber/[0.1] px-1.5 py-0.5 rounded-[2px]"
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="font-display text-[34px] font-black text-amber/[0.08] leading-none">
              25
            </span>
          </div>
        </motion.div>

        {/* Previous roles — stacked */}
        <div className="flex flex-col gap-2.5 overflow-hidden">
          {previous.map((exp, i) => (
            <motion.div
              key={exp.company}
              variants={card}
              className={`flex-1 rounded-xl px-4 py-3 flex flex-col gap-1 relative ${
                i === 0
                  ? "bg-amber/[0.05] border border-amber/[0.12]"
                  : "bg-ink/[0.03] border border-ink/[0.07]"
              }`}
            >
              <span className="absolute top-3 right-3 font-display text-[20px] font-black text-amber/[0.08] leading-none">
                {String(i + 2).padStart(2, "0")}
              </span>
              <h4 className="font-display text-[14px] font-bold text-ink leading-tight">
                {exp.company}
              </h4>
              <p className="font-sans text-[10px] text-amber/60">{exp.title}</p>
              <p className="font-sans text-[9px] font-semibold text-ink/30 tracking-[0.06em]">
                {exp.period}
              </p>
              {exp.featuredAchievements?.[0] && (
                <p className="font-sans text-[9px] text-ink/50 leading-relaxed border-t border-ink/[0.06] pt-1.5 mt-0.5">
                  {exp.featuredAchievements[0]}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
