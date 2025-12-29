import { Github, Linkedin, Mail } from "lucide-react";

import { profile } from "../../constants";
import { SectionWrapper } from "../../components";

export const Contact = () => {
  return (
    <SectionWrapper id="contact" className="mb-20">
      <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-slate-800 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-slate-200">Get in Touch</h2>
        <p className="mb-10 text-slate-400 text-lg">
          Feel free to reach out for opportunities or just to connect!
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all hover:scale-105 border border-slate-700"
          >
            <Mail size={20} className="text-indigo-400" />
            <span className="font-medium">{profile.email}</span>
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-4 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-xl transition-all hover:scale-105 shadow-lg"
          >
            <Linkedin size={20} />
            <span className="font-medium">LinkedIn</span>
          </a>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-4 bg-[#24292e] hover:bg-black text-white rounded-xl transition-all hover:scale-105 shadow-lg"
          >
            <Github size={20} />
            <span className="font-medium">GitHub</span>
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
};
