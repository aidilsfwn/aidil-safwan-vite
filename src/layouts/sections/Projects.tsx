import { useEffect, useRef } from "react";
import { useKeenSlider, KeenSliderInstance } from "keen-slider/react";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";

import { projects } from "../../constants";
import { SectionWrapper } from "../../components";

import "keen-slider/keen-slider.min.css";

export const Projects = () => {
  const timer = useRef<number | null>(null);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 24 }, // Adjusted spacing to better fit 3 cards
      },
    },
    created(slider) {
      autoPlay(slider);
    },
  });

  const autoPlay = (slider: KeenSliderInstance) => {
    clearInterval(timer.current!);
    timer.current = setInterval(() => {
      if (slider) {
        slider.next();
      }
    }, 4000);
  };

  useEffect(() => {
    return () => clearInterval(timer.current!);
  }, []);

  return (
    <SectionWrapper id="projects" className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-slate-200">Projects</h2>
      <div className="flex flex-row gap-x-4 items-center">
        <button
          onClick={() => instanceRef.current?.prev()}
          className="hidden md:flex flex-none h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-lg"
        >
          <ChevronLeft size={20} />
        </button>

        <div ref={sliderRef} className="keen-slider py-10 min-w-0">
          {projects.map((project, index) => (
            <div
              key={index}
              className="keen-slider__slide bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/30 transition-all hover:bg-slate-800/50 flex flex-col h-full"
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="h-32 w-full object-cover rounded-xl mb-6 border border-slate-700/50"
              />
              <h3 className="text-xl font-semibold text-indigo-400 mb-2 text-center">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm mb-6 text-center line-clamp-3 flex-grow leading-relaxed">
                {project.description}
              </p>
              <div className="flex justify-center gap-3 mb-6 flex-wrap">
                {/* App Store & Play Store Logic */}
                {(project.appStoreUrl || project.playStoreUrl) ? (
                  <>
                    {project.appStoreUrl && (
                      <a
                        href={project.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full transition-colors border border-slate-700"
                      >
                         <img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg" alt="Apple" className="w-3 h-3" />
                        App Store
                      </a>
                    )}
                    {project.playStoreUrl && (
                      <a
                        href={project.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full transition-colors border border-slate-700"
                      >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" alt="Android" className="w-3 h-3" />
                         Play Store
                      </a>
                    )}
                  </>
                ) : (
                  /* Web Project Logic */
                  project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-full transition-colors shadow-lg shadow-indigo-500/20"
                    >
                      <ExternalLink size={14} />
                      Website
                    </a>
                  )
                )}

                {/* Code Button */}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full transition-colors border border-slate-700"
                  >
                    <Github size={14} />
                    Code
                  </a>
                )}
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-slate-800 text-slate-400 text-[10px] px-2.5 py-1 rounded-full border border-slate-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => instanceRef.current?.next()}
          className="hidden md:flex flex-none h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-lg"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </SectionWrapper>
  );
};
