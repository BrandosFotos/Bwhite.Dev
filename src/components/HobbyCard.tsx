import React, { useCallback, useEffect, useRef, useState } from 'react';

import '@/components/ui/FramerStyles/BouncyBalls.css';

// Ensure this path is correct

import { AnimatePresence, motion } from 'framer-motion';

// Your existing styles

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

// --- Physics Constants ---
const BALL_RADIUS = 45;
const GRAVITY_STRENGTH = 0.5;
const DAMPING_FACTOR = 0.99;
const BOUNCE_DAMPING = 0.7;
const TIME_STEP = 1000 / 60; // Roughly 60 frames per second

// --- Dragging Constants ---
const DRAG_THRESHOLD = 5; // pixels
const MIN_DT_FOR_VELOCITY_CALC = 8; // milliseconds
const MAX_DRAG_VELOCITY = 40; // pixels per physics frame

// --- Gravity Direction (Default: downwards) ---
let gravityDirection = { x: 0, y: 1 };

type CircleState = Hobby & {
    position: { x: number; y: number };
    velocity: { vx: number; vy: number };
    radius: number;
    isDragging: boolean;
    dragOffset: { x: number; y: number };
    scale: number;
};

const HobbyCard: React.FC = () => {
    const [circleStates, setCircleStates] = useState<CircleState[]>([]);
    const [activeHobby, setActiveHobby] = useState<Hobby | null>(null);
    const cardContainerRef = useRef<HTMLDivElement>(null);
    const animationFrameId = useRef<number | null>(null);
    const lastUpdateTime = useRef<DOMHighResTimeStamp>(0);
    const draggingBallId = useRef<number | null>(null);

    // --- Refs for drag behavior ---
    const dragStartScreenPosRef = useRef<{ x: number; y: number } | null>(null);
    const isDragEventRef = useRef<boolean>(false);
    const lastBallPosTimeRef = useRef<{ x: number; y: number; time: number } | null>(null);
    const currentDragVelocityRef = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 });

    useEffect(() => {
        if (!cardContainerRef.current) return;
        const containerWidth = cardContainerRef.current!.offsetWidth;
        const containerHeight = cardContainerRef.current!.offsetHeight;
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;
        const initialRadius = Math.min(centerX, centerY) * 0.5;

        const initialStates: CircleState[] = HOBBIES.map((hobby, idx) => {
            const angle = (idx / HOBBIES.length) * 2 * Math.PI;
            const x = initialRadius * Math.cos(angle);
            const y = initialRadius * Math.sin(angle);
            return {
                ...hobby,
                position: { x, y },
                velocity: { vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 0.5) * 5 },
                radius: BALL_RADIUS,
                isDragging: false,
                dragOffset: { x: 0, y: 0 },
                scale: 1
            };
        });
        setCircleStates(initialStates);
    }, []);

    const updatePhysics = useCallback((currentTime: DOMHighResTimeStamp) => {
        // deltaTime can be used for more precise physics if needed, but TIME_STEP is simpler here
        // const deltaTime = currentTime - lastUpdateTime.current;
        lastUpdateTime.current = currentTime;

        const container = cardContainerRef.current;
        if (!container) {
            animationFrameId.current = requestAnimationFrame(updatePhysics);
            return;
        }

        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const halfWidth = containerWidth / 2;
        const halfHeight = containerHeight / 2;

        setCircleStates((prevStates) => {
            // Create a mutable copy for collision detection modifications
            let newStates = prevStates.map((ball) => ({
                ...ball,
                velocity: { ...ball.velocity },
                position: { ...ball.position }
            }));

            newStates = newStates.map((ball, ballIndex) => {
                if (ball.isDragging) {
                    return ball;
                }

                let { position, velocity } = ball;
                let { vx, vy } = velocity;

                vx += gravityDirection.x * GRAVITY_STRENGTH;
                vy += gravityDirection.y * GRAVITY_STRENGTH;
                vx *= DAMPING_FACTOR;
                vy *= DAMPING_FACTOR;
                position.x += vx;
                position.y += vy;

                if (position.x - ball.radius < -halfWidth) {
                    position.x = -halfWidth + ball.radius;
                    vx *= -BOUNCE_DAMPING;
                }
                if (position.x + ball.radius > halfWidth) {
                    position.x = halfWidth - ball.radius;
                    vx *= -BOUNCE_DAMPING;
                }
                if (position.y - ball.radius < -halfHeight) {
                    position.y = -halfHeight + ball.radius;
                    vy *= -BOUNCE_DAMPING;
                }
                if (position.y + ball.radius > halfHeight) {
                    position.y = halfHeight - ball.radius;
                    vy *= -BOUNCE_DAMPING;
                }

                // Update ball with new physics state before collision checks
                let updatedBall = { ...ball, position, velocity: { vx, vy } };

                // Ball-to-Ball repulsion
                for (let i = ballIndex + 1; i < newStates.length; i++) {
                    const otherBall = newStates[i];
                    if (otherBall.isDragging) continue;

                    const dx = updatedBall.position.x - otherBall.position.x;
                    const dy = updatedBall.position.y - otherBall.position.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minDistance = updatedBall.radius + otherBall.radius;

                    if (distance < minDistance && distance > 0) {
                        const overlap = (minDistance - distance) / 2; // Distribute correction
                        const nx = dx / distance;
                        const ny = dy / distance;

                        updatedBall.position.x += nx * overlap;
                        updatedBall.position.y += ny * overlap;
                        otherBall.position.x -= nx * overlap;
                        otherBall.position.y -= ny * overlap;

                        // Relative velocity
                        const relVx = updatedBall.velocity.vx - otherBall.velocity.vx;
                        const relVy = updatedBall.velocity.vy - otherBall.velocity.vy;

                        // Dot product of relative velocity and normal
                        const dotProduct = relVx * nx + relVy * ny;

                        // If balls are moving towards each other
                        if (dotProduct < 0) {
                            const impulse = (-(1 + BOUNCE_DAMPING) * dotProduct) / 2; // Simplified impulse calculation (mass = 1)

                            updatedBall.velocity.vx += impulse * nx;
                            updatedBall.velocity.vy += impulse * ny;
                            otherBall.velocity.vx -= impulse * nx;
                            otherBall.velocity.vy -= impulse * ny;
                        }
                    }
                }
                return updatedBall; // Return the potentially modified ball (by its own physics or collision with earlier balls)
            });
            // The collision loop modifies `newStates` directly for `otherBall`.
            // Need to ensure these modifications are reflected.
            // A more robust way is to calculate all physics first, then all collisions.
            // The current simplified method has balls processed sequentially.
            // For this iteration, let's stick to the simpler approach but acknowledge its limitations.
            // The current loop: `updatedBall` gets its collisions resolved with subsequent balls.
            // `otherBall` gets its position and velocity updated directly in `newStates`.
            return newStates;
        });
        animationFrameId.current = requestAnimationFrame(updatePhysics);
    }, []); // Empty dependency array is okay if all refs/setStates are stable

    useEffect(() => {
        lastUpdateTime.current = performance.now();
        animationFrameId.current = requestAnimationFrame(updatePhysics);
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [updatePhysics]);

    const handleMouseDown = useCallback((e: React.MouseEvent, id: number) => {
        e.preventDefault();
        if (!cardContainerRef.current) return;
        const cardRect = cardContainerRef.current.getBoundingClientRect();

        isDragEventRef.current = false;
        dragStartScreenPosRef.current = { x: e.clientX, y: e.clientY };

        setCircleStates((prevStates) =>
            prevStates.map((ball) => {
                if (ball.id === id) {
                    const mouseXInContainer = e.clientX - cardRect.left - cardRect.width / 2;
                    const mouseYInContainer = e.clientY - cardRect.top - cardRect.height / 2;
                    const offsetX = mouseXInContainer - ball.position.x;
                    const offsetY = mouseYInContainer - ball.position.y;

                    lastBallPosTimeRef.current = { x: ball.position.x, y: ball.position.y, time: performance.now() };
                    currentDragVelocityRef.current = { vx: 0, vy: 0 };
                    draggingBallId.current = id;

                    return {
                        ...ball,
                        isDragging: true,
                        dragOffset: { x: offsetX, y: offsetY },
                        velocity: { vx: 0, vy: 0 },
                        scale: 1.3 // Also scale up on drag
                    };
                }
                return ball;
            })
        );
    }, []); // No dependencies needed that change

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!draggingBallId.current || !cardContainerRef.current) return;

        const cardRect = cardContainerRef.current.getBoundingClientRect();
        const mouseXInContainer = e.clientX - cardRect.left - cardRect.width / 2;
        const mouseYInContainer = e.clientY - cardRect.top - cardRect.height / 2;

        if (dragStartScreenPosRef.current && !isDragEventRef.current) {
            const distMoved = Math.sqrt(
                Math.pow(e.clientX - dragStartScreenPosRef.current.x, 2) +
                    Math.pow(e.clientY - dragStartScreenPosRef.current.y, 2)
            );
            if (distMoved > DRAG_THRESHOLD) {
                isDragEventRef.current = true;
            }
        }

        setCircleStates((prevStates) =>
            prevStates.map((ball) => {
                if (ball.id === draggingBallId.current) {
                    let newX = mouseXInContainer - ball.dragOffset.x;
                    let newY = mouseYInContainer - ball.dragOffset.y;

                    const halfWidth = cardRect.width / 2;
                    const halfHeight = cardRect.height / 2;
                    newX = Math.min(halfWidth - ball.radius, Math.max(-halfWidth + ball.radius, newX));
                    newY = Math.min(halfHeight - ball.radius, Math.max(-halfHeight + ball.radius, newY));

                    const now = performance.now();
                    if (lastBallPosTimeRef.current) {
                        const dt = now - lastBallPosTimeRef.current.time;
                        if (dt > MIN_DT_FOR_VELOCITY_CALC) {
                            const dx = newX - lastBallPosTimeRef.current.x;
                            const dy = newY - lastBallPosTimeRef.current.y;
                            let vx = (dx / dt) * TIME_STEP;
                            let vy = (dy / dt) * TIME_STEP;

                            vx = Math.max(-MAX_DRAG_VELOCITY, Math.min(MAX_DRAG_VELOCITY, vx));
                            vy = Math.max(-MAX_DRAG_VELOCITY, Math.min(MAX_DRAG_VELOCITY, vy));

                            currentDragVelocityRef.current = { vx, vy };
                            lastBallPosTimeRef.current = { x: newX, y: newY, time: now };
                        }
                    } else {
                        lastBallPosTimeRef.current = { x: newX, y: newY, time: now };
                    }
                    return { ...ball, position: { x: newX, y: newY } };
                }
                return ball;
            })
        );
    }, []); // No dependencies needed that change

    const handleMouseUp = useCallback(() => {
        if (draggingBallId.current) {
            const releasedBallId = draggingBallId.current;
            setCircleStates((prevStates) =>
                prevStates.map((ball) => {
                    if (ball.id === releasedBallId) {
                        return {
                            ...ball,
                            isDragging: false,
                            velocity: currentDragVelocityRef.current,
                            scale: 1 // Reset scale
                        };
                    }
                    return ball;
                })
            );
            draggingBallId.current = null;
            lastBallPosTimeRef.current = null;
            // isDragEventRef and dragStartScreenPosRef are managed per interaction
        }
    }, []); // No dependencies needed that change

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    // --- Touch Handlers ---
    const handleTouchStart = useCallback((e: React.TouchEvent, id: number) => {
        // e.preventDefault(); // Already called on the element if needed, keep for consistency or remove if not causing issues
        if (!cardContainerRef.current || e.touches.length !== 1) return;
        const touch = e.touches[0];
        const cardRect = cardContainerRef.current.getBoundingClientRect();

        isDragEventRef.current = false;
        dragStartScreenPosRef.current = { x: touch.clientX, y: touch.clientY };

        setCircleStates((prevStates) =>
            prevStates.map((ball) => {
                if (ball.id === id) {
                    const touchXInContainer = touch.clientX - cardRect.left - cardRect.width / 2;
                    const touchYInContainer = touch.clientY - cardRect.top - cardRect.height / 2;
                    const offsetX = touchXInContainer - ball.position.x;
                    const offsetY = touchYInContainer - ball.position.y;

                    lastBallPosTimeRef.current = { x: ball.position.x, y: ball.position.y, time: performance.now() };
                    currentDragVelocityRef.current = { vx: 0, vy: 0 };
                    draggingBallId.current = id;

                    return {
                        ...ball,
                        isDragging: true,
                        dragOffset: { x: offsetX, y: offsetY },
                        velocity: { vx: 0, vy: 0 },
                        scale: 1.3 // Also scale up on drag
                    };
                }
                return ball;
            })
        );
    }, []);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!draggingBallId.current || !cardContainerRef.current || e.touches.length !== 1) return;
        // if (isDragEventRef.current) e.preventDefault(); // Prevent scroll only if dragging started

        const touch = e.touches[0];
        const cardRect = cardContainerRef.current.getBoundingClientRect();
        const touchXInContainer = touch.clientX - cardRect.left - cardRect.width / 2;
        const touchYInContainer = touch.clientY - cardRect.top - cardRect.height / 2;

        if (dragStartScreenPosRef.current && !isDragEventRef.current) {
            const distMoved = Math.sqrt(
                Math.pow(touch.clientX - dragStartScreenPosRef.current.x, 2) +
                    Math.pow(touch.clientY - dragStartScreenPosRef.current.y, 2)
            );
            if (distMoved > DRAG_THRESHOLD) {
                isDragEventRef.current = true;
                // Consider calling e.preventDefault() here if needed, once dragging is confirmed
            }
        }
        if (isDragEventRef.current && e.cancelable) {
            // Check if event is cancelable
            e.preventDefault(); // Prevent scroll only if dragging started and event is cancelable
        }

        setCircleStates((prevStates) =>
            prevStates.map((ball) => {
                if (ball.id === draggingBallId.current) {
                    let newX = touchXInContainer - ball.dragOffset.x;
                    let newY = touchYInContainer - ball.dragOffset.y;

                    const halfWidth = cardRect.width / 2;
                    const halfHeight = cardRect.height / 2;
                    newX = Math.min(halfWidth - ball.radius, Math.max(-halfWidth + ball.radius, newX));
                    newY = Math.min(halfHeight - ball.radius, Math.max(-halfHeight + ball.radius, newY));

                    const now = performance.now();
                    if (lastBallPosTimeRef.current) {
                        const dt = now - lastBallPosTimeRef.current.time;
                        if (dt > MIN_DT_FOR_VELOCITY_CALC) {
                            const dx = newX - lastBallPosTimeRef.current.x;
                            const dy = newY - lastBallPosTimeRef.current.y;
                            let vx = (dx / dt) * TIME_STEP;
                            let vy = (dy / dt) * TIME_STEP;

                            vx = Math.max(-MAX_DRAG_VELOCITY, Math.min(MAX_DRAG_VELOCITY, vx));
                            vy = Math.max(-MAX_DRAG_VELOCITY, Math.min(MAX_DRAG_VELOCITY, vy));

                            currentDragVelocityRef.current = { vx, vy };
                            lastBallPosTimeRef.current = { x: newX, y: newY, time: now };
                        }
                    } else {
                        lastBallPosTimeRef.current = { x: newX, y: newY, time: now };
                    }
                    return { ...ball, position: { x: newX, y: newY } };
                }
                return ball;
            })
        );
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (draggingBallId.current) {
            const releasedBallId = draggingBallId.current;
            setCircleStates((prevStates) =>
                prevStates.map((ball) => {
                    if (ball.id === releasedBallId) {
                        return {
                            ...ball,
                            isDragging: false,
                            velocity: currentDragVelocityRef.current,
                            scale: 1 // Reset scale
                        };
                    }
                    return ball;
                })
            );
            draggingBallId.current = null;
            lastBallPosTimeRef.current = null;
        }
    }, []);

    useEffect(() => {
        // It's important to use { passive: false } for touchmove if you intend to call e.preventDefault()
        // to prevent scrolling during drag.
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('touchcancel', handleTouchEnd);
        return () => {
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchcancel', handleTouchEnd);
        };
    }, [handleTouchMove, handleTouchEnd]);

    const handleBubbleMouseEnter = useCallback((id: number) => {
        setCircleStates((prevStates) =>
            prevStates.map((ball) => (ball.id === id && !ball.isDragging ? { ...ball, scale: 1.3 } : ball))
        );
    }, []);

    const handleBubbleMouseLeave = useCallback((id: number) => {
        setCircleStates((prevStates) =>
            prevStates.map((ball) => (ball.id === id && !ball.isDragging ? { ...ball, scale: 1 } : ball))
        );
    }, []);

    const handleBallClick = (ball: CircleState) => {
        if (!isDragEventRef.current) {
            if (ball.label === 'Gaming') {
                window.open('https://bwhite.dev/mc', '_blank');
            } else {
                setActiveHobby(ball);
            }
        }
        // isDragEventRef will be reset on the next mousedown/touchstart
    };

    return (
        <>
            <div className='hobby-card-container' ref={cardContainerRef}>
                {circleStates.map((ball) => (
                    <div
                        key={ball.id}
                        className='circle-wrapper'
                        style={
                            {
                                left: `calc(50% + ${ball.position.x}px)`,
                                top: `calc(50% + ${ball.position.y}px)`,
                                transform: `translate(-50%, -50%) scale(${ball.scale})`,
                                transition: ball.isDragging
                                    ? 'transform 0.05s ease-out, box-shadow 0.3s ease' // Faster transform when dragging
                                    : 'transform 0.2s cubic-bezier(.4,2,.6,1), box-shadow 0.3s ease',
                                zIndex: ball.isDragging || ball.scale > 1 ? 2 : 1
                            } as React.CSSProperties
                        }
                        onMouseDown={(e) => handleMouseDown(e, ball.id)}
                        onTouchStart={(e) => handleTouchStart(e, ball.id)}
                        onMouseEnter={() => handleBubbleMouseEnter(ball.id)}
                        onMouseLeave={() => handleBubbleMouseLeave(ball.id)}
                        onClick={() => handleBallClick(ball)} // Use the new click handler
                        tabIndex={0}>
                        <div className='circle' style={{ '--background-color': ball.color } as React.CSSProperties}>
                            {ball.icon}
                        </div>
                    </div>
                ))}
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
                            <p className='modal-description'>
                                This is more detailed information about {activeHobby.label}. You can expand this text
                                with more details or even add images/links!
                            </p>
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
