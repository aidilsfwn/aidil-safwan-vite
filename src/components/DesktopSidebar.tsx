import {
  BriefcaseBusiness,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Contact,
  EqualApproximately,
  BugOff,
  FolderKanban,
} from "lucide-react";

import { profile } from "../constants";

const ITEMS = [
  { label: "About", link: "#about", icon: <EqualApproximately /> },
  { label: "Experience", link: "#experience", icon: <BriefcaseBusiness /> },
  { label: "Education", link: "#education", icon: <GraduationCap /> },
  { label: "Skills", link: "#skills", icon: <BugOff /> },
  { label: "Projects", link: "#projects", icon: <FolderKanban /> },
  { label: "Contact", link: "#contact", icon: <Contact /> },
];

export const DesktopSidebar = () => {
  return (
    <div className="hidden md:block md:fixed md:inset-y-0 md:left-0 md:w-64 md:bg-gray-900 md:text-white md:p-8">
      <div className="flex flex-col h-full justify-between">
        <div>
          <h2 className="text-indigo-300 text-2xl font-bold mb-8">
            {profile.name}
          </h2>
          <nav className="flex flex-col gap-4">
            {ITEMS.map((item) => {
              return (
                <div className="flex flex-wrap items-center hover:text-indigo-400 transition-colors">
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
