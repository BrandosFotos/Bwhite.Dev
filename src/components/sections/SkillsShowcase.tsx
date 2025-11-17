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
    return (
        <section id='skills' className='mx-auto w-full max-w-6xl px-4'>
            <div className='mb-8 flex flex-col gap-2'>
                <p className='text-sm font-semibold uppercase tracking-[0.3em] text-teal-400'>Capabilities</p>
                <h2 className='text-3xl font-bold text-white sm:text-4xl'>The tools I reach for first</h2>
                <p className='max-w-2xl text-sm text-zinc-400'>
                    A pragmatic stack that favors well-supported technologies, clean contracts, and teams that communicate
                    early and often.
                </p>
            </div>

            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {skillGroups.map((group) => (
                    <article
                        key={group.title}
                        className='flex flex-col gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/40 to-zinc-900/20 p-5 shadow-lg shadow-black/20'>
                        <div className='text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400'>{group.title}</div>
                        <ul className='space-y-2 text-sm text-zinc-100'>
                            {group.items.map((skill) => (
                                <li key={skill} className='flex items-center gap-2 text-zinc-300'>
                                    <span className='h-[2px] w-6 bg-gradient-to-r from-purple-400 to-blue-400' />
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
}


