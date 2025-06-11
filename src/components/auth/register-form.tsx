'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

export default function RegisterForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const name = formData.get('name') as string;

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    name
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Something went wrong');
            }

            router.push('/login?registered=true');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className='space-y-4'>
            <div className='space-y-2'>
                <label htmlFor='name' className='text-sm leading-none font-medium'>
                    Name
                </label>
                <input
                    id='name'
                    name='name'
                    type='text'
                    placeholder='John Doe'
                    required
                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
                />
            </div>
            <div className='space-y-2'>
                <label htmlFor='email' className='text-sm leading-none font-medium'>
                    Email
                </label>
                <input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='name@example.com'
                    required
                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
                />
            </div>
            <div className='space-y-2'>
                <label htmlFor='password' className='text-sm leading-none font-medium'>
                    Password
                </label>
                <input
                    id='password'
                    name='password'
                    type='password'
                    required
                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
                />
            </div>
            {error && <div className='text-sm text-red-500'>{error}</div>}
            <button
                type='submit'
                disabled={loading}
                className='w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50'>
                {loading ? 'Creating account...' : 'Create Account'}
            </button>
        </form>
    );
}
