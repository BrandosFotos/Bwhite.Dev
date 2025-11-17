import Link from 'next/link';

import { ArrowUpRight } from 'lucide-react';

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
    return (
        <section id='projects' className='mx-auto w-full max-w-6xl px-4'>
            <div className='mb-10 flex flex-col gap-2'>
                <p className='text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-400'>Proof of work</p>
                <h2 className='text-3xl font-bold text-white sm:text-4xl'>Select builds that still spark joy</h2>
                <p className='max-w-3xl text-sm text-zinc-400'>
                    A mix of client partnerships, community initiatives, and internal platforms. Each shipped with polish,
                    real-world constraints, and a measurable outcome.
                </p>
            </div>

            <div className='grid gap-6 md:grid-cols-2'>
                {projects.map((project) => (
                    <article
                        key={project.title}
                        className='flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-zinc-900/30 p-6 shadow-inner shadow-black/30'>
                        <div>
                            <div className='flex items-center justify-between text-xs uppercase tracking-[0.25em] text-zinc-500'>
                                <span>Case study</span>
                                <span>{project.stack[0]}</span>
                            </div>
                            <h3 className='mt-4 text-2xl font-semibold text-white'>{project.title}</h3>
                            <p className='mt-2 text-sm text-zinc-300'>{project.description}</p>
                            <ul className='mt-4 flex flex-wrap gap-2 text-xs text-zinc-100'>
                                {project.stack.map((item) => (
                                    <li key={item} className='rounded-full bg-white/10 px-3 py-1 text-[0.65rem] tracking-[0.15em]'>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='mt-6 flex flex-col gap-3 border-t border-white/5 pt-4 text-sm text-zinc-200'>
                            <p className='text-zinc-400'>{project.outcome}</p>
                            <Link
                                href={project.href}
                                className='inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-fuchsia-300'>
                                Explore
                                <ArrowUpRight className='h-4 w-4' />
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}


