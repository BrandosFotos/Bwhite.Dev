'use client';

import { motion, MotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ id }: { id: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);

    return (
        <section className="h-screen flex justify-center items-center relative" style={{ scrollSnapAlign: 'start' }}>
            <div ref={ref} className="w-[300px] h-[400px] my-5 bg-zinc-800 overflow-hidden sm:w-[150px] sm:h-[200px]">
                <img
                    src={`/photos/cityscape/${id}.jpg`}
                    alt="A London skyscraper"
                    className="w-[300px] h-[400px] object-cover sm:w-[150px] sm:h-[200px]"
                />
            </div>
            <motion.h2
                className="text-fuchsia-400 m-0 font-mono text-5xl font-bold tracking-tight leading-tight absolute inline-block top-[calc(50%-25px)] left-[calc(50%+120px)]"
                initial={{ visibility: 'hidden' as const }}
                animate={{ visibility: 'visible' as const }}
                style={{ y }}
            >
                {`#00${id}`}
            </motion.h2>
        </section>
    );
}

export default function Parallax() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div id="parallax-example">
            {[1, 2, 3, 4, 5].map((image) => (
                <Image key={image} id={image} />
            ))}
            <motion.div
                className="fixed left-0 right-0 h-[5px] bg-fuchsia-400 bottom-[50px] origin-left"
                style={{ scaleX }}
            />
        </div>
    );
}

