import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secretKey = process.env.SESSION_SECRET || 'default-secret-key-change-me'
const key = new TextEncoder().encode(secretKey)

async function verify(token: string) {
  try {
    await jwtVerify(token, key, { algorithms: ['HS256'] })
    return true
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value

  // 1. If visiting /admin root, redirect to dashboard
  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // 2. Protect /admin/dashboard routes
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (!session || !(await verify(session))) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // 3. Redirect to dashboard if already logged in and visiting login
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    if (session && (await verify(session))) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
