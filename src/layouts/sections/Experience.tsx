import { Calendar } from "lucide-react";
import { experiences } from "../../constants";
import { Timeline, TimelineItem } from "../../components";

export const Experience = () => {
  return (
    <section id="experience" className="mb-16">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Experience</h2>
      <Timeline>
        {experiences.map((exp, index) => (
          <TimelineItem key={index} isLast={index === experiences.length - 1}>
            <div className="bg-background-surface p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-indigo-600">
                {exp.title}
              </h3>
              <h4 className="text-lg font-medium text-gray-700">
                {exp.company}
              </h4>
              <div className="flex items-center text-gray-500 mb-3">
                <Calendar size={16} className="mr-2" />
                <span>{exp.period}</span>
              </div>
              <p className="mb-3 text-gray-600">{exp.description}</p>
              {exp.achievements && (
                <div className="mt-3">
                  <h5 className="font-medium text-gray-700 mb-2">
                    Key Achievements:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {exp.achievements.map((achievement, idx) => (
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
