import { useActiveSection, scrollToSection } from "../hooks/useActiveSection";
import { profile } from "../constants";

const NAV_ITEMS = [
  { id: "about",      label: "About" },
  { id: "skills",     label: "Skills" },
  { id: "experience", label: "Work" },
  { id: "education",  label: "Education" },
  { id: "projects",   label: "Projects" },
  { id: "contact",    label: "Contact" },
] as const;

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className = "" }: SidebarProps) => {
  const active = useActiveSection();

  return (
    <aside
      className={`w-[160px] flex-shrink-0 bg-ink flex-col justify-between px-[18px] py-6 border-r border-amber/[0.12] z-40 relative overflow-hidden ${className}`}
    >
      {/* Decorative ambient glow */}
      <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-amber/[0.05] blur-3xl pointer-events-none" />

      {/* Brand + Nav */}
      <div>
        <div>
          <p className="font-sans text-[9px] font-semibold text-amber tracking-[0.2em] uppercase">
            Portfolio
          </p>
          <h2 className="font-display text-[20px] font-black text-cream tracking-[-0.5px] leading-[1.05] mt-0.5">
            Aidil
            <br />
            Safwan
          </h2>
        </div>

        <div className="h-px bg-gradient-to-r from-amber/40 to-transparent my-4" />

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`flex items-center gap-2.5 px-2 py-[7px] rounded-md text-left transition-colors ${
                  isActive ? "bg-amber/10" : "hover:bg-amber/5"
                }`}
              >
                <span
                  className={`w-1 h-1 rounded-full flex-shrink-0 transition-all ${
                    isActive
                      ? "bg-amber shadow-[0_0_5px_rgba(201,133,42,0.6)]"
                      : "bg-cream/20"
                  }`}
                />
                <span
                  className={`font-sans text-[9px] tracking-[0.1em] uppercase transition-colors ${
                    isActive ? "text-cream font-semibold" : "text-cream/30"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom — availability + social links */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
          <span className="font-sans text-[10px] text-cream/40">
            Open to work
          </span>
        </div>
        <div className="flex gap-2.5">
          {[
            { label: "GH", href: profile.githubUrl },
            { label: "LI", href: profile.linkedinUrl },
            { label: "CV", href: profile.resumeUrl },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[9px] font-semibold text-cream/25 tracking-[0.1em] uppercase hover:text-amber/70 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};
