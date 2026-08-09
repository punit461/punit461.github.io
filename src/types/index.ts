import type { IconType } from "react-icons";

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  roles: string[];
  tagline: string;
  bio: string;
  longBio: string[];
  email: string;
  /** Optional — the hero eyebrow is omitted entirely when unset. */
  location?: string;
  /** Optional — the "Download Resume" buttons are hidden when unset. */
  resumeUrl?: string;
  /** Optional — a monogram is rendered in place of a photo when unset. */
  avatar?: string;
  /** Optional — a supporting photo for the About section. */
  aboutImage?: string;
  socials: SocialLink[];
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface Milestone {
  year: string;
  label: string;
}

export type SkillCategory =
  | "AI & LLMs"
  | "Computer Vision"
  | "Backend"
  | "Cloud & MLOps"
  | "Testing & Automation"
  | "Languages";

export interface Skill {
  name: string;
  icon: IconType;
  description: string;
  /** Optional 0-100 proficiency. The meter is hidden when unset. */
  level?: number;
}

export interface SkillGroup {
  category: SkillCategory;
  description: string;
  skills: Skill[];
}

export type ProjectCategory =
  | "AI"
  | "Machine Learning"
  | "Computer Vision"
  | "Full Stack"
  | "Tools"
  | "Learning";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  categories: ProjectCategory[];
  github?: string;
  live?: string;
  /** Slug of a related article in src/content/blog.json. */
  article?: string;
  featured: boolean;
  /** Optional — the card's year badge is hidden when unset. */
  year?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  tech: string[];
  achievements: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  duration: string;
  location: string;
  /** Optional — omitted when there's nothing meaningful to add. */
  description?: string;
  score?: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  /** Optional — the date chip is hidden when unset. */
  date?: string;
  description: string;
  icon: IconType;
}

export interface Certification {
  id: string;
  name: string;
  /** Optional — the issuer line is hidden when unset. */
  organization?: string;
  /** Optional — the date is hidden when unset. */
  date?: string;
  credentialUrl?: string;
  icon: IconType;
}

/** Metadata for a static article page, mirrored in src/content/blog.json. */
export interface BlogPost {
  slug: string;
  /** Published URL path, preserved from the previous site for SEO. */
  url: string;
  title: string;
  date: string;
  dateDisplay: string;
  readTime: string;
  excerpt: string;
  description: string;
  tag: string;
  relatedProject: string | null;
}
