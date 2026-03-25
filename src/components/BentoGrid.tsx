import React from "react";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid = ({ children, className = "" }: BentoGridProps) => (
  <div className={`flex-1 grid p-4 gap-3 ${className}`}>{children}</div>
);
