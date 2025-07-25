// src/components/PortfolioEditor/types.ts
import { ReactNode } from "react";

// Contact Information - all fields optional
export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  prc?: string;  // Only PRC is truly optional
}

// Color Scheme - all fields required
export interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
  bg: string;
  glow: string;
  dust: string;
  highlight: string;
}

// Education Item - all fields required except icon
export interface EducationItem {
  institution: string;
  degree: string;
  details: string;
  icon?: ReactNode;
}

// Experience Item - all fields required except icon
export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  highlights: string[];
  icon?: ReactNode;
}

// Leadership Item - all fields required except icon
export interface LeadershipItem {
  role: string;
  duration: string;
  organization: string;
  highlights: string[];
  icon?: ReactNode;
}

// Certification Item - all fields required
export interface CertificationItem {
  name: string;
  date: string;
  issuer: string;
}

// Portfolio Config - all fields required
export interface PortfolioConfig {
  colors: ColorScheme;
  template: string;
  particleDensity: number;
}

// Main Portfolio Data - only contact fields are optional
export interface PortfolioData {
  name: string;
  title: string;
  summary: string;
  contact: Partial<ContactInfo>; // All contact fields optional
  education: EducationItem[];
  experience: ExperienceItem[];
  leadership: LeadershipItem[];
  certifications: CertificationItem[];
  config: PortfolioConfig;
}

// Default Colors - all required
export const DEFAULT_COLORS: ColorScheme = {
  primary: "#3b82f6",
  secondary: "#10b981",
  background: "#1f2937",
  text: "#f3f4f6",
  accent: "#f59e0b",
  bg: "#0a0a23",
  glow: "#3b82f6",
  dust: "#f3f4f6",
  highlight: "#f59e0b",
};

// Default Profile - provides all required values
export const DEFAULT_PROFILE: PortfolioData = {
  name: "",
  title: "",
  summary: "",
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
    particleDensity: 50,
  },
};

// Helper type for form inputs
export type PortfolioFormField = keyof Omit<PortfolioData, 'config' | 'contact'> | 
  `contact.${keyof ContactInfo}` | 
  `config.${keyof PortfolioConfig}` |
  `config.colors.${keyof ColorScheme}`;

// Type guard for portfolio data
export function isValidPortfolioData(data: unknown): data is PortfolioData {
  // Implementation would validate the actual structure
  return typeof data === 'object' && data !== null;
}

// Safe data access helper
export function getSafeValue<T>(value: T | undefined, defaultValue: T): T {
  return value ?? defaultValue;
}