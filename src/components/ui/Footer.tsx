import React from 'react';

import Image from 'next/image';

import ThemeSwitcher from '@/components/ui/ThemeSwitch';

const Footer: React.FC = () => {
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
            <ThemeSwitcher />
        </footer>
    );
};

export default Footer;
