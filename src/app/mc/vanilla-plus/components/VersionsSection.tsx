'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';

interface Version {
    id: number;
    fileName: string;
    packVersion: string;
    createdAt: string;
}

export function VersionsSection({ versions }: { versions: Version[] }) {
    const [showOlderVersions, setShowOlderVersions] = useState(false);
    const latestVersion = versions[0];

    if (!versions.length) {
        return (
            <div className='rounded-xl border border-white/10 bg-white/5 p-6'>
                <h3 className='mb-4 text-xl font-semibold text-white'>📦 Modpack Versions</h3>
                <p className='text-gray-300'>No modpack versions available yet.</p>
            </div>
        );
    }

    return (
        <div className='rounded-xl border border-white/10 bg-white/5 p-6'>
            <h3 className='mb-4 text-xl font-semibold text-white'>📦 Modpack Versions</h3>

            {/* Latest Version */}
            <div className='mb-6 rounded-xl border border-green-500/30 bg-gradient-to-r from-green-500/20 to-blue-500/20 p-4'>
                <h4 className='mb-3 text-lg font-semibold text-green-400'>Latest Version</h4>
                <div className='flex items-center justify-between'>
                    <div>
                        <p className='text-lg font-semibold text-white'>Version {latestVersion?.packVersion}</p>
                        <p className='text-sm text-gray-300'>
                            Released {new Date(latestVersion?.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <a
                        href={`/api/uploads/${latestVersion?.id}`}
                        className='transform rounded-lg bg-gradient-to-r from-green-500 to-blue-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-blue-600'
                        download>
                        📥 Download
                    </a>
                </div>
            </div>

            {/* Older Versions Button */}
            {versions.length > 1 && (
                <button
                    onClick={() => setShowOlderVersions(!showOlderVersions)}
                    className='mb-4 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-center font-semibold text-white transition-all duration-300 hover:bg-white/10'>
                    {showOlderVersions ? '🔼 Hide Older Versions' : '🔽 Show Older Versions'}
                </button>
            )}

            {/* Older Versions List */}
            {showOlderVersions && versions.length > 1 && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className='space-y-3'>
                    {versions.slice(1).map((version) => (
                        <div
                            key={version.id}
                            className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4'>
                            <div>
                                <p className='font-semibold text-white'>Version {version.packVersion}</p>
                                <p className='text-sm text-gray-300'>
                                    Released {new Date(version.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <a
                                href={`/api/uploads/${version.id}`}
                                className='rounded-lg bg-gradient-to-r from-gray-500 to-gray-600 px-4 py-2 font-semibold text-white transition-all duration-300 hover:from-gray-600 hover:to-gray-700'
                                download>
                                Download
                            </a>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}

