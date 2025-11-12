'use client';

import React from 'react';

import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { LogOut } from 'lucide-react';

const Footer: React.FC = () => {
    const { data: session } = useSession();

    return (
        <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
            <a
                className='flex items-center gap-2 hover:underline hover:underline-offset-4'
                href=''
                target='_blank'
                rel='noopener noreferrer'>
                <Image aria-hidden src='/file.svg' alt='File icon' width={16} height={16} />
                Contact Me
            </a>
            <a
                className='flex items-center gap-2 hover:underline hover:underline-offset-4'
                href=''
                target='_blank'
                rel='noopener noreferrer'>
                <Image aria-hidden src='/window.svg' alt='Window icon' width={16} height={16} />
                Projects
            </a>
            <a
                className='flex items-center gap-2 hover:underline hover:underline-offset-4'
                href='https://github.com/BrandosFotos/'
                target='_blank'
                rel='noopener noreferrer'>
                <Image aria-hidden src='/globe.svg' alt='Globe icon' width={16} height={16} />
                Support me on GitHub
            </a>
            {session && (
                <>
                    <span className='text-gray-400'>|</span>
                    <button
                        onClick={async () => {
                            await signOut({ 
                                callbackUrl: '/',
                                redirect: true 
                            });
                        }}
                        className='flex items-center gap-2 text-red-500 hover:underline hover:underline-offset-4 transition-colors'>
                        <LogOut className='h-4 w-4' />
                        Logout
                    </button>
                </>
            )}
        </footer>
    );
};

export default Footer;
