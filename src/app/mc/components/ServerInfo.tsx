'use client';

import React, { useState } from 'react';

import { VersionsSection } from './VersionsSection';
import { motion } from 'framer-motion';

interface Version {
    id: number;
    fileName: string;
    packVersion: string;
    createdAt: string;
}

interface ServerInfoProps {
    versions: Version[];
}

export function ServerInfo({ versions }: ServerInfoProps) {
    const [expandedSection, setExpandedSection] = useState<string | null>('connection');

    const sections = [
        {
            id: 'connection',
            title: '🚀 How to Connect',
            icon: '🔗',
            content: (
                <div className='space-y-6'>
                    <div className='rounded-xl border border-green-500/30 bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6'>
                        <h3 className='mb-4 text-2xl font-bold text-green-400'>Server Address</h3>
                        <div className='rounded-lg bg-gray-900 p-4 font-mono text-lg'>
                            <span className='text-gray-400'>mc.bwhite.dev</span>
                        </div>
                        <p className='mt-2 text-gray-300'>
                            Copy this address and paste it in your Minecraft server list!
                        </p>
                    </div>

                    <div className='grid gap-6 md:grid-cols-2'>
                        <div className='rounded-xl border border-white/10 bg-white/5 p-6'>
                            <h4 className='mb-3 text-xl font-semibold text-blue-400'>📋 Requirements</h4>
                            <ul className='space-y-2 text-gray-300'>
                                <li>• Minecraft Java Edition</li>
                                <li>• CurseForge App (for modpack)</li>
                                <li>• Whitelist approval</li>
                                <li>• Family-friendly attitude</li>
                            </ul>
                        </div>

                        <div className='rounded-xl border border-white/10 bg-white/5 p-6'>
                            <h4 className='mb-3 text-xl font-semibold text-purple-400'>🎯 Server Features</h4>
                            <ul className='space-y-2 text-gray-300'>
                                <li>• Age-appropriate content (6-10)</li>
                                <li>• Educational mods</li>
                                <li>• Collaborative building</li>
                                <li>• Safe multiplayer environment</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'modpack',
            title: '📦 Modpack Information',
            icon: '🎮',
            content: (
                <div className='space-y-6'>
                    <div className='rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6'>
                        <h3 className='mb-4 text-2xl font-bold text-purple-400'>About Our Modpack</h3>
                        <p className='mb-4 text-gray-300'>
                            Our custom modpack is designed specifically for young builders and their families. It
                            combines creativity, learning, and fun in a safe environment.
                        </p>
                    </div>

                    <div className='grid gap-6 md:grid-cols-2'>
                        <div className='rounded-xl border border-white/10 bg-white/5 p-6'>
                            <h4 className='mb-3 text-xl font-semibold text-green-400'>🔧 Engineering & Building</h4>
                            <ul className='space-y-2 text-gray-300'>
                                <li>
                                    • <span className='text-green-400'>Create</span> - Build amazing machines
                                </li>
                                <li>
                                    • <span className='text-green-400'>Effortless Building</span> - Easy construction
                                    tools
                                </li>
                                <li>
                                    • <span className='text-green-400'>Sophisticated Backpacks</span> - Organize your
                                    items
                                </li>
                            </ul>
                        </div>

                        <div className='rounded-xl border border-white/10 bg-white/5 p-6'>
                            <h4 className='mb-3 text-xl font-semibold text-blue-400'>🌱 Nature & Growth</h4>
                            <ul className='space-y-2 text-gray-300'>
                                <li>
                                    • <span className='text-green-400'>Mystical Agriculture</span> - Grow magical crops
                                </li>
                                <li>
                                    • <span className='text-green-400'>Dynamic Trees</span> - Realistic tree growth
                                </li>
                                <li>
                                    • <span className='text-green-400'>Biomes O' Plenty</span> - Beautiful new worlds
                                </li>
                            </ul>
                        </div>

                        <div className='rounded-xl border border-white/10 bg-white/5 p-6'>
                            <h4 className='mb-3 text-xl font-semibold text-yellow-400'>👥 Communication</h4>
                            <ul className='space-y-2 text-gray-300'>
                                <li>
                                    • <span className='text-green-400'>Simple Voice Chat</span> - Talk with friends
                                </li>
                                <li>
                                    • <span className='text-green-400'>What Are They Up To</span> - See what others are
                                    doing
                                </li>
                            </ul>
                        </div>

                        <div className='rounded-xl border border-white/10 bg-white/5 p-6'>
                            <h4 className='mb-3 text-xl font-semibold text-red-400'>🎨 Visual Enhancements</h4>
                            <ul className='space-y-2 text-gray-300'>
                                <li>• Multiple shader options</li>
                                <li>• Beautiful textures</li>
                                <li>• Enhanced lighting</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'installation',
            title: '⚙️ Installation Guide',
            icon: '📥',
            content: (
                <div className='space-y-6'>
                    <div className='rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-6'>
                        <h3 className='mb-4 text-2xl font-bold text-blue-400'>Step-by-Step Installation</h3>
                        <p className='text-gray-300'>Follow these simple steps to get started with our modpack!</p>
                    </div>

                    <div className='space-y-4'>
                        {[
                            {
                                step: 1,
                                title: 'Download CurseForge App',
                                description: 'Get the official CurseForge app from their website',
                                action: 'Download App',
                                link: 'https://www.curseforge.com/download/app'
                            },
                            {
                                step: 2,
                                title: 'Download Our Modpack',
                                description: 'Click the download button below to get the latest version',
                                action: 'Download Modpack',
                                link: null
                            },
                            {
                                step: 3,
                                title: 'Import to CurseForge',
                                description:
                                    'Open CurseForge → Minecraft → My Modpacks → Create Custom Profile → Import',
                                action: null,
                                link: null
                            },
                            {
                                step: 4,
                                title: 'Launch and Play',
                                description: 'Select our modpack and launch Minecraft to start playing!',
                                action: null,
                                link: null
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={item.step}
                                className='flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-6'
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}>
                                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-sm font-bold text-white'>
                                    {item.step}
                                </div>
                                <div className='flex-1'>
                                    <h4 className='mb-2 text-lg font-semibold text-white'>{item.title}</h4>
                                    <p className='mb-3 text-gray-300'>{item.description}</p>
                                    {item.action && item.link && (
                                        <a
                                            href={item.link}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='inline-block rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:from-blue-600 hover:to-purple-600'>
                                            {item.action}
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <VersionsSection versions={versions} />
                </div>
            )
        }
    ];

    return (
        <div className='space-y-6'>
            {sections.map((section) => (
                <motion.div
                    key={section.id}
                    className='overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}>
                    <button
                        onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                        className='flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-white/5'>
                        <div className='flex items-center gap-4'>
                            <span className='text-2xl'>{section.icon}</span>
                            <h2 className='text-2xl font-bold text-white'>{section.title}</h2>
                        </div>
                        <span className='text-2xl text-gray-400'>{expandedSection === section.id ? '−' : '+'}</span>
                    </button>

                    {expandedSection === section.id && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className='overflow-hidden'>
                            <div className='p-6 pt-0'>{section.content}</div>
                        </motion.div>
                    )}
                </motion.div>
            ))}
        </div>
    );
}
