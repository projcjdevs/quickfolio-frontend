// src/types/api.ts

// Base API response structure
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

// Error types
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
}

// Portfolio related types
export interface Portfolio {
  id: number;
  name: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}

export interface PortfolioContent {
  id: number;
  name: string;
  blocks: PortfolioContentBlock[];
  metadata?: {
    theme?: string;
    template?: string;
    lastModified?: string;
  };
}

export interface PortfolioContentBlock {
  id: number;
  type: 'header' | 'about' | 'experience' | 'education' | 'skills' | 'projects' | 'contact' | 'custom';
  content: Record<string, any>;
  displayOrder: number;
  isVisible?: boolean;
  styles?: Record<string, any>;
}

// Form data types
export interface CreatePortfolioForm {
  name: string;
  template?: string;
}

export interface UpdatePortfolioForm {
  name?: string;
  blocks?: Partial<PortfolioContentBlock>[];
}

// User types
export interface User {
  id: string;
  email: string;
  username: string;
  name?: string;
  avatarUrl?: string;
  createdAt?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'auto';
  language?: string;
  notifications?: {
    email?: boolean;
    browser?: boolean;
  };
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
  name?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

// Utility types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated?: number;
}

// Component prop types
export interface ComponentWithChildren {
  children: React.ReactNode;
}

export interface ComponentWithClassName {
  className?: string;
}

// Modal types
export interface ModalProps extends ComponentWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Form validation types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface FormField {
  value: any;
  error: string | null;
  touched: boolean;
  rules?: ValidationRule[];
}
