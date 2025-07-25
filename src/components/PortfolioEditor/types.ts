// src/components/PortfolioEditor/types.ts
import { ReactNode } from "react";

// Contact Information - all fields optional
export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  prc?: string;
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

// Simplified Color Scheme
export interface ColorScheme {
  // Editable in UI
  primary: string;
  secondary: string;
  background: string;
  text: string;
  
  // Derived colors
  accent: string;
  cardBg: string;
  border: string;
  glow: string;
  highlight?: string; // Made optional since it's only for medPortfolio
}

// Template-specific default colors
export const TEMPLATE_DEFAULT_COLORS = {
  cosmic: {
    primary: "#facc15",
    secondary: "#facc15",
    background: "#0a0a23",
    text: "#ffffff",
    // Derived defaults
    accent: "#f59e0b",
    cardBg: "#374151",
    border: "#4b5563",
    glow: "#3b82f6"
  },
  medPortfolio: {
    primary: "#043382",
    secondary: "#608abf",
    background: "#ffffff",
    text: "#000000",
    // Derived defaults
    accent: "#043382",
    cardBg: "#f3f4f6",
    border: "#e5e7eb",
    glow: "#043382",
    highlight: "#eaf4ff" // Only defined for medPortfolio
  },
  minimal: {
    primary: "#000000",
    secondary: "#555555",
    background: "#ffffff",
    text: "#333333",
    // Derived defaults
    accent: "#000000",
    cardBg: "#f9f9f9",
    border: "#e0e0e0",
    glow: "#000000"
  }
} as const;

// Portfolio Config
export interface PortfolioConfig {
  colors: Omit<ColorScheme, 'accent' | 'cardBg' | 'border' | 'glow' | 'highlight'>;
  template: keyof typeof TEMPLATE_DEFAULT_COLORS;
  particleDensity: number;
}

// Main Portfolio Data
export interface PortfolioData {
  name: string;
  title: string;
  summary: string;
  contact: Partial<ContactInfo>;
  education: EducationItem[];
  experience: ExperienceItem[];
  leadership: LeadershipItem[];
  certifications: CertificationItem[];
  config: PortfolioConfig;
}

// Default Profile
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
    colors: {
      primary: TEMPLATE_DEFAULT_COLORS.cosmic.primary,
      secondary: TEMPLATE_DEFAULT_COLORS.cosmic.secondary,
      background: TEMPLATE_DEFAULT_COLORS.cosmic.background,
      text: TEMPLATE_DEFAULT_COLORS.cosmic.text,
    },
    template: "cosmic",
    particleDensity: 50,
  },
};

// Helper type for form inputs (only includes editable color fields)
export type PortfolioFormField = 
  | keyof Omit<PortfolioData, 'config' | 'contact'> 
  | `contact.${keyof ContactInfo}`
  | `config.${Exclude<keyof PortfolioConfig, 'colors'>}`
  | `config.colors.${keyof PortfolioConfig['colors']}`;

// Type guard for portfolio data
export function isValidPortfolioData(data: unknown): data is PortfolioData {
  // Implementation would validate the actual structure
  return typeof data === 'object' && data !== null;
}

// Safe data access helper
export function getSafeValue<T>(value: T | undefined, defaultValue: T): T {
  return value ?? defaultValue;
}

// Simple color adjustment utility (lighten/darken)
function adjustColorBrightness(hex: string, percent: number): string {
  // This is a simplified version - consider using a color library in production
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  
  const r = Math.max(0, Math.min(255, (num >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));

  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

// Generate full color scheme with template-specific defaults
export function generateFullColorScheme(
  uiColors: Partial<Pick<ColorScheme, 'primary' | 'secondary' | 'background' | 'text'>>,
  template: keyof typeof TEMPLATE_DEFAULT_COLORS = 'cosmic'
): ColorScheme {
  const templateDefaults = TEMPLATE_DEFAULT_COLORS[template];
  
  const scheme: ColorScheme = {
    primary: uiColors.primary || templateDefaults.primary,
    secondary: uiColors.secondary || templateDefaults.secondary,
    background: uiColors.background || templateDefaults.background,
    text: uiColors.text || templateDefaults.text,
    accent: templateDefaults.accent,
    cardBg: adjustColorBrightness(
      uiColors.background || templateDefaults.background, 
      template === 'medPortfolio' ? 5 : -20
    ),
    border: adjustColorBrightness(
      uiColors.background || templateDefaults.background,
      template === 'medPortfolio' ? 10 : -10
    ),
    glow: uiColors.primary || templateDefaults.primary
  };

  // Only add highlight for medPortfolio
  if (template === 'medPortfolio') {
    (templateDefaults as typeof TEMPLATE_DEFAULT_COLORS['medPortfolio']).highlight
  }

  return scheme;
}