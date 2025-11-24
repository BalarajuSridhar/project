'use client';
import { useEffect, useState } from 'react';

type User = { id: number; email: string; name?: string; created_at?: string };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        // credentials: 'include' // enable only if your backend uses cookies/sessions
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '<no body>');
        throw new Error(`GET /api/users failed: ${res.status} ${res.statusText} — ${text}`);
      }
      const json = await res.json();
      console.log('GET /api/users response', json);
      setUsers(json.users || []);
    } catch (e: any) {
      console.error('Failed to load users', e);
      setError(e.message || String(e));
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Basic client-side validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const payload = { email: email.trim(), name: (name || '').trim() || null };
      console.log('POST /api/users payload', payload);

      const res = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
        // credentials: 'include'
      });

      const text = await res.text(); // read raw body first so we can log it on error
      let json: any = null;
      try { json = text ? JSON.parse(text) : null; } catch (err) { /* not JSON */ }

      if (!res.ok) {
        console.error('POST /api/users failed', res.status, res.statusText, text);
        throw new Error(json?.error || `Server error ${res.status}: ${text || res.statusText}`);
      }

      console.log('POST /api/users success', json);
      if (json?.user) setUsers((s) => [json.user, ...s]);
      setEmail(''); setName('');
    } catch (err: any) {
      console.error('Create user error', err);
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Users</h1>

      {error && <div style={{ color: 'crimson', marginBottom: 12, whiteSpace: 'pre-wrap' }}>{error}</div>}

      <form onSubmit={handleCreate} style={{ marginBottom: 24 }}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ marginRight: 8 }}
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          style={{ marginRight: 8 }}
        />
        <button type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create user'}</button>
      </form>

      <section>
        <h2>List</h2>
        {users.length === 0 ? <p>No users yet.</p> : (
          <ul>
            {users.map((u) => (
              <li key={u.id}>
                {u.id} — {u.email} {u.name ? `(${u.name})` : ''}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
