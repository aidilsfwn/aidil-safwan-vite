import { Home, User, Code, Briefcase, Mail, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { useActiveSection, scrollToSection } from "../hooks/useActiveSection";

const navItems = [
  { id: "about",      icon: Home,          label: "About" },
  { id: "skills",     icon: User,          label: "Skills" },
  { id: "experience", icon: Briefcase,     label: "Work" },
  { id: "education",  icon: GraduationCap, label: "Education" },
  { id: "projects",   icon: Code,          label: "Projects" },
  { id: "contact",    icon: Mail,          label: "Contact" },
];

interface FloatingDockProps {
  className?: string;
}

export const FloatingDock = ({ className = "" }: FloatingDockProps) => {
  const active = useActiveSection();

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 ${className}`}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center gap-1.5 px-4 py-3 rounded-full bg-ink/80 backdrop-blur-xl border border-amber/10 shadow-2xl"
      >
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative p-2.5 rounded-full transition-all duration-300 group ${
                isActive
                  ? "text-cream bg-amber/20"
                  : "text-cream/40 hover:text-cream hover:bg-amber/10"
              }`}
            >
              <item.icon size={17} />
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-ink text-cream text-[10px] rounded border border-amber/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="dock-active-pill"
                  className="absolute inset-0 bg-amber/20 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
};
