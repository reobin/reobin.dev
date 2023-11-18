import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

import './reset.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'reobin.dev',
  description: 'TODO',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
