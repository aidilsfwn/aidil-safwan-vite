import {
  BriefcaseBusiness,
  GraduationCap,
  Contact,
  Laptop,
  User,
  FolderKanban,
} from "lucide-react";

// ─── Interfaces ────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  demoUrl?: string;
  repoUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  category: "professional" | "personal";
  isArchived?: boolean;
  archivedNote?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description?: string;
  featuredAchievements?: string[];
  tech?: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
}

// ─── Profile ───────────────────────────────────────────────────────────────────

export const profile = {
  name: "Aidil Safwan",
  title: "Senior Software Engineer @ The Access Group",
  location: "Kuala Lumpur, MY",
  email: "aidilsafwan.aas@gmail.com",
  bio: "Frontend engineer at heart, fullstack in practice. 5+ years turning ideas into digital products — from mobile banking apps to government platforms. Currently leading frontend at The Access Group.",
  githubUrl: "https://github.com/aidilsfwn",
  linkedinUrl: "https://linkedin.com/in/aidilsafwan",
  resumeUrl: "/CV-AidilSafwan.pdf",
};

// ─── Skills ────────────────────────────────────────────────────────────────────

export const skills: {
  core: string[];
  web: string[];
  mobile: string[];
  backend: string[];
  devops: string[];
} = {
  core: ["TypeScript", "JavaScript"],
  web: ["React", "Vite"],
  mobile: ["React Native", "Expo", "Flutter", "iOS", "Android"],
  backend: [
    "Laravel",
    ".NET",
    "Express.js",
    "MySQL",
    "MS SQL",
    "Firebase",
    "Supabase",
  ],
  devops: ["AWS", "Azure", "Docker"],
};

// ─── Experience ────────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    title: "Senior Software Engineer",
    company: "The Access Group",
    period: "Mar 2025 - Present",
    featuredAchievements: [
      "Took over a vendor codebase and rebuilt the entire CI/CD pipeline.",
      "Rebuilding ChangeGPS as a modular platform on a monorepo.",
      "Stepped in as interim tech lead during a leadership gap.",
    ],
    tech: [
      "React",
      ".NET",
      "Azure",
      "Laravel",
      "AWS",
      "Docker",
      "TypeScript",
      "JavaScript",
      "PHP",
      "Vite",
      "MySQL",
      "MS SQL",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Aleph-Labs",
    period: "May 2022 - Feb 2025",
    description:
      "Led mobile development end-to-end on a large-scale banking app, maintained a Flutter component library for a separate banking client, and owned feature delivery on an Australian digital bank.",
    tech: ["React", "React Native", "Flutter", "TypeScript"],
  },
  {
    title: "Analyst Programmer",
    company: "Public Bank",
    period: "Oct 2020 - May 2022",
    description:
      "Built the eKYC and registration flow for MyPB and redesigned the internal HRMS app from the ground up.",
    tech: ["React Native", "iOS", "Android", "JavaScript", "Figma"],
  },
  {
    title: "Software Engineer",
    company: "INVOKE",
    period: "Feb 2020 - Oct 2020",
    description:
      "Built n9.digital, Negeri Sembilan's state digital gateway, and invokeisdata.com, the company's public website — then got converted from intern to full-time.",
    tech: ["React", "React Native", "Expo", "Express.js", "JavaScript"],
  },
];

// ─── Education ─────────────────────────────────────────────────────────────────

export const education: EducationEntry[] = [
  {
    degree: "Bachelor of Computer Science (Hons.)",
    institution: "Universiti Teknologi MARA (UiTM)",
    period: "2017 - 2020",
  },
  {
    degree: "Foundation in Engineering",
    institution: "Universiti Teknologi MARA (UiTM)",
    period: "2014 - 2015",
  },
  {
    degree: "Bachelor of Electronic Engineering (Hons.)",
    institution: "Universiti Sains Malaysia (USM)",
    period: "2015 - 2016",
  },
];

