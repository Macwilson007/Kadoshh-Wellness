import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    // For this demo, we'll use a simple cookie-based check
    // In a real app, use NextAuth or Clerk
    const isAuthenticated = request.cookies.get('admin_session');
    
    // We'll allow the login page itself
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
