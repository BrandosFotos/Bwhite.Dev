'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

interface Version {
    id: number;
    fileName: string;
    packVersion: string;
    createdAt: string;
}

export default function MinecraftPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        discord: '',
        reason: '',
        experience: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [versions, setVersions] = useState<Version[]>([]);
    const [showOlderVersions, setShowOlderVersions] = useState(false);

    useEffect(() => {
        fetch('/api/uploads')
            .then((res) => res.json())
            .then((data) => setVersions(data))
            .catch((error) => console.error('Error fetching versions:', error));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/minecraft/whitelist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit application');
            }

            setStatus('success');
            setFormData({
                username: '',
                email: '',
                discord: '',
                reason: '',
                experience: ''
            });
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Failed to submit application');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const latestVersion = versions[0];

    return (
        <div className='min-h-screen bg-[#1a1a1a]'>
            <motion.div
                className='container mx-auto px-4 py-16'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                <h1 className='mb-6 text-6xl font-bold text-[#55ff55]'>Minecraft Server</h1>
                <p className='mb-8 text-xl text-[#ffffff]'>Welcome to Brandon's Minecraft Community!</p>

                {/* Server Info Card with Download */}
                <motion.div
                    className='mb-8 rounded-lg border-2 border-[#4a4a4a] bg-[#2a2a2a] p-6 shadow-lg'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}>
                    <h2 className='mb-4 text-2xl font-semibold text-[#ffffff]'>Server Information</h2>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div>
                            <h3 className='font-semibold text-[#55ff55]'>Server Address:</h3>
                            <p className='rounded bg-[#1a1a1a] p-2 font-mono text-[#ffffff]'>mc.bwhite.dev</p>
                        </div>
                        <div>
                            <h3 className='font-semibold text-[#55ff55]'>Modpack Version (Latest):</h3>
                            <div className='space-y-2'>
                                <div className='flex items-center justify-between rounded bg-[#1a1a1a] p-2'>
                                    <div>
                                        <p className='font-semibold text-[#ffffff]'>
                                            Version {latestVersion?.packVersion}
                                        </p>
                                        <p className='text-sm text-[#aaaaaa]'>
                                            Released {new Date(latestVersion?.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <a
                                        href={`/api/uploads/${latestVersion?.id}`}
                                        className='rounded-lg bg-[#55ff55] px-4 py-2 font-semibold text-[#1a1a1a] transition-colors hover:bg-[#44dd44]'
                                        download>
                                        Download
                                    </a>
                                </div>
                                <button
                                    onClick={() => setShowOlderVersions(!showOlderVersions)}
                                    className='w-full rounded-lg bg-[#1a1a1a] px-4 py-2 text-center text-sm font-semibold text-[#ffffff] transition-colors hover:bg-[#2a2a2a]'>
                                    {showOlderVersions ? 'Hide Older Versions' : 'Show Older Versions'}
                                </button>
                                {showOlderVersions && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className='space-y-2'>
                                        {versions.slice(1).map((version) => (
                                            <div
                                                key={version.id}
                                                className='flex items-center justify-between rounded bg-[#1a1a1a] p-2'>
                                                <div>
                                                    <p className='font-semibold text-[#ffffff]'>
                                                        Version {version.packVersion}
                                                    </p>
                                                    <p className='text-sm text-[#aaaaaa]'>
                                                        {new Date(version.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <a
                                                    href={`/api/uploads/${version.id}`}
                                                    className='rounded-lg bg-[#55ff55] px-3 py-1 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-[#44dd44]'
                                                    download>
                                                    Download
                                                </a>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                    {/* Whitelist Application Form */}
                    <motion.div
                        className='rounded-lg border-2 border-[#4a4a4a] bg-[#2a2a2a] p-6 shadow-lg'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}>
                        <h2 className='mb-6 text-2xl font-semibold text-[#ffffff]'>Whitelist Application</h2>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div>
                                <label htmlFor='username' className='mb-2 block font-semibold text-[#55ff55]'>
                                    Minecraft Username
                                </label>
                                <input
                                    type='text'
                                    id='username'
                                    name='username'
                                    value={formData.username}
                                    onChange={handleChange}
                                    className='w-full rounded-lg border-2 border-[#4a4a4a] bg-[#1a1a1a] p-2 text-[#ffffff] placeholder-[#666666] focus:border-[#55ff55] focus:outline-none'
                                    placeholder='Your Minecraft username'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='email' className='mb-2 block font-semibold text-[#55ff55]'>
                                    Email
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    className='w-full rounded-lg border-2 border-[#4a4a4a] bg-[#1a1a1a] p-2 text-[#ffffff] placeholder-[#666666] focus:border-[#55ff55] focus:outline-none'
                                    placeholder='Your email address'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='discord' className='mb-2 block font-semibold text-[#55ff55]'>
                                    Discord Username
                                </label>
                                <input
                                    type='text'
                                    id='discord'
                                    name='discord'
                                    value={formData.discord}
                                    onChange={handleChange}
                                    className='w-full rounded-lg border-2 border-[#4a4a4a] bg-[#1a1a1a] p-2 text-[#ffffff] placeholder-[#666666] focus:border-[#55ff55] focus:outline-none'
                                    placeholder='Your Discord username'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='reason' className='mb-2 block font-semibold text-[#55ff55]'>
                                    Why do you want to join?
                                </label>
                                <textarea
                                    id='reason'
                                    name='reason'
                                    value={formData.reason}
                                    onChange={handleChange}
                                    className='w-full rounded-lg border-2 border-[#4a4a4a] bg-[#1a1a1a] p-2 text-[#ffffff] placeholder-[#666666] focus:border-[#55ff55] focus:outline-none'
                                    placeholder='Tell us why you want to join our community'
                                    rows={3}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='experience' className='mb-2 block font-semibold text-[#55ff55]'>
                                    Minecraft Experience
                                </label>
                                <textarea
                                    id='experience'
                                    name='experience'
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className='w-full rounded-lg border-2 border-[#4a4a4a] bg-[#1a1a1a] p-2 text-[#ffffff] placeholder-[#666666] focus:border-[#55ff55] focus:outline-none'
                                    placeholder='Tell us about your Minecraft experience'
                                    rows={3}
                                    required
                                />
                            </div>
                            {status === 'error' && (
                                <div className='rounded-lg bg-[#ff5555]/20 p-3 text-[#ffaaaa]'>{errorMessage}</div>
                            )}
                            {status === 'success' && (
                                <div className='rounded-lg bg-[#55ff55]/20 p-3 text-[#aaffaa]'>
                                    Application submitted successfully! We'll review it soon.
                                </div>
                            )}
                            <button
                                type='submit'
                                disabled={status === 'loading'}
                                className='w-full rounded-lg bg-[#55ff55] px-8 py-3 font-bold text-[#1a1a1a] transition-colors hover:bg-[#44dd44] disabled:bg-[#4a4a4a] disabled:text-[#888888]'>
                                {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </form>
                    </motion.div>

                    {/* Server Image */}
                    <motion.div
                        className='flex items-center justify-center'
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}>
                        <Image
                            src='/minecraft/minecraft-community.png'
                            alt='Minecraft Community'
                            width={600}
                            height={800}
                            className='rounded-lg object-cover shadow-lg'
                        />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
