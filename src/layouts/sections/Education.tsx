import { motion, type Variants } from "framer-motion";
import { education } from "../../constants";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const Education = () => {
  const [degree, foundation] = education;
  const degreeCgpa = degree.details.replace("CGPA: ", "");
  const foundCgpa = foundation.details.replace("CGPA: ", "");

  return (
    <div className="flex-1 flex flex-col gap-3 p-4 overflow-y-auto md:overflow-hidden">
      <div className="flex items-baseline justify-between flex-shrink-0 px-0.5">
        <h2 className="font-display text-[26px] font-black text-ink tracking-[-1px]">
          Education.
        </h2>
        <p className="font-sans text-[10px] text-ink/40 tracking-[0.12em] uppercase">
          UiTM · 2014 – 2020
        </p>
      </div>

      <motion.div
        className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] md:grid-rows-[1.3fr_1fr] gap-3"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* Degree hero */}
        <motion.div
          variants={card}
          className="bg-ink rounded-xl p-5 flex flex-col relative overflow-hidden"
        >
          <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-amber/[0.06] blur-3xl pointer-events-none" />
          <div>
            <p className="font-sans text-[9px] font-semibold text-amber tracking-[0.2em] uppercase">
              Bachelor's Degree
            </p>
            <h3 className="font-display text-[18px] font-black text-cream leading-[1.15] tracking-[-0.3px] mt-1.5">
              {degree.degree}
            </h3>
            <p className="font-sans text-[11px] text-cream/50 mt-1">
              {degree.institution}
            </p>
            <p className="font-sans text-[10px] font-semibold text-cream/25 tracking-[0.06em] mt-0.5">
              {degree.period}
            </p>
            <div className="h-px bg-amber/[0.12] my-3" />
            <p className="font-sans text-[9px] font-semibold text-cream/30 tracking-[0.12em] uppercase mb-1">
              CGPA
            </p>
            <span className="font-display text-[32px] font-black text-amber leading-none">
              {degreeCgpa}
            </span>
          </div>
          <div className="mt-auto pt-3">
            <p className="font-sans text-[9px] text-cream/25 leading-relaxed max-w-[140px]">
              FYP: Twitter sentiment analysis — bilingual NLP classification
              model.
            </p>
          </div>
        </motion.div>

        {/* Foundation card */}
        <motion.div
          variants={card}
          className="bg-amber/[0.07] border border-amber/[0.14] rounded-xl p-4 flex flex-col"
        >
          <div>
            <p className="font-sans text-[9px] font-semibold text-amber/60 tracking-[0.18em] uppercase">
              Foundation
            </p>
            <h3 className="font-display text-[15px] font-bold text-ink leading-[1.2] mt-1">
              {foundation.degree}
            </h3>
            <p className="font-sans text-[11px] text-ink/50 mt-1">
              {foundation.institution}
            </p>
            <p className="font-sans text-[10px] font-semibold text-amber/50 mt-0.5">
              {foundation.period}
            </p>
          </div>
          <div className="mt-auto pt-3">
            <p className="font-sans text-[9px] text-ink/40 tracking-[0.1em] uppercase">
              CGPA
            </p>
            <span className="font-display text-[24px] font-black text-amber/70 leading-none">
              {foundCgpa}
            </span>
          </div>
        </motion.div>

        {/* Pivot story — spans full bottom width */}
        <motion.div
          variants={card}
          className="md:col-span-2 bg-amber/[0.07] border border-ink/[0.07] rounded-xl px-5 py-4 flex items-center gap-6"
        >
          <div className="flex-1">
            <p className="font-sans text-[9px] font-semibold text-amber/60 tracking-[0.18em] uppercase mb-1.5">
              The pivot
            </p>
            <p className="font-sans text-[11px] text-ink/60 leading-relaxed">
              Started in{" "}
              <strong className="text-ink font-semibold">
                Electronic Engineering
              </strong>{" "}
              — switched to{" "}
              <strong className="text-ink font-semibold">
                Computer Science
              </strong>{" "}
              when the pull towards coding became impossible to ignore. Never
              looked back.
            </p>
          </div>
          <div className="w-px h-12 bg-amber/[0.2] flex-shrink-0" />
          <div className="flex gap-5 flex-shrink-0">
            {[
              { num: foundCgpa, label: "Foundation" },
              { num: degreeCgpa, label: "Degree" },
              { num: "6yr",      label: "Academia" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-[22px] font-black text-ink leading-none">
                  {num}
                </p>
                <p className="font-sans text-[9px] text-ink/40 tracking-[0.1em] uppercase mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
