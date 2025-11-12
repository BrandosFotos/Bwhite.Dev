// src/proxy.ts (or at project root)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isAuthRoute =
    pathname.startsWith('/login') || pathname.startsWith('/register');

  // If trying to access auth routes while logged in → redirect to home
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If trying to access admin route but user isn’t an admin → redirect to home
  if (isAdminRoute && !token?.isAdmin) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Otherwise allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/register'],
};
