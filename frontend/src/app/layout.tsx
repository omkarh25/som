import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/ui/sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SOM - Office Management System',
  description: 'SOM is an Office management system to simplify the management of personal and professional duties',
};

/**
 * Root layout component that wraps all pages
 * Provides consistent structure with sidebar and main content area
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-8 bg-gray-100">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
