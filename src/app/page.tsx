'use client';
import Education from '@/components/Education';
import Hero from '@/components/Hero';
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';

import { useRef } from 'react';

export default function Home() {
    const heroRef = useRef<HTMLElement | null>(null);

    return (
        <div
            className='grid min-h-screen grid-rows-[auto_1fr_auto] gap-16 lg:p-8 lg:pb-20'
            style={{ fontFamily: 'var(--font-geist-sans)' }}>
            <Header heroRef={heroRef} />

            <main>
                <Hero ref={heroRef} />
                <Education />
            </main>
            <Footer />
        </div>
    );
}
