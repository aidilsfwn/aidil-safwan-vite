import { ReactNode } from "react";

export const TimelineItem = ({
  children,
  isLast,
}: {
  children: ReactNode;
  isLast: boolean;
}) => (
  <div className="relative pl-8 pb-8">
    {!isLast && (
      <div className="absolute top-6 left-3 h-full w-0.5 bg-slate-800" />
    )}
    <div className="absolute top-5 left-0 w-6 h-6 rounded-full border-4 border-slate-900 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
    {children}
  </div>
);

export const Timeline = ({ children }: { children: ReactNode }) => {
  return <div className="relative">{children}</div>;
};
