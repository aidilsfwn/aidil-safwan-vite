import React from "react";

type SectionId =
  | "about"
  | "skills"
  | "experience"
  | "education"
  | "projects"
  | "beyond"
  | "contact";

const SECTION_DATA: Record<SectionId, { index: number; label: string }> = {
  about:      { index: 0, label: "01 — About" },
  skills:     { index: 1, label: "02 — Skills" },
  experience: { index: 2, label: "03 — Work" },
  education:  { index: 3, label: "04 — Education" },
  projects:   { index: 4, label: "05 — Projects" },
  beyond:     { index: 5, label: "06 — Beyond" },
  contact:    { index: 6, label: "07 — Contact" },
};

const TOTAL = Object.keys(SECTION_DATA).length;

interface SnapSectionProps {
  id: SectionId;
  children: React.ReactNode;
  dark?: boolean;
}

export const SnapSection = ({ id, children, dark = false }: SnapSectionProps) => {
  const { index, label } = SECTION_DATA[id];

  return (
    <section
      id={id}
      style={{ height: "100dvh", scrollSnapAlign: "start" }}
      className={`flex flex-col md:overflow-hidden ${dark ? "bg-ink" : "bg-cream"}`}
    >
      {/* Snap progress bar */}
      <div
        className={`sticky top-0 z-10 flex-shrink-0 flex items-center gap-1.5 px-5 py-2.5 border-b backdrop-blur-md ${
          dark
            ? "border-amber/[0.08] bg-ink/80"
            : "border-ink/[0.07] bg-cream/80"
        }`}
      >
        {Array.from({ length: TOTAL }, (_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === index
                ? "bg-amber"
                : dark
                ? "bg-cream/10"
                : "bg-ink/10"
            }`}
          />
        ))}
        <span
          className={`ml-2 font-sans text-[10px] tracking-[0.14em] uppercase ${
            dark ? "text-amber/40" : "text-ink/30"
          }`}
        >
          {label}
        </span>
      </div>

      {/* Content slot */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </section>
  );
};
