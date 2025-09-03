'use client';

import Link from 'next/link';

import { m as motion } from 'framer-motion';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';

type ProjectLink = {
    href: string;
    label: string;
    description?: string;
};

const projects: ProjectLink[] = [
    { href: '/mc', label: 'MC Server', description: 'Custom Minecraft Server' },
    // { href: '/projects/sprinkler', label: 'Sprinkler', description: 'Irrigation controller' },
    { href: 'https://github.com/BrandosFotos/OS-Ready', label: 'OS Ready', description: 'System setup tool' }
];

export default function ProjectsQuickLinks() {
    return (
        <section className='mx-auto w-full max-w-5xl px-4'>
            <div className='mb-6 flex items-end justify-between gap-4'>
                <div>
                    <h2 className='text-lg font-semibold tracking-tight sm:text-xl'>Featured projects</h2>
                    <p className='mt-1 text-sm text-zinc-500 dark:text-zinc-400'>A few highlights. More coming soon.</p>
                </div>
                <Link
                    href='/'
                    aria-label='View all projects'
                    className='group inline-flex items-center gap-2 rounded-full border border-zinc-300/30 bg-zinc-950/50 px-3 py-1.5 text-sm text-zinc-200 shadow-sm ring-1 ring-white/5 backdrop-blur hover:bg-zinc-900/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400'>
                    View all
                    <ArrowUpRight className='h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                </Link>
            </div>

            <div className='rounded-xl border border-white/10 bg-gradient-to-b from-zinc-900/40 to-zinc-950/60 p-4 shadow-inner shadow-black/20'>
                <div className='flex flex-wrap gap-3'>
                    {projects.slice(0, 3).map((proj) => (
                        <motion.div
                            key={proj.href}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 380, damping: 22 }}>
                            <Link
                                href={proj.href}
                                aria-label={`Open project ${proj.label}`}
                                className='group inline-flex items-center gap-2 rounded-full border border-purple-300/25 bg-gradient-to-r from-purple-500/15 to-fuchsia-500/10 px-4 py-2 text-sm text-zinc-100 shadow-sm ring-1 ring-white/5 backdrop-blur transition-colors hover:border-purple-300/40 hover:from-purple-500/25 hover:to-fuchsia-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400'>
                                <FolderGit2 className='h-4 w-4 text-purple-300/90' />
                                <span className='font-medium'>{proj.label}</span>
                                {proj.description ? (
                                    <span className='hidden text-zinc-300/80 sm:inline'>{proj.description}</span>
                                ) : null}
                                <ArrowUpRight className='ml-1 h-4 w-4 translate-x-0 opacity-70 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100' />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
