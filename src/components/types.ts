export interface EducationItem {
  institution: string;
  degree: string;
  details: string;
  icon?: React.ReactNode;
}

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  highlights: string[];
  icon?: React.ReactNode;
}

export interface LeadershipItem {
  role: string;
  organization: string;
  duration: string;
  highlights?: string[];
  icon?: React.ReactNode;
}

export interface CertificationItem {
  name: string;
  date: string;
  issuer?: string;
  icon?: React.ReactNode;
}

export interface ContactInfo {
  email?: string;
  github?: string;
  linkedin?: string;
  prc?: string;
}

export interface ColorScheme {
  bg: string;
  text: string;
  accent: string;
  highlight: string;
  nebula: string;
  dust: string;
  glow: string;
}

import React from 'react';

export interface PortfolioData {
  name: string;
  title: string;
  summary?: string;
  education?: EducationItem[];
  experience?: ExperienceItem[];
  leadership?: LeadershipItem[];
  certifications?: CertificationItem[];
  contact: ContactInfo;
  config?: {
    colors?: Partial<ColorScheme>;
    particleDensity?: number;
    template?: string;
  };
}

// Default colors - can be used across templates
export const DEFAULT_COLORS: ColorScheme = {
  bg: "#0a0a0a",
  text: "#e5e5e5",
  accent: "#facc15",
  highlight: "#3b82f6",
  nebula: "#7c3aed",
  dust: "#facc1560",
  glow: "#b03aff70"
};

// Default profile data
export const DEFAULT_PROFILE: PortfolioData = {
  name: "Your Name",
  title: "Professional Title",
  summary: "",
  education: [],
  experience: [],
  leadership: [],
  certifications: [],
  config: {
    colors: { ...DEFAULT_COLORS },
    particleDensity: 50,
    template: "cosmic",
  },
  contact: {
    email: "",
    github: "",
    linkedin: "",
    prc: ""
  }
};