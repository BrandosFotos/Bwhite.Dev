'use client';

import { useEffect, useState } from 'react';

import { ProjectItem } from './projectItem';
import styles from './styles.module.css';
import { motion, useAnimation } from 'framer-motion';

interface ProjectCardProps {
    project: ProjectItem & { position: number };
    onDragEnd: (event: any, info: any) => void;
}

export default function ProjectCard({ project, onDragEnd }: ProjectCardProps) {
    const [isTouching, setIsTouching] = useState(false);
    const controls = useAnimation();

    const getPositionClass = () => {
        if (project.position === 0) return styles.active;
        return `${styles.inactive} ${project.position < 0 ? styles.left : styles.right}`;
    };

    const handleTouchStart = () => {
        setIsTouching(true);
    };

    const handleTouchEnd = () => {
        setIsTouching(false);
    };

    useEffect(() => {
        controls.start({
            x: 0,
            opacity: project.position === 0 ? 1 : 0.5,
            scale: project.position === 0 ? 1 : 0.8,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30
            }
        });
    }, [project.position, controls]);

    return (
        <motion.div
            key={`${project.id}-${project.position}`}
            animate={controls}
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
            className={`${styles.projectCard} ${getPositionClass()} ${styles.springTransition}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
                x: project.position * 600
            }}>
            <div className={styles.projectCardInner}>
                {/* Project Image */}
                <div className={styles.imageContainer}>
                    <img src={project.image} alt={project.title} className={styles.projectImage} draggable='false' />
                </div>

                {/* Project Info */}
                <div className={styles.contentContainer}>
                    <h3 className={styles.title}>{project.title}</h3>
                    <p className={styles.description}>{project.description}</p>

                    {/* Technologies */}
                    <div className={styles.techStack}>
                        {project.technologies?.map((tech: string, idx: number) => (
                            <span key={idx} className={styles.techBadge}>
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className={styles.links}>
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                className={`${styles.link} ${styles.githubLink}`}>
                                GitHub
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                className={`${styles.link} ${styles.liveLink}`}>
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
