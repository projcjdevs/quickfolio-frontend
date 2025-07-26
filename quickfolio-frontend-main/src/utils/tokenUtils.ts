// src/utils/tokenUtils.ts

export interface DecodedToken {
  sub?: string;
  id?: string;
  userId?: string;
  email?: string;
  username?: string;
  userName?: string;
  name?: string;
  fullName?: string;
  avatarUrl?: string;
  avatar?: string;
  picture?: string;
  exp?: number;
  iat?: number;
}

/**
 * Safely decode JWT token payload
 */
export function decodeJWT(token: string): DecodedToken | null {
  try {
    if (!token || typeof token !== 'string') {
      return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Add padding if needed
    const padded = base64 + '==='.slice(0, (4 - base64.length % 4) % 4);
    
    const jsonPayload = decodeURIComponent(
      atob(padded)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.warn('Failed to decode JWT token:', error);
    return null;
  }
}

/**
 * Check if JWT token is expired
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) {
    return true;
  }
  
  const now = Math.floor(Date.now() / 1000);
  return decoded.exp < now;
}

/**
 * Get token from localStorage safely
 */
export function getStoredToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    return localStorage.getItem('authToken');
  } catch (error) {
    console.warn('Failed to access localStorage:', error);
    return null;
  }
}

/**
 * Store token in localStorage safely
 */
export function setStoredToken(token: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem('authToken', token);
  } catch (error) {
    console.warn('Failed to store token:', error);
  }
}

/**
 * Remove token from localStorage safely
 */
export function removeStoredToken(): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.removeItem('authToken');
  } catch (error) {
    console.warn('Failed to remove token:', error);
  }
}

/**
 * Extract user data from JWT token with fallback values
 */
export function extractUserDataFromToken(token: string): {
  id: string;
  email: string;
  username: string;
  name: string;
  avatarUrl: string;
} {
  const decoded = decodeJWT(token);
  
  return {
    id: decoded?.sub || decoded?.id || decoded?.userId || 'unknown',
    email: decoded?.email || 'unknown@example.com',
    username: decoded?.username || decoded?.userName || decoded?.name || decoded?.sub || 'User',
    name: decoded?.name || decoded?.fullName || decoded?.username || decoded?.userName || 'User',
    avatarUrl: decoded?.avatarUrl || decoded?.avatar || decoded?.picture || ''
  };
}
