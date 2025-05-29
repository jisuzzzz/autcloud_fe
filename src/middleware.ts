import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AuthService } from './services/auth';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if ((path.startsWith('/auth'))) {
    return NextResponse.next();
  }
  
  // todo: refreshToken 만료시 login page redirect
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  // console.log('Middleware - Access Token exists:', !!accessToken);
  // console.log('Middleware - Refresh Token exists:', !!refreshToken);

  // console.log('Middleware - Request path:', request.nextUrl.pathname);
  // console.log('Middleware - All cookies:', request.cookies.getAll());

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  try {
    if (!AuthService.isTokenExpired(accessToken)) {
      return NextResponse.next();
    }

    const data = await AuthService.refreshToken(refreshToken);
    const nextResponse = NextResponse.next();

    nextResponse.cookies.set({
      name: 'access_token',
      value: data.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    if (data.refresh_token) {
      nextResponse.cookies.set({
        name: 'refresh_token',
        value: data.refresh_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
    }

    return nextResponse;
  } catch (error) {
    console.error('Token verification failed:', error);
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
}

export const config = {
  matcher: [
    // '/project/:path*',
  ],
};
