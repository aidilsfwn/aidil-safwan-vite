import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "../../constants";

type Tab = "professional" | "personal";

const FeaturedCard = ({ project }: { project: Project }) => (
  <div className="bg-ink rounded-xl overflow-hidden flex flex-col md:h-full">
    {/* Image area */}
    <div className="h-[100px] md:h-[110px] bg-ink flex items-center justify-center relative flex-shrink-0 overflow-hidden">
      {project.image ? (
        <>
          {/* Blurred backdrop — same image, scaled up, blurred, dimmed */}
          <img
            src={project.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-150 blur-2xl opacity-30"
          />
          {/* Foreground image — contained, natural proportions */}
          <img
            src={project.image}
            alt={project.title}
            className="relative z-10 h-[72px] w-[72px] object-cover rounded-[22%] drop-shadow-xl"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement)
                .closest(".image-area")
                ?.classList.add("no-image");
            }}
          />
        </>
      ) : (
        <span className="text-5xl opacity-20">📁</span>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink pointer-events-none z-20" />

      {/* Category badge */}
      <span className="absolute top-2.5 left-2.5 z-30 font-sans text-[9px] font-bold text-ink bg-amber px-2 py-0.5 rounded-[3px] tracking-[0.08em] uppercase">
        {project.tech[0]}
      </span>

      {/* Links */}
      <div className="absolute top-2.5 right-2.5 z-30 flex gap-1.5">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-sans text-[9px] font-bold text-cream bg-ink/60 backdrop-blur-sm px-2 py-1 rounded-[3px] border border-cream/10 hover:bg-ink/80 transition-colors"
          >
            Live <ArrowUpRight className="w-3 h-3" />
          </a>
        )}
        {project.appStoreUrl && (
          <a
            href={project.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-sans text-[9px] font-bold text-cream bg-ink/60 backdrop-blur-sm px-2 py-1 rounded-[3px] border border-cream/10 hover:bg-ink/80 transition-colors"
          >
            App Store <ArrowUpRight className="w-3 h-3" />
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-sans text-[9px] font-bold text-cream bg-ink/60 backdrop-blur-sm px-2 py-1 rounded-[3px] border border-cream/10 hover:bg-ink/80 transition-colors"
          >
            Code <ArrowUpRight className="w-3 h-3" />
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
        {project.isArchived && project.archivedNote && (
          <p className="font-sans text-[10px] text-amber/60 mt-1 italic">
            {project.archivedNote}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5 mt-4">
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
              aria-pressed={tab === t}
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
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-3 overflow-y-auto md:overflow-hidden">
        {/* Featured card — flex on mobile, absolute on desktop */}
        <div className="flex flex-col md:relative md:min-h-0">
          <AnimatePresence mode="wait">
            {featured && (
              <motion.div
                key={featured.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:absolute md:inset-0"
              >
                <FeaturedCard project={featured} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Project list — all items always rendered, active one highlighted */}
        <div className="flex flex-col gap-2 md:overflow-y-auto scrollbar-thin">
          {filtered.map((project) => {
            const isActive = project.id === featured?.id;
            return (
              <button
                key={project.id}
                onClick={() => setFeaturedId(project.id)}
                className={`flex gap-3 items-center rounded-xl px-3 py-2.5 text-left transition-all flex-shrink-0 group border ${
                  isActive
                    ? "border-amber/40 bg-amber/[0.08]"
                    : "border-ink/[0.07] bg-ink/[0.03] hover:border-amber/30 hover:bg-amber/[0.06]"
                }`}
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
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {project.tech.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="font-sans text-[8px] font-semibold text-ink/40 bg-ink/[0.05] px-1.5 py-0.5 rounded-[2px]"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 5 && (
                      <span className="font-sans text-[8px] font-semibold text-ink/30 px-1 py-0.5">
                        +{project.tech.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
