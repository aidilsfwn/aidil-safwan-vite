import { projects } from "../constants";

export const sectionLinks = [
  { id: "about", label: "Profile", file: "profile.ts" },
  { id: "skills", label: "Skills", file: "toolkit.map" },
  { id: "experience", label: "Experience", file: "career.log" },
  { id: "education", label: "Education", file: "education.md" },
  { id: "projects", label: "Projects", file: "work/" },
  { id: "beyond", label: "Beyond", file: "spotify.live" },
  { id: "contact", label: "Contact", file: "contact.json" },
] as const;

export const navigationGroups = [
  { label: "profile", items: sectionLinks.slice(0, 2) },
  { label: "career", items: sectionLinks.slice(2, 4) },
  { label: "work", items: [sectionLinks[4], ...projects.map((project) => ({ id: "projects" as const, label: project.title, file: `${project.id}.${project.category === "professional" ? "work" : "lab"}`, projectId: project.id, category: project.category }))] },
  { label: "off-duty", items: [sectionLinks[5]] },
  { label: "contact", items: [sectionLinks[6]] },
];

export type NavigationItem = (typeof navigationGroups)[number]["items"][number];
