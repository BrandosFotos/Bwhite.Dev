'use client';

import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from 'lucide-react';

export default function ScrollNavbar() {
    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = document.getElementById('hero')?.offsetHeight || 300;
            setShowNavbar(window.scrollY > heroHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {showNavbar && (
                <motion.nav
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className='fixed top-0 right-0 left-0 z-50 border-b border-neutral-200 bg-white/70 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/60'>
                    <div className='relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3'>
                        {/* Left: Site title */}
                        <h1 className='text-lg font-semibold tracking-tight'>Bwhite.Dev</h1>

                        {/* Center: Nav items (absolutely centered, hidden on small screens) */}
                        <div className='absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block'>
                            <ul className='flex items-center space-x-6 text-sm font-medium text-neutral-700'>
                                <li className='transition hover:text-black'>Home</li>
                                <span className='text-neutral-300'>|</span>
                                <li className='transition hover:text-black'>About</li>
                                <span className='text-neutral-300'>|</span>
                                <li className='transition hover:text-black'>Contact</li>
                            </ul>
                        </div>

                        {/* Right: Mobile menu button (hidden on larger screens) */}
                        <div className='sm:hidden'>
                            <button aria-label='Open menu'>
                                <Menu className='h-6 w-6 text-neutral-700' />
                            </button>
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
