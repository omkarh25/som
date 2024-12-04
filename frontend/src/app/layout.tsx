'use client';

import { ThemeProvider } from 'next-themes';
import './globals.css';

/**
 * Root layout component that wraps the entire application
 * Provides theme context for dark/light mode support
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
