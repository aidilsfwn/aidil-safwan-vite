import { motion } from "framer-motion";
import { experiences } from "../../constants";

export function Experience() {
  return (
    <div className="career-signal">
      <header className="section-heading"><div><p className="eyebrow">03 / Career signal</p><h2>Work, in motion.</h2></div><p className="section-stat">6 yrs · 4 companies</p></header>
      <div className="career-path">
        <motion.div className="career-path__line" aria-hidden="true" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
        {experiences.map((experience, index) => {
          const current = index === 0;
          return (
            <motion.article className={`career-station ${current ? "career-station--current document-card" : ""}`} key={experience.company} initial={{ opacity: 0, x: index % 2 ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }}>
              <span className="career-station__node" aria-hidden="true" />
              <div className="career-station__meta"><span>{current ? "Current" : `Station ${String(index + 1).padStart(2, "0")}`}</span><time>{experience.period}</time></div>
              <h3>{experience.company}</h3><p className="career-station__role">{experience.title}</p>
              {experience.description && <p className="career-station__description">{experience.description}</p>}
              {experience.featuredAchievements && <ul className="achievement-list">{experience.featuredAchievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>}
              {experience.tech && <ul className="tag-list" aria-label={`${experience.company} technologies`}>{experience.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul>}
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
