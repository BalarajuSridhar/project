import { useEffect, useState } from 'react';

export default function Hello() {
  const [text, setText] = useState('Loading...');
  useEffect(() => {
    fetch('http://localhost:5000/api/hello')
      .then((r) => r.json())
      .then((j) => setText(JSON.stringify(j, null, 2)))
      .catch((e) => setText(String(e)));
  }, []);
  return (
    <main style={{ padding: 24 }}>
      <h1>Frontend → Backend (pages/)</h1>
      <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 6 }}>{text}</pre>
    </main>
  );
}
