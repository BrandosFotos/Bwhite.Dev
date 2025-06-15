import { useEffect, useState } from 'react';

import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

export default function ScrollNavbar() {
    const [showNavbar, setShowNavbar] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = document.getElementById('hero')?.offsetHeight || 300;
            setShowNavbar(window.scrollY > heroHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openMenu = () => setMenuOpen(true);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <AnimatePresence>
                {showNavbar && (
                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className='fixed top-0 right-0 left-0 z-50 border-b border-neutral-200 bg-white/70 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/60'>
                        <div className='relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3'>
                            <h1 className='text-lg font-semibold tracking-tight'>Bwhite.Dev</h1>

                            <div className='absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block'>
                                <ul className='flex items-center space-x-6 text-sm font-medium text-neutral-700'>
                                    <li className='cursor-pointer transition hover:text-black'>
                                        <Link href='/about'>About</Link>
                                    </li>
                                    <span className='text-neutral-300'>|</span>
                                    <li className='cursor-pointer transition hover:text-black'>
                                        <Link href='/contact'>Contact</Link>
                                    </li>
                                    <span className='text-neutral-300'>|</span>
                                    <li className='cursor-pointer transition hover:text-black'>
                                        <Link href='/login'>Login</Link>
                                    </li>
                                    {session?.user?.isAdmin && (
                                        <>
                                            <span className='text-neutral-300 dark:text-neutral-700'>|</span>
                                            <li>
                                                <Link
                                                    href='/admin'
                                                    className='cursor-pointer text-blue-600 transition hover:opacity-70'>
                                                    Admin Dashboard
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>

                            {/* Mobile menu button */}
                            <div className='sm:hidden'>
                                <motion.button
                                    aria-label='Open menu'
                                    onClick={openMenu}
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.1 }}
                                    className='focus:outline-none'>
                                    <Menu className='h-6 w-6 text-neutral-700' />
                                </motion.button>
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>

            {/* Mobile menu modal */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className='bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-black'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeMenu}>
                        <motion.div
                            className='w-72 rounded-lg bg-white p-6'
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            onClick={(e) => e.stopPropagation()}>
                            <button
                                aria-label='Close menu'
                                onClick={closeMenu}
                                className='mb-4 rounded-full p-1 hover:bg-neutral-100 focus:outline-none'>
                                <X className='h-6 w-6 text-neutral-700' />
                            </button>
                            <ul className='flex flex-col space-y-4 text-lg font-semibold text-neutral-900'>
                                <li className='cursor-pointer hover:text-black'>Home</li>
                                <li className='cursor-pointer hover:text-black'>About</li>
                                <li className='cursor-pointer hover:text-black'>Contact</li>
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
