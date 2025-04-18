import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import ThemeProvider from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'BAXUS - Meet Bob, Your Whisky Expert',
  description:
    'BAXUS AI Agent Bob analyzes your whisky collection and provides personalized recommendations',
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'BAXUS - Meet Bob, Your Whisky Expert',
    description:
      'BAXUS AI Agent Bob analyzes your whisky collection and provides personalized recommendations',
    siteName: 'BAXUS',
    images: [
      {
        url: `${baseUrl}/baxus-bob-og.png`,
        width: 1200,
        height: 630,
        alt: 'BAXUS - Meet Bob, Your Whisky Expert',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BAXUS - Meet Bob, Your Whisky Expert',
    description:
      'BAXUS AI Agent Bob analyzes your whisky collection and provides personalized recommendations',
    images: [`${baseUrl}/baxus-bob-og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
