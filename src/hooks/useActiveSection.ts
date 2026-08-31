import { useEffect, useState } from "react";

const SECTION_IDS = [
  "about",
  "skills",
  "experience",
  "education",
  "projects",
  "beyond",
  "contact",
] as const;

export function useActiveSection(): string {
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { root: container, rootMargin: "-44% 0px -44% 0px", threshold: 0 }
    );

    const elements = SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function scrollToSection(id: string): void {
  const container = document.getElementById("scroll-container");
  const el = document.getElementById(id);
  if (!container || !el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  container.scrollTo({ top: el.offsetTop, behavior: reduced ? "auto" : "smooth" });
  if (window.location.hash !== `#${id}`) {
    window.history.replaceState(null, "", `#${id}`);
  }
}
