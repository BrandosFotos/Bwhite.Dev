import { Suspense } from 'react';

import { Metadata } from 'next';
import Link from 'next/link';

import LoginForm from '@/components/auth/login-form';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login to your account'
};

export default function LoginPage() {
    return (
        <div className='relative min-h-screen bg-black'>
            {/* Neon Background */}
            <div className='fixed inset-0 -z-10'>
                <div className='absolute inset-0 bg-black'>
                    {/* Neon grid */}
                    <div className='absolute inset-0 opacity-30'>
                        <div
                            className='absolute inset-0'
                            style={{
                                backgroundImage: `
                                    linear-gradient(90deg, rgba(0, 255, 127, 0.1) 1px, transparent 1px),
                                    linear-gradient(rgba(0, 255, 127, 0.1) 1px, transparent 1px)
                                `,
                                backgroundSize: '40px 40px'
                            }}></div>
                    </div>

                    {/* Animated neon lines */}
                    <div className='absolute inset-0 overflow-hidden'>
                        <div className='absolute top-1/4 left-0 h-px w-full animate-pulse bg-gradient-to-r from-transparent via-green-400 to-transparent'></div>
                        <div className='absolute top-1/2 left-0 h-px w-full animate-pulse bg-gradient-to-r from-transparent via-blue-400 to-transparent delay-1000'></div>
                        <div className='absolute top-3/4 left-0 h-px w-full animate-pulse bg-gradient-to-r from-transparent via-purple-400 to-transparent delay-2000'></div>
                    </div>

                    {/* Glowing orbs */}
                    <div className='absolute inset-0'>
                        <div className='absolute top-1/3 left-1/4 h-32 w-32 animate-pulse rounded-full bg-green-500/20 blur-xl'></div>
                        <div className='absolute right-1/4 bottom-1/3 h-24 w-24 animate-pulse rounded-full bg-blue-500/20 blur-xl delay-1000'></div>
                        <div className='absolute top-1/2 right-1/3 h-16 w-16 animate-pulse rounded-full bg-purple-500/20 blur-xl delay-2000'></div>
                    </div>
                </div>
            </div>

            <div className='relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
                <div className='w-full max-w-md space-y-8 rounded-xl border border-green-500/20 bg-gray-900/50 p-8 shadow-2xl backdrop-blur-sm'>
                    <div className='text-center'>
                        <h1 className='text-3xl font-bold text-white'>Welcome Back</h1>
                        <p className='mt-2 text-sm text-gray-400'>Enter your credentials to access your account</p>
                    </div>

                    <div>
                        <Suspense
                            fallback={
                                <div className='flex justify-center'>
                                    <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-green-400'></div>
                                </div>
                            }>
                            <LoginForm />
                        </Suspense>
                    </div>

                    <div className='text-center'>
                        <p className='text-sm text-gray-400'>
                            <Link
                                href='/register'
                                className='font-medium text-green-400 transition-colors hover:text-green-300 hover:underline'>
                                Don&apos;t have an account? Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
