'use client';

import { useRef } from 'react';

import Education from '@/components/Education';
import Experience from '@/components/ExperienceCard';
import Hero from '@/components/Hero';
import HobbyCard from '@/components/HobbyCard';
import ProjectsCarousel from '@/components/ProjectsCarousel/ProjectsCarousel';
import SearchForm from '@/components/UserData';
import ContactForm from '@/components/ui/ContactForm/contactform';
import Footer from '@/components/ui/Footer';

export default function Home() {
    return (
        <div
            className='grid min-h-screen grid-rows-[auto_1fr_auto] gap-16 lg:p-8 lg:pb-20'
            style={{ fontFamily: 'var(--font-geist-sans)' }}>
            <main>
                <Hero />
                <Education />
                <Experience />
                {/* <HobbyCard /> */}
                {/* <SearchForm /> */}
                <ProjectsCarousel />
                <ContactForm />
            </main>
            <Footer />
        </div>
    );
}
