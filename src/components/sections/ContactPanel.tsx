import Link from 'next/link';

export default function ContactPanel() {
    return (
        <section id='contact' className='mx-auto w-full max-w-4xl px-4'>
            <div className='relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-fuchsia-500/20 p-8 shadow-2xl shadow-purple-500/20'>
                <div className='pointer-events-none absolute -right-12 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-white/10 blur-3xl' />
                <div className='space-y-4'>
                    <p className='text-sm font-semibold uppercase tracking-[0.3em] text-white/70'>Let&apos;s make it real</p>
                    <h2 className='text-3xl font-bold text-white sm:text-4xl'>Need a calm, hands-on engineering partner?</h2>
                    <p className='text-sm text-white/80'>
                        I take on a limited number of collaborations each quarter—fractional staff roles, platform audits,
                        and end-to-end product builds. Tell me about the problem, constraints, and desired outcomes.
                    </p>
                </div>
                <div className='mt-8 flex flex-wrap gap-3'>
                    <Link
                        href='mailto:hello@bwhite.dev'
                        className='inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-zinc-900 transition hover:-translate-y-0.5 hover:bg-zinc-100'>
                        Start a conversation
                    </Link>
                    <Link
                        href='https://cal.com'
                        className='inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10'>
                        Book a call
                    </Link>
                </div>
            </div>
        </section>
    );
}


