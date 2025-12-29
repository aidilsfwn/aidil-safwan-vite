import { Calendar } from "lucide-react";

import { education } from "../../constants";
import { Timeline, TimelineItem, SectionWrapper } from "../../components";

export const Education = () => {
  return (
    <SectionWrapper id="education" className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-slate-200">Education</h2>
      <Timeline>
        {education.map((edu, index) => (
          <TimelineItem key={index} isLast={index === education.length - 1}>
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all hover:bg-slate-800/50">
              <h3 className="text-xl font-semibold text-indigo-400 mb-1">
                {edu.degree}
              </h3>
              <h4 className="text-lg font-medium text-slate-300 mb-2">
                {edu.institution}
              </h4>
              <div className="flex items-center text-slate-500 mb-4 text-sm">
                <Calendar size={14} className="mr-2" />
                <span>{edu.period}</span>
              </div>
              {edu.details && (
                <p className="mb-3 text-slate-400 leading-relaxed">
                  {edu.details}
                </p>
              )}
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </SectionWrapper>
  );
};
