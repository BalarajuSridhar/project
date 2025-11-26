import './globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

// Configure Inter font
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

// Define metadata with metadataBase
export const metadata: Metadata = {
  title: 'Spark Tech Interns | Launch Your Tech Career',
  description: 'Master in-demand skills through structured internship programs. Choose your domain, build real projects, and launch your tech career with expert guidance.',
  keywords: 'internship, tech, web development, data science, UI/UX design, programming, coding, career',
  authors: [{ name: 'Spark Tech' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Spark Tech Interns | Launch Your Tech Career',
    description: 'Master in-demand skills through structured internship programs',
    type: 'website',
    locale: 'en_US',
    siteName: 'Spark Tech Interns',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Spark Tech Interns - Launch Your Tech Career',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spark Tech Interns | Launch Your Tech Career',
    description: 'Master in-demand skills through structured internship programs',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Favicon links - make sure these files exist in your public folder */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#2563eb" />
        
        {/* Viewport - this should be in the head */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}