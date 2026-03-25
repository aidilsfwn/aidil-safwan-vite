import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "../../constants";

type Tab = "professional" | "personal";

const FeaturedCard = ({ project }: { project: Project }) => (
  <div className="bg-ink rounded-xl overflow-hidden flex flex-col h-full">
    {/* Image area */}
    <div className="h-[110px] bg-amber/[0.08] flex items-center justify-center relative flex-shrink-0 overflow-hidden">
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <span className="text-5xl opacity-20">📁</span>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink pointer-events-none" />

      {/* Category badge */}
      <span className="absolute top-2.5 left-2.5 font-sans text-[9px] font-bold text-ink bg-amber px-2 py-0.5 rounded-[3px] tracking-[0.08em] uppercase">
        {project.tech[0]}
      </span>

      {/* Links */}
      <div className="absolute top-2.5 right-2.5 flex gap-1.5">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[9px] font-bold text-cream bg-ink/60 backdrop-blur-sm px-2 py-1 rounded-[3px] border border-cream/10 hover:bg-ink/80 transition-colors"
          >
            Live ↗
          </a>
        )}
        {project.appStoreUrl && (
          <a
            href={project.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[9px] font-bold text-cream bg-ink/60 backdrop-blur-sm px-2 py-1 rounded-[3px] border border-cream/10 hover:bg-ink/80 transition-colors"
          >
            App Store ↗
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[9px] font-bold text-cream bg-ink/60 backdrop-blur-sm px-2 py-1 rounded-[3px] border border-cream/10 hover:bg-ink/80 transition-colors"
          >
            Code ↗
          </a>
        )}
      </div>
    </div>

    {/* Body */}
    <div className="flex-1 flex flex-col justify-between p-4">
      <div>
        <h3 className="font-display text-[18px] font-black text-cream tracking-[-0.3px]">
          {project.title}
        </h3>
        <p className="font-sans text-[11px] text-cream/50 leading-relaxed mt-1.5">
          {project.description}
        </p>
        {project.isArchived && (
          <p className="font-sans text-[10px] text-amber/60 mt-1 italic">
            {project.archivedNote}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-sans text-[9px] font-semibold text-amber bg-amber/[0.1] px-2 py-0.5 rounded-[3px]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export const Projects = () => {
  const [tab, setTab] = useState<Tab>("professional");
  const [featuredId, setFeaturedId] = useState<string | null>(null);

  const filtered = projects.filter((p) => p.category === tab);
  const featured =
    (featuredId ? filtered.find((p) => p.id === featuredId) : null) ??
    filtered[0];
  const list = filtered.filter((p) => p.id !== featured?.id);

  const handleTabChange = (t: Tab) => {
    setTab(t);
    setFeaturedId(null);
  };

  return (
    <div className="flex-1 flex flex-col gap-3 p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0 px-0.5">
        <h2 className="font-display text-[26px] font-black text-ink tracking-[-1px]">
          Projects.
        </h2>
        <div className="flex bg-ink/[0.06] border border-ink/[0.08] rounded-md p-[3px] gap-0.5">
          {(["professional", "personal"] as const).map((t) => (
            <button
              key={t}
              onClick={() => handleTabChange(t)}
              className={`font-sans text-[9px] font-semibold tracking-[0.08em] px-3 py-1.5 rounded-[4px] transition-all capitalize ${
                tab === t
                  ? "bg-ink text-cream"
                  : "text-ink/50 hover:text-ink/70"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content grid */}
      <div className="flex-1 grid grid-cols-[1.3fr_1fr] gap-3 overflow-hidden">
        {/* Featured card with AnimatePresence */}
        <AnimatePresence mode="wait">
          {featured && (
            <motion.div
              key={featured.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <FeaturedCard project={featured} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project list */}
        <div className="flex flex-col gap-2 overflow-y-auto scrollbar-thin">
          <AnimatePresence mode="popLayout">
            {list.map((project, i) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ delay: i * 0.04, duration: 0.2 }}
                onClick={() => setFeaturedId(project.id)}
                className="flex gap-3 items-center bg-ink/[0.03] border border-ink/[0.07] rounded-xl px-3 py-2.5 text-left hover:border-amber/30 hover:bg-amber/[0.06] transition-all flex-shrink-0 group"
              >
                <div className="w-8 h-8 rounded-lg bg-ink/10 flex-shrink-0 flex items-center justify-center text-sm overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                  ) : (
                    "📁"
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-[13px] font-bold text-ink leading-tight truncate">
                    {project.title}
                  </p>
                  <div className="flex gap-1 mt-0.5 flex-wrap">
                    {project.tech.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="font-sans text-[8px] font-semibold text-ink/40 bg-ink/[0.05] px-1.5 py-0.5 rounded-[2px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-amber opacity-0 group-hover:opacity-100 transition-opacity text-sm flex-shrink-0">
                  ↗
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
