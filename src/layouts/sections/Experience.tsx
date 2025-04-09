import { Calendar } from "lucide-react";
import { experiences } from "../../constants";

export const Experience = () => {
  return (
    <section id="experience" className="mb-16">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="max-w-3xl">
            <h3 className="text-xl font-semibold">{exp.title}</h3>
            <h4 className="text-lg text-gray-600">{exp.company}</h4>
            <div className="flex items-center text-gray-500 mb-3">
              <Calendar size={16} className="mr-2" />
              <span>{exp.period}</span>
            </div>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
