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
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-amber/70">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            ),
          },
          {
            label: "LinkedIn",
            value: "linkedin.com/in/aidilsafwan",
            href: profile.linkedinUrl,
            icon: (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber/70">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            ),
          },
          {
            label: "GitHub",
            value: "github.com/aidilsfwn",
            href: profile.githubUrl,
            icon: (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber/70">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            ),
          },
        ].map(({ label, value, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-amber/[0.12] rounded-xl px-4 py-3 flex-1 hover:border-amber/35 hover:bg-amber/[0.05] transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber/[0.12] flex items-center justify-center flex-shrink-0">
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
