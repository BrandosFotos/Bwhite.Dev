import React, { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function GrowingCircleCard() {
    const containerRef = useRef(null);
    // Track scroll progress for this section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'] // progress 0 when section enters, 1 when it leaves
    });

    // Circle size grows from 80px to 600px as you scroll
    const circleSize = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.3, 1], [0, 200, 200, 200, 200]);

    // Opacity always 1 (visible as soon as section enters)
    const opacity = useTransform(scrollYProgress, [0, 0.01], [1, 1]);

    // Animate left from 50% (center) to 0% (left)
    const left = useTransform(scrollYProgress, [0, 1], ['50%', '0%']);

    // Animate translateX from -50% (centered) to 0% (flush left)
    const translateX = useTransform(scrollYProgress, [0, 0.8, 1], ['-50%', '-50%', '0%']);

    return (
        <div style={{ minHeight: '500vh', position: 'relative' }}>
            <div className='sticky top-0 z-10 h-screen w-full overflow-hidden'>
                <motion.div
                    ref={containerRef}
                    style={{
                        width: circleSize,
                        height: circleSize,
                        opacity,
                        left,
                        translateX
                    }}
                    className='absolute top-1/16 rounded-full border-4 border-white shadow-2xl'
                />
            </div>
        </div>
    );
}
