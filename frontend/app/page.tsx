// frontend/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Home</h1>
      <p><Link href="/hello">Open /hello</Link></p>
    </main>
  );
}
