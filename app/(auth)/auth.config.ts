import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      const isOnRegister = nextUrl.pathname.startsWith('/register');

      // Protected routes that require authentication
      const protectedPaths = [
        '/api/files/upload',
        '/api/vote',
        '/settings',
        '/profile'
      ];

      const isProtectedRoute = protectedPaths.some(path =>
        nextUrl.pathname.startsWith(path)
      );

      // Redirect authenticated users away from auth pages
      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL('/', nextUrl as unknown as URL));
      }

      // Allow access to auth pages
      if (isOnLogin || isOnRegister) {
        return true;
      }

      // Require auth for protected routes
      if (isProtectedRoute) {
        return isLoggedIn;
      }

      // Allow public access to all other routes
      return true;
    },
  },
} satisfies NextAuthConfig;
