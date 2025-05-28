'use client';

import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import '@/components/ui/FramerStyles/NavMenuModal.css';
import ThemeSwitcher from '@/components/ui/ThemeSwitch';

import { AnimatePresence, motion, useAnimation, useInView } from 'framer-motion';

interface HeaderProps {
    heroRef: React.RefObject<HTMLElement | null>;
}

interface ModalProps {
    onClose: () => void;
}

function Modal({ onClose }: ModalProps) {
    return (
        <motion.div
            className='overlay'
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <motion.div
                className='modal-card'
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                <div className='mb-6 flex justify-center'>
                    <ThemeSwitcher />
                </div>

                {/* Links Aligned to the Left */}
                <nav className='flex flex-col items-center space-y-4'>
                    <Link href='/about' className='text-lg hover:opacity-70'>
                        About Me
                    </Link>
                    <Link href='/contact' className='text-lg hover:opacity-70'>
                        Contact Me
                    </Link>
                    <Link href='/projects' className='text-lg hover:opacity-70'>
                        Projects
                    </Link>
                </nav>

                <button className='close-button' onClick={onClose}>
                    Close
                </button>
            </motion.div>
        </motion.div>
    );
}

const Header: React.FC<HeaderProps> = ({ heroRef }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState('');

    // Watch scroll past hero
    const [isHeroInView, setIsHeroInView] = useState(true);

    useEffect(() => {
        if (!heroRef.current) return;

        const observer = new IntersectionObserver(([entry]) => setIsHeroInView(entry.isIntersecting), {
            rootMargin: '-100px'
        });

        observer.observe(heroRef.current);

        return () => {
            if (heroRef.current) observer.unobserve(heroRef.current);
        };
    }, [heroRef]);

    const inView = isHeroInView;

    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            y: inView ? -100 : 0,
            opacity: inView ? 0 : 3,
            transition: { duration: 0.4, ease: 'easeOut' }
        });
    }, [inView]);

    useEffect(() => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        setTheme(currentTheme);

        const observer = new MutationObserver(() => {
            const newTheme = document.documentElement.getAttribute('data-theme') || 'light';
            setTheme(newTheme);
        });

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        return () => observer.disconnect();
    }, []);

    return (
        <motion.nav
            animate={controls}
            initial={{ y: -100, opacity: 0 }}
            className={`fixed top-0 right-0 left-0 z-50 bg-white/80 backdrop-blur-md transition-all duration-300 dark:bg-black/50`}>
            <nav className={`flex flex-wrap items-center justify-between p-6 transition-all duration-300`}>
                {/* Logo */}
                <div className='mr-6 flex flex-shrink-0 items-center'>
                    <svg
                        className='mr-2 h-8 w-8 fill-current'
                        width='54'
                        height='54'
                        viewBox='0 0 54 54'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path d='M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z' />
                    </svg>
                    <span className='text-xl font-semibold tracking-tight'>Bwhite.Dev</span>
                </div>

                {/* Mobile Menu Button */}
                <div className='block lg:hidden'>
                    <button
                        onClick={() => setIsOpen(true)}
                        className='open-button flex items-center rounded border px-3 py-2 hover:border-white hover:text-white'>
                        <svg className='h-4 w-4 fill-current' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
                        </svg>
                    </button>

                    {/* Dropdown Menu (Visible when isOpen is true) */}
                    <AnimatePresence>{isOpen && <Modal onClose={() => setIsOpen(false)} />}</AnimatePresence>
                </div>

                {/* Desktop Menu */}
                <div className='hidden flex-grow items-center justify-center lg:flex'>
                    <Link href='/about' className='mx-4 hover:opacity-70'>
                        About Me
                    </Link>
                    <Link href='/contact' className='mx-4 hover:opacity-70'>
                        Contact Me
                    </Link>
                    <Link href='/projects' className='mx-4 hover:opacity-70'>
                        Projects
                    </Link>
                </div>

                <div className='hidden lg:block'>
                    <ThemeSwitcher />
                </div>

                {/* Support Button */}
                <div className='hidden lg:block'>
                    <a href='https://ko-fi.com/BrandosFotos' target='_blank' rel='noopener noreferrer'>
                        <button className='rounded bg-gradient-to-r from-[#4b2e2e] to-[#c4a484] px-4 py-2 font-bold text-white backdrop-blur-md transition-colors'>
                            Ko-Fi
                        </button>
                    </a>
                </div>
            </nav>
        </motion.nav>
    );
};

export default Header;
