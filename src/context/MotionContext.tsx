import { createContext, useContext } from "react";
import { useReducedMotion } from "framer-motion";

interface MotionContextType {
  shouldAnimate: boolean;
}

const MotionContext = createContext<MotionContextType>({ shouldAnimate: true });

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  return (
    <MotionContext.Provider value={{ shouldAnimate: !prefersReduced }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion(): MotionContextType {
  return useContext(MotionContext);
}
