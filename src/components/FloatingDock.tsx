import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { Home, User, Code, Briefcase, Mail, GraduationCap, Menu, X } from "lucide-react";
import { useActiveSection, scrollToSection } from "../hooks/useActiveSection";

const navItems = [
  { id: "about",      icon: Home,          label: "About" },
  { id: "skills",     icon: User,          label: "Skills" },
  { id: "experience", icon: Briefcase,     label: "Work" },
  { id: "education",  icon: GraduationCap, label: "Education" },
  { id: "projects",   icon: Code,          label: "Projects" },
  { id: "contact",    icon: Mail,          label: "Contact" },
];

const BUTTON_SIZE = 48;
const EDGE_MARGIN = 20;

interface FloatingDockProps {
  className?: string;
}

export const FloatingDock = ({ className = "" }: FloatingDockProps) => {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const constraintsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  // Track drag distance to distinguish tap from drag
  const dragDelta = useRef(0);

  const snapToEdge = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const vw = window.innerWidth;

    const snapRight = rect.left + BUTTON_SIZE / 2 > vw / 2;
    const targetLeft = snapRight ? vw - EDGE_MARGIN - BUTTON_SIZE : EDGE_MARGIN;
    const dx = targetLeft - rect.left;

    animate(x, x.get() + dx, { type: "spring", stiffness: 400, damping: 35 });
  }, [x]);

  const handleDragStart = useCallback(() => {
    dragDelta.current = 0;
    setOpen(false);
  }, []);

  const handleDrag = useCallback((_: unknown, info: { delta: { x: number; y: number } }) => {
    dragDelta.current += Math.abs(info.delta.x) + Math.abs(info.delta.y);
  }, []);

  const handleDragEnd = useCallback(() => {
    snapToEdge();
  }, [snapToEdge]);

  const handleButtonClick = useCallback(() => {
    if (dragDelta.current < 4) setOpen((prev) => !prev);
  }, []);

  const handleNavClick = useCallback((id: string) => {
    scrollToSection(id);
    setOpen(false);
  }, []);

  return (
    // Full-screen invisible layer — drag is bounded to this
    <div ref={constraintsRef} className={`fixed inset-0 pointer-events-none z-50 ${className}`}>
      <motion.div
        ref={buttonRef}
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.08}
        dragMomentum={false}
        style={{ x, y, position: "absolute", bottom: 32, right: EDGE_MARGIN }}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        className="pointer-events-auto"
      >
        {/* Nav stack — renders above the button */}
        <AnimatePresence>
          {open && (
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 flex flex-col-reverse gap-2 items-center">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 6, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.88 }}
                  transition={{ delay: i * 0.03, duration: 0.18, ease: "easeOut" }}
                  aria-label={item.label}
                  aria-current={active === item.id ? "page" : undefined}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 pl-2.5 pr-3.5 py-2 rounded-full font-sans text-[11px] font-semibold whitespace-nowrap shadow-lg transition-colors ${
                    active === item.id
                      ? "bg-amber text-ink"
                      : "bg-ink/90 backdrop-blur-xl text-cream/80 border border-amber/[0.12]"
                  }`}
                >
                  <item.icon size={13} />
                  {item.label}
                </motion.button>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Main trigger button */}
        <motion.button
          onClick={handleButtonClick}
          whileTap={{ scale: 0.88 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 20 }}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border transition-colors duration-200 ${
            open
              ? "bg-amber border-amber/60"
              : "bg-ink/80 backdrop-blur-xl border-amber/20"
          }`}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={18} className="text-ink" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={18} className="text-cream/70" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </div>
  );
};
