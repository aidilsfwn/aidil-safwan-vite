import { Github, Linkedin, Mail } from "lucide-react";

import { profile } from "../../constants";

export const Contact = () => {
  return (
    <section id="contact" className="mb-8">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Contact</h2>
      <div className="max-w-lg">
        <p className="mb-4">
          Feel free to reach out for opportunities or just to connect!
        </p>
        <div className="space-y-3">
          <div className="flex items-center">
            <Mail size={20} className="mr-3 text-indigo-600" />
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-indigo-600"
            >
              {profile.email}
            </a>
          </div>
          <div className="flex items-center">
            <Linkedin size={20} className="mr-3 text-indigo-600" />
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600"
            >
              LinkedIn Profile
            </a>
          </div>
          <div className="flex items-center">
            <Github size={20} className="mr-3 text-indigo-600" />
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600"
            >
              GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
