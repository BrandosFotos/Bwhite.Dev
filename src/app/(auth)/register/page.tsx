import { Metadata } from 'next';
import Link from 'next/link';

import RegisterForm from '@/components/auth/register-form';

export const metadata: Metadata = {
    title: 'Create an account',
    description: 'Create an account to get started'
};

export default function RegisterPage() {
    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-200 px-4 py-12 sm:px-6 lg:px-8'>
            <div className='w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-sm'>
                <div className='text-center'>
                    <h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
                    <p className='text-muted-foreground text-sm'>Enter your email below to create your account</p>
                </div>
                <RegisterForm />
                <p className='text-muted-foreground px-8 text-center text-sm'>
                    <Link href='/login' className='hover:text-brand underline underline-offset-4'>
                        Already have an account? Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
