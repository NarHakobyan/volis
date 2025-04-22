import NextAuth from 'next-auth';

export const config = {
  matcher: [
    '/api/files/upload/:path*',
    '/api/vote/:path*',
    '/settings/:path*',
    '/profile/:path*',
    '/login',
    '/register'
  ],
};
