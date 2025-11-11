'use client';

import React from 'react';

import { colors } from './theme';

interface BackgroundPatternsProps {
    variant?: string; // Keep for compatibility
}

export function BackgroundPatterns({ variant }: BackgroundPatternsProps) {
    return (
        <div className='bg-beige-900 absolute inset-0'>
            {/* Subtle warm grid / pattern */}
            <div className='absolute inset-0 opacity-20'>
                <div
                    className='absolute inset-0'
                    style={{
                        backgroundImage: `
      linear-gradient(90deg, rgba(165, 105, 60, 0.1) 1px, transparent 1px),
      linear-gradient(rgba(165, 105, 60, 0.1) 1px, transparent 1px)
    `,
                        backgroundSize: '40px 40px'
                    }}></div>
            </div>

            {/* Soft glowing orbs for cozy feel */}
            <div className='absolute inset-0'>
                <div className='absolute top-1/3 left-1/4 h-32 w-32 animate-pulse rounded-full bg-orange-400/20 blur-xl'></div>
                <div className='absolute right-1/4 bottom-1/3 h-24 w-24 animate-pulse rounded-full bg-yellow-300/20 blur-xl delay-1000'></div>
                <div className='absolute top-1/2 right-1/3 h-16 w-16 animate-pulse rounded-full bg-green-400/20 blur-xl delay-2000'></div>
            </div>
        </div>
    );
}
