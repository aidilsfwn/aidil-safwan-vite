import { MapPin, Mail, Download, Linkedin } from "lucide-react";

import { profile } from "../../constants";

export const Hero = () => {
  return (
    <section id="about" className="mb-16 md:mt-8">
      <div className="max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{profile.name}</h1>
        <h2 className="text-2xl md:text-3xl text-gray-600 mb-4">
          {profile.title}
        </h2>
        <div className="flex flex-wrap gap-4 items-center mb-6 text-gray-600">
          <div className="flex items-center">
            <MapPin size={18} className="mr-2" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center">
            <Mail size={18} className="mr-2" />
            <a href={`mailto:${profile.email}`} className="hover:text-blue-600">
              {profile.email}
            </a>
          </div>
        </div>
        <p className="text-lg mb-6">{profile.bio}</p>
        <div className="flex flex-wrap gap-4">
          <a
            href={profile.resumeUrl}
            className="bg-blue-600 text-white px-6 py-2 rounded flex items-center hover:bg-blue-700 transition-colors"
          >
            <Download size={18} className="mr-2" />
            Download Resume
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded flex items-center hover:bg-blue-50 transition-colors"
          >
            <Linkedin size={18} className="mr-2" />
            LinkedIn Profile
          </a>
        </div>
      </div>
    </section>
  );
};
