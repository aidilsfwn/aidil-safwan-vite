import { useEffect, useState } from "react";

const SECTION_IDS = [
  "about",
  "skills",
  "experience",
  "education",
  "projects",
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
      { root: container, threshold: 0.5 }
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
  // Scroll the snap container, not the window, for reliable snap behavior
  container.scrollTo({ top: el.offsetTop, behavior: "smooth" });
}
