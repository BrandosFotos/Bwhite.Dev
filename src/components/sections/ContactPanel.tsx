'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ContactPanel() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section ref={sectionRef} id='contact' className='mx-auto w-full max-w-4xl px-4'>
            <motion.div
                className='relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-fuchsia-500/20 p-8 shadow-2xl shadow-purple-500/20'
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.01 }}>
                <motion.div
                    className='pointer-events-none absolute -right-12 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-white/10 blur-3xl'
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
                <motion.div
                    className='space-y-4'
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}>
                    <motion.p
                        className='text-sm font-semibold uppercase tracking-[0.3em] text-white/70'
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.6, delay: 0.3 }}>
                        Let&apos;s make it real
                    </motion.p>
                    <h2 className='text-3xl font-bold text-white sm:text-4xl'>
                        Need a calm, hands-on engineering partner?
                    </h2>
                    <p className='text-sm text-white/80'>
                        I take on a limited number of collaborations each quarter—fractional staff roles, platform audits,
                        and end-to-end product builds. Tell me about the problem, constraints, and desired outcomes.
                    </p>
                </motion.div>
                <motion.div
                    className='mt-8 flex flex-wrap gap-3'
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 }}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            href='mailto:hello@bwhite.dev'
                            className='inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-zinc-900 transition hover:-translate-y-0.5 hover:bg-zinc-100'>
                            Start a conversation
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            href='https://cal.com'
                            className='inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10'>
                            Book a call
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}


