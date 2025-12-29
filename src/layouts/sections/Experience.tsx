import { Calendar } from "lucide-react";

import { experiences } from "../../constants";
import { Timeline, TimelineItem, SectionWrapper } from "../../components";

export const Experience = () => {
  return (
    <SectionWrapper id="experience" className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-slate-200">Experience</h2>
      <Timeline>
        {experiences.map((exp, index) => (
          <TimelineItem key={index} isLast={index === experiences.length - 1}>
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all hover:bg-slate-800/50">
              <h3 className="text-xl font-semibold text-indigo-400 mb-1">
                {exp.title}
              </h3>
              <h4 className="text-lg font-medium text-slate-300 mb-2">
                {exp.company}
              </h4>
              <div className="flex items-center text-slate-500 mb-4 text-sm">
                <Calendar size={14} className="mr-2" />
                <span>{exp.period}</span>
              </div>
              {exp.achievements && (
                <div className="mt-3">
                  <ul className="list-disc pl-5 space-y-2 text-slate-400">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </SectionWrapper>
  );
};
