import { useEffect, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { projects } from "../../constants";

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
        slides: { perView: 3, spacing: 32 },
      },
    },
    created(slider) {
      autoPlay(slider);
    },
  });

  const autoPlay = (slider: any) => {
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
    <section id="projects" className="mb-6">
      <h2 className="text-indigo-700 border-indigo-200 text-2xl font-bold border-b pb-2">
        Projects
      </h2>
      <div className="flex flex-row gap-x-4">
        <button
          onClick={() => instanceRef.current?.prev()}
          className="h-auto bg-background-surface shadow p-2 my-20 rounded-full hover:bg-indigo-100"
        >
          <ChevronLeft size={20} className="text-indigo-400" />
        </button>

        <div ref={sliderRef} className="keen-slider py-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="keen-slider__slide bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 overflow-visible"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-20 object-contain rounded-md mb-4 border border-gray-200 place-self-center"
              />
              <h3 className="text-xl font-semibold text-indigo-600 mb-1 text-center">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 text-center">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3 justify-center">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full"
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
          className="h-auto bg-background-surface shadow p-2 my-20 rounded-full hover:bg-indigo-100"
        >
          <ChevronRight size={20} className="text-indigo-400" />
        </button>
      </div>
    </section>
  );
};
