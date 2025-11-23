'use client';

import React from 'react';

import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

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
                <motion.p
                    className='text-base font-semibold text-white'
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}>
                    Hands-on engineering with a builder's heart.
                </motion.p>
                <div className='flex flex-wrap items-center justify-center gap-4'>
                    {socialLinks.map(({ label, href, icon: Icon }, index) => (
                        <motion.a
                            key={label}
                            href={href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-white hover:bg-white/10'
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}>
                            <Icon className='h-4 w-4' />
                            {label}
                        </motion.a>
                    ))}
                </div>
                <motion.p
                    className='text-xs uppercase tracking-[0.3em] text-white/50'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}>
                    © {currentYear} Brandon White
                </motion.p>
            </div>
        </footer>
    );
};

export default Footer;