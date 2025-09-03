'use client';

import { useRef } from 'react';

import Education from '@/components/Education';
import Experience from '@/components/ExperienceCard';
import Hero from '@/components/NewHero';
import ProjectsQuickLinks from '@/components/ProjectsQuickLinks';
import Footer from '@/components/ui/Footer';
import Direction from '@/components/ui/direction';

export default function Home() {
    return (
        <div
            className='grid min-h-screen grid-rows-[auto_1fr_auto] gap-16 lg:p-8 lg:pb-20'
            style={{ fontFamily: 'var(--font-sf-pro)' }}>
            <main>
                <Hero />
                <div style={{ minHeight: '30vh', position: 'relative', overflow: 'hidden' }}>
                    <Direction />
                </div>
                <div className='mt-10'>
                    <ProjectsQuickLinks />
                </div>
                {/* <Education /> */}
                {/* <Experience /> */}
                {/* <HobbyCard /> */}
                {/* <SearchForm /> */}
                {/* <ProjectsCarousel /> */}
                {/* <ContactForm /> */}
                {/* <CircleCard /> */}
            </main>
            <Footer />
        </div>
    );
}
