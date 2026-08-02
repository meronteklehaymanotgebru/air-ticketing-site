import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function proxy(request: NextRequest) {
  // Only apply to /admin routes (except login and api)
  if (!request.nextUrl.pathname.startsWith('/admin') || 
      request.nextUrl.pathname.startsWith('/admin/login') ||
      request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const token = request.cookies.get('admin_auth')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_super_secret_key_123')
    const { payload } = await jwtVerify(token, secret)
    const role = payload.role as string

    const path = request.nextUrl.pathname

    // Role-based routing rules
    if (role === 'ADMIN') {
      return NextResponse.next()
    }

    if (role === 'MANAGER') {
      // Managers can only access Sales, Refunds, Cashout
      const allowedPaths = ['/admin/sales', '/admin/refunds', '/admin/cashout']
      if (!allowedPaths.some(p => path.startsWith(p))) {
        return NextResponse.redirect(new URL('/admin/sales', request.url))
      }
      return NextResponse.next()
    }

    if (role === 'AGENT') {
      // Agents can only access Sales, Refunds
      const allowedPaths = ['/admin/sales', '/admin/refunds']
      if (!allowedPaths.some(p => path.startsWith(p))) {
        return NextResponse.redirect(new URL('/admin/sales', request.url))
      }
      return NextResponse.next()
    }

    if (role === 'FINANCE') {
      // Finance can only access Cashout
      const allowedPaths = ['/admin/cashout']
      if (!allowedPaths.some(p => path.startsWith(p))) {
        return NextResponse.redirect(new URL('/admin/cashout', request.url))
      }
      return NextResponse.next()
    }

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
