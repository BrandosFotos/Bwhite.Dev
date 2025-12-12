'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skillGroups = [
    {
        title: 'Frontend systems',
        items: ['Next.js', 'React 18', 'Framer Motion', 'Tailwind CSS', 'Radix UI', 'Design tokens']
    },
    {
        title: 'Backend & DevOps',
        items: ['Node.js', 'Prisma', 'PostgreSQL', 'Redis', 'Docker', 'CI/CD pipelines']
    },
    {
        title: 'Product toolkit',
        items: ['UX prototyping', 'Design reviews', 'Technical leadership', 'Client workshops']
    }
];

export default function SkillsShowcase() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section ref={sectionRef} id='skills' className='mx-auto w-full max-w-6xl px-4'>
            <motion.div
                className='mb-8 flex flex-col gap-2'
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}>
                <motion.p
                    className='text-sm font-semibold uppercase tracking-[0.3em] text-teal-400'
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.1 }}>
                    Capabilities
                </motion.p>
                <h2 className='text-3xl font-bold text-white sm:text-4xl'>The tools I reach for first</h2>
                <p className='max-w-2xl text-sm text-zinc-400'>
                    A pragmatic stack that favors well-supported technologies, clean contracts, and teams that communicate
                    early and often.
                </p>
            </motion.div>

            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {skillGroups.map((group, groupIndex) => (
                    <motion.article
                        key={group.title}
                        className='group flex flex-col gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/40 to-zinc-900/20 p-5 shadow-lg shadow-black/20 transition-all duration-300 hover:border-teal-500/40 hover:from-zinc-900/60 hover:to-zinc-900/40 hover:shadow-teal-500/20'
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.5, delay: 0.2 + groupIndex * 0.1 }}
                        whileHover={{ scale: 1.03, y: -5 }}>
                        <div className='text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400 transition-colors group-hover:text-teal-300'>
                            {group.title}
                        </div>
                        <ul className='space-y-2 text-sm text-zinc-100'>
                            {group.items.map((skill, skillIndex) => (
                                <motion.li
                                    key={skill}
                                    className='flex items-center gap-2 text-zinc-300 transition-colors group-hover:text-zinc-100'
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.3 + groupIndex * 0.1 + skillIndex * 0.05
                                    }}>
                                    <motion.span
                                        className='h-[2px] w-6 bg-gradient-to-r from-purple-400 to-blue-400'
                                        initial={{ width: 0 }}
                                        animate={isInView ? { width: 24 } : { width: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.4 + groupIndex * 0.1 + skillIndex * 0.05
                                        }}
                                    />
                                    {skill}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}


