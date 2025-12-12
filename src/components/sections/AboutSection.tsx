'use client';

import { useEffect, useRef, useState } from 'react';

import ScrollFloat from '../ui/ScrollFloat';
import { motion, useInView } from 'framer-motion';

const highlights = [
    {
        title: 'Human-first engineering',
        description:
            'Blend reliable systems thinking with intentional visual polish so products feel as good as they look.'
    },
    {
        title: 'Velocity with intention',
        description:
            'Ship fast without throwing away maintainability—documented systems, typed APIs, and tight feedback loops.'
    },
    {
        title: 'Creative mindset',
        description: 'Sifting through the bland, I develop a new way forward.'
    }
];

const stats = [
    { label: 'Years shipping', value: 3, suffix: '+' },
    { label: 'Products launched', value: 5 },
    { label: 'Teams partnered', value: 6 }
];

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <span ref={ref} className='text-4xl font-black text-white'>
            {count}
            {suffix}
        </span>
    );
}

export default function AboutSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section ref={sectionRef} id='about' className='text-center mx-auto w-full max-w-6xl px-4'>
            <ScrollFloat
                animationDuration={3}
                ease='back.inOut(2)'
                scrollStart='center bottom+=40%'
                scrollEnd='bottom bottom-=60%'
                stagger={0.05}>
                    Consistency.   Clarity.   Creativity.
            </ScrollFloat>
            <motion.div
                className='mb-10 flex flex-col gap-3 text-left'
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}>
                <motion.p
                    className='text-sm font-semibold tracking-[0.2em] text-purple-400 uppercase'
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.1 }}>
                    About
                </motion.p>
                <h2 className='text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl'>
                    Full-stack craft with a calm confidence
                </h2>
                <p className='max-w-3xl text-base text-zinc-400'>
                    I build resilient platforms and expressive interfaces for teams who care about the details. Whether
                    it&apos;s orchestrating infrastructure, architecting APIs, or composing delightful UI systems, I
                    help teams move from vague idea to production reality.
                </p>
            </motion.div>

            <div className='grid gap-6 lg:grid-cols-[2fr,1fr]'>
                <motion.div
                    className='space-y-4 rounded-3xl border border-white/10 bg-zinc-900/30 p-6 shadow-inner shadow-black/30 backdrop-blur'
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.6, delay: 0.2 }}>
                    {highlights.map((item, index) => (
                        <motion.article
                            key={item.title}
                            className='group cursor-pointer rounded-2xl border border-white/5 bg-black/30 p-5 transition-all duration-300 hover:border-white/20 hover:bg-black/50 hover:shadow-lg hover:shadow-purple-500/20'
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -2 }}>
                            <h3 className='text-lg font-semibold text-white transition-colors group-hover:text-purple-300'>
                                {item.title}
                            </h3>
                            <p className='mt-2 text-sm text-zinc-400 transition-colors group-hover:text-zinc-300'>
                                {item.description}
                            </p>
                        </motion.article>
                    ))}
                </motion.div>

                <motion.div
                    className='flex flex-col justify-between gap-4 rounded-3xl border border-purple-500/20 bg-gradient-to-b from-purple-500/10 via-fuchsia-500/10 to-blue-500/10 p-6'
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                    transition={{ duration: 0.6, delay: 0.2 }}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className='group rounded-2xl border border-white/10 bg-black/20 p-4 text-center transition-all duration-300 hover:border-purple-500/40 hover:bg-black/30 hover:shadow-lg hover:shadow-purple-500/20'
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}>
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            <p className='mt-1 text-xs tracking-widest text-zinc-400 uppercase transition-colors group-hover:text-purple-300'>
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
