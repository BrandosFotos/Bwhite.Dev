'use client';

import { useEffect, useRef, useState } from 'react';

import ProjectCard from './ProjectCard';
import { ProjectItem, defaultProjects } from './projectItem';
import './styles.css';

interface ProjectsCarouselProps {
    projects?: ProjectItem[];
}

export default function ProjectsCarousel({ projects = defaultProjects }: ProjectsCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
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

    const handleDragEnd = (event: any, info: any) => {
        const threshold = 100;
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
        <div className='projects-carousel' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className='projects-carousel-container'>
                <div className='projects-carousel-track'>
                    {visibleProjects.map((project) => (
                        <ProjectCard
                            key={`${project.id}-${project.position}`}
                            project={project}
                            onDragEnd={handleDragEnd}
                        />
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button onClick={handlePrevious} className='nav-button prev' aria-label='Previous project'>
                <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
            </button>
            <button onClick={handleNext} className='nav-button next' aria-label='Next project'>
                <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
            </button>
        </div>
    );
}
