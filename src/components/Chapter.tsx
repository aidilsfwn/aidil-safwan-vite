import type { ReactNode } from "react";

type SectionId = "about" | "skills" | "experience" | "education" | "projects" | "beyond" | "contact";

export function Chapter({ id, index, label, children }: { id: SectionId; index: string; label: string; children: ReactNode }) {
  return (
    <section id={id} className={`chapter chapter--${id}`}>
      <div className="chapter__marker" aria-hidden="true"><span>{index}</span><span>{label}</span></div>
      <div className="chapter__inner">{children}</div>
    </section>
  );
}
