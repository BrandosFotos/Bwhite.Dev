'use client';

import React from 'react';

import { Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
    { label: 'Email', href: 'mailto:bjwhite97@gmail.com', icon: Mail },
    { label: 'GitHub', href: 'https://github.com/BrandosFotos', icon: Github },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/brandon-white-dev', icon: Linkedin }
];

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='row-start-3 w-full border-t border-white/10 bg-zinc-950/80'>
            <div className='mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 py-10 text-center text-sm text-white/80'>
                <p className='text-base font-semibold text-white'>Hands-on engineering with a builder’s heart.</p>
                <div className='flex flex-wrap items-center justify-center gap-4'>
                    {socialLinks.map(({ label, href, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-white hover:bg-white/10'>
                            <Icon className='h-4 w-4' />
                            {label}
                        </a>
                    ))}
                </div>
                <p className='text-xs uppercase tracking-[0.3em] text-white/50'>© {currentYear} Brandon White</p>
            </div>
        </footer>
    );
};

export default Footer;