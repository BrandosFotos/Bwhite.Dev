import React from 'react';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div
            className='flex min-h-[60vh] flex-col items-center justify-center px-4 text-center'
            style={{ fontFamily: 'var(--font-sf-pro)' }}>
            <motion.h1
                className='mb-6 text-5xl font-bold tracking-tight md:text-7xl'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                Meet your next{' '}
                <motion.span
                    className='relative z-10 font-medium'
                    animate={{
                        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96c93d', '#ff6b6b'],
                        textShadow: [
                            '0 0 10px rgba(255, 107, 107, 0.5)',
                            '0 0 10px rgba(78, 205, 196, 0.5)',
                            '0 0 10px rgba(69, 183, 209, 0.5)',
                            '0 0 10px rgba(150, 201, 61, 0.5)',
                            '0 0 10px rgba(255, 107, 107, 0.5)'
                        ]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear'
                    }}>
                    creative
                </motion.span>{' '}
                engineer
            </motion.h1>
            <motion.p
                className='max-w-2xl text-xl font-normal tracking-wide text-gray-300 md:text-2xl'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}></motion.p>
        </div>
    );
}
