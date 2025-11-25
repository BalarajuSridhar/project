// frontend/app/layout.tsx
import './globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import { Inter } from 'next/font/google';

// Import Inter font for better typography
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Spark Tech Interns | Launch Your Tech Career',
  description: 'Master in-demand skills through structured internship programs. Choose your domain, build real projects, and launch your tech career with expert guidance.',
  keywords: 'internship, tech, web development, data science, UI/UX design, programming, coding, career',
  authors: [{ name: 'Spark Tech' }],
  openGraph: {
    title: 'Spark Tech Interns | Launch Your Tech Career',
    description: 'Master in-demand skills through structured internship programs',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/og-image.jpg', // Add your OpenGraph image here
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
    images: ['/images/og-image.jpg'], // Same image for Twitter
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
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#2563eb" />
        
        {/* Viewport for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* OpenGraph Image */}
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Spark Tech Interns - Launch Your Tech Career" />
        
        {/* Twitter Card Image */}
        <meta name="twitter:image" content="/images/og-image.jpg" />
        
        {/* Additional meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}