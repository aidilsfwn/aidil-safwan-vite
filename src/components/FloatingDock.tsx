import { Home, User, Code, Briefcase, Mail, GraduationCap } from "lucide-react";
import { useActiveSection, scrollToSection } from "../hooks/useActiveSection";

const navItems = [
  { id: "about",      icon: Home,          label: "About" },
  { id: "skills",     icon: User,          label: "Skills" },
  { id: "experience", icon: Briefcase,     label: "Work" },
  { id: "education",  icon: GraduationCap, label: "Edu" },
  { id: "projects",   icon: Code,          label: "Projects" },
  { id: "contact",    icon: Mail,          label: "Contact" },
];

interface FloatingDockProps {
  className?: string;
}

export const FloatingDock = ({ className = "" }: FloatingDockProps) => {
  const active = useActiveSection();

  return (
    <nav className={`w-full bg-ink/95 backdrop-blur-xl border-t border-amber/[0.08] ${className}`} style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="flex items-center w-full h-14 px-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            aria-label={item.label}
            aria-current={active === item.id ? "page" : undefined}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-2 rounded-lg transition-colors ${
              active === item.id
                ? "text-amber"
                : "text-cream/30 active:text-cream/60"
            }`}
          >
            <item.icon size={17} strokeWidth={active === item.id ? 2.5 : 1.75} />
            <span className="font-sans text-[8px] tracking-[0.06em] uppercase">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};
