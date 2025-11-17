'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

interface GalleryImage {
    id: number;
    fileName: string;
    title?: string;
    description?: string;
    minecraftUsername?: string;
    createdAt: string;
    user: {
        name?: string;
        email: string;
    };
}

interface GallerySectionProps {
    images: GalleryImage[];
    isWhitelisted: boolean;
    onImageUpload: (image: GalleryImage) => void;
}

const cardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

export function GallerySection({ images, isWhitelisted, onImageUpload }: GallerySectionProps) {
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [uploadForm, setUploadForm] = useState({
        username: '',
        title: '',
        description: '',
        file: null as File | null
    });

    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadForm((prev) => ({ ...prev, file }));
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className='text-center'>
                <h2 className='mt-10 mb-4 text-3xl font-bold text-white'>Community Gallery</h2>
            </div>

            {/* Gallery Grid */}
            {images.length > 0 ? (
                <div className='grid grid-cols-2 gap-6 px-6 sm:px-12 lg:grid-cols-3 lg:px-0'>
                    {images.map((image, index) => (
                        <motion.div
                            key={image.id}
                            className='cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg transition-all duration-300 hover:border-white/20'
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true, amount: 0.2 }}
                            variants={cardVariants}
                            transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.25) }}
                            onClick={() => setSelectedImage(image)}
                            whileHover={{ scale: 1.02 }}>
                            <div className='relative w-full pb-[100%]'>
                                {' '}
                                {/* Maintain square aspect */}
                                <Image
                                    src={`/api/gallery/${image.id}`}
                                    alt={image.title || 'Gallery image'}
                                    fill
                                    loading='lazy'
                                    className='absolute top-0 left-0 h-full w-full object-cover'
                                />
                            </div>
                            <div className='p-4'>
                                <h3 className='mb-2 font-semibold text-white'>{image.title || 'Untitled'}</h3>
                                {image.description && (
                                    <p className='mb-2 line-clamp-2 text-sm text-gray-300'>{image.description}</p>
                                )}
                                <div className='flex items-center justify-between text-xs text-gray-400'>
                                    <span>by {image.minecraftUsername || 'Brandon'}</span>
                                    <span>{formatDate(image.createdAt)}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className='py-12 text-center'>
                    <div className='mb-4 text-6xl'>🖼️</div>
                    <h3 className='mb-2 text-xl font-semibold text-white'>No Images Yet</h3>
                    <p className='text-gray-300'>Be the first to share your amazing builds with the community!</p>
                </div>
            )}

            {/* Image Modal */}
            {selectedImage && (
                <motion.div
                    className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedImage(null)}>
                    <motion.div
                        className='max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg'
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}>
                        <div className='relative'>
                            <Image
                                src={`/api/gallery/${selectedImage.id}`}
                                alt={selectedImage.title || 'Gallery image'}
                                width={800}
                                height={600}
                                className='h-auto max-h-[60vh] w-full object-contain'
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className='absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70'>
                                ×
                            </button>
                        </div>
                        <div className='p-6'>
                            <h3 className='mb-2 text-2xl font-bold text-white'>{selectedImage.title || 'Untitled'}</h3>
                            {selectedImage.description && (
                                <p className='mb-4 text-gray-300'>{selectedImage.description}</p>
                            )}
                            <div className='flex items-center justify-between text-sm text-gray-400'>
                                <span>by {selectedImage.minecraftUsername || 'Anonymous'}</span>
                                <span>{formatDate(selectedImage.createdAt)}</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
