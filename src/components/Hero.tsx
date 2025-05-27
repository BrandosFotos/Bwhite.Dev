'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import SubHero from '@/components/ui/SubHero';

const Hero = forwardRef<HTMLElement, {}>((_, ref) => {
  return (
<section
  ref={ref}
  className="min-h-screen w-full flex items-center justify-center -mt-16"
>

      <main className="text-center flex flex-col items-center gap-10 max-w-3xl">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <svg
            className="w-16 h-16 mb-4 fill-current text-black dark:text-white"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
        </motion.div>

        {/* Grand Hero Title */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight bg-clip-text"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          &lt;Bwhite.dev&gt;
        </motion.h1>

        {/* SubHero Component */}
        <motion.ul
          className="list-inside font-mono text-sm text-zinc-600 dark:text-zinc-400 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <SubHero />
        </motion.ul>

        {/* CTA Button */}
        <motion.div
          className="mt-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white rounded-full bg-zinc-900 dark:bg-white dark:text-black hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-all shadow-md hover:shadow-lg"
            href="#projects"
          >
            View Projects
          </a>
        </motion.div>
      </main>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
