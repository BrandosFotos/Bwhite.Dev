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

export default function VanillaPlusPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const tabs = [
        { key: 'overview', label: 'Overview', icon: icons.overview },
        { key: 'rules', label: 'Rules', icon: icons.rules },
        { key: 'join', label: 'Join Vanilla+', icon: icons.join }
    ];

    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [versions, setVersions] = useState<Version[]>([]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetch('/api/gallery?pack=VANILLAPLUS')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setGalleryImages(data);
                else setGalleryImages([]);
            })
            .catch((err) => console.error('Error fetching gallery images:', err));
    }, []);

    useEffect(() => {
        fetch('/api/versions?pack=VANILLAPLUS')
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
                    <h1 className={`text-5xl font-bold ${colors.text}`}>Vanilla+ Server</h1>
                    <p className={`mx-auto mt-4 max-w-2xl text-lg ${colors.textSecondary}`}>
                        Welcome to Vanilla+ — a family-friendly Minecraft server with enhanced vanilla gameplay where
                        everyone is welcome.
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
                            <h2 className='mb-3 text-2xl font-bold'>About Vanilla+</h2>
                            <p className={`mb-4 leading-relaxed ${colors.textSecondary}`}>
                                Vanilla+ is a Minecraft server that enhances the vanilla experience with quality-of-life
                                improvements and carefully selected additions. Enjoy the classic Minecraft gameplay you
                                love, with subtle enhancements that make the experience even better. All players are
                                encouraged to be kind, helpful, and respectful.
                            </p>
                            <div className={`mx-auto mt-6 max-w-md rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4 backdrop-blur-sm ${colors.textSecondary}`}>
                                <div className='space-y-2 text-sm'>
                                    <p className='flex items-center justify-center gap-2'>
                                        <span className='text-amber-400'>🎮</span>
                                        <span><strong>Minecraft Version:</strong> 1.21.10</span>
                                    </p>
                                    <p className='flex items-center justify-center gap-2'>
                                        <span className='text-amber-400'>🔌</span>
                                        <span><strong>IP Address:</strong> mc.bwhite.dev:25585</span>
                                    </p>
                                </div>
                            </div>
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
                                <li>• Build responsibly and respect others' areas.</li>
                                <li>• Have fun and help new players feel welcome!</li>
                            </ul>
                        </motion.div>
                    )}

                    {activeTab === 'join' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}>
                            <h2 className='mb-3 text-2xl font-bold'>Join Vanilla+</h2>
                            <p className={`mb-6 ${colors.textSecondary}`}>
                                Ready to jump in? While the modpack is <strong className='text-white'>not required</strong> to join, 
                                we <strong className='text-white'>suggest</strong> using it as it includes client mods that enhance 
                                the user experience and allow you to join the in-game voice chat.
                            </p>

                            {/* Instructions */}
                            <div className={`mx-auto mb-6 max-w-md space-y-4 text-left ${colors.textSecondary}`}>
                                <div className='flex gap-3'>
                                    <span className='text-2xl'>1️⃣</span>
                                    <div>
                                        <p className='mb-1 font-semibold text-white'>Get CurseForge</p>
                                        <p>
                                            First, grab the{' '}
                                            <a
                                                href='https://curseforge.overwolf.com/'
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='text-amber-300 underline hover:text-amber-200'>
                                                CurseForge Launcher
                                            </a>
                                            {' '}— it's free and makes everything super easy!
                                        </p>
                                    </div>
                                </div>
                                <div className='flex gap-3'>
                                    <span className='text-2xl'>2️⃣</span>
                                    <div>
                                        <p className='mb-1 font-semibold text-white'>Download the Modpack (Optional)</p>
                                        <p>Click the download button below to get the latest Vanilla+ modpack. This is optional but recommended for the best experience, including in-game voice chat.</p>
                                    </div>
                                </div>
                                <div className='flex gap-3'>
                                    <span className='text-2xl'>3️⃣</span>
                                    <div>
                                        <p className='mb-1 font-semibold text-white'>Import & Launch</p>
                                        <p>
                                            In CurseForge, click "Import Modpack" and select the file you just downloaded. 
                                            Then hit play and you're ready to go!
                                        </p>
                                    </div>
                                </div>
                                <div className='flex gap-3'>
                                    <span className='text-2xl'>4️⃣</span>
                                    <div>
                                        <p className='mb-1 font-semibold text-white'>Connect to the Server</p>
                                        <p>Use the server address below to join us. We can't wait to see you in-game! 🎉</p>
                                    </div>
                                </div>
                            </div>

                            {versions.length > 0 && versions[0] && (
                                <motion.div
                                    className='mt-6'
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}>
                                    <a
                                        href={`/api/uploads/${versions[0].id}`}
                                        className='inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-blue-600 hover:shadow-green-500/40'>
                                        <span className='text-2xl'>📥</span>
                                        Download Latest Modpack (v{versions[0].packVersion})
                                    </a>
                                </motion.div>
                            )}

                            {/* Server IP */}
                            <motion.div
                                className='mt-8'
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}>
                                <div className='mx-auto max-w-md rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-6 backdrop-blur-sm'>
                                    <div className='mb-3 flex items-center justify-center gap-2'>
                                        <span className='text-2xl'>🌐</span>
                                        <h3 className='text-lg font-semibold text-amber-400'>Server Information</h3>
                                    </div>
                                    <div className='mb-4 flex items-center justify-center gap-3'>
                                        <code className='rounded-lg bg-black/30 px-4 py-2 text-lg font-mono font-bold text-white'>
                                            mc.bwhite.dev:25585
                                        </code>
                                        <button
                                            onClick={async () => {
                                                try {
                                                    await navigator.clipboard.writeText('mc.bwhite.dev:25585');
                                                    setCopied(true);
                                                    setTimeout(() => setCopied(false), 2000);
                                                } catch (err) {
                                                    console.error('Failed to copy:', err);
                                                }
                                            }}
                                            className='rounded-lg bg-amber-500/20 p-2 text-amber-400 transition-all duration-300 hover:bg-amber-500/30 hover:scale-110'
                                            title={copied ? 'Copied!' : 'Copy to clipboard'}>
                                            {copied ? (
                                                <svg
                                                    className='h-5 w-5'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    viewBox='0 0 24 24'>
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        strokeWidth={2}
                                                        d='M5 13l4 4L19 7'
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className='h-5 w-5'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    viewBox='0 0 24 24'>
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        strokeWidth={2}
                                                        d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    <p className='text-center text-sm text-gray-300'>
                                        <span className='text-amber-400'>💡</span> Modpack works with{' '}
                                        <a
                                            href='https://curseforge.overwolf.com/'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='text-amber-300 underline hover:text-amber-200'>
                                            CurseForge Launcher
                                        </a>
                                    </p>
                                </div>
                            </motion.div>
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
                    © {new Date().getFullYear()} Vanilla+  • Part of the bwhite.dev Network
                </footer>
            </div>
        </div>
    );
}

