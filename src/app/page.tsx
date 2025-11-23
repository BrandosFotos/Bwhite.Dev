'use client';

import Hero from '@/components/NewHero';
import AboutSection from '@/components/sections/AboutSection';
import ContactPanel from '@/components/sections/ContactPanel';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import SkillsShowcase from '@/components/sections/SkillsShowcase';
import Footer from '@/components/ui/Footer';


export default function Home() {
    return (
        
        <div className='grid min-h-screen grid-rows-[auto_1fr_auto] gap-16 lg:p-8 lg:pb-20'>
            <main className='space-y-24'>
                <Hero />
                <AboutSection />
                <SkillsShowcase />
                <ProjectShowcase />
                <ExperienceTimeline />
                <ContactPanel />
            </main>
            <Footer />
        </div>
    );
}
