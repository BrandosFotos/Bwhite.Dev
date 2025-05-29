import React, { useEffect, useRef, useState } from 'react';

import '@/components/ui/FramerStyles/BouncyBalls.css';

import { AnimatePresence, motion } from 'framer-motion';

// Assuming you have a CSS file for styles
type Hobby = {
    id: number;
    label: string;
    color: string;
    icon: string;
};

const HOBBIES: Hobby[] = [
    { id: 1, label: 'Photography', color: '#FFB347', icon: '📸' },
    { id: 2, label: 'Gaming', color: '#77DD77', icon: '🎮' },
    { id: 3, label: 'Music', color: '#AEC6CF', icon: '🎵' },
    { id: 4, label: 'Cooking', color: '#FF6961', icon: '🍳' },
    { id: 5, label: 'Travel', color: '#CBAACB', icon: '✈️' }
];

type CircleState = {
    x: number;
    y: number;
    scale: number;
    animating: boolean;
};

const getRandomOffset = () => ({
    x: Math.random() * 20 - 10,
    y: Math.random() * 20 - 10
});

const HobbyCard: React.FC = () => {
    const [circleStates, setCircleStates] = useState<CircleState[]>(
        HOBBIES.map(() => ({ ...getRandomOffset(), scale: 1, animating: false }))
    );
    const [activeHobby, setActiveHobby] = useState<Hobby | null>(null);
    const animRefs = useRef<(number | null)[]>([]);

    useEffect(() => {
        HOBBIES.forEach((_, idx) => {
            const animate = () => {
                setCircleStates((prev) =>
                    prev.map((state, i) => (i === idx && !state.animating ? { ...state, ...getRandomOffset() } : state))
                );
                animRefs.current[idx] = window.setTimeout(animate, 1200 + Math.random() * 800);
            };
            animate();
        });
        return () => {
            animRefs.current.forEach((id) => id && clearTimeout(id));
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = activeHobby ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [activeHobby]);

    const handleMouseEnter = (idx: number) => {
        setCircleStates((prev) =>
            prev.map((state, i) => (i === idx ? { ...state, scale: 1.3, animating: true } : state))
        );
    };

    const handleMouseLeave = (idx: number) => {
        setCircleStates((prev) =>
            prev.map((state, i) => (i === idx ? { ...state, scale: 1, animating: false } : state))
        );
    };

    const handleMouseMove = (idx: number) => {
        setCircleStates((prev) =>
            prev.map((state, i) =>
                i === idx ? { ...state, x: (Math.random() - 0.5) * 30, y: (Math.random() - 0.5) * 30 } : state
            )
        );
    };

    const handleMouseDown = (idx: number) => {
        setCircleStates((prev) => prev.map((state, i) => (i === idx ? { ...state, scale: 1.5 } : state)));
    };

    const handleMouseUp = (idx: number) => {
        setCircleStates((prev) => prev.map((state, i) => (i === idx ? { ...state, scale: 1.3 } : state)));
    };

    return (
        <>
            <div className='card-container'>
                {HOBBIES.map((hobby, idx) => {
                    const state = circleStates[idx];
                    const angle = (idx / HOBBIES.length) * 2 * Math.PI;
                    const left = `calc(50% + ${Math.cos(angle) * 90 + state.x}px)`;
                    const top = `calc(50% + ${Math.sin(angle) * 60 + state.y}px)`;
                    const style = {
                        left,
                        top,
                        transform: `translate(-50%, -50%) scale(${state.scale})`,
                        transition: state.animating
                            ? 'transform 0.15s cubic-bezier(.4,2,.6,1), left 0.3s, top 0.3s'
                            : 'transform 0.4s cubic-bezier(.4,2,.6,1), left 0.8s, top 0.8s',
                        zIndex: state.scale > 1 ? 2 : 1
                    };

                    return (
                        <div
                            key={hobby.id}
                            className='circle-wrapper'
                            style={style}
                            onMouseEnter={() => handleMouseEnter(idx)}
                            onMouseLeave={() => handleMouseLeave(idx)}
                            onMouseMove={() => handleMouseMove(idx)}
                            onMouseDown={() => handleMouseDown(idx)}
                            onMouseUp={() => handleMouseUp(idx)}
                            onClick={() => setActiveHobby(hobby)}
                            tabIndex={0}>
                            <div className='circle' style={{ background: hobby.color }}>
                                {hobby.icon}
                            </div>
                        </div>
                    );
                })}
            </div>

            <AnimatePresence>
                {activeHobby && (
                    <>
                        <motion.div
                            className='modal-backdrop'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveHobby(null)}
                        />

                        <motion.div
                            className='modal'
                            initial={{ scale: 0.8, opacity: 0, x: '-50%', y: '-50%' }}
                            animate={{ scale: 1, opacity: 1, x: '-50%', y: '-50%' }}
                            exit={{ scale: 0.8, opacity: 0, x: '-50%', y: '-50%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                            <h2 className='modal-title'>
                                {activeHobby.icon} {activeHobby.label}
                            </h2>
                            <p className='modal-description'>This is more info about {activeHobby.label}.</p>
                            <button className='close-button' onClick={() => setActiveHobby(null)}>
                                Close
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default HobbyCard;
