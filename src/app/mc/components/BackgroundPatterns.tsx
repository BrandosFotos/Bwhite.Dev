'use client';

import React from 'react';

interface BackgroundPatternsProps {
    variant?: string; // Keep for compatibility but we only use neon
}

export function BackgroundPatterns({ variant }: BackgroundPatternsProps) {
    return (
        <div className='absolute inset-0 bg-black'>
            {/* Neon grid */}
            <div className='absolute inset-0 opacity-30'>
                <div
                    className='absolute inset-0'
                    style={{
                        backgroundImage: `
                            linear-gradient(90deg, rgba(0, 255, 127, 0.1) 1px, transparent 1px),
                            linear-gradient(rgba(0, 255, 127, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}></div>
            </div>

            {/* Animated neon lines */}

            {/* Glowing orbs */}
            <div className='absolute inset-0'>
                <div className='absolute top-1/3 left-1/4 h-32 w-32 animate-pulse rounded-full bg-green-500/20 blur-xl'></div>
                <div className='absolute right-1/4 bottom-1/3 h-24 w-24 animate-pulse rounded-full bg-blue-500/20 blur-xl delay-1000'></div>
                <div className='absolute top-1/2 right-1/3 h-16 w-16 animate-pulse rounded-full bg-purple-500/20 blur-xl delay-2000'></div>
            </div>
        </div>
    );
}
