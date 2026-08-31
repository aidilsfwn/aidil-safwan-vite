import { createContext } from "react";

export interface MotionContextType {
  shouldAnimate: boolean;
}

export const MotionContext = createContext<MotionContextType>({ shouldAnimate: true });
