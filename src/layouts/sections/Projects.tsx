import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Archive, ChevronRight } from "lucide-react";
import { projects, type Project } from "../../constants";

type Tab = "professional" | "personal";

function ProjectActions({ project }: { project: Project }) {
  const actions = [
    project.demoUrl && { href: project.demoUrl, label: "Website" },
    project.repoUrl && { href: project.repoUrl, label: "Repository" },
    project.appStoreUrl && { href: project.appStoreUrl, label: "App Store" },
    project.playStoreUrl && { href: project.playStoreUrl, label: "Play Store" },
  ].filter(Boolean) as { href: string; label: string }[];
  if (!actions.length) return <span className="no-destination">No active destination</span>;
  return <div className="project-actions">{actions.map((action) => <a key={action.label} href={action.href} target="_blank" rel="noreferrer">{action.label}<ArrowUpRight aria-hidden="true" /></a>)}</div>;
}

function TagList({ project }: { project: Project }) {
  const visible = project.tech.slice(0, 8);
  const extra = project.tech.slice(8);
  return (
    <div className="dossier-tags">
      <ul className="tag-list" aria-label={`${project.title} technologies`}>{visible.map((tech) => <li key={tech}>{tech}</li>)}</ul>
      {extra.length > 0 && <details><summary>Show all {project.tech.length} technologies</summary><ul className="tag-list">{extra.map((tech) => <li key={tech}>{tech}</li>)}</ul></details>}
    </div>
  );
}

function ProjectDossier({ project }: { project: Project }) {
  return (
    <motion.article className="project-dossier document-card" key={project.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className={`project-dossier__media ${project.image ? "" : "is-type-only"}`}>
        {project.image ? <img src={project.image} width="560" height="360" loading="lazy" alt={`${project.title} project artwork`} /> : <span aria-hidden="true">{project.id}</span>}
        <p>{project.category} / selected</p>
      </div>
      <div className="project-dossier__body">
        <div className="project-dossier__index">case / {String(projects.indexOf(project) + 1).padStart(2, "0")}</div>
        <h3>{project.title}</h3><p>{project.description}</p>
        {project.isArchived && project.archivedNote && <div className="archive-note"><Archive aria-hidden="true" /><span>{project.archivedNote}</span></div>}
        <TagList project={project} /><ProjectActions project={project} />
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [tab, setTab] = useState<Tab>("professional");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const filtered = projects.filter((project) => project.category === tab);
  const selected = (selectedId ? filtered.find((project) => project.id === selectedId) : undefined) ?? filtered[0];

  useEffect(() => {
    const onSelect = (event: Event) => {
      const detail = (event as CustomEvent<{ id: string; category: Tab }>).detail;
      setTab(detail.category); setSelectedId(detail.id);
    };
    window.addEventListener("portfolio:select-project", onSelect);
    return () => window.removeEventListener("portfolio:select-project", onSelect);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("portfolio:project-changed", { detail: { id: selected.id, category: selected.category } }));
  }, [selected.id, selected.category]);

  return (
    <div className="work-ledger">
      <header className="section-heading work-ledger__heading"><div><p className="eyebrow">05 / Selected work</p><h2>Shipped products.</h2></div><div className="project-tabs" role="group" aria-label="Project category">{(["professional", "personal"] as const).map((category) => <button type="button" key={category} aria-pressed={tab === category} onClick={() => { setTab(category); setSelectedId(null); }}>{category}<span>{projects.filter((project) => project.category === category).length}</span></button>)}</div></header>
      <div className="work-ledger__grid">
        <div className="project-index" aria-label={`${tab} projects`}>
          {filtered.map((project, index) => {
            const active = selected.id === project.id;
            return <button type="button" key={project.id} className={active ? "is-active" : ""} aria-pressed={active} onClick={() => setSelectedId(project.id)}><span className="project-index__number">{String(index + 1).padStart(2, "0")}</span><span className="project-index__copy"><small>{project.isArchived ? "Archived" : project.tech[0]}</small><strong>{project.title}</strong></span><ChevronRight aria-hidden="true" /></button>;
          })}
        </div>
        <AnimatePresence mode="wait"><ProjectDossier project={selected} /></AnimatePresence>
      </div>
    </div>
  );
}