// ─── Projects ──────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  // Professional
  {
    id: "changegps",
    title: "ChangeGPS",
    description:
      "A modern platform for accountants, offering practice management and compliance tools tailored to firms of all sizes.",
    tech: [
      "React",
      ".NET",
      "Azure",
      "Full-stack Development",
      "Prompt Engineering",
      "Laravel",
      "Docker",
      "AWS",
      "TypeScript",
      "JavaScript",
      "PHP",
      "Vite",
      "MySQL",
      "MS SQL",
      "Web Development",
      "DevOps",
      "Spec-driven Development",
    ],
    image: "/images/cgps.webp",
    demoUrl: "https://changetech.cloud",
    category: "professional",
  },
  {
    id: "in1bank",
    title: "in1bank",
    description:
      "A digital-first Australian banking app with seamless in-app account creation and the same government guarantees as traditional banks.",
    tech: ["React Native", "iOS", "Android"],
    image: "/images/in1bank.webp",
    appStoreUrl: "https://apps.apple.com/au/app/in1bank/id1490235916",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.in1bank.mobile",
    category: "professional",
  },
  {
    id: "kwsp",
    title: "KWSP i-Akaun",
    description:
      "The refreshed KWSP i-Akaun app empowers users to monitor their retirement savings, manage transactions, and locate branches.",
    tech: [
      "React Native",
      "iOS",
      "Android",
      "TypeScript",
      "Mobile Development",
    ],
    image: "/images/kwsp.webp",
    appStoreUrl: "https://apps.apple.com/my/app/kwsp-i-akaun/id1396563336",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=my.gov.kwsp.iakaun",
    category: "professional",
  },
  {
    id: "mypb",
    title: "MyPB",
    description:
      "Public Bank's next-gen mobile banking app, combining financial services and lifestyle features in a sleek, unified experience.",
    tech: [
      "React Native",
      "iOS",
      "Android",
      "JavaScript",
      "Mobile Development",
    ],
    image: "/images/mypb.webp",
    appStoreUrl:
      "https://apps.apple.com/my/app/mypb-by-public-bank/id1527807753",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.publicbank.mypb",
    category: "professional",
  },
  {
    id: "pbexperience",
    title: "PBeXperience",
    description:
      "An internal productivity app by Public Bank, delivering a secure suite of digital tools to enhance employee efficiency on the go.",
    tech: [
      "React Native",
      "iOS",
      "Android",
      "JavaScript",
      "Figma",
      "Mobile Development",
      "UI/UX",
    ],
    image: "/images/pbx.webp",
    appStoreUrl: "https://apps.apple.com/my/app/pbexperience/id1181226879",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.publicbank.pbe.mobile",
    category: "professional",
  },
  {
    id: "n9digital",
    title: "n9.digital",
    description:
      "The official digital gateway for Negeri Sembilan, enabling seamless interactions between citizens, businesses, and government agencies.",
    tech: ["React Native", "Expo", "JavaScript", "Mobile Development"],
    image: "/images/n9.webp",
    appStoreUrl: "https://apps.apple.com/my/app/n9-digital/id1481541604",
    playStoreUrl: "https://play.google.com/store/apps/details?id=my.n9.digital",
    category: "professional",
  },
  {
    id: "invokeisdata",
    title: "invokeisdata",
    description:
      "A sleek landing page for Invoke, showcasing the firm's capabilities in data analytics, insights, and political intelligence.",
    tech: [
      "React",
      "Express.js",
      "JavaScript",
      "Full-stack Development",
      "Web Development",
    ],
    image: "/images/invoke.jpg",
    demoUrl: "https://invokeisdata.com",
    category: "professional",
  },
  // Personal
  {
    id: "elak-hujan",
    title: "ElakHujan",
    description:
      "A rain prediction and avoidance tool built for Kuala Lumpur commuters — know before you go.",
    tech: ["React", "Vite", "TypeScript", "Supabase", "Web Development"],
    repoUrl: "https://github.com/aidilsfwn/elak-hujan",
    demoUrl: "https://elak-hujan.aidilsfwn.dev",
    category: "personal",
  },
  {
    id: "9mo",
    title: "9mo.",
    description:
      "A pregnancy and milestone tracker for the journey from conception to birth. 9 months, documented.",
    tech: ["React", "Vite", "TypeScript", "Firebase", "Web Development"],
    repoUrl: "https://github.com/aidilsfwn/9mo",
    demoUrl: "https://9mo.aidilsfwn.dev",
    category: "personal",
  },
  {
    id: "dah-qada",
    title: "Dah Qada?",
    description:
      "A prayer qada tracker for Muslims — keep track of missed prayers and make them up, one at a time.",
    tech: ["React", "Vite", "TypeScript", "Firebase", "Web Development"],
    repoUrl: "https://github.com/aidilsfwn/dah-qada",
    demoUrl: "https://dah-qada.aidilsfwn.dev",
    category: "personal",
  },
  {
    id: "af-1-anniversary",
    title: "Aidil & Farhana's First Anniversary",
    description:
      "A mobile-first digital anniversary card — background music plays on load, shareable, with a PDF export option.",
    tech: ["React", "Vite", "TypeScript", "Web Development"],
    repoUrl: "https://github.com/aidilsfwn/af-1-anniversary",
    demoUrl: "https://af-1-anniversary.aidilsfwn.dev",
    category: "personal",
  },
  {
    id: "covid-dashboard",
    title: "COVID-19 MY Dashboard",
    description:
      "A real-time COVID-19 statistics dashboard for Malaysia — automated data pipeline via Google Sheets, visualised in Google Data Studio. Referenced by government officials during the pandemic.",
    tech: [
      "Google Data Studio",
      "Google Apps Script",
      "Google Sheets",
      "Data Analytics",
      "Data Visualization",
    ],
    category: "personal",
    isArchived: true,
    archivedNote: "Data no longer maintained — pandemic has ended.",
  },
];

// ─── Beyond ────────────────────────────────────────────────────────────────────

export const beyond = {
  teams: [
    {
      name: "Arsenal FC",
      league: "Premier League",
      tagline: "Proud Gooner",
      icon: "🔴",
    },
    {
      name: "Mercedes AMG Petronas F1 Team",
      league: "Formula 1",
      tagline: "Silver Arrows faithful",
      icon: "⬛",
    },
  ],
  play: ["Football", "Futsal", "Badminton", "Ultimate Frisbee"],
  watch: ["Football", "Badminton", "F1"],
  also: ["Photography", "Music"],
};

// ─── Menu ──────────────────────────────────────────────────────────────────────

export const menu = [
  { label: "About", link: "#about", icon: <User /> },
  { label: "Skills", link: "#skills", icon: <Laptop /> },
  { label: "Experience", link: "#experience", icon: <BriefcaseBusiness /> },
  { label: "Education", link: "#education", icon: <GraduationCap /> },
  { label: "Projects", link: "#projects", icon: <FolderKanban /> },
  { label: "Contact", link: "#contact", icon: <Contact /> },
];
