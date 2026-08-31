import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { profile } from "../../constants";
import memoji from "../../assets/memoji.png";
import { scrollToSection } from "../../hooks/useActiveSection";
import { useMotion } from "../../hooks/useMotion";

export function Hero() {
  const { shouldAnimate } = useMotion();
  const reveal = shouldAnimate ? { opacity: 1, y: 22 } : { opacity: 1, y: 0 };
  return (
    <motion.div className="identity-dossier" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.075 } } }}>
      <div className="identity-dossier__main">
        <motion.p className="eyebrow" variants={{ hidden: reveal, visible: { opacity: 1, y: 0 } }}>Senior Software Engineer</motion.p>
        <motion.h1 variants={{ hidden: reveal, visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } } }}>Aidil<br /><em>Safwan</em></motion.h1>
        <motion.div className="identity-signature" variants={{ hidden: reveal, visible: { opacity: 1, y: 0 } }}>
          <span aria-hidden="true">signed / aidil</span>
          <img src={memoji} width="184" height="184" alt="Aidil Safwan memoji" />
        </motion.div>
      </div>
      <motion.aside className="identity-manifest" aria-label="Profile manifest" variants={{ hidden: reveal, visible: { opacity: 1, y: 0 } }}>
        <p className="manifest-label">manifest / 2026</p>
        <p className="hero-bio">{profile.bio}</p>
        <div className="current-role">
          <span>Current station</span>
          <strong>The Access Group</strong>
          <p>Senior Software Engineer · Mar 2025 - Present</p>
        </div>
        <dl className="hero-meta">
          <div><dt>Core stack</dt><dd>React · React Native · TypeScript</dd></div>
          <div><dt>Based</dt><dd><MapPin aria-hidden="true" /><span>{profile.location}</span></dd></div>
        </dl>
        <a className="primary-action" href={profile.resumeUrl} target="_blank" rel="noreferrer">Download Resume <ArrowUpRight aria-hidden="true" /></a>
      </motion.aside>
      <button className="explore-cue" type="button" onClick={() => scrollToSection("skills")}><span>Explore workspace</span><ArrowDown aria-hidden="true" /></button>
    </motion.div>
  );
}
