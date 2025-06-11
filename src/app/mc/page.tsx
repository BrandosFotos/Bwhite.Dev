'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import { motion } from 'framer-motion';

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

    return (
        <div className='min-h-screen bg-gradient-to-b from-green-900 to-green-700 text-white'>
            {/* Hero Section */}
            <motion.div
                className='container mx-auto px-4 py-16'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                <h1 className='mb-6 text-6xl font-bold'>Minecraft Server</h1>
                <p className='mb-8 text-xl'>Welcome to BWHite's Minecraft Community!</p>

                {/* Server Info Card */}
                <motion.div
                    className='mb-8 rounded-lg bg-white/10 p-6 backdrop-blur-lg'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}>
                    <h2 className='mb-4 text-2xl font-semibold'>Server Information</h2>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <div>
                            <h3 className='font-semibold'>Server Address:</h3>
                            <p className='rounded bg-black/30 p-2 font-mono'>mc.bwhite.dev</p>
                        </div>
                        <div>
                            <h3 className='font-semibold'>Version:</h3>
                            <p>Latest Release (1.20+)</p>
                        </div>
                    </div>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-3'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}>
                    <div className='rounded-lg bg-white/10 p-6 backdrop-blur-lg'>
                        <h3 className='mb-2 text-xl font-semibold'>Survival</h3>
                        <p>Experience pure survival gameplay with a friendly community.</p>
                    </div>
                    <div className='rounded-lg bg-white/10 p-6 backdrop-blur-lg'>
                        <h3 className='mb-2 text-xl font-semibold'>Community</h3>
                        <p>Join our active community and make new friends.</p>
                    </div>
                    <div className='rounded-lg bg-white/10 p-6 backdrop-blur-lg'>
                        <h3 className='mb-2 text-xl font-semibold'>Events</h3>
                        <p>Participate in regular community events and competitions.</p>
                    </div>
                </motion.div>

                {/* Whitelist Application Form */}
                <motion.div
                    className='mb-8 rounded-lg bg-white/10 p-6 backdrop-blur-lg'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}>
                    <h2 className='mb-6 text-2xl font-semibold'>Whitelist Application</h2>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div>
                            <label htmlFor='username' className='mb-2 block font-semibold'>
                                Minecraft Username
                            </label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                value={formData.username}
                                onChange={handleChange}
                                className='w-full rounded-lg bg-white/5 p-2 text-white placeholder-white/50 backdrop-blur-lg'
                                placeholder='Your Minecraft username'
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='mb-2 block font-semibold'>
                                Email
                            </label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                className='w-full rounded-lg bg-white/5 p-2 text-white placeholder-white/50 backdrop-blur-lg'
                                placeholder='Your email address'
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='discord' className='mb-2 block font-semibold'>
                                Discord Username
                            </label>
                            <input
                                type='text'
                                id='discord'
                                name='discord'
                                value={formData.discord}
                                onChange={handleChange}
                                className='w-full rounded-lg bg-white/5 p-2 text-white placeholder-white/50 backdrop-blur-lg'
                                placeholder='Your Discord username'
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='reason' className='mb-2 block font-semibold'>
                                Why do you want to join?
                            </label>
                            <textarea
                                id='reason'
                                name='reason'
                                value={formData.reason}
                                onChange={handleChange}
                                className='w-full rounded-lg bg-white/5 p-2 text-white placeholder-white/50 backdrop-blur-lg'
                                placeholder='Tell us why you want to join our community'
                                rows={4}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='experience' className='mb-2 block font-semibold'>
                                Minecraft Experience
                            </label>
                            <textarea
                                id='experience'
                                name='experience'
                                value={formData.experience}
                                onChange={handleChange}
                                className='w-full rounded-lg bg-white/5 p-2 text-white placeholder-white/50 backdrop-blur-lg'
                                placeholder='Tell us about your Minecraft experience'
                                rows={4}
                                required
                            />
                        </div>
                        {status === 'error' && (
                            <div className='rounded-lg bg-red-500/20 p-3 text-red-200'>{errorMessage}</div>
                        )}
                        {status === 'success' && (
                            <div className='rounded-lg bg-green-500/20 p-3 text-green-200'>
                                Application submitted successfully! We'll review it soon.
                            </div>
                        )}
                        <button
                            type='submit'
                            disabled={status === 'loading'}
                            className='w-full rounded-lg bg-green-500 px-8 py-3 font-bold text-white transition-colors hover:bg-green-600 disabled:opacity-50'>
                            {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </form>
                </motion.div>

                {/* Discord Link */}
                <motion.div
                    className='text-center'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}>
                    <Link
                        href='https://discord.gg/your-discord'
                        className='inline-block rounded-lg bg-green-500 px-8 py-3 font-bold text-white transition-colors hover:bg-green-600'>
                        Join our Discord
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
