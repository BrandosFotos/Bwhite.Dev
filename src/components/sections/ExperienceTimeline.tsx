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
    return (
        <section id='experience' className='mx-auto w-full max-w-5xl px-4'>
            <div className='mb-10'>
                <p className='text-sm font-semibold uppercase tracking-[0.3em] text-blue-400'>Journey</p>
                <h2 className='text-3xl font-bold text-white sm:text-4xl'>Experience that scales with you</h2>
                <p className='mt-2 max-w-3xl text-sm text-zinc-400'>
                    I work best where shipping speed meets deep craft—leading teams through architecture decisions,
                    mentoring ICs, and collaborating closely with design and product.
                </p>
            </div>

            <div className='relative border-l border-white/10 pl-8'>
                {experiences.map((experience, index) => (
                    <article key={experience.company} className='relative pb-10'>
                        <span className='absolute -left-[10px] mt-1 h-3 w-3 rounded-full border border-white/40 bg-zinc-950 shadow-lg shadow-purple-500/30' />
                        <div className='rounded-3xl border border-white/10 bg-zinc-900/30 p-6'>
                            <div className='flex flex-wrap items-center justify-between gap-3 text-sm uppercase tracking-[0.2em] text-zinc-400'>
                                <span>{experience.period}</span>
                                <span>#{String(index + 1).padStart(2, '0')}</span>
                            </div>
                            <h3 className='mt-3 text-xl font-semibold text-white'>{experience.role}</h3>
                            <p className='text-sm text-zinc-400'>{experience.company}</p>
                            <p className='mt-4 text-sm text-zinc-300'>{experience.summary}</p>
                            <ul className='mt-6 flex flex-wrap gap-2 text-xs text-white'>
                                {experience.highlights.map((highlight) => (
                                    <li
                                        key={highlight}
                                        className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] uppercase tracking-[0.15em]'>
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}


