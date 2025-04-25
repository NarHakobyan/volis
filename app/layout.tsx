import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';
import { Roboto, Roboto_Condensed } from 'next/font/google';

import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const roboto = Roboto({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
});

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '700'],
  variable: '--font-roboto-condensed',
});

export const metadata: Metadata = {
  title: 'VOLIS - Local Government Public Opinion Poll Environment',
  description: 'VOLIS enables municipalities to conduct secure population surveys and inclusive budget processes, connected to the population register and secured by ID solutions.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://volis.ee'),
};

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

const LIGHT_THEME_COLOR = '#005AA3';
const DARK_THEME_COLOR = 'hsl(240deg 10% 3.92%)';
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  function updateThemeColor() {
    var isDark = html.classList.contains('dark');
    meta.setAttribute('content', isDark ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}');
  }
  var observer = new MutationObserver(updateThemeColor);
  observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  updateThemeColor();
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${robotoCondensed.variable}`}
      // `next-themes` injects an extra classname to the body element to avoid
      // visual flicker before hydration. Hence the `suppressHydrationWarning`
      // prop is necessary to avoid the React hydration mismatch warning.
      // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_COLOR_SCRIPT,
          }}
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-white font-sans antialiased',
          GeistSans.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
