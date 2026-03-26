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
  achievements: string[];
  featuredAchievements?: string[];
  tech?: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  details: string;
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
  resumeUrl: "/AidilSafwanResume.pdf",
};

// ─── Skills ────────────────────────────────────────────────────────────────────

export const skills: {
  core: string[];
  web: string[];
  mobile: string[];
  backend: string[];
  devops: string[];
} = {
  core: ["TypeScript", "JavaScript", "Redux", "UI/UX", "Git"],
  web: ["React"],
  mobile: ["React Native", "Expo", "Flutter", "iOS", "Android"],
  backend: ["Laravel", "Node.js", "Express", "MySQL", "MongoDB", "PHP"],
  devops: ["AWS", "Azure DevOps", "Docker", "GitHub Actions", "CI/CD"],
};

// ─── Experience ────────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    title: "Senior Software Engineer",
    company: "The Access Group",
    period: "Mar 2025 - Present",
    featuredAchievements: [
      "Inherited a vendor-built codebase — led migration of CI/CD pipelines from Bitbucket to GitHub Actions from scratch.",
      "Rebuilding the ChangeGPS accounting suite as Access Evo: a modular React + .NET + Azure SSO platform in a monorepo.",
      "Served as interim technical lead through a leadership gap, maintaining delivery continuity across cross-functional teams.",
    ],
    tech: ["React", ".NET", "Azure", "GitHub Actions"],
    achievements: [
      "Build and maintain full-stack systems using React + Vite, PHP Laravel, MySQL, and AWS.",
      "Collaborate closely with the Product Manager to translate business requirements into technical solutions.",
      "Mentor and guide engineers to optimize development workflows and uphold code quality.",
      "Utilize AI-assisted development tools—Devin, Claude, GitHub Copilot—to accelerate delivery.",
      "Lead the integration of ChangeGPS into the Access ecosystem as a modular APAC platform.",
      "Implement microfrontend and microservices architecture for independent deployments.",
      "Spearhead redevelopment of the ChangeGPS accounting suite on an AI-augmented foundation.",
      "Oversee CI/CD migration from Bitbucket to GitHub Actions.",
      "Serve as interim technical lead during leadership transitions.",
      "Act as Scrum Master facilitating sprint planning, retrospectives, and capacity management.",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Aleph-Labs",
    period: "May 2022 - Feb 2025",
    featuredAchievements: [
      "First mobile team member for a large-scale banking app — built the component library and led project-wide mobile coordination.",
      "Drove micro frontend migration for a banking web app payment module.",
      "Delivered features for an Australian digital bank (in1bank), collaborating directly with product owners.",
    ],
    tech: ["React", "React Native", "Flutter", "Redux"],
    achievements: [
      "First member of the mobile team for a large-scale app project, leading mobile development including component library creation.",
      "Worked on end-to-end implementation, collaborating with product owners, analysts, stakeholders, and testing teams.",
      "Actively onboarded new developers, reviewed code, resolved bugs, handled change requests, and assisted with deployments.",
      "Played a role in a micro frontend migration for a banking web app payment module, including unit test refactoring.",
      "Maintained a Flutter component library for a banking app and assisted with an internal banking solution MVP.",
      "Supported new feature implementation and bug fixes for an Australian digital bank app.",
    ],
  },
  {
    title: "Analyst Programmer",
    company: "Public Bank",
    period: "Oct 2020 - May 2022",
    featuredAchievements: [
      "Built registration and eKYC modules for MyPB — a next-gen mobile banking app with native SDK bridge.",
      "Led a complete redesign and codebase refactor of the internal HRMS app.",
    ],
    tech: ["React Native", "Redux", "iOS", "Android"],
    achievements: [
      "Progressed from trainee to full-fledged analyst programmer within a year.",
      "Designed festive-themed UI elements for the HRMS app, coordinating with internal clients.",
      "Led a complete redesign and codebase refactor for the HRMS app.",
      "Developed registration and eKYC modules for a new banking app with native SDK integration.",
      "Conducted code reviews, identified bugs, and enhanced overall app functionality.",
    ],
  },
  {
    title: "Software Engineer",
    company: "INVOKE",
    period: "Feb 2020 - Oct 2020",
    featuredAchievements: [
      "Converted from intern to full-time hire based on performance.",
      "Built n9.digital — the Negeri Sembilan state digital gateway connecting citizens, businesses, and government.",
    ],
    tech: ["React", "React Native", "Expo"],
    achievements: [
      "Initially joined as an intern; secured a permanent role due to high performance.",
      "Collaborated with various teams to deliver client-focused solutions including landing pages for a UK real estate client.",
      "Built the company website, integrating form handling, security features, and notifications.",
      "Developed a mobile solution for state-citizen engagement and an AI-powered job portal.",
      "Practiced agile methodology, participated in scrums, and assisted with code reviews.",
    ],
  },
];

