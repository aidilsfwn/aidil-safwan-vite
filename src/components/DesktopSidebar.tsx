import { Github, Linkedin, Mail } from "lucide-react";

import { profile } from "../constants";

export const DesktopSidebar = () => {
  return (
    <div className="hidden md:block md:fixed md:inset-y-0 md:left-0 md:w-64 md:bg-gray-900 md:text-white md:p-8">
      <div className="flex flex-col h-full justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">{profile.name}</h2>
          <nav className="flex flex-col gap-4">
            <a href="#about" className="hover:text-blue-400 transition-colors">
              About
            </a>
            <a
              href="#experience"
              className="hover:text-blue-400 transition-colors"
            >
              Experience
            </a>
            <a
              href="#education"
              className="hover:text-blue-400 transition-colors"
            >
              Education
            </a>
            <a href="#skills" className="hover:text-blue-400 transition-colors">
              Skills
            </a>
            <a
              href="#projects"
              className="hover:text-blue-400 transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="hover:text-blue-400 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="flex gap-4">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            <Github size={20} />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-gray-300 hover:text-white"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};
