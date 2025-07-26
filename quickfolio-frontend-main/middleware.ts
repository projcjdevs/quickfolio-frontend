import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Since we use localStorage for tokens (client-side), this middleware 
  // serves as a basic route filter. The real authentication is handled 
  // in the AuthContext on the client side.
  
  // Allow all requests to continue - client-side AuthContext handles the real protection
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