// ─── Education ─────────────────────────────────────────────────────────────────

export const education: EducationEntry[] = [
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

// ─── Projects ──────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  // Professional
  {
    id: "changegps",
    title: "ChangeGPS",
    description:
      "A modern platform for accountants, offering practice management and compliance tools tailored to firms of all sizes.",
    tech: ["React", "Laravel", "AWS"],
    image: "/images/cgps.webp",
    demoUrl: "https://changegps.com.au",
    category: "professional",
  },
  {
    id: "in1bank",
    title: "in1bank",
    description:
      "A digital-first Australian banking app with seamless in-app account creation and the same government guarantees as traditional banks.",
    tech: ["React Native", "Redux", "iOS", "Android"],
    image: "/images/in1bank.webp",
    demoUrl: "https://in1bank.com.au",
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
    tech: ["React Native", "Redux", "iOS", "Android"],
    image: "/images/kwsp.webp",
    demoUrl: "https://www.kwsp.gov.my/en/member/i-akaun",
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
    tech: ["React Native", "Redux", "iOS", "Android"],
    image: "/images/mypb.webp",
    demoUrl: "https://www.pbebank.com",
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
    tech: ["React Native", "Redux"],
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
    tech: ["React Native", "Expo"],
    image: "/images/n9.webp",
    demoUrl: "https://n9.digital",
    appStoreUrl: "https://apps.apple.com/my/app/n9-digital/id1481541604",
    playStoreUrl: "https://play.google.com/store/apps/details?id=my.n9.digital",
    category: "professional",
  },
  {
    id: "invokeisdata",
    title: "invokeisdata",
    description:
      "A sleek landing page for Invoke, showcasing the firm's capabilities in data analytics, insights, and political intelligence.",
    tech: ["React", "Express"],
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
    tech: ["React", "TypeScript", "Vite"],
    repoUrl: "https://github.com/aidilsfwn/elak-hujan",
    category: "personal",
  },
  {
    id: "9mo",
    title: "9mo.",
    description:
      "A pregnancy and milestone tracker for the journey from conception to birth. 9 months, documented.",
    tech: ["React", "TypeScript", "Vite"],
    repoUrl: "https://github.com/aidilsfwn/9mo",
    category: "personal",
  },
  {
    id: "dah-qada",
    title: "Dah Qada?",
    description:
      "A prayer qada tracker for Muslims — keep track of missed prayers and make them up, one at a time.",
    tech: ["React", "TypeScript", "Vite"],
    repoUrl: "https://github.com/aidilsfwn/dah-qada",
    category: "personal",
  },
  {
    id: "af-1-anniversary",
    title: "Aidil & Farhana's First Anniversary",
    description:
      "A mobile-first digital anniversary card — background music plays on load, shareable, with a PDF export option.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    repoUrl: "https://github.com/aidilsfwn/af-1-anniversary",
    category: "personal",
  },
  {
    id: "covid-dashboard",
    title: "COVID-19 MY Dashboard",
    description:
      "A real-time COVID-19 statistics dashboard for Malaysia — automated data pipeline via Google Sheets, visualised in Google Data Studio. Referenced by government officials during the pandemic.",
    tech: ["Google Data Studio", "Google Apps Script", "Google Sheets"],
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
      tagline: "Still believing",
      icon: "⬛",
    },
  ],
  play: ["Football", "Futsal", "Badminton", "Pickleball", "Frisbee"],
  watch: ["Football", "Badminton", "F1"],
  also: ["Photography"],
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
