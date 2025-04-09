import { MapPin, Download } from "lucide-react";

import { profile } from "../../constants";

export const Hero = () => {
  return (
    <section id="about" className="mb-16 md:mt-8">
      <div className="max-w-4xl">
        <h1 className="text-indigo-700 text-4xl md:text-5xl font-bold mb-4">
          {profile.name}
        </h1>
        <h2 className="text-2xl md:text-3xl text-gray-600 mb-4">
          {profile.title}
        </h2>
        <div className="flex items-center mb-6 text-gray-600">
          <MapPin size={18} className="mr-2" />
          <span>{profile.location}</span>
        </div>
        <p className="text-lg mb-6">{profile.bio}</p>
        <div className="flex flex-wrap">
          <a
            href={profile.resumeUrl}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full flex items-center hover:bg-indigo-700 transition-colors"
          >
            <Download size={18} className="mr-2" />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};
