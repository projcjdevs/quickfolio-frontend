"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isProtectedRoute, isPublicOnlyRoute } from "@/hooks/useAuthGuard";
import { 
  getStoredToken, 
  setStoredToken, 
  removeStoredToken, 
  isTokenExpired, 
  extractUserDataFromToken 
} from "@/utils/tokenUtils";

interface UserData {
  id: string;
  email: string;
  username: string;
  name?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: UserData | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
  userLoading: boolean;
  updateUser: (userData: Partial<UserData>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Function to extract user data from JWT token
  const fetchUserData = async (authToken: string) => {
    try {
      setUserLoading(true);
      
      // Extract user data from JWT token using utility
      const userData = extractUserDataFromToken(authToken);
      setUser(userData);
    } catch (error) {
      console.error("Error extracting user data from token:", error);
      // Set default user data on error
      setUser({
        id: 'unknown',
        email: 'unknown@example.com',
        username: 'User',
        name: 'User',
        avatarUrl: ''
      });
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    // Check for existing token on mount
    const storedToken = getStoredToken();
    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken);
      setIsAuthenticated(true);
      fetchUserData(storedToken);
    } else if (storedToken) {
      // Token exists but is expired
      removeStoredToken();
    }
    setLoading(false);
  }, []);

  // Navigation guard effect
  useEffect(() => {
    if (loading) return;
    
    const isProtected = isProtectedRoute(pathname);
    const isPublicOnly = isPublicOnlyRoute(pathname);

    if (isProtected && !isAuthenticated) {
      // Redirect unauthenticated users away from protected routes
      router.replace('/');
    } else if (isPublicOnly && isAuthenticated) {
      // Redirect authenticated users away from login page
      router.replace('/dashboard');
    }
  }, [isAuthenticated, loading, pathname, router]);

  const login = (newToken: string) => {
    setStoredToken(newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    // Fetch user data after login
    fetchUserData(newToken);
    // Navigate to dashboard and replace login page in history
    router.replace('/dashboard');
  };

  const logout = () => {
    removeStoredToken();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    // Navigate to login and replace current page in history
    router.replace('/');
  };

  const updateUser = (userData: Partial<UserData>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        user,
        login,
        logout,
        loading,
        userLoading,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
