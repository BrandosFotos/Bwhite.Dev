import React from 'react';

import { motion } from 'framer-motion';

const ScrollArrow = () => {
    return (
        <motion.div
            className='absolute bottom-24 left-1/2 -translate-x-1/2'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}>
            <motion.div
                className='h-6 w-6 rotate-45 border-r-2 border-b-2 border-white/60'
                animate={{
                    y: [0, 10, 0]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />
        </motion.div>
    );
};

export default function Hero() {
    return (
        <div
            className='relative -mt-[15px] flex h-screen flex-col items-center justify-center px-4 text-center'
            style={{ fontFamily: 'var(--font-sf-pro)' }}>
            <motion.h1
                className='mb-36 text-6xl font-bold tracking-tight md:text-8xl'
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

            {/* Scroll arrow component */}
            <ScrollArrow />
        </div>
    );
}
