"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

// Define route configurations
export const ROUTE_CONFIG = {
  PROTECTED: ['/dashboard', '/edit', '/preview'],
  PUBLIC_ONLY: ['/'],
  PUBLIC: [] // Routes accessible to both authenticated and unauthenticated users
} as const;

export function isProtectedRoute(pathname: string): boolean {
  return ROUTE_CONFIG.PROTECTED.some((route: string) => pathname.startsWith(route));
}

export function isPublicOnlyRoute(pathname: string): boolean {
  return ROUTE_CONFIG.PUBLIC_ONLY.includes(pathname as '/');
}

export function useAuthGuard() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    
    const isProtected = isProtectedRoute(pathname);
    const isPublicOnly = isPublicOnlyRoute(pathname);

    if (isProtected && !isAuthenticated) {
      router.replace('/');
    } else if (isPublicOnly && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, loading, pathname, router]);

  return {
    isAuthenticated,
    loading,
    canAccessRoute: loading ? null : (
      isProtectedRoute(pathname) ? isAuthenticated : true
    )
  };
}
