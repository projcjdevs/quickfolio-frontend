// src/components/PortfolioEditor/types.ts
export interface ContactInfo {
  email?: string;
  github?: string;
  linkedin?: string;
  prc?: string;
}

export interface ColorScheme {
  primary?: string;
  secondary?: string;
  background?: string;
  text?: string;
  accent?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  details: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  highlights: string[];
}

export interface LeadershipItem {
  role: string;
  duration: string;
  organization: string;
  highlights: string[];
}

export interface CertificationItem {
  name: string;
  date: string;
  issuer: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  summary?: string;
  contact: ContactInfo;
  education?: EducationItem[];
  experience?: ExperienceItem[];
  leadership?: LeadershipItem[];
  certifications?: CertificationItem[];
  config: {
    colors: ColorScheme;
    template: string;
  };
}

export const DEFAULT_COLORS = {
  primary: "#3b82f6",
  secondary: "#10b981",
  background: "#1f2937",
  text: "#f3f4f6",
  accent: "#f59e0b",
};

export const DEFAULT_PROFILE: PortfolioData = {
  name: "",
  title: "",
  contact: {
    email: "",
    github: "",
    linkedin: "",
  },
  education: [],
  experience: [],
  leadership: [],
  certifications: [],
  config: {
    colors: DEFAULT_COLORS,
    template: "cosmic",
  },
};