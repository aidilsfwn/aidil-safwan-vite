import { useContext } from "react";
import { MotionContext, type MotionContextType } from "../context/motion-state";

export function useMotion(): MotionContextType {
  return useContext(MotionContext);
}
