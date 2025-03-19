import Hero from '@/components/Hero';
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';

export default function Home() {
    return (
        <div
            className='grid min-h-screen grid-rows-[auto_1fr_auto] gap-16 lg:p-8 lg:pb-20'
            style={{ fontFamily: 'var(--font-geist-sans)' }}>
            <Header />

            <main>
                <Hero />
            </main>
            <Footer />
        </div>
    );
}
