// frontend/app/layout.tsx
import './globals.css';
import { AuthProvider } from '../contexts/AuthContext';

export const metadata = {
  title: 'SkillIntern | Student Internship Portal',
  description: 'Master in-demand skills through structured internship programs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}