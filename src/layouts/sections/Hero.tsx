import { MapPin, Download } from "lucide-react";

import { profile } from "../../constants";
import { SectionWrapper } from "../../components";

export const Hero = () => {
  return (
    <SectionWrapper id="about" className="mb-12 md:mt-8">
      <div className="max-w-3xl mx-auto text-center mt-20 md:mt-32">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 pb-2 tracking-tight">
          {profile.name}
        </h1>
        <h2 className="text-2xl md:text-3xl text-slate-400 mb-6 font-light">
          {profile.title}
        </h2>
        <div className="flex items-center justify-center mb-8 text-slate-500">
          <MapPin size={18} className="mr-2" />
          <span>{profile.location}</span>
        </div>
        
        <div className="flex justify-center">
          <a
            href={profile.resumeUrl}
            className="bg-indigo-600/90 hover:bg-indigo-600 text-white px-8 py-3 rounded-full flex items-center transition-all hover:scale-105 shadow-lg shadow-indigo-500/20"
          >
            <Download size={20} className="mr-2" />
            Download Resume
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
};
