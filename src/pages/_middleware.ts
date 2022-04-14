import { getToken } from 'next-auth/jwt'
import { NextFetchEvent, NextResponse } from 'next/server'

export async function middleware(req: any, ev: NextFetchEvent) {
  const token = await getToken({ req, secret: String(process.env.JWT_SECRET) })

  const url = req.nextUrl.clone()

  // Allow the requests if the following is true...pageProps
  // 1) Its a request for next-auth session & provider fetching
  // 2) The token exists
  if (url.pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  // Redirect them to login if they dont have token & are requesting a protected route

  if (!token && url.pathname !== '/login') {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
}
