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
        <form onSubmit={onSubmit} className='mt-8 space-y-6'>
            <div className='space-y-4'>
                <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                        Name
                    </label>
                    <div className='mt-1'>
                        <input
                            id='name'
                            name='name'
                            type='text'
                            autoComplete='name'
                            required
                            placeholder='John Doe'
                            className='block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm'
                            disabled={loading}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                        Email
                    </label>
                    <div className='mt-1'>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            autoComplete='email'
                            required
                            placeholder='name@example.com'
                            className='block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm'
                            disabled={loading}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                        Password
                    </label>
                    <div className='mt-1'>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            autoComplete='new-password'
                            required
                            className='block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm'
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>

            {error && (
                <div className='rounded-md bg-red-50 p-4'>
                    <div className='text-sm text-red-700'>{error}</div>
                </div>
            )}

            <button
                type='submit'
                disabled={loading}
                className='flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'>
                {loading ? 'Creating account...' : 'Create Account'}
            </button>
        </form>
    );
}
