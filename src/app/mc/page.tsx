'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { BackgroundPatterns } from './components/BackgroundPatterns';
import { GallerySection } from './components/GallerySection';
import { ServerInfo } from './components/ServerInfo';
import { VersionsSection } from './components/VersionsSection';
import { WhitelistForm } from './components/WhitelistForm';
import { motion } from 'framer-motion';

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

type ActiveTab = 'server' | 'whitelist' | 'gallery';

export default function MinecraftPage() {
    const [versions, setVersions] = useState<Version[]>([]);
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [activeTab, setActiveTab] = useState<ActiveTab>('server');
    const [isWhitelisted, setIsWhitelisted] = useState(false);

    useEffect(() => {
        // Fetch modpack versions
        fetch('/api/uploads')
            .then((res) => res.json())
            .then((data) => {
                console.log('Versions data received:', data);
                // Ensure data is an array before setting state
                if (Array.isArray(data)) {
                    setVersions(data);
                } else {
                    console.error('Versions data is not an array:', data);
                    setVersions([]);
                }
            })
            .catch((error) => console.error('Error fetching versions:', error));

        // Fetch gallery images
        fetch('/api/gallery')
            .then((res) => res.json())
            .then((data) => {
                console.log('Gallery data received:', data);
                // Ensure data is an array before setting state
                if (Array.isArray(data)) {
                    setGalleryImages(data);
                } else {
                    console.error('Gallery data is not an array:', data);
                    setGalleryImages([]);
                }
            })
            .catch((error) => console.error('Error fetching gallery images:', error));
    }, []);

    const tabs = [
        { key: 'server' as ActiveTab, label: 'Server Info', icon: '🖥️' },
        { key: 'whitelist' as ActiveTab, label: 'Join Server', icon: '📝' },
        { key: 'gallery' as ActiveTab, label: 'Gallery', icon: '🖼️' }
    ];

    return (
        <div className='relative min-h-screen'>
            {/* Fixed Background */}
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
                        Minecraft Server
                    </motion.h1>
                    <p className='mx-auto max-w-2xl text-xl text-gray-300'>
                        Join our family-friendly Minecraft community! Build, explore, and create amazing things
                        together.
                    </p>
                </motion.div>

                {/* Navigation Tabs */}
                <motion.div
                    className='mb-8 flex justify-center'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}>
                    <div className='rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-lg'>
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.key;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
                                        isActive ? 'bg-white text-gray-900 shadow-lg' : 'text-white hover:bg-white/10'
                                    }`}>
                                    <span className='text-lg'>{tab.icon}</span>
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Content */}
                <motion.div
                    className='mx-auto max-w-6xl'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}>
                    {activeTab === 'server' && <ServerInfo versions={versions} />}

                    {activeTab === 'whitelist' && (
                        <WhitelistForm
                            onSuccess={() => {
                                // Whitelist application submitted successfully
                                console.log('Whitelist application submitted');
                            }}
                        />
                    )}

                    {activeTab === 'gallery' && (
                        <GallerySection
                            images={galleryImages}
                            isWhitelisted={true}
                            onImageUpload={(newImage: GalleryImage) => {
                                setGalleryImages((prev) => {
                                    // Ensure prev is an array before spreading
                                    const prevArray = Array.isArray(prev) ? prev : [];
                                    return [newImage, ...prevArray];
                                });
                            }}
                        />
                    )}
                </motion.div>
            </div>
        </div>
    );
}
