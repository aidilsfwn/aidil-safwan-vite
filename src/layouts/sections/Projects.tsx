import { projects } from "../../constants";

export const Projects = () => {
  return (
    <section id="projects" className="mb-16">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
            <p className="mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
