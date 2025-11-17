'use client';

import Hero from '@/components/NewHero';
import ProjectsQuickLinks from '@/components/ProjectsQuickLinks';
import AboutSection from '@/components/sections/AboutSection';
import ContactPanel from '@/components/sections/ContactPanel';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import SkillsShowcase from '@/components/sections/SkillsShowcase';
import Footer from '@/components/ui/Footer';
import Direction from '@/components/ui/direction';

export default function Home() {
    return (
        <div className='grid min-h-screen grid-rows-[auto_1fr_auto] gap-16 lg:p-8 lg:pb-20'>
            <main className='space-y-24'>
                <Hero />
                {/* <div className='min-h-[30vh] overflow-hidden'>
                    <Direction />
                </div> */}
                <AboutSection />
                <SkillsShowcase />
                <ExperienceTimeline />
                <ProjectShowcase />
                {/* <ProjectsQuickLinks /> */}
                <ContactPanel />
            </main>
            <Footer />
        </div>
    );
}
