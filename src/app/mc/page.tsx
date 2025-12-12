'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { BackgroundPatterns } from './components/BackgroundPatterns';
import { AnimatePresence, motion } from 'framer-motion';

interface Version {
    id: number;
    fileName: string;
    packVersion: string;
    createdAt: string;
}

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

type ActiveTab = 'Capland' | 'SkyBlock' | 'Vanilla+';

export default function MinecraftPage() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('Capland');

    const tabs = [
        { key: 'Vanilla+' as ActiveTab, label: 'Vanilla+', icon: '🖼️', href: '/mc/vanilla-plus' },
        { key: 'Capland' as ActiveTab, label: 'Capland', icon: '🖥️', href: '/mc/capland' },
    ];

    return (
        <div className='relative min-h-screen'>
            {/* Background */}
            <div className='fixed inset-0 -z-10'>
                <BackgroundPatterns />
            </div>

            <div className='relative z-10 container mx-auto px-4 py-8'>
                {/* Header */}
                <motion.div
                    className='mb-12 text-center'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}>
                    <motion.h1
                        className='mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-6xl font-bold text-transparent'
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}>
                        Our Servers
                    </motion.h1>
                    <p className='mx-auto max-w-2xl text-xl text-gray-300'>
                        Join our family-friendly Minecraft community! Build, explore, and create amazing things
                        together.
                    </p>
                </motion.div>

                {/* Family-Friendly Block */}

                {/* Tabs */}
                <motion.div
                    className='mb-8 flex justify-center'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}>
                    <div className='flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-lg sm:flex-row'>
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.key;
                            return (
                                <motion.div
                                    key={tab.key}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    className='flex-1'>
                                    <Link
                                        href={tab.href}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`flex w-full items-center justify-between gap-4 rounded-xl px-4 py-4 text-center font-semibold transition-all duration-300 sm:px-6 sm:py-5 ${
                                            isActive
                                                ? 'bg-white text-gray-900 shadow-lg'
                                                : 'text-white hover:bg-white/10 active:scale-[0.98]'
                                        }`}>
                                        <div className='flex items-center gap-3'>
                                            <span className='text-xl'>{tab.icon}</span>
                                            <span>{tab.label}</span>
                                        </div>

                                        <div className='flex items-center gap-1 text-sm text-gray-400'>
                                            <span>0</span>
                                            <Image
                                                src='/green-dot.png'
                                                alt='Online'
                                                width={12}
                                                height={12}
                                                className='inline-block'
                                            />
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Animated Content */}
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeTab}
                        className='mx-auto max-w-6xl text-center text-white'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}>
                        {activeTab === 'Capland'}
                        {activeTab === 'SkyBlock'}
                        {activeTab === 'Vanilla+'}
                    </motion.div>
                </AnimatePresence>
            </div>
            <motion.div
                className='mx-auto mb-12 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-gray-200 shadow-lg backdrop-blur-lg sm:p-8'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}>
                <h2 className='mb-3 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl'>
                    Safe for All Ages
                </h2>
                <p className='text-base leading-relaxed sm:text-lg'>
                    Our Minecraft servers are built around respect, creativity, and community. Every world is carefully
                    moderated to ensure a fun and positive space for players of all ages. We value teamwork, kindness,
                    and fair play — making sure everyone can build, explore, and adventure together in a welcoming
                    environment.
                </p>
            </motion.div>
        </div>
    );
}
