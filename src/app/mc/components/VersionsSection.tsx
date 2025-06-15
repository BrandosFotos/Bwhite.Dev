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

    return (
        <motion.div
            className='mb-8 rounded-lg bg-white/10 p-6 backdrop-blur-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}>
            <h2 className='mb-4 text-2xl font-semibold'>Resource Pack Versions</h2>

            {/* Latest Version */}
            <div className='mb-6 rounded-lg bg-white/5 p-4'>
                <h3 className='mb-2 text-xl font-semibold'>Latest Version</h3>
                <div className='flex items-center justify-between'>
                    <div>
                        <p className='text-lg'>Version {latestVersion?.packVersion}</p>
                        <p className='text-sm text-gray-300'>
                            Released {new Date(latestVersion?.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <a
                        href={`/api/uploads/${latestVersion?.id}`}
                        className='rounded-lg bg-green-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-600'
                        download>
                        Download
                    </a>
                </div>
            </div>

            {/* Older Versions Button */}
            <button
                onClick={() => setShowOlderVersions(!showOlderVersions)}
                className='mb-4 w-full rounded-lg bg-white/5 px-4 py-2 text-center font-semibold transition-colors hover:bg-white/10'>
                {showOlderVersions ? 'Hide Older Versions' : 'Show Older Versions'}
            </button>

            {/* Older Versions List */}
            {showOlderVersions && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className='space-y-2'>
                    {versions.slice(1).map((version) => (
                        <div key={version.id} className='flex items-center justify-between rounded-lg bg-white/5 p-3'>
                            <div>
                                <p className='font-semibold'>Version {version.packVersion}</p>
                                <p className='text-sm text-gray-300'>
                                    Released {new Date(version.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <a
                                href={`/api/uploads/${version.id}`}
                                className='rounded-lg bg-green-500 px-3 py-1 text-sm font-semibold text-white transition-colors hover:bg-green-600'
                                download>
                                Download
                            </a>
                        </div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
}
