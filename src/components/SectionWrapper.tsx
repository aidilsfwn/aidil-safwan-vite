import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
  delay?: number;
}

export const SectionWrapper = ({
  children,
  id,
  className = "",
  delay = 0,
}: SectionWrapperProps) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
};
