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
      <div className="absolute top-6 left-3 h-full w-0.5 bg-gray-200" />
    )}
    <div className="absolute top-5 left-0 w-6 h-6 rounded-full border-4 border-white bg-indigo-500 shadow-md" />
    {children}
  </div>
);

export const Timeline = ({ children }: { children: ReactNode }) => {
  return <div className="relative py-4">{children}</div>;
};
