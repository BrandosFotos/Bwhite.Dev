const highlights = [
    {
        title: 'Human-first engineering',
        description: 'Blend reliable systems thinking with intentional visual polish so products feel as good as they look.'
    },
    {
        title: 'Velocity with intention',
        description: 'Ship fast without throwing away maintainability—documented systems, typed APIs, and tight feedback loops.'
    },
    {
        title: 'Creative mindset',
        description: 'Sifting through the bland, I develop a new way forward.'
    }
];

const stats = [
    { label: 'Years shipping', value: '3+' },
    { label: 'Products launched', value: '5' },
    { label: 'Teams partnered', value: '6' }
];

export default function AboutSection() {
    return (
        <section id='about' className='mx-auto w-full max-w-6xl px-4'>
            <div className='mb-10 flex flex-col gap-3 text-left'>
                <p className='text-sm font-semibold uppercase tracking-[0.2em] text-purple-400'>About</p>
                <h2 className='text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl'>
                    Full-stack craft with a calm confidence
                </h2>
                <p className='max-w-3xl text-base text-zinc-400'>
                    I build resilient platforms and expressive interfaces for teams who care about the details. Whether
                    it&apos;s orchestrating infrastructure, architecting APIs, or composing delightful UI systems, I help teams
                    move from vague idea to production reality.
                </p>
            </div>

            <div className='grid gap-6 lg:grid-cols-[2fr,1fr]'>
                <div className='space-y-4 rounded-3xl border border-white/10 bg-zinc-900/30 p-6 shadow-inner shadow-black/30 backdrop-blur'>
                    {highlights.map((item) => (
                        <article key={item.title} className='rounded-2xl border border-white/5 bg-black/30 p-5'>
                            <h3 className='text-lg font-semibold text-white'>{item.title}</h3>
                            <p className='mt-2 text-sm text-zinc-400'>{item.description}</p>
                        </article>
                    ))}
                </div>

                <div className='flex flex-col justify-between gap-4 rounded-3xl border border-purple-500/20 bg-gradient-to-b from-purple-500/10 via-fuchsia-500/10 to-blue-500/10 p-6'>
                    {stats.map((stat) => (
                        <div key={stat.label} className='rounded-2xl border border-white/10 bg-black/20 p-4 text-center'>
                            <div className='text-4xl font-black text-white'>{stat.value}</div>
                            <p className='mt-1 text-xs uppercase tracking-widest text-zinc-400'>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


