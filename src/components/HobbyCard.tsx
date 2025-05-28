import React, { useEffect, useRef, useState } from 'react';

type ModalData = Hobby | null;

type Hobby = {
    id: number;
    label: string;
    color: string;
};

const HOBBIES: Hobby[] = [
    { id: 1, label: 'Photography', color: '#FFB347' },
    { id: 2, label: 'Gaming', color: '#77DD77' },
    { id: 3, label: 'Music', color: '#AEC6CF' },
    { id: 4, label: 'Cooking', color: '#FF6961' },
    { id: 5, label: 'Travel', color: '#CBAACB' }
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
        HOBBIES.map(() => ({
            ...getRandomOffset(),
            scale: 1,
            animating: false
        }))
    );
    const animRefs = useRef<(number | null)[]>([]);
    const [modalData, setModalData] = useState<ModalData>(null);

    // Shimmy animation
    useEffect(() => {
        HOBBIES.forEach((_, idx) => {
            const animate = () => {
                setCircleStates((prev) =>
                    prev.map((state, i) =>
                        i === idx && !state.animating
                            ? {
                                  ...state,
                                  ...getRandomOffset()
                              }
                            : state
                    )
                );
                animRefs.current[idx] = window.setTimeout(animate, 1200 + Math.random() * 800);
            };
            animate();
        });
        return () => {
            animRefs.current.forEach((id) => id && clearTimeout(id));
        };
    }, []);

    // Mouse event handlers
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

    const handleClick = (idx: number) => {
        setModalData(HOBBIES[idx]);
    };

    const handleCloseModal = () => {
        setModalData(null);
    };

    const handleMouseMove = (idx: number, e: React.MouseEvent) => {
        // Animate more on mouse move
        setCircleStates((prev) =>
            prev.map((state, i) =>
                i === idx
                    ? {
                          ...state,
                          x: (Math.random() - 0.5) * 30,
                          y: (Math.random() - 0.5) * 30
                      }
                    : state
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
        <div style={{ position: 'relative' }}>
            {/* Card Container */}
            <div
                style={{
                    width: 400,
                    height: 250,
                    background: '#222',
                    borderRadius: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                    zIndex: 1
                }}>
                {HOBBIES.map((hobby, idx) => {
                    const state = circleStates[idx];
                    return (
                        <div
                            key={hobby.id}
                            style={{
                                position: 'absolute',
                                left: `calc(50% + ${Math.cos((idx / HOBBIES.length) * 2 * Math.PI) * 90 + state.x}px)`,
                                top: `calc(50% + ${Math.sin((idx / HOBBIES.length) * 2 * Math.PI) * 60 + state.y}px)`,
                                transform: `translate(-50%, -50%) scale(${state.scale})`,
                                transition: state.animating
                                    ? 'transform 0.15s cubic-bezier(.4,2,.6,1), left 0.3s, top 0.3s'
                                    : 'transform 0.4s cubic-bezier(.4,2,.6,1), left 0.8s, top 0.8s',
                                zIndex: state.scale > 1 ? 2 : 1,
                                cursor: 'pointer',
                                userSelect: 'none'
                            }}
                            onMouseEnter={() => handleMouseEnter(idx)}
                            onMouseLeave={() => handleMouseLeave(idx)}
                            onMouseMove={(e) => handleMouseMove(idx, e)}
                            onMouseDown={() => handleMouseDown(idx)}
                            onMouseUp={() => handleMouseUp(idx)}
                            onClick={() => handleClick(idx)}
                            tabIndex={0}>
                            <div
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    background: hobby.color,
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 600,
                                    fontSize: 16,
                                    color: '#222',
                                    position: 'relative',
                                    transition: 'box-shadow 0.2s'
                                }}>
                                {state.scale > 1.1 && (
                                    <span
                                        style={{
                                            position: 'absolute',
                                            top: '110%',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: '#fff',
                                            color: '#222',
                                            padding: '2px 10px',
                                            borderRadius: 8,
                                            fontSize: 14,
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                            whiteSpace: 'nowrap'
                                        }}>
                                        {hobby.label}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal Overlay */}
            {modalData && (
                <div
                    onClick={handleCloseModal}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10
                    }}>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: '#fff',
                            borderRadius: 12,
                            padding: 24,
                            minWidth: 240,
                            textAlign: 'center',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.25)'
                        }}>
                        <h2 style={{ marginBottom: 12 }}>{modalData.label}</h2>
                        <p>
                            This is some info about <strong>{modalData.label}</strong>!
                        </p>
                        <button
                            onClick={handleCloseModal}
                            style={{
                                marginTop: 16,
                                padding: '6px 12px',
                                borderRadius: 8,
                                border: 'none',
                                background: '#222',
                                color: '#fff',
                                cursor: 'pointer'
                            }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HobbyCard;
