'use client';

import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { signIn } from 'next-auth/react';

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl
            });

            if (!result?.error) {
                // Successful login
                router.push(callbackUrl);
                router.refresh();
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className='mt-8 space-y-6'>
            <div className='space-y-4'>
                <div>
                    <label htmlFor='email' className='block text-sm font-semibold text-green-400'>
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
                            className='block w-full appearance-none rounded-lg border-2 border-gray-600 bg-gray-800/50 px-3 py-3 text-white placeholder-gray-400 shadow-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none sm:text-sm'
                            disabled={loading}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='password' className='block text-sm font-semibold text-green-400'>
                        Password
                    </label>
                    <div className='mt-1'>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            autoComplete='current-password'
                            required
                            placeholder='Enter your password'
                            className='block w-full appearance-none rounded-lg border-2 border-gray-600 bg-gray-800/50 px-3 py-3 text-white placeholder-gray-400 shadow-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none sm:text-sm'
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
                className='flex w-full justify-center rounded-xl border border-transparent bg-gradient-to-r from-green-500 to-blue-500 px-4 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:from-green-600 hover:to-blue-600 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'>
                {loading ? (
                    <div className='flex items-center space-x-2'>
                        <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                        <span>Signing in...</span>
                    </div>
                ) : (
                    'Sign In'
                )}
            </button>
        </form>
    );
}
