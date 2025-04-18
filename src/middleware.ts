import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.next()
  }
  // todo: refreshToken 만료시 login page redirect
  const accessToken = request.cookies.get('access_token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value

  // console.log('Middleware - Access Token exists:', !!accessToken);
  // console.log('Middleware - Refresh Token exists:', !!refreshToken);

  // console.log('Middleware - Request path:', request.nextUrl.pathname);
  // console.log('Middleware - All cookies:', request.cookies.getAll());

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  try {
    const isTokenExpired = (token: string): boolean => {
      // atob() : base64 디코딩하는 함수
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp*1000 < Date.now()
    }

    if(!isTokenExpired(accessToken)) {
      return NextResponse.next()
    }

    const response = await fetch('http://64.176.217.21:80/command_server/api/v1/external/auth/refresh', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    if (!response.ok) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    const data = await response.json()

    const nextResponse = NextResponse.next()

    nextResponse.cookies.set({
      name: 'access_token',
      value: data.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    })

    if (data.refresh_token) {
      nextResponse.cookies.set({
        name: 'refresh_token',
        value: data.refresh_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      })
    }

    return nextResponse

  } catch (error) {
    console.error('Token verification failed:', error)
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
}

export const config = {
  matcher: [
    '/project/:path*',
  ],
}