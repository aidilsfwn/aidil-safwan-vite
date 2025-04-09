import { Calendar } from "lucide-react";
import { education } from "../../constants";

export const Education = () => {
  return (
    <section id="education" className="mb-16">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Education</h2>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="max-w-3xl">
            <h3 className="text-xl font-semibold">{edu.degree}</h3>
            <h4 className="text-lg text-gray-600">{edu.institution}</h4>
            <div className="flex items-center text-gray-500">
              <Calendar size={16} className="mr-2" />
              <span>{edu.period}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
