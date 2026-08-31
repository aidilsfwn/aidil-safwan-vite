import { motion } from "framer-motion";
import { skills } from "../../constants";

const lanes = [
  { key: "core", label: "Core", note: "Entry signal", items: skills.core },
  { key: "web", label: "Web", note: "Primary lane", items: skills.web },
  { key: "mobile", label: "Mobile", note: "Primary lane", items: skills.mobile },
  { key: "backend", label: "Backend", note: "Supporting systems", items: skills.backend },
  { key: "devops", label: "DevOps", note: "Delivery layer", items: skills.devops },
] as const;

export function Skills() {
  return (
    <div className="capability-map">
      <header className="section-heading section-heading--center"><p className="eyebrow">02 / Capability map</p><h2>Craft, connected.</h2><p>What I build with — one toolchain spanning product interfaces, mobile, systems, and delivery.</p></header>
      <motion.div className="capability-map__field" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}>
        <motion.div className="capability-spine" aria-hidden="true" variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.75 } } }} />
        {lanes.map((lane, index) => (
          <motion.article className={`capability-lane capability-lane--${lane.key}`} key={lane.key} variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}>
            <div className="capability-lane__node"><span>{String(index + 1).padStart(2, "0")}</span></div>
            <header><p>{lane.note}</p><h3>{lane.label}</h3></header>
            <ul>{lane.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
