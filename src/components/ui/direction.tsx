'use client';

import React, { useEffect, useRef, useState } from 'react';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * ======= Visual constants =======
 */
const BUBBLE_COLORS = [
    '#FF6B6B', // Coral red
    '#4ECDC4', // Turquoise
    '#45B7D1', // Sky blue
    '#96CEB4', // Mint green
    '#FFEAA7', // Soft yellow
    '#DDA0DD', // Plum
    '#98D8C8', // Seafoam
    '#F7DC6F' // Golden yellow
];

const BUBBLE_CONFIGS = [
    { size: 80, speed: 0.8, delay: 2 },
    { size: 35, speed: 1.2, delay: 0.3 },
    { size: 15, speed: 0.6, delay: 0.7 },
    { size: 45, speed: 1.5, delay: 0.1 },
    { size: 25, speed: 1.0, delay: 0.5 },
    { size: 30, speed: 1.3, delay: 0.9 },
    { size: 18, speed: 0.7, delay: 0.2 },
    { size: 40, speed: 1.4, delay: 0.6 },
    { size: 22, speed: 0.9, delay: 0.4 },
    { size: 38, speed: 1.1, delay: 0.8 },
    { size: 16, speed: 0.5, delay: 1.2 },
    { size: 42, speed: 1.6, delay: 0.0 }
];

/**
 * ======= Component =======
 */
const Direction: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Controls bubble animation and replay triggers
    const [animationStarted, setAnimationStarted] = useState(false);
    const [runId, setRunId] = useState(0); // bump to remount bubbles (replay)
    const prevProgressRef = useRef(0);

    // Track scroll position relative to this section
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ['start start', 'end end']
    });

    /**
     * Start bubble animation and replay it every time we cross the start threshold going down.
     * - We detect a rising-edge crossing at ~10% progress and bump runId to remount bubbles.
     */
    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            const prev = prevProgressRef.current;
            if (prev < 0.1 && latest >= 0.1) {
                setRunId((r) => r + 1);
                setAnimationStarted(true);
            }
            prevProgressRef.current = latest;
        });
        return unsubscribe;
    }, [scrollYProgress]);

    /**
     * Arrow gently appears on load then fades as we scroll this section.
     */
    const arrowOpacity = useTransform(scrollYProgress, [0, 0.3], [1, -20]);

    /**
     * Scroll-linked text enter ("EXCITINGLY BUBBLY")
     * - Opacity/scale/y are driven by scroll progress for a springy, responsive feel
     * - Starts in sync with bubble start window (0.1 -> 0.22)
     */
    const TEXT_START = 0.1;
    const TEXT_END = 0.22;
    const textProgress = useTransform(scrollYProgress, [TEXT_START, TEXT_END], [0, 1]);
    const textOpacity = useSpring(textProgress, { stiffness: 220, damping: 24, mass: 0.8 });
    const textScaleRaw = useTransform(textProgress, [0, 1], [0, 1]);
    const textScale = useSpring(textScaleRaw, { stiffness: 220, damping: 20, mass: 0.6 });
    const textY = useTransform(textProgress, [0, 1], [24, 0]);

    return (
        <div ref={scrollRef} className='relative min-h-screen w-full overflow-visible' style={{ minHeight: '100vh' }}>
            {/* Scroll Arrow at top */}
            <motion.div
                className='absolute top-24 left-1/2 z-20 -translate-x-1/2'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                style={{ opacity: arrowOpacity }}>
                <motion.div
                    className='h-6 w-6 rotate-45 border-r-2 border-b-2 border-slate-600 dark:border-slate-300'
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>

            {/*
             * Bubble canvas
             * - Extended beyond bounds (-top/-bottom) so bubbles can exit without clipping
             * - pointer-events disabled so it never blocks interactions
             */}
            <div
                className='pointer-events-none absolute -top-64 right-0 -bottom-64 left-0'
                style={{
                    WebkitMaskImage:
                        'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 6%, rgba(0,0,0,0.6) 10%, rgba(0,0,0,0.9) 14%, black 18%, black 80%, rgba(0,0,0,0.6) 92%, rgba(0,0,0,0.2) 96%, rgba(0,0,0,0) 100%)',
                    maskImage:
                        'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 6%, rgba(0,0,0,0.6) 10%, rgba(0,0,0,0.9) 14%, black 18%, black 80%, rgba(0,0,0,0.6) 92%, rgba(0,0,0,0.2) 96%, rgba(0,0,0,0) 100%)'
                }}>
                {BUBBLE_CONFIGS.map((config, index) => {
                    const color = BUBBLE_COLORS[index % BUBBLE_COLORS.length];
                    const xPosition = (index * 8.33) % 100; // Distribute across width

                    return (
                        <motion.div
                            key={`${index}-${runId}`}
                            className='absolute rounded-full opacity-80'
                            style={{
                                left: `${xPosition}%`,
                                bottom: `-${config.size}px`,
                                width: config.size,
                                height: config.size,
                                backgroundColor: color,
                                boxShadow: `0 0 ${config.size * 0.5}px ${color}40`
                            }}
                            animate={
                                animationStarted
                                    ? {
                                          y: [0, -900],
                                          x: [0, Math.sin(index) * 20, 0], // gentle side-to-side
                                          opacity: [0, 0.85, 0] // quick fade-in, fade-out at top
                                      }
                                    : {}
                            }
                            transition={{
                                y: { duration: 2 * config.speed, ease: 'easeOut', delay: config.delay },
                                x: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                                opacity: {
                                    duration: 2 * config.speed,
                                    ease: 'easeOut',
                                    delay: config.delay,
                                    times: [0, 0.1, 1]
                                }
                            }}
                        />
                    );
                })}
            </div>

            {/* Overlay text (scroll-linked enter) */}
            <div className='absolute inset-0 z-20 flex items-center justify-center'>
                <motion.div
                    className='px-4 text-center'
                    initial={{ opacity: 0, scale: 0, y: 24 }}
                    style={{ opacity: textOpacity, scale: textScale, y: textY }}>
                    <h2
                        className='mb-2 text-4xl font-black text-slate-800 md:text-6xl lg:text-7xl dark:text-slate-200'
                        style={{
                            fontSize: 'clamp(2rem, 10vw, 5rem)',
                            lineHeight: 0.9,
                            letterSpacing: '-0.02em',
                            textShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}>
                        EXCITINGLY
                    </h2>
                    <h2
                        className='bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-4xl font-black text-transparent md:text-6xl lg:text-7xl'
                        style={{
                            fontSize: 'clamp(2rem, 10vw, 5rem)',
                            lineHeight: 0.9,
                            letterSpacing: '-0.02em',
                            textShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}>
                        BUBBLY
                    </h2>
                </motion.div>
            </div>
        </div>
    );
};

export default Direction;
