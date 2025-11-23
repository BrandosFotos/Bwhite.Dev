'use client';

import Link from 'next/link';

import { ArrowUpRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const projects = [
    {
        title: 'MC Creator Suite',
        description:
            'Custom multiplayer experiences, live dashboards, and seasonal content updates for my stepson & friends.',
        stack: ['Next.js', 'Node', 'Redis', 'Worker queues'],
        outcome: 'Scalable to thousands of players with automatic rollout tools.',
        href: '/mc'
    },
    {
        title: 'BeesTools',
        description: 'Scriptable setup companion that turns fresh devices into ready-to-ship workstations in minutes.',
        stack: ['Bash', 'TypeScript', 'Automation'],
        outcome: 'Cut new-device onboarding time by 80% across partner teams.',
        href: 'https://github.com/BrandosFotos/BeesTools'
    }
];

export default function ProjectShowcase() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section ref={sectionRef} id='projects' className='mx-auto w-full max-w-6xl px-4'>
            <motion.div
                className='mb-10 flex flex-col gap-2'
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}>
                <motion.p
                    className='text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-400'
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.1 }}>
                    Proof of work
                </motion.p>
                <h2 className='text-3xl font-bold text-white sm:text-4xl'>Select builds that still spark joy</h2>
                <p className='max-w-3xl text-sm text-zinc-400'>
                    A mix of client partnerships, community initiatives, and internal platforms. Each shipped with polish,
                    real-world constraints, and a measurable outcome.
                </p>
            </motion.div>

            <div className='grid gap-6 md:grid-cols-2'>
                {projects.map((project, index) => (
                    <motion.article
                        key={project.title}
                        className='group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-zinc-900/30 p-6 shadow-inner shadow-black/30 transition-all duration-300 hover:border-fuchsia-500/40 hover:bg-zinc-900/50 hover:shadow-fuchsia-500/20'
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                        whileHover={{ scale: 1.02, y: -5 }}>
                        <div>
                            <div className='flex items-center justify-between text-xs uppercase tracking-[0.25em] text-zinc-500 transition-colors group-hover:text-fuchsia-300'>
                                <span>Case study</span>
                                <span>{project.stack[0]}</span>
                            </div>
                            <motion.h3
                                className='mt-4 text-2xl font-semibold text-white transition-colors group-hover:text-fuchsia-300'
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}>
                                {project.title}
                            </motion.h3>
                            <p className='mt-2 text-sm text-zinc-300 transition-colors group-hover:text-zinc-100'>{project.description}</p>
                            <ul className='mt-4 flex flex-wrap gap-2 text-xs text-zinc-100'>
                                {project.stack.map((item, itemIndex) => (
                                    <motion.li
                                        key={item}
                                        className='rounded-full bg-white/10 px-3 py-1 text-[0.65rem] tracking-[0.15em] transition-all duration-300 hover:bg-fuchsia-500/30 hover:text-white'
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.4 + index * 0.15 + itemIndex * 0.1
                                        }}
                                        whileHover={{ scale: 1.1 }}>
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className='mt-6 flex flex-col gap-3 border-t border-white/5 pt-4 text-sm text-zinc-200'>
                            <p className='text-zinc-400 transition-colors group-hover:text-zinc-300'>{project.outcome}</p>
                            <motion.div whileHover={{ x: 5 }}>
                                <Link
                                    href={project.href}
                                    className='group/link inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-fuchsia-300'>
                                    Explore
                                    <motion.span
                                        initial={false}
                                        whileHover={{ rotate: 45, scale: 1.2 }}
                                        transition={{ duration: 0.2 }}>
                                        <ArrowUpRight className='h-4 w-4' />
                                    </motion.span>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}


