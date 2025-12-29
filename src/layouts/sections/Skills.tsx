import { skills } from "../../constants";
import { SectionWrapper } from "../../components";

export const Skills = () => {
  return (
    <SectionWrapper id="skills" className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-slate-200">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(skills).map(([category, items]) => (
          <div
            key={category}
            className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/30 transition-colors group"
          >
            <h3 className="text-xl font-semibold text-indigo-400 mb-4 group-hover:text-indigo-300 transition-colors">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((skill, index) => (
                <span
                  key={index}
                  className="bg-slate-800/80 text-slate-300 border border-slate-700/50 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-indigo-500/20 hover:text-indigo-200 hover:border-indigo-500/30 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};
