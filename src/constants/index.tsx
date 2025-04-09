import {
  BriefcaseBusiness,
  GraduationCap,
  Contact,
  Laptop,
  User,
} from "lucide-react";

export const profile = {
  name: "Aidil Safwan",
  title: "Senior Software Engineer @ The Access Group",
  location: "Kuala Lumpur, MY",
  email: "aidilsafwan.aas@gmail.com",
  // bio: "A lifelong knowledge seeker and problem solver at heart, I see coding as a tool to create meaningful solutions rather than just a profession. Currently, I’m a Senior Software Engineer at The Access Group, where I build and optimize digital solutions to enhance user experiences. Previously, I was a Frontend Developer at Aleph-Labs, crafting user-focused digital experiences. Before that, I worked as an Analyst Programmer at Public Bank, contributing to UI/UX design and mobile app development. Earlier in my career, I was a Software Engineer at INVOKE, where I developed web and mobile products and played a key role in various projects. My academic journey started in Electronic Engineering, but my passion for coding led me to pursue a Bachelor of Computer Science. My final-year project involved Twitter sentiment analysis, where I built a bilingual classification model and visualized the results. Outside of work, I love experimenting with personal projects, such as building my personal website and creating data-driven dashboards. I’m also passionate about giving back to the community, volunteering with Young Digital Leaders Malaysia and contributing to educational events at Petrosains. Driven by curiosity and a passion for learning, I’m always looking for opportunities to solve problems and grow. Let’s connect!",
  githubUrl: "https://github.com/aidilsfwn",
  linkedinUrl: "https://linkedin.com/in/aidilsafwan",
  resumeUrl: "/AidilSafwanResume.pdf",
};

export const skills = [
  "Web Development",
  "Mobile Development",
  "Front End Development",
  "Back End Development",
  "Full Stack Development",
  "JavaScript",
  "TypeScript",
  "React",
  "React Native",
  "Redux",
  "Expo",
  "Flutter",
  "Node.js",
  "PHP",
  "Laravel",
  "MongoDB",
  "Docker",
  "MySQL",
];

export const experiences = [
  {
    title: "Senior Software Engineer",
    company: "The Access Group",
    period: "Mar 2025 - Present",
  },
  {
    title: "Frontend Developer",
    company: "Aleph-Labs",
    period: "May 2022 - Feb 2025",
    description:
      "Developed and maintained full-stack web applications using React and Node.js. Implemented real-time data processing system handling 1M+ daily transactions.",
    achievements: [
      "First member of the mobile team for a large-scale app project, leading mobile development, including component library creation and project-wide coordination.",
      "Worked on end-to-end implementation, collaborating with product owners, analysts, stakeholders, and testing teams.",
      "Actively onboarded new developers, reviewed code, resolved bugs, handled change requests, and assisted with deployments.",
      "Played a role in a micro frontend migration for a banking web app payment module, including unit test refactoring.",
      "Maintained a Flutter component library for a banking app and assisted with a prototype for an internal banking solution MVP.",
      "Supported new feature implementation and bug fixes for an Australian digital bank app, collaborating closely with product owners.",
    ],
  },
  {
    title: "Analyst Programmer",
    company: "Public Bank",
    period: "Oct 2020 - May 2022",
    achievements: [
      "Progressed from trainee to full-fledged analyst programmer within a year.",
      "Designed festive-themed UI elements for a Human Resource Management System (HRMS) app, coordinating with internal clients on requirements and API design for a digital library feature.",
      "Led a complete redesign and codebase refactor for the HRMS app, ensuring a more efficient and maintainable structure.",
      "Developed registration and eKYC modules for a new banking app, building a bridge for native SDK integration.",
      "Conducted code reviews, identified bugs, and enhanced overall app functionality.",
    ],
  },
  {
    title: "Software Engineer",
    company: "INVOKE",
    period: "Feb 2020 - Oct 2020",
    achievements: [
      "Initially joined as an intern; secured a permanent role due to high performance.",
      "Collaborated with various teams to deliver client-focused solutions, including landing pages for a UK real estate client.",
      "Built the company website, integrating form handling, security features, and notifications.",
      "Developed a mobile solution for state-citizen engagement and an AI-powered job portal, providing mentorship to new joiners.",
      "Practiced agile methodology, participated in scrums, contributed to sprint tasks, and assisted with code reviews and bug fixes.",
    ],
  },
];

export const education = [
  {
    degree: "Bachelor of Computer Science (Hons.)",
    institution: "Universiti Teknologi MARA (UiTM)",
    period: "2017 - 2020",
    details: "CGPA: 3.42",
  },
  {
    degree: "Foundation in Engineering",
    institution: "Universiti Teknologi MARA (UiTM)",
    period: "2014 - 2015",
    details: "CGPA: 3.78",
  },
];

export const certifications = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
  },
  {
    name: "Google Cloud Professional Developer",
    issuer: "Google",
    date: "2022",
  },
];

export const projects = [
  {
    name: "E-commerce Platform",
    description:
      "Built a scalable e-commerce platform handling 50,000+ daily users using React, Node.js, and MongoDB.",
    technologies: ["React", "Node.js", "MongoDB", "Redis", "AWS"],
  },
  {
    name: "Real-time Analytics Dashboard",
    description:
      "Developed a real-time analytics dashboard using WebSockets and D3.js visualizations.",
    technologies: ["TypeScript", "Socket.io", "D3.js", "Express", "PostgreSQL"],
  },
];

export const menu = [
  { label: "About", link: "#about", icon: <User /> },
  { label: "Skills", link: "#skills", icon: <Laptop /> },
  { label: "Experience", link: "#experience", icon: <BriefcaseBusiness /> },
  { label: "Education", link: "#education", icon: <GraduationCap /> },
  // { label: "Projects", link: "#projects", icon: <FolderKanban /> },
  { label: "Contact", link: "#contact", icon: <Contact /> },
];
