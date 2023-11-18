import type { Metadata } from 'next';
import { Merriweather } from 'next/font/google';

import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

import './reset.css';
import './globals.css';

const font = Merriweather({ weight: '400', subsets: ['latin'] });

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
      <body className={font.className}>
        <div id="spinning-border" />
        <div id="content">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
