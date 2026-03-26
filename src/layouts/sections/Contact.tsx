import { profile } from "../../constants";

export const Contact = () => (
  <div className="flex-1 flex flex-col overflow-hidden">
    {/* Main content */}
    <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-3 p-4 overflow-y-auto md:overflow-hidden">
      {/* Left — typographic CTA */}
      <div className="flex flex-col">
        <div className="flex flex-col gap-3">
          <p className="font-sans text-[9px] font-semibold text-amber tracking-[0.2em] uppercase">
            ↗ Let's talk
          </p>
          <div>
            <h2 className="font-display text-[28px] md:text-[40px] font-black text-cream leading-[0.88] tracking-[-2px]">
              Got something
            </h2>
            <h2 className="font-display text-[28px] md:text-[40px] font-black text-amber leading-[0.88] tracking-[-2px]">
              in mind?
            </h2>
          </div>
          <div className="h-[1.5px] w-[60%] bg-gradient-to-r from-amber to-transparent" />
          <p className="font-sans text-[11px] text-cream/50 leading-relaxed max-w-[280px]">
            Open to new opportunities, collaborations, or just a good
            conversation about tech, products, or frontend craft.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 bg-amber text-ink font-sans text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-2.5 rounded-[4px] self-start hover:bg-amber/90 transition-colors"
          >
            Send an email <span className="text-base">↗</span>
          </a>
        </div>
        <p className="font-sans text-[9px] text-cream/20 tracking-[0.06em] mt-auto pt-4">
          Based in Kuala Lumpur, MY · Available remotely
        </p>
      </div>

      {/* Right — contact cards */}
      <div className="flex flex-col gap-3">
        {[
          {
            label: "Email",
            value: profile.email,
            href: `mailto:${profile.email}`,
            icon: "✉️",
          },
          {
            label: "LinkedIn",
            value: "linkedin.com/in/aidilsafwan",
            href: profile.linkedinUrl,
            icon: "💼",
          },
          {
            label: "GitHub",
            value: "github.com/aidilsfwn",
            href: profile.githubUrl,
            icon: "⌥",
          },
        ].map(({ label, value, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-amber/[0.12] rounded-xl px-4 py-3 flex-1 hover:border-amber/35 hover:bg-amber/[0.05] transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber/[0.12] flex items-center justify-center text-sm flex-shrink-0">
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-[9px] font-semibold text-amber/50 tracking-[0.14em] uppercase">
                {label}
              </p>
              <p className="font-sans text-[11px] font-semibold text-cream/70 truncate">
                {value}
              </p>
            </div>
            <span className="text-amber/30 group-hover:text-amber transition-colors text-base flex-shrink-0">
              ↗
            </span>
          </a>
        ))}
      </div>
    </div>

    {/* Footer strip */}
    <div className="flex-shrink-0 bg-amber/[0.06] border-t border-amber/[0.08] px-5 py-2.5 flex justify-between items-center">
      <p className="font-sans text-[9px] text-cream/20 tracking-[0.06em]">
        © 2025 Aidil Safwan. All rights reserved.
      </p>
      <p className="font-sans text-[9px] text-cream/20 tracking-[0.04em]">
        Built with <span className="text-amber/60">React + Vite</span>
      </p>
    </div>
  </div>
);
