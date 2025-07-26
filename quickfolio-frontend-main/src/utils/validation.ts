// src/utils/validation.ts
import { ValidationRule, FormField } from '@/types/api';

/**
 * Validate a single field value against validation rules
 */
export function validateField(value: any, rules: ValidationRule[]): string | null {
  for (const rule of rules) {
    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return 'This field is required';
    }

    if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
      return `Minimum length is ${rule.minLength} characters`;
    }

    if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
      return `Maximum length is ${rule.maxLength} characters`;
    }

    if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      return 'Invalid format';
    }

    if (rule.custom) {
      const customError = rule.custom(value);
      if (customError) {
        return customError;
      }
    }
  }

  return null;
}

/**
 * Validate an entire form
 */
export function validateForm(fields: Record<string, FormField>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  let isValid = true;

  for (const [fieldName, field] of Object.entries(fields)) {
    if (field.rules) {
      const error = validateField(field.value, field.rules);
      if (error) {
        errors[fieldName] = error;
        isValid = false;
      }
    }
  }

  return { isValid, errors };
}

/**
 * Common validation rules
 */
export const validationRules = {
  required: (): ValidationRule => ({ required: true }),
  
  email: (): ValidationRule => ({
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address';
      }
      return null;
    }
  }),
  
  minLength: (min: number): ValidationRule => ({ minLength: min }),
  
  maxLength: (max: number): ValidationRule => ({ maxLength: max }),
  
  password: (): ValidationRule => ({
    minLength: 8,
    custom: (value: string) => {
      if (value && value.length >= 8) {
        if (!/(?=.*[a-z])/.test(value)) {
          return 'Password must contain at least one lowercase letter';
        }
        if (!/(?=.*[A-Z])/.test(value)) {
          return 'Password must contain at least one uppercase letter';
        }
        if (!/(?=.*\d)/.test(value)) {
          return 'Password must contain at least one number';
        }
      }
      return null;
    }
  }),
  
  username: (): ValidationRule => ({
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_-]+$/,
    custom: (value: string) => {
      if (value && !/^[a-zA-Z0-9_-]+$/.test(value)) {
        return 'Username can only contain letters, numbers, hyphens, and underscores';
      }
      return null;
    }
  }),
  
  portfolioName: (): ValidationRule => ({
    required: true,
    minLength: 1,
    maxLength: 50,
    custom: (value: string) => {
      if (value && value.trim().length === 0) {
        return 'Portfolio name cannot be empty';
      }
      return null;
    }
  })
};

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and > characters
    .trim();
}

/**
 * Escape HTML characters
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
