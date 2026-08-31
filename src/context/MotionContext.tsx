import { useReducedMotion } from "framer-motion";
import { MotionContext } from "./motion-state";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  return (
    <MotionContext.Provider value={{ shouldAnimate: !prefersReduced }}>
      {children}
    </MotionContext.Provider>
  );
}
