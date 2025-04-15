import NextAuth from 'next-auth';

import { authConfig } from '@/app/(auth)/auth.config';

export default NextAuth(authConfig).auth;

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
