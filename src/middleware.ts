import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/changepassword' || path === '/forgotpassword';
  
  const token = request.cookies.get('token')?.value || '';

  // if logged in, redirect to home page  or any other public page if you want  to restrict access to specific paths  like '/profile'
  if (isPublicPath && token) { 
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // if logged out, redirect to login page
  if(!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
   }

}
 
// Matching Paths 
export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/login',
    '/signup',
    '/verifyemail',
    '/forgotpassword',
    '/changepassword',
  ],
}