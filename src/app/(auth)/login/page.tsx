import { Metadata } from 'next';
import Link from 'next/link';

import LoginForm from '@/components/auth/login-form';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login to your account'
};

export default function LoginPage() {
    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-200 px-4 py-12 sm:px-6 lg:px-8'>
            <div className='w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-sm'>
                <div className='text-center'>
                    <h1 className='text-3xl font-bold text-gray-900'>Welcome back</h1>
                    <p className='mt-2 text-sm text-gray-600'>Enter your email to sign in to your account</p>
                </div>
                <LoginForm />
                <p className='text-center text-sm text-gray-600'>
                    <Link
                        href='/register'
                        className='font-medium text-indigo-600 transition-colors hover:text-indigo-500'>
                        Don&apos;t have an account? Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
