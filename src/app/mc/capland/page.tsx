'use client';

import React, { useEffect, useState } from 'react';

import { BackgroundPatterns } from './components/BackgroundPatterns';
import { GallerySection } from './components/GallerySection';
import { VersionsSection } from './components/VersionsSection';
import { colors, icons } from './components/theme';
import { motion } from 'framer-motion';

interface GalleryImage {
    id: number;
    fileName: string;
    title?: string;
    description?: string;
    minecraftUsername?: string;
    createdAt: string;
    user: {
        name?: string;
        email: string;
    };
}

interface Version {
    id: number;
    fileName: string;
    packVersion: string;
    createdAt: string;
}

export default function CaplandPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const tabs = [
        { key: 'overview', label: 'Overview', icon: icons.overview },
        { key: 'rules', label: 'Rules', icon: icons.rules },
        { key: 'join', label: 'Join Capland', icon: icons.join }
    ];

    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [versions, setVersions] = useState<Version[]>([]);

    useEffect(() => {
        fetch('/api/gallery')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setGalleryImages(data);
                else setGalleryImages([]);
            })
            .catch((err) => console.error('Error fetching gallery images:', err));
    }, []);

    useEffect(() => {
        fetch('/api/versions')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setVersions(data);
                else setVersions([]);
            })
            .catch((err) => console.error('Error fetching versions:', err));
    }, []);

    return (
        <div className='relative min-h-screen text-white'>
            {/* Background */}
            <BackgroundPatterns />

            {/* Main content */}
            <div className={`relative z-10 px-4`}>
                {/* Header */}
                <motion.div
                    className='py-10 text-center'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}>
                    <h1 className={`bg-clip-text text-5xl font-bold ${colors.text}`}>Capland Server</h1>
                    <p className={`mx-auto mt-4 max-w-2xl text-lg ${colors.textSecondary}`}>
                        Welcome to Capland — a creative, family-friendly Minecraft world where everyone is welcome.
                    </p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    className='mb-8 flex flex-wrap justify-center gap-3'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}>
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.key;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 sm:w-auto sm:text-base ${
                                    isActive ? colors.tabActive : colors.tabInactive
                                }`}>
                                <span className='text-lg'>{tab.icon}</span>
                                {tab.label}
                            </button>
                        );
                    })}
                </motion.div>

                {/* Tab Content */}
                <div className='mx-auto max-w-3xl text-center'>
                    {activeTab === 'overview' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}>
                            <h2 className='mb-3 text-2xl font-bold'>About Capland</h2>
                            <p className={`leading-relaxed ${colors.textSecondary}`}>
                                Capland is a survival-based Minecraft realm where creativity meets community. Build
                                cities, explore, trade, and make memories with friends and family in a safe and
                                welcoming environment. All players are encouraged to be kind, helpful, and respectful.
                            </p>
                        </motion.div>
                    )}

                    {activeTab === 'rules' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}>
                            <h2 className='mb-3 text-2xl font-bold'>Rules & Guidelines</h2>
                            <ul className={`mx-auto max-w-md space-y-2 text-left ${colors.textSecondary}`}>
                                <li>• Be respectful to all players.</li>
                                <li>• No griefing, stealing, or cheating.</li>
                                <li>• Keep chat friendly — this is a family-safe space.</li>
                                <li>• Build responsibly and respect others’ areas.</li>
                                <li>• Have fun and help new players feel welcome!</li>
                            </ul>
                        </motion.div>
                    )}

                    {activeTab === 'join' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}>
                            <h2 className='mb-3 text-2xl font-bold'>Join Capland</h2>
                            <p className={`mb-4 ${colors.textSecondary}`}>
                                We welcome you to join! We use CurseForge to make distribution of mods, settings, and
                                configuration easy and quick. Below are instructions to install and join us. We hope to
                                see you soon!
                            </p>

                            {/* Instructions */}
                            <div className={`mx-auto mb-6 max-w-md space-y-2 text-left ${colors.textSecondary}`}>
                                <p>
                                    1. Install the{' '}
                                    <a
                                        href='https://curseforge.overwolf.com/'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='text-amber-300 underline'>
                                        CurseForge Launcher
                                    </a>
                                    .
                                </p>
                                <p>2. Download the Capland modpack using the version list below.</p>
                                <p>
                                    3. Open CurseForge, click "Import Modpack" (or "Add Existing Modpack"), and select
                                    the downloaded file.
                                </p>
                                <p>4. Launch the modpack and connect using the server IP below.</p>
                            </div>

                            {/* VersionsSection */}
                            <VersionsSection versions={versions} />

                            {/* Server IP */}
                            <p className='mt-4 text-center text-sm text-gray-400'>
                                Server IP: mc.bwhite.dev — Modpack works with CurseForge Launcher.
                            </p>
                        </motion.div>
                    )}
                </div>

                {/* Gallery Section */}
                <GallerySection
                    images={galleryImages}
                    isWhitelisted={true}
                    onImageUpload={(newImage) => setGalleryImages((prev) => [newImage, ...prev])}
                />

                {/* Footer */}
                <footer className='mt-12 pb-6 text-center text-sm text-gray-500'>
                    © {new Date().getFullYear()} Capland • Part of the bwhite.dev Network
                </footer>
            </div>
        </div>
    );
}
