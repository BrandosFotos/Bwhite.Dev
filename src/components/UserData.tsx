'use client';

import { useState } from 'react';

export default function SearchForm() {
    const [email, setEmail] = useState('');
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setUser(null);
        setError(null);

        try {
            const res = await fetch(`/api/user?email=${encodeURIComponent(email)}`);
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'User not found');
            }
            const data = await res.json();
            setUser(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex gap-2'>
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Search email'
                    className='rounded border px-2 py-1'
                    required
                />
                <button type='submit' className='rounded bg-blue-500 px-3 py-1 text-white'>
                    Search
                </button>
            </form>

            <div className='mt-4'>
                {loading && <p>Loading...</p>}
                {error && <p className='text-red-600'>{error}</p>}
                {user && (
                    <p>
                        User name: <strong>{user.name}</strong>
                    </p>
                )}
            </div>
        </div>
    );
}
