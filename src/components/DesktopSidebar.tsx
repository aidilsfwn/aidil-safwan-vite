import { Github, Linkedin, Mail } from "lucide-react";

import { menu, profile } from "../constants";
import memoji from "../assets/memoji.png";

export const DesktopSidebar = () => {
  return (
    <div className="hidden md:block md:fixed md:inset-y-0 md:left-0 md:w-64 md:bg-gray-900 md:text-white md:p-8">
      <div className="flex flex-col h-full justify-between">
        <div>
          <img src={memoji} className="rounded-xl w-1/2" />
          <h2 className="text-indigo-300 text-2xl font-bold mt-4 mb-8">
            {profile.name}
          </h2>
          <nav className="flex flex-col gap-4">
            {menu.map((item) => {
              return (
                <div
                  key={item.label}
                  className="flex flex-wrap items-center hover:text-indigo-400 transition-colors"
                >
                  <div className="">{item.icon}</div>
                  <a href={item.link} className="ml-4">
                    {item.label}
                  </a>
                </div>
              );
            })}
          </nav>
        </div>
        <div className="flex gap-4">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-300 hover:text-white"
          >
            <Github size={20} />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-300 hover:text-white"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-indigo-300 hover:text-white"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};
