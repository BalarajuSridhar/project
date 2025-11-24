// frontend/app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'CareerLaunch | Student Internship Portal',
  description: 'Find the best internships for students',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}