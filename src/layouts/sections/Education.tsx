import { Calendar } from "lucide-react";

import { education } from "../../constants";
import { Timeline, TimelineItem } from "../../components";

export const Education = () => {
  return (
    <section id="education" className="mb-10">
      <h2 className="text-indigo-700 border-indigo-200 text-2xl font-bold mb-10 border-b pb-2">
        Education
      </h2>
      <Timeline>
        {education.map((edu, index) => (
          <TimelineItem key={index} isLast={index === education.length - 1}>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-indigo-600">
                {edu.degree}
              </h3>
              <h4 className="text-lg font-medium text-gray-700">
                {edu.institution}
              </h4>
              <div className="flex items-center text-gray-500 mb-3">
                <Calendar size={16} className="mr-2" />
                <span>{edu.period}</span>
              </div>
              {edu.details && (
                <p className="mb-3 text-gray-600">{edu.details}</p>
              )}
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </section>
  );
};
