'use client';

import React from 'react';
import { useEffect, useRef, useState } from 'react';

import { Project, projectsData } from './ProjectsCarousel/projects';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

interface ProjectsCarouselProps {
    projects?: Project[];
}

export default function ProjectsCarousel({ projects = projectsData }: ProjectsCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const controls = useAnimation();
    const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

    // Create a circular array for infinite scrolling
    const getCircularIndex = (idx: number) => {
        if (idx < 0) return projects.length - 1;
        if (idx >= projects.length) return 0;
        return idx;
    };

    // Get the visible projects (previous, current, next)
    const visibleProjects = [-1, 0, 1].map((offset) => ({
        ...projects[getCircularIndex(activeIndex + offset)],
        position: offset
    }));

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction > 0 ? 45 : -45,
            z: -300,
            transition: {
                duration: 0.5,
                ease: [0.645, 0.045, 0.355, 1.0]
            }
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            z: 0,
            transition: {
                duration: 0.5,
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 1.2
            }
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -1000 : 1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction > 0 ? -45 : 45,
            z: -300,
            transition: {
                duration: 0.5,
                ease: [0.645, 0.045, 0.355, 1.0]
            }
        })
    };

    const handleDragEnd = (event: any, info: any) => {
        const threshold = 50; // Reduced threshold for easier swipe
        if (Math.abs(info.offset.x) > threshold) {
            if (info.offset.x > 0) {
                handlePrevious();
            } else {
                handleNext();
            }
        }
    };

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => getCircularIndex(prev + 1));
    };

    const handlePrevious = () => {
        setDirection(-1);
        setActiveIndex((prev) => getCircularIndex(prev - 1));
    };

    // Auto-scroll functionality
    useEffect(() => {
        const startAutoScroll = () => {
            autoScrollRef.current = setInterval(() => {
                handleNext();
            }, 5000); // Change slide every 5 seconds
        };

        startAutoScroll();

        return () => {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current);
            }
        };
    }, []);

    // Pause auto-scroll on hover
    const handleMouseEnter = () => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current);
        }
    };

    const handleMouseLeave = () => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current);
        }
        autoScrollRef.current = setInterval(() => {
            handleNext();
        }, 5000);
    };

    return (
        <div
            className='relative h-[750px] w-full overflow-hidden md:h-[700px] lg:h-[650px]'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}>
            <div className='absolute inset-0 flex items-center justify-center py-8 [perspective:1500px]'>
                <AnimatePresence initial={false} custom={direction} mode='popLayout'>
                    <div className='relative flex w-full items-center justify-center gap-2 md:gap-8'>
                        {visibleProjects.map((project, index) => (
                            <motion.div
                                key={`${project.id}-${project.position}`}
                                custom={direction}
                                variants={slideVariants}
                                initial='enter'
                                animate='center'
                                exit='exit'
                                drag='x'
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.1}
                                whileDrag={{
                                    cursor: 'grabbing',
                                    scale: 0.95,
                                    rotateY: direction > 0 ? -5 : 5
                                }}
                                onDragEnd={handleDragEnd}
                                className={`relative transform-gpu ${
                                    project.position === 0
                                        ? 'z-20 h-full w-[90vw] cursor-grab active:cursor-grabbing md:w-[80vw] lg:w-[600px]'
                                        : 'z-10 hidden h-[90%] opacity-50 md:block md:w-[300px] lg:w-[400px]'
                                }`}
                                style={{
                                    transformStyle: 'preserve-3d'
                                }}>
                                <div className='relative h-full w-full overflow-hidden rounded-xl bg-white shadow-xl transition-all duration-300 [transform-style:preserve-3d] hover:shadow-2xl'>
                                    {/* Project Image */}
                                    <div className='relative aspect-[16/9] w-full overflow-hidden rounded-t-xl'>
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
                                        />
                                    </div>

                                    {/* Project Info */}
                                    <div className='flex h-[calc(100%-56.25%)] flex-col justify-between p-4 md:p-6'>
                                        <div>
                                            <h3 className='mb-2 text-xl font-bold text-gray-900 md:text-2xl'>
                                                {project.title}
                                            </h3>
                                            <p className='text-sm text-gray-600 md:text-base'>{project.description}</p>
                                        </div>

                                        <div className='space-y-4'>
                                            {/* Technologies */}
                                            <div className='flex flex-wrap gap-1.5 md:gap-2'>
                                                {project.technologies?.map((tech: string, idx: number) => (
                                                    <span
                                                        key={idx}
                                                        className='rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200 md:px-3 md:text-sm'>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Links */}
                                            <div className='flex gap-4'>
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className='text-sm text-gray-600 transition-all duration-200 hover:scale-105 hover:text-gray-900 md:text-base'>
                                                        GitHub
                                                    </a>
                                                )}
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className='text-sm text-gray-600 transition-all duration-200 hover:scale-105 hover:text-gray-900 md:text-base'>
                                                        Live Demo
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={handlePrevious}
                className='absolute top-1/2 left-2 -translate-y-1/2 touch-manipulation rounded-full bg-white/80 p-2 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white hover:shadow-xl md:left-4 md:p-3'
                aria-label='Previous project'>
                <svg className='h-5 w-5 md:h-6 md:w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
            </button>
            <button
                onClick={handleNext}
                className='absolute top-1/2 right-2 -translate-y-1/2 touch-manipulation rounded-full bg-white/80 p-2 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white hover:shadow-xl md:right-4 md:p-3'
                aria-label='Next project'>
                <svg className='h-5 w-5 md:h-6 md:w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
            </button>
        </div>
    );
}
