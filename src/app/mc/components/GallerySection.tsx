'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

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

export function GallerySection({ images, isWhitelisted, onImageUpload }: GallerySectionProps) {
    const { data: session } = useSession();
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [uploadForm, setUploadForm] = useState({
        title: '',
        description: '',
        file: null as File | null
    });
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadForm((prev) => ({ ...prev, file }));
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!uploadForm.file) return;

        setUploadStatus('loading');
        setErrorMessage('');

        try {
            const formData = new FormData();
            formData.append('file', uploadForm.file);
            formData.append('title', uploadForm.title);
            formData.append('description', uploadForm.description);

            const response = await fetch('/api/gallery', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to upload image');
            }

            setUploadStatus('success');
            setUploadForm({ title: '', description: '', file: null });
            setShowUploadForm(false);
            onImageUpload(data);

            // Reset form after 3 seconds
            setTimeout(() => setUploadStatus('idle'), 3000);
        } catch (error) {
            setUploadStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Failed to upload image');
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
                <h2 className='mb-4 text-3xl font-bold text-white'>Community Gallery</h2>
                <p className='mb-6 text-lg text-gray-300'>
                    Showcase your amazing builds and creations from our server!
                </p>

                {session?.user && isWhitelisted && (
                    <motion.button
                        onClick={() => setShowUploadForm(!showUploadForm)}
                        className='transform rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-pink-600'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}>
                        {showUploadForm ? 'Cancel Upload' : '📸 Upload Image'}
                    </motion.button>
                )}

                {session?.user && !isWhitelisted && (
                    <div className='mx-auto max-w-md rounded-xl border border-yellow-500/30 bg-yellow-500/20 p-4'>
                        <p className='text-yellow-200'>
                            <span className='font-semibold'>⚠️ Whitelist Required:</span> You need to be whitelisted to
                            upload images to the gallery.
                        </p>
                    </div>
                )}

                {!session?.user && (
                    <div className='mx-auto max-w-md rounded-xl border border-blue-500/30 bg-blue-500/20 p-4'>
                        <p className='text-blue-200'>
                            <span className='font-semibold'>🔐 Login Required:</span> Please log in to upload images to
                            the gallery.
                        </p>
                    </div>
                )}
            </div>

            {/* Upload Form */}
            {showUploadForm && (
                <motion.div
                    className='rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg'
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}>
                    <h3 className='mb-4 text-xl font-semibold text-white'>Upload New Image</h3>
                    <form onSubmit={handleUpload} className='space-y-4'>
                        <div>
                            <label htmlFor='title' className='mb-2 block text-sm font-semibold text-purple-400'>
                                Image Title
                            </label>
                            <input
                                type='text'
                                id='title'
                                value={uploadForm.title}
                                onChange={(e) => setUploadForm((prev) => ({ ...prev, title: e.target.value }))}
                                className='w-full rounded-lg border-2 border-gray-600 bg-gray-800/50 p-3 text-white placeholder-gray-400 transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none'
                                placeholder='Give your image a title...'
                            />
                        </div>

                        <div>
                            <label htmlFor='description' className='mb-2 block text-sm font-semibold text-purple-400'>
                                Description
                            </label>
                            <textarea
                                id='description'
                                value={uploadForm.description}
                                onChange={(e) => setUploadForm((prev) => ({ ...prev, description: e.target.value }))}
                                className='w-full rounded-lg border-2 border-gray-600 bg-gray-800/50 p-3 text-white placeholder-gray-400 transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none'
                                placeholder='Describe your build or creation...'
                                rows={3}
                            />
                        </div>

                        <div>
                            <label htmlFor='file' className='mb-2 block text-sm font-semibold text-purple-400'>
                                Select Image
                            </label>
                            <input
                                type='file'
                                id='file'
                                accept='image/*'
                                onChange={handleFileChange}
                                className='w-full rounded-lg border-2 border-gray-600 bg-gray-800/50 p-3 text-white transition-all file:mr-4 file:rounded-lg file:border-0 file:bg-purple-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-purple-600'
                                required
                            />
                        </div>

                        {uploadStatus === 'error' && (
                            <div className='rounded-lg border border-red-500/30 bg-red-500/20 p-3 text-red-200'>
                                <span className='font-semibold'>Error:</span> {errorMessage}
                            </div>
                        )}

                        {uploadStatus === 'success' && (
                            <div className='rounded-lg border border-green-500/30 bg-green-500/20 p-3 text-green-200'>
                                <span className='font-semibold'>Success!</span> Image uploaded successfully!
                            </div>
                        )}

                        <div className='flex gap-4'>
                            <button
                                type='submit'
                                disabled={uploadStatus === 'loading' || !uploadForm.file}
                                className='flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:from-purple-600 hover:to-pink-600 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-700'>
                                {uploadStatus === 'loading' ? 'Uploading...' : 'Upload Image'}
                            </button>
                            <button
                                type='button'
                                onClick={() => setShowUploadForm(false)}
                                className='rounded-xl border border-gray-600 px-6 py-3 text-gray-300 transition-all hover:bg-gray-800/50'>
                                Cancel
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            {/* Gallery Grid */}
            {images.length > 0 ? (
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {images.map((image, index) => (
                        <motion.div
                            key={image.id}
                            className='cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg transition-all duration-300 hover:border-white/20'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedImage(image)}
                            whileHover={{ scale: 1.02 }}>
                            <div className='relative aspect-square'>
                                <Image
                                    src={`/api/gallery/${image.id}`}
                                    alt={image.title || 'Gallery image'}
                                    fill
                                    className='object-cover'
                                />
                            </div>
                            <div className='p-4'>
                                <h3 className='mb-2 font-semibold text-white'>{image.title || 'Untitled'}</h3>
                                {image.description && (
                                    <p className='mb-2 line-clamp-2 text-sm text-gray-300'>{image.description}</p>
                                )}
                                <div className='flex items-center justify-between text-xs text-gray-400'>
                                    <span>by {image.minecraftUsername || 'Anonymous'}</span>
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
