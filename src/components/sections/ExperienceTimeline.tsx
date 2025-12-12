'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type Experience = {
    company: string;
    role: string;
    period: string;
    summary: string;
    highlights: string[];
};

const experiences: Experience[] = [
    {
        company: 'Bwhite.dev',
        role: 'Entrepreneur',
        period: '2023 — Present',
        summary:
            'Partnered with teams and startups to architect platforms, refactor legacy stacks, and ship polished product experiences.',
        highlights: ['Technical strategy & roadmapping', 'Cross-team leadership', 'Full-stack delivery']
    },
    {
        company: 'Contract & Community work',
        role: 'Entry Engineer',
        period: '2019 — 2023',
        summary:
            'Consulted on high-visibility experiences, from immersive gaming communities to internal tooling for growth teams.',
        highlights: ['Event-driven systems', 'Performance tuning', 'Developer experience']
    },
    {
        company: 'Early career',
        role: 'Student',
        period: '2016 — 2019',
        summary:
            'Focused on learning Docker, Redis, C++, SaaS, and developing clean workflows.',
        highlights: ['Design collaborations', 'Testing culture', 'Iterative delivery']
    }
];

export default function ExperienceTimeline() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section ref={sectionRef} id='experience' className='mx-auto w-full max-w-5xl px-4'>
            <motion.div
                className='mb-10'
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}>
                <motion.p
                    className='text-sm font-semibold uppercase tracking-[0.3em] text-blue-400'
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.1 }}>
                    Journey
                </motion.p>
                <h2 className='text-3xl font-bold text-white sm:text-4xl'>Experience that scales with you</h2>
                <p className='mt-2 max-w-3xl text-sm text-zinc-400'>
                    I work best where shipping speed meets deep craft—leading teams through architecture decisions,
                    mentoring ICs, and collaborating closely with design and product.
                </p>
            </motion.div>

            <div className='relative border-l border-white/10 pl-8'>
                {experiences.map((experience, index) => (
                    <motion.article
                        key={experience.company}
                        className='group relative pb-10'
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}>
                        <motion.span
                            className='absolute -left-[10px] mt-1 h-3 w-3 rounded-full border border-white/40 bg-zinc-950 shadow-lg shadow-purple-500/30'
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : { scale: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 + index * 0.15 }}
                            whileHover={{ scale: 1.5, boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)' }}
                        />
                        <motion.div
                            className='cursor-pointer rounded-3xl border border-white/10 bg-zinc-900/30 p-6 transition-all duration-300 hover:border-blue-500/40 hover:bg-zinc-900/50 hover:shadow-lg hover:shadow-blue-500/20'
                            whileHover={{ scale: 1.02, y: -3 }}>
                            <div className='flex flex-wrap items-center justify-between gap-3 text-sm uppercase tracking-[0.2em] text-zinc-400 transition-colors group-hover:text-blue-300'>
                                <span>{experience.period}</span>
                                <motion.span
                                    className='font-bold'
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                                    transition={{ duration: 0.4, delay: 0.4 + index * 0.15 }}>
                                    #{String(index + 1).padStart(2, '0')}
                                </motion.span>
                            </div>
                            <h3 className='mt-3 text-xl font-semibold text-white transition-colors group-hover:text-blue-300'>
                                {experience.role}
                            </h3>
                            <p className='text-sm text-zinc-400 transition-colors group-hover:text-zinc-300'>{experience.company}</p>
                            <p className='mt-4 text-sm text-zinc-300'>{experience.summary}</p>
                            <ul className='mt-6 flex flex-wrap gap-2 text-xs text-white'>
                                {experience.highlights.map((highlight, highlightIndex) => (
                                    <motion.li
                                        key={highlight}
                                        className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] uppercase tracking-[0.15em] transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/20'
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.5 + index * 0.15 + highlightIndex * 0.1
                                        }}
                                        whileHover={{ scale: 1.1 }}>
                                        {highlight}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}


