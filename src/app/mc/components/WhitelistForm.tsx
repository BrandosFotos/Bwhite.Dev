'use client';

import React, { useState } from 'react';

import { motion } from 'framer-motion';

interface WhitelistFormProps {
    onSuccess: () => void;
}

export function WhitelistForm({ onSuccess }: WhitelistFormProps) {
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
            onSuccess();
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
        <motion.div
            className='rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <div className='mb-8 text-center'>
                <h2 className='mb-4 text-3xl font-bold text-white'>Join Our Server</h2>
                <p className='text-lg text-gray-300'>
                    Fill out the application below to request access to our family-friendly Minecraft server
                </p>
            </div>

            <div className='mb-8 grid gap-8 md:grid-cols-2'>
                <div className='rounded-xl border border-green-500/30 bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6'>
                    <h3 className='mb-3 text-xl font-semibold text-green-400'>✅ What to Expect</h3>
                    <ul className='space-y-2 text-gray-300'>
                        <li>• Safe, supervised multiplayer environment</li>
                        <li>• Educational and creative mods</li>
                        <li>• Family-friendly community</li>
                        <li>• Collaborative building projects</li>
                        <li>• Regular events and activities</li>
                    </ul>
                </div>

                <div className='rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6'>
                    <h3 className='mb-3 text-xl font-semibold text-purple-400'>📋 Application Process</h3>
                    <ul className='space-y-2 text-gray-300'>
                        <li>• Submit your application below</li>
                        <li>• We'll review within 24-48 hours</li>
                        <li>• You'll receive an email notification</li>
                        <li>• Once approved, you can join immediately</li>
                        <li>• Download the modpack and start playing!</li>
                    </ul>
                </div>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid gap-6 md:grid-cols-2'>
                    <div>
                        <label htmlFor='username' className='mb-2 block text-sm font-semibold text-green-400'>
                            Minecraft Username *
                        </label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                            className='w-full rounded-lg border-2 border-gray-600 bg-gray-800/50 p-3 text-white placeholder-gray-400 transition-all focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none'
                            placeholder='Your exact Minecraft username'
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor='email' className='mb-2 block text-sm font-semibold text-green-400'>
                            Email Address *
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full rounded-lg border-2 border-gray-600 bg-gray-800/50 p-3 text-white placeholder-gray-400 transition-all focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none'
                            placeholder='your.email@example.com'
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor='discord' className='mb-2 block text-sm font-semibold text-green-400'>
                        Discord Username *
                    </label>
                    <input
                        type='text'
                        id='discord'
                        name='discord'
                        value={formData.discord}
                        onChange={handleChange}
                        className='w-full rounded-lg border-2 border-gray-600 bg-gray-800/50 p-3 text-white placeholder-gray-400 transition-all focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none'
                        placeholder='Your Discord username (e.g., username#1234)'
                        required
                    />
                </div>

                <div>
                    <label htmlFor='reason' className='mb-2 block text-sm font-semibold text-green-400'>
                        Why do you want to join our server? *
                    </label>
                    <textarea
                        id='reason'
                        name='reason'
                        value={formData.reason}
                        onChange={handleChange}
                        className='w-full rounded-lg border-2 border-gray-600 bg-gray-800/50 p-3 text-white placeholder-gray-400 transition-all focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none'
                        placeholder="Tell us why you're interested in joining our community..."
                        rows={4}
                        required
                    />
                </div>

                <div>
                    <label htmlFor='experience' className='mb-2 block text-sm font-semibold text-green-400'>
                        Tell us about your Minecraft experience *
                    </label>
                    <textarea
                        id='experience'
                        name='experience'
                        value={formData.experience}
                        onChange={handleChange}
                        className='w-full rounded-lg border-2 border-gray-600 bg-gray-800/50 p-3 text-white placeholder-gray-400 transition-all focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none'
                        placeholder='How long have you been playing? What do you enjoy most about Minecraft?'
                        rows={4}
                        required
                    />
                </div>

                {status === 'error' && (
                    <motion.div
                        className='rounded-lg border border-red-500/30 bg-red-500/20 p-4 text-red-200'
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}>
                        <div className='flex items-center gap-2'>
                            <span className='text-red-400'>⚠️</span>
                            <span className='font-semibold'>Error:</span>
                            <span>{errorMessage}</span>
                        </div>
                    </motion.div>
                )}

                {status === 'success' && (
                    <motion.div
                        className='rounded-lg border border-green-500/30 bg-green-500/20 p-4 text-green-200'
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}>
                        <div className='flex items-center gap-2'>
                            <span className='text-green-400'>✅</span>
                            <span className='font-semibold'>Success!</span>
                            <span>
                                Your application has been submitted. We'll review it soon and send you an email with the
                                result.
                            </span>
                        </div>
                    </motion.div>
                )}

                <button
                    type='submit'
                    disabled={status === 'loading'}
                    className='w-full transform rounded-xl bg-gradient-to-r from-green-500 to-blue-500 px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-blue-600 disabled:scale-100 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-700'>
                    {status === 'loading' ? (
                        <div className='flex items-center justify-center gap-2'>
                            <div className='h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white'></div>
                            Submitting Application...
                        </div>
                    ) : (
                        'Submit Application'
                    )}
                </button>
            </form>
        </motion.div>
    );
}
