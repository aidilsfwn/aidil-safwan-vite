import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, FileText, Folder } from "lucide-react";
import { useEffect, useState } from "react";
import { profile, projects } from "../constants";
import { scrollToSection, useActiveSection } from "../hooks/useActiveSection";
import { navigationGroups, type NavigationItem } from "./navigation";

function openItem(item: NavigationItem) {
  if ("projectId" in item) window.dispatchEvent(new CustomEvent("portfolio:select-project", { detail: { id: item.projectId, category: item.category } }));
  scrollToSection(item.id);
}

export function WorkspaceRail() {
  const active = useActiveSection();
  const [expanded, setExpanded] = useState(() => Object.fromEntries(navigationGroups.map((group) => [group.label, true])));
  const [selectedProjectId, setSelectedProjectId] = useState(() => projects.find((project) => project.category === "professional")?.id ?? "");

  useEffect(() => {
    const updateSelectedProject = (event: Event) => {
      setSelectedProjectId((event as CustomEvent<{ id: string }>).detail.id);
    };
    window.addEventListener("portfolio:select-project", updateSelectedProject);
    window.addEventListener("portfolio:project-changed", updateSelectedProject);
    return () => {
      window.removeEventListener("portfolio:select-project", updateSelectedProject);
      window.removeEventListener("portfolio:project-changed", updateSelectedProject);
    };
  }, []);

  return (
    <aside className="workspace-rail" aria-label="Portfolio workspace">
      <div className="identity-lockup">
        <span className="identity-lockup__mark" aria-hidden="true">AS</span>
        <span><strong>{profile.name}</strong><small>PORTFOLIO</small></span>
      </div>
      <nav className="explorer" aria-label="Portfolio explorer">
        <div className="explorer__title"><span className="live-marker" aria-hidden="true" /><span>workspace / aidilsfwn</span></div>
        <div className="explorer__tree">
          {navigationGroups.map((group) => {
            const isExpanded = expanded[group.label];
            return (
              <div className="tree-group" key={group.label}>
                <button className="tree-group__toggle" type="button" aria-expanded={isExpanded} onClick={() => setExpanded((current) => ({ ...current, [group.label]: !current[group.label] }))}>
                  <ChevronDown aria-hidden="true" className={isExpanded ? "" : "is-closed"} /><Folder aria-hidden="true" />{group.label}
                </button>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div className="tree-group__items" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      {group.items.map((item) => {
                        const isProject = "projectId" in item;
                        const selected = isProject
                          ? active === "projects" && selectedProjectId === item.projectId
                          : active === item.id && item.id !== "projects";
                        return (
                          <button type="button" key={`${group.label}-${item.file}`} className={`tree-file ${selected ? "is-active" : ""} ${"projectId" in item ? "is-project" : ""}`} aria-current={selected ? "location" : undefined} aria-label={`Go to ${item.label}`} onClick={() => openItem(item)}>
                            <FileText aria-hidden="true" /><span>{item.file}</span>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </nav>
      <div className="rail-footer">
        <span>{profile.location}</span>
        <div><a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a><a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={profile.resumeUrl} target="_blank" rel="noreferrer">CV ↗</a></div>
      </div>
    </aside>
  );
}
