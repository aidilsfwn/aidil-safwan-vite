import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, FolderKanban, Home, Menu, Send, X } from "lucide-react";
import { scrollToSection, useActiveSection } from "../hooks/useActiveSection";
import { navigationGroups, sectionLinks, type NavigationItem } from "./navigation";

const primary = [
  { id: "about", label: "About", icon: Home },
  { id: "experience", label: "Career", icon: BriefcaseBusiness },
  { id: "projects", label: "Work", icon: FolderKanban },
  { id: "contact", label: "Contact", icon: Send },
] as const;

function selectItem(item: NavigationItem, close: () => void) {
  if ("projectId" in item) window.dispatchEvent(new CustomEvent("portfolio:select-project", { detail: { id: item.projectId, category: item.category } }));
  scrollToSection(item.id);
  close();
}

export function CommandNavigation({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const active = useActiveSection();
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const tabletTriggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => {
      const trigger = window.matchMedia("(min-width: 768px)").matches ? tabletTriggerRef.current : mobileTriggerRef.current;
      trigger?.focus();
    }, 0);
  }, [setOpen]);

  useEffect(() => {
    if (!open) return;
    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>("button, a[href]");
    focusable?.[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close, open]);

  return (
    <>
      <header className="tablet-command">
        <a href="#about" onClick={(event) => { event.preventDefault(); scrollToSection("about"); }}><strong>Aidil Safwan</strong><span>Warm Engineering Studio</span></a>
        <button ref={tabletTriggerRef} type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="workspace-drawer"><Menu aria-hidden="true" /> Explorer</button>
      </header>
      <nav className="command-dock" aria-label="Primary navigation">
        {primary.map((item) => {
          const Icon = item.icon;
          return <button type="button" key={item.id} className={active === item.id ? "is-active" : ""} aria-current={active === item.id ? "location" : undefined} onClick={() => scrollToSection(item.id)}><Icon aria-hidden="true" /><span>{item.label}</span></button>;
        })}
        <button ref={mobileTriggerRef} type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="workspace-drawer"><Menu aria-hidden="true" /><span>More</span></button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div className="drawer-layer" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
            <motion.div id="workspace-drawer" ref={drawerRef} className="workspace-drawer" role="dialog" aria-modal="true" aria-label="Portfolio explorer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
              <div className="workspace-drawer__header"><span><i aria-hidden="true" /> workspace / aidilsfwn</span><button type="button" onClick={close} aria-label="Close explorer"><X aria-hidden="true" /></button></div>
              <nav aria-label="Full portfolio explorer">
                {navigationGroups.map((group) => (
                  <div className="drawer-group" key={group.label}>
                    <p><FolderKanban aria-hidden="true" /> {group.label}</p>
                    {group.items.map((item) => <button type="button" key={`${group.label}-${item.file}`} className={active === item.id && !("projectId" in item) ? "is-active" : ""} aria-current={active === item.id && !("projectId" in item) ? "location" : undefined} onClick={() => selectItem(item, close)}><span>{item.file}</span><small>{item.label}</small></button>)}
                  </div>
                ))}
              </nav>
              <div className="drawer-sections" aria-label="Section shortcuts">{sectionLinks.map((item) => <span key={item.id}>{item.label}</span>)}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
