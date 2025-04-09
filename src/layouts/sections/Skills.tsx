import { skills } from "../../constants";

export const Skills = () => {
  return (
    <section id="skills" className="mb-16">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Skills</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-gray-200 rounded-full px-4 py-2 text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};
