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
                    <label htmlFor='name' className='block text-sm font-semibold text-blue-400'>
                        Full Name
                    </label>
                    <div className='mt-1'>
                        <input
                            id='name'
                            name='name'
                            type='text'
                            autoComplete='name'
                            required
                            placeholder='John Doe'
                            className='block w-full appearance-none rounded-lg border-2 border-gray-600 bg-gray-800/50 px-3 py-3 text-white placeholder-gray-400 shadow-sm transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none sm:text-sm'
                            disabled={loading}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='email' className='block text-sm font-semibold text-blue-400'>
                        Email Address
                    </label>
                    <div className='mt-1'>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            autoComplete='email'
                            required
                            placeholder='name@example.com'
                            className='block w-full appearance-none rounded-lg border-2 border-gray-600 bg-gray-800/50 px-3 py-3 text-white placeholder-gray-400 shadow-sm transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none sm:text-sm'
                            disabled={loading}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='password' className='block text-sm font-semibold text-blue-400'>
                        Password
                    </label>
                    <div className='mt-1'>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            autoComplete='new-password'
                            required
                            placeholder='Create a strong password'
                            className='block w-full appearance-none rounded-lg border-2 border-gray-600 bg-gray-800/50 px-3 py-3 text-white placeholder-gray-400 shadow-sm transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none sm:text-sm'
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>

            {error && (
                <div className='rounded-lg border border-red-500/30 bg-red-500/20 p-4'>
                    <div className='text-sm text-red-400'>{error}</div>
                </div>
            )}

            <button
                type='submit'
                disabled={loading}
                className='flex w-full justify-center rounded-xl border border-transparent bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'>
                {loading ? (
                    <div className='flex items-center space-x-2'>
                        <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                        <span>Creating account...</span>
                    </div>
                ) : (
                    'Create Account'
                )}
            </button>
        </form>
    );
}
