'use client';

import React, { useEffect, useState } from 'react';

import '@/components/ui/FramerStyles/SubHero.css';

import { AnimatePresence, motion } from 'framer-motion';

// Import the new CSS file

const texts = ['Coder', 'Designer', 'Content Creator', 'Developer', 'Freelancer'];
const variants = {
    enter: (direction: string) => {
        return {
            y: -20,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        y: 0,
        opacity: 1
    },
    exit: (direction: string) => {
        return {
            zIndex: 0,
            opacity: 0
        };
    }
};

const TextLoop = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            let next = index + 1;
            if (next === texts.length) {
                next = 0;
            }
            setIndex(next);
        }, 3 * 1000);
    }, [index, setIndex]);

    return (
        <div className='loop-wrap'>
            <span>I am a&nbsp;</span>
            <div className='loop-text-container'>
                <AnimatePresence>
                    <motion.span
                        key={index}
                        variants={variants}
                        initial='enter'
                        animate='center'
                        exit='exit'
                        transition={{
                            y: { type: 'spring' },
                            opacity: { duration: 0.3 }
                        }}
                        className='loop-text'>
                        {texts[index]}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
};

const Input = () => {
    return (
        <div>
            <TextLoop />
        </div>
    );
};

export const Example = () => {
    return <Input />;
};

export default Example;
