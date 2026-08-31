import { motion } from "framer-motion";
import { education } from "../../constants";

export function Education() {
  const [computerScience, foundation, engineering] = education;
  return (
    <div className="education-route">
      <header className="section-heading"><div><p className="eyebrow">04 / Education path</p><h2>The pivot.</h2></div><p className="section-stat">UiTM · USM · 2014 – 2020</p></header>
      <div className="education-map">
        <motion.div className="education-map__route" aria-hidden="true" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
        <article className="education-station education-station--foundation"><span>01 / Foundation</span><h3>{foundation.degree}</h3><p>{foundation.institution}</p><time>{foundation.period}</time></article>
        <article className="education-station education-station--engineering"><span>02 / Incomplete</span><h3>{engineering.degree}</h3><p>{engineering.institution}</p><time>{engineering.period}</time></article>
        <aside className="pivot-note"><span>The pivot</span><p>Started in <strong>Electronic Engineering</strong> at USM — switched to <strong>Computer Science</strong> at UiTM when the pull towards coding became impossible to ignore. Never looked back.</p></aside>
        <article className="education-station education-station--destination document-card"><span>03 / Bachelor's Degree</span><h3>{computerScience.degree}</h3><p>{computerScience.institution}</p><time>{computerScience.period}</time><div className="fyp-note"><small>Final year project</small><p>FYP: Twitter sentiment analysis — bilingual NLP classification model.</p></div></article>
      </div>
    </div>
  );
}
