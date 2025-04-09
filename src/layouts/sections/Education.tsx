import { Calendar } from "lucide-react";

import { education } from "../../constants";
import { Timeline, TimelineItem } from "../../components";

export const Education = () => {
  return (
    <section id="education" className="mb-16">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Education</h2>
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
              {edu.achievements && (
                <div className="mt-3">
                  <h5 className="font-medium text-gray-700 mb-2">
                    Achievements:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </section>
  );
};
