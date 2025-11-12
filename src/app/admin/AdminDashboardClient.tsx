'use client';

import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import { LogOut } from 'lucide-react';

interface User {
    id: number;
    name: string | null;
    email: string;
    isAdmin: boolean;
    emailVerified: Date | null;
}

interface MinecraftApplication {
    id: number;
    username: string;
    email: string;
    discord: string;
    reason: string;
    experience: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt: string;
}

interface Upload {
    id: number;
    fileName: string;
    packVersion: string | null;
    pack: 'CAPLAND' | 'SKYBLOCK' | 'VANILLAPLUS';
    createdAt: string;
    user: {
        name: string | null;
        email: string;
    };
}

interface GalleryImage {
    id: number;
    fileName: string;
    title: string | null;
    description: string | null;
    minecraftUsername: string | null;
    pack: 'CAPLAND' | 'SKYBLOCK' | 'VANILLAPLUS';
    createdAt: string;
    user: {
        name: string | null;
        email: string;
    };
}

export default function AdminDashboardClient() {
    const { data: session } = useSession();
    const [users, setUsers] = useState<User[]>([]);
    const [whitelistApplications, setWhitelistApplications] = useState<MinecraftApplication[]>([]);
    const [uploads, setUploads] = useState<Upload[]>([]);
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'whitelist' | 'gallery' | 'files' | 'users'>('overview');
    const [uploadForm, setUploadForm] = useState({
        file: null as File | null,
        packVersion: '',
        pack: 'CAPLAND' as 'CAPLAND' | 'SKYBLOCK' | 'VANILLAPLUS'
    });
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [galleryUploadForm, setGalleryUploadForm] = useState({
        file: null as File | null,
        title: '',
        description: '',
        pack: 'CAPLAND' as 'CAPLAND' | 'SKYBLOCK' | 'VANILLAPLUS'
    });
    const [galleryUploadStatus, setGalleryUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [galleryUploadError, setGalleryUploadError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch all data in parallel
                const [usersRes, whitelistRes, uploadsRes, galleryRes] = await Promise.all([
                    fetch('/api/user'),
                    fetch('/api/minecraft/whitelist'),
                    fetch('/api/uploads'),
                    fetch('/api/gallery')
                ]);

                const [usersData, whitelistData, uploadsData, galleryData] = await Promise.all([
                    usersRes.json(),
                    whitelistRes.json(),
                    uploadsRes.json(),
                    galleryRes.json()
                ]);

                setUsers(Array.isArray(usersData) ? usersData : []);
                setWhitelistApplications(Array.isArray(whitelistData) ? whitelistData : []);
                setUploads(Array.isArray(uploadsData) ? uploadsData : []);
                setGalleryImages(Array.isArray(galleryData) ? galleryData : []);

                setError(null);
            } catch (err) {
                console.error('Error fetching admin data:', err);
                setError('Failed to load admin data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const updateApplicationStatus = async (id: number, status: 'APPROVED' | 'REJECTED') => {
        try {
            const response = await fetch(`/api/minecraft/whitelist/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                setWhitelistApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)));
            }
        } catch (error) {
            console.error('Error updating application:', error);
        }
    };

    const deleteUpload = async (id: number) => {
        try {
            const response = await fetch(`/api/uploads/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setUploads((prev) => prev.filter((upload) => upload.id !== id));
            }
        } catch (error) {
            console.error('Error deleting upload:', error);
        }
    };

    const deleteGalleryImage = async (id: number) => {
        try {
            const response = await fetch(`/api/gallery/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setGalleryImages((prev) => prev.filter((image) => image.id !== id));
            }
        } catch (error) {
            console.error('Error deleting gallery image:', error);
        }
    };

    const toggleAdminStatus = async (id: number) => {
        try {
            const response = await fetch(`/api/user/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isAdmin: !users.find((u) => u.id === id)?.isAdmin })
            });

            if (response.ok) {
                setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, isAdmin: !user.isAdmin } : user)));
            }
        } catch (error) {
            console.error('Error toggling admin status:', error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadForm((prev) => ({ ...prev, file }));
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!uploadForm.file || !uploadForm.packVersion.trim()) {
            setUploadError('Please select a file and enter a pack version');
            return;
        }

        setUploadStatus('uploading');
        setUploadError(null);

        try {
            const formData = new FormData();
            formData.append('file', uploadForm.file);
            formData.append('packVersion', uploadForm.packVersion);
            formData.append('pack', uploadForm.pack);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const newUpload = await response.json();
                setUploads((prev) => [newUpload, ...prev]);
                setUploadForm({ file: null, packVersion: '', pack: 'CAPLAND' });
                setUploadStatus('success');
                setTimeout(() => setUploadStatus('idle'), 3000);
            } else {
                const errorData = await response.json();
                setUploadError(errorData.error || 'Upload failed');
                setUploadStatus('error');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setUploadError('Upload failed. Please try again.');
            setUploadStatus('error');
        }
    };

    if (loading) {
        return (
            <div className='relative min-h-screen bg-black'>
                {/* Neon Background */}
                <div className='fixed inset-0 -z-10'>
                    <div className='absolute inset-0 bg-black'>
                        {/* Neon grid */}
                        <div className='absolute inset-0 opacity-30'>
                            <div
                                className='absolute inset-0'
                                style={{
                                    backgroundImage: `
                                        linear-gradient(90deg, rgba(0, 255, 127, 0.1) 1px, transparent 1px),
                                        linear-gradient(rgba(0, 255, 127, 0.1) 1px, transparent 1px)
                                    `,
                                    backgroundSize: '40px 40px'
                                }}></div>
                        </div>

                        {/* Animated neon lines */}
                        <div className='absolute inset-0 overflow-hidden'>
                            <div className='absolute top-1/4 left-0 h-px w-full animate-pulse bg-gradient-to-r from-transparent via-green-400 to-transparent'></div>
                            <div className='absolute top-1/2 left-0 h-px w-full animate-pulse bg-gradient-to-r from-transparent via-blue-400 to-transparent delay-1000'></div>
                            <div className='absolute top-3/4 left-0 h-px w-full animate-pulse bg-gradient-to-r from-transparent via-purple-400 to-transparent delay-2000'></div>
                        </div>

                        {/* Glowing orbs */}
                        <div className='absolute inset-0'>
                            <div className='absolute top-1/3 left-1/4 h-32 w-32 animate-pulse rounded-full bg-green-500/20 blur-xl'></div>
                            <div className='absolute right-1/4 bottom-1/3 h-24 w-24 animate-pulse rounded-full bg-blue-500/20 blur-xl delay-1000'></div>
                            <div className='absolute top-1/2 right-1/3 h-16 w-16 animate-pulse rounded-full bg-purple-500/20 blur-xl delay-2000'></div>
                        </div>
                    </div>
                </div>

                <div className='flex min-h-screen items-center justify-center'>
                    <div className='text-center'>
                        <div className='mx-auto h-32 w-32 animate-spin rounded-full border-b-2 border-green-400'></div>
                        <p className='mt-4 text-green-400'>Loading admin dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='relative min-h-screen bg-black'>
                {/* Neon Background */}
                <div className='fixed inset-0 -z-10'>
                    <div className='absolute inset-0 bg-black'>
                        {/* Neon grid */}
                        <div className='absolute inset-0 opacity-30'>
                            <div
                                className='absolute inset-0'
                                style={{
                                    backgroundImage: `
                                        linear-gradient(90deg, rgba(0, 255, 127, 0.1) 1px, transparent 1px),
                                        linear-gradient(rgba(0, 255, 127, 0.1) 1px, transparent 1px)
                                    `,
                                    backgroundSize: '40px 40px'
                                }}></div>
                        </div>
                    </div>
                </div>

                <div className='flex min-h-screen items-center justify-center'>
                    <div className='text-center'>
                        <div className='mb-4 text-6xl text-red-400'>⚠️</div>
                        <h1 className='mb-2 text-2xl font-bold text-white'>Error Loading Dashboard</h1>
                        <p className='text-gray-400'>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className='mt-4 rounded bg-gradient-to-r from-green-500 to-blue-500 px-4 py-2 text-white hover:from-green-600 hover:to-blue-600'>
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Calculate statistics
    const totalUsers = users.length;
    const totalAdmins = users.filter((user) => user.isAdmin).length;
    const totalVerified = users.filter((user) => user.emailVerified).length;
    const pendingApplications = whitelistApplications.filter((app) => app.status === 'PENDING').length;

    const tabs = [
        { key: 'overview' as const, label: 'Overview', icon: '📊' },
        { key: 'whitelist' as const, label: 'Whitelist', icon: '📝' },
        { key: 'gallery' as const, label: 'Gallery', icon: '🖼️' },
        { key: 'files' as const, label: 'Files', icon: '📁' },
        { key: 'users' as const, label: 'Users', icon: '👥' }
    ];

    return (
        <div className='relative min-h-screen bg-black'>
            {/* Neon Background */}
            <div className='fixed inset-0 -z-10'>
                <div className='absolute inset-0 bg-black'>
                    {/* Neon grid */}
                    <div className='absolute inset-0 opacity-30'>
                        <div
                            className='absolute inset-0'
                            style={{
                                backgroundImage: `
                                    linear-gradient(90deg, rgba(0, 255, 127, 0.1) 1px, transparent 1px),
                                    linear-gradient(rgba(0, 255, 127, 0.1) 1px, transparent 1px)
                                `,
                                backgroundSize: '40px 40px'
                            }}></div>
                    </div>

                    {/* Animated neon lines */}
                    <div className='absolute inset-0 overflow-hidden'>
                        <div className='absolute top-1/4 left-0 h-px w-full animate-pulse bg-gradient-to-r from-transparent via-green-400 to-transparent'></div>
                        <div className='absolute top-1/2 left-0 h-px w-full animate-pulse bg-gradient-to-r from-transparent via-blue-400 to-transparent delay-1000'></div>
                        <div className='absolute top-3/4 left-0 h-px w-full animate-pulse bg-gradient-to-r from-transparent via-purple-400 to-transparent delay-2000'></div>
                    </div>

                    {/* Glowing orbs */}
                    <div className='absolute inset-0'>
                        <div className='absolute top-1/3 left-1/4 h-32 w-32 animate-pulse rounded-full bg-green-500/20 blur-xl'></div>
                        <div className='absolute right-1/4 bottom-1/3 h-24 w-24 animate-pulse rounded-full bg-blue-500/20 blur-xl delay-1000'></div>
                        <div className='absolute top-1/2 right-1/3 h-16 w-16 animate-pulse rounded-full bg-purple-500/20 blur-xl delay-2000'></div>
                    </div>
                </div>
            </div>

            <div className='relative z-10 container mx-auto px-4 py-8'>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}>
                    <div className='relative mb-8'>
                        <h1 className='text-center text-2xl font-bold text-white sm:text-4xl'>Admin Dashboard</h1>
                        <button
                            onClick={async () => {
                                await signOut({ 
                                    callbackUrl: '/',
                                    redirect: true 
                                });
                            }}
                            className='absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1 sm:gap-2 rounded-lg border border-red-500/30 bg-red-500/20 px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-base font-semibold text-red-400 transition-all duration-300 hover:bg-red-500/30 hover:shadow-lg hover:shadow-red-500/25'>
                            <LogOut className='h-3 w-3 sm:h-4 sm:w-4' />
                            <span className='hidden sm:inline'>Logout</span>
                        </button>
                    </div>

                    {/* Tab Navigation */}
                    <div className='mb-8 flex flex-wrap justify-center gap-2'>
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`rounded-lg px-4 py-2 font-semibold transition-all duration-300 ${
                                    activeTab === tab.key
                                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg shadow-green-500/25'
                                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                                }`}>
                                <span className='mr-2'>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-4'>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className='rounded-lg border border-green-500/20 bg-gray-900/50 p-6 backdrop-blur-sm'>
                                <div className='flex items-center'>
                                    <div className='rounded-full bg-green-500/20 p-3 text-green-400'>
                                        <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
                                            />
                                        </svg>
                                    </div>
                                    <div className='ml-4'>
                                        <p className='text-sm font-medium text-gray-400'>Total Users</p>
                                        <p className='text-2xl font-semibold text-white'>{totalUsers}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className='rounded-lg border border-blue-500/20 bg-gray-900/50 p-6 backdrop-blur-sm'>
                                <div className='flex items-center'>
                                    <div className='rounded-full bg-blue-500/20 p-3 text-blue-400'>
                                        <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                                            />
                                        </svg>
                                    </div>
                                    <div className='ml-4'>
                                        <p className='text-sm font-medium text-gray-400'>Verified Users</p>
                                        <p className='text-2xl font-semibold text-white'>{totalVerified}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className='rounded-lg border border-purple-500/20 bg-gray-900/50 p-6 backdrop-blur-sm'>
                                <div className='flex items-center'>
                                    <div className='rounded-full bg-purple-500/20 p-3 text-purple-400'>
                                        <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                                            />
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                            />
                                        </svg>
                                    </div>
                                    <div className='ml-4'>
                                        <p className='text-sm font-medium text-gray-400'>Admin Users</p>
                                        <p className='text-2xl font-semibold text-white'>{totalAdmins}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className='rounded-lg border border-yellow-500/20 bg-gray-900/50 p-6 backdrop-blur-sm'>
                                <div className='flex items-center'>
                                    <div className='rounded-full bg-yellow-500/20 p-3 text-yellow-400'>
                                        <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                                            />
                                        </svg>
                                    </div>
                                    <div className='ml-4'>
                                        <p className='text-sm font-medium text-gray-400'>Pending Applications</p>
                                        <p className='text-2xl font-semibold text-white'>{pendingApplications}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Whitelist Applications Tab */}
                    {activeTab === 'whitelist' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className='mb-8 rounded-lg border border-green-500/20 bg-gray-900/50 p-6 backdrop-blur-sm'>
                            <h2 className='mb-4 text-2xl font-semibold text-white'>Whitelist Applications</h2>
                            <div className='overflow-x-auto'>
                                <table className='min-w-full divide-y divide-gray-700'>
                                    <thead className='bg-gray-800/50'>
                                        <tr>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Username
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Email
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Discord
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Status
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Date
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-700 bg-gray-900/30'>
                                        {whitelistApplications.map((app) => (
                                            <tr key={app.id} className='transition-colors hover:bg-gray-800/50'>
                                                <td className='px-6 py-4 text-sm font-medium whitespace-nowrap text-white'>
                                                    {app.username}
                                                </td>
                                                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                                                    {app.email}
                                                </td>
                                                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                                                    {app.discord}
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <span
                                                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                            app.status === 'PENDING'
                                                                ? 'border border-yellow-500/30 bg-yellow-500/20 text-yellow-400'
                                                                : app.status === 'APPROVED'
                                                                  ? 'border border-green-500/30 bg-green-500/20 text-green-400'
                                                                  : 'border border-red-500/30 bg-red-500/20 text-red-400'
                                                        }`}>
                                                        {app.status}
                                                    </span>
                                                </td>
                                                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                                                    {new Date(app.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className='px-6 py-4 text-sm font-medium whitespace-nowrap'>
                                                    {app.status === 'PENDING' && (
                                                        <div className='flex space-x-2'>
                                                            <button
                                                                onClick={() =>
                                                                    updateApplicationStatus(app.id, 'APPROVED')
                                                                }
                                                                className='rounded border border-green-500/30 bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400 transition-colors hover:bg-green-500/30'>
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    updateApplicationStatus(app.id, 'REJECTED')
                                                                }
                                                                className='rounded border border-red-500/30 bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/30'>
                                                                Reject
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {/* Gallery Images Tab */}
                    {activeTab === 'gallery' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className='mb-8 rounded-lg border border-purple-500/20 bg-gray-900/50 p-6 backdrop-blur-sm'>
                            <h2 className='mb-4 text-2xl font-semibold text-white'>Gallery Images</h2>

                            {/* Gallery Upload Form */}
                            <div className='mb-6 rounded-lg border border-purple-500/30 bg-gray-800/50 p-4'>
                                <h3 className='mb-4 text-lg font-semibold text-purple-400'>Upload New Gallery Image</h3>
                                <form
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        if (!galleryUploadForm.file) {
                                            setGalleryUploadError('Please select an image file');
                                            return;
                                        }

                                        setGalleryUploadStatus('uploading');
                                        setGalleryUploadError(null);

                                        try {
                                            const formData = new FormData();
                                            formData.append('file', galleryUploadForm.file);
                                            formData.append('title', galleryUploadForm.title);
                                            formData.append('description', galleryUploadForm.description);
                                            formData.append('pack', galleryUploadForm.pack);

                                            const response = await fetch('/api/gallery', {
                                                method: 'POST',
                                                body: formData
                                            });

                                            if (response.ok) {
                                                const newImage = await response.json();
                                                setGalleryImages((prev) => [newImage, ...prev]);
                                                setGalleryUploadForm({ file: null, title: '', description: '', pack: 'CAPLAND' });
                                                setGalleryUploadStatus('success');
                                                setTimeout(() => setGalleryUploadStatus('idle'), 3000);
                                            } else {
                                                const errorData = await response.json();
                                                setGalleryUploadError(errorData.error || 'Upload failed');
                                                setGalleryUploadStatus('error');
                                            }
                                        } catch (error) {
                                            console.error('Gallery upload error:', error);
                                            setGalleryUploadError('Upload failed. Please try again.');
                                            setGalleryUploadStatus('error');
                                        }
                                    }}
                                    className='space-y-4'>
                                    <div>
                                        <label htmlFor='galleryPack' className='mb-2 block text-sm font-semibold text-purple-400'>
                                            Pack *
                                        </label>
                                        <select
                                            id='galleryPack'
                                            value={galleryUploadForm.pack}
                                            onChange={(e) =>
                                                setGalleryUploadForm((prev) => ({
                                                    ...prev,
                                                    pack: e.target.value as 'CAPLAND' | 'SKYBLOCK' | 'VANILLAPLUS'
                                                }))
                                            }
                                            className='w-full rounded-lg border-2 border-gray-600 bg-gray-800/50 p-3 text-white transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none'
                                            required>
                                            <option value='CAPLAND'>Capland</option>
                                            <option value='SKYBLOCK'>Skyblock</option>
                                            <option value='VANILLAPLUS'>Vanilla++</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor='galleryTitle' className='mb-2 block text-sm font-semibold text-purple-400'>
                                            Title
                                        </label>
                                        <input
                                            type='text'
                                            id='galleryTitle'
                                            value={galleryUploadForm.title}
                                            onChange={(e) =>
                                                setGalleryUploadForm((prev) => ({ ...prev, title: e.target.value }))
                                            }
                                            className='w-full rounded-lg border-2 border-gray-600 bg-gray-800/50 p-3 text-white placeholder-gray-400 transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none'
                                            placeholder='Image title (optional)'
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='galleryDescription' className='mb-2 block text-sm font-semibold text-purple-400'>
                                            Description
                                        </label>
                                        <textarea
                                            id='galleryDescription'
                                            value={galleryUploadForm.description}
                                            onChange={(e) =>
                                                setGalleryUploadForm((prev) => ({ ...prev, description: e.target.value }))
                                            }
                                            className='w-full rounded-lg border-2 border-gray-600 bg-gray-800/50 p-3 text-white placeholder-gray-400 transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none'
                                            placeholder='Image description (optional)'
                                            rows={3}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='galleryFile' className='mb-2 block text-sm font-semibold text-purple-400'>
                                            Select Image File *
                                        </label>
                                        <p className='mb-2 text-xs text-gray-400'>
                                            Maximum file size: 50MB. Supported formats: JPG, PNG, GIF, WEBP
                                        </p>
                                        <input
                                            type='file'
                                            id='galleryFile'
                                            accept='image/*'
                                            onChange={(e) =>
                                                setGalleryUploadForm((prev) => ({
                                                    ...prev,
                                                    file: e.target.files?.[0] || null
                                                }))
                                            }
                                            className='w-full rounded-lg border-2 border-gray-600 bg-gray-800/50 p-3 text-white transition-all file:mr-4 file:rounded-lg file:border-0 file:bg-purple-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-purple-600'
                                            required
                                        />
                                    </div>
                                    {galleryUploadError && (
                                        <div className='rounded-lg border border-red-500/30 bg-red-500/20 p-3 text-sm text-red-400'>
                                            {galleryUploadError}
                                        </div>
                                    )}
                                    {galleryUploadStatus === 'success' && (
                                        <div className='rounded-lg border border-green-500/30 bg-green-500/20 p-3 text-sm text-green-400'>
                                            ✅ Gallery image uploaded successfully!
                                        </div>
                                    )}
                                    <div className='flex gap-3'>
                                        <button
                                            type='submit'
                                            disabled={galleryUploadStatus === 'uploading' || !galleryUploadForm.file}
                                            className='flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:from-purple-600 hover:to-pink-600 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-700'>
                                            {galleryUploadStatus === 'uploading' ? 'Uploading...' : 'Upload Image'}
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => {
                                                setGalleryUploadForm({ file: null, title: '', description: '', pack: 'CAPLAND' });
                                                setGalleryUploadError(null);
                                                setGalleryUploadStatus('idle');
                                            }}
                                            className='rounded-xl bg-gray-600 px-6 py-3 font-bold text-white transition-all duration-300 hover:bg-gray-700'>
                                            Clear
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className='overflow-x-auto'>
                                <table className='min-w-full divide-y divide-gray-700'>
                                    <thead className='bg-gray-800/50'>
                                        <tr>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Image
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Title
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Pack
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Minecraft Username
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Uploaded By
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Date
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-700 bg-gray-900/30'>
                                        {galleryImages.map((image) => (
                                            <tr key={image.id} className='transition-colors hover:bg-gray-800/50'>
                                                <td className='px-6 py-4 text-sm font-medium whitespace-nowrap text-white'>
                                                    {image.fileName}
                                                </td>
                                                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                                                    {image.title || 'Untitled'}
                                                </td>
                                                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                                                    <span className='inline-flex rounded-full px-2 py-1 text-xs font-semibold border border-blue-500/30 bg-blue-500/20 text-blue-400'>
                                                        {image.pack === 'CAPLAND' ? 'Capland' : image.pack === 'SKYBLOCK' ? 'Skyblock' : 'Vanilla++'}
                                                    </span>
                                                </td>
                                                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                                                    {image.minecraftUsername}
                                                </td>
                                                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                                                    {image.user?.name || image.user?.email || 'Unknown User'}
                                                </td>
                                                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                                                    {new Date(image.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className='px-6 py-4 text-sm font-medium whitespace-nowrap'>
                                                    <button
                                                        onClick={() => deleteGalleryImage(image.id)}
                                                        className='rounded border border-red-500/30 bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/30'>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {/* File Management Tab */}
                    {activeTab === 'files' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className='mb-8 rounded-lg border border-blue-500/20 bg-gray-900/50 p-6 shadow-2xl backdrop-blur-sm'>
                            <h2 className='mb-4 text-2xl font-semibold text-white'>File Management</h2>

                            {/* Upload Form */}
                            <div className='mb-6 rounded-lg border border-blue-500/30 bg-gray-800/50 p-4'>
                                <h3 className='mb-4 text-lg font-semibold text-blue-400'>Upload New Modpack</h3>
                                <form onSubmit={handleUpload} className='space-y-4'>
                                    <div>
                                        <label
                                            htmlFor='pack'
                                            className='mb-2 block text-sm font-semibold text-blue-400'>
                                            Pack *
                                        </label>
                                        <select
                                            id='pack'
                                            value={uploadForm.pack}
                                            onChange={(e) =>
                                                setUploadForm((prev) => ({ ...prev, pack: e.target.value as 'CAPLAND' | 'SKYBLOCK' | 'VANILLAPLUS' }))
                                            }
                                            className='w-full rounded-lg border-2 border-gray-600 bg-gray-800/50 p-3 text-white transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none'
                                            required>
                                            <option value='CAPLAND'>Capland</option>
                                            <option value='SKYBLOCK'>Skyblock</option>
                                            <option value='VANILLAPLUS'>Vanilla++</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor='packVersion'
                                            className='mb-2 block text-sm font-semibold text-blue-400'>
                                            Pack Version *
                                        </label>
                                        <input
                                            type='text'
                                            id='packVersion'
                                            value={uploadForm.packVersion}
                                            onChange={(e) =>
                                                setUploadForm((prev) => ({ ...prev, packVersion: e.target.value }))
                                            }
                                            className='w-full rounded-lg border-2 border-gray-600 bg-gray-800/50 p-3 text-white placeholder-gray-400 transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none'
                                            placeholder='e.g., 2.1, 1.5.2, etc.'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor='file'
                                            className='mb-2 block text-sm font-semibold text-blue-400'>
                                            Select Modpack File *
                                        </label>
                                        <p className='mb-2 text-xs text-gray-400'>
                                            Maximum file size: 50MB. Supported formats: ZIP, RAR, 7Z
                                        </p>
                                        <input
                                            type='file'
                                            id='file'
                                            accept='.zip,.rar,.7z'
                                            onChange={handleFileChange}
                                            className='w-full rounded-lg border-2 border-gray-600 bg-gray-800/50 p-3 text-white transition-all file:mr-4 file:rounded-lg file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600'
                                            required
                                        />
                                    </div>
                                    {uploadError && (
                                        <div className='rounded-lg border border-red-500/30 bg-red-500/20 p-3 text-sm text-red-400'>
                                            {uploadError}
                                        </div>
                                    )}
                                    {uploadStatus === 'success' && (
                                        <div className='rounded-lg border border-green-500/30 bg-green-500/20 p-3 text-sm text-green-400'>
                                            ✅ Modpack uploaded successfully!
                                        </div>
                                    )}
                                    <div className='flex gap-3'>
                                        <button
                                            type='submit'
                                            disabled={
                                                uploadStatus === 'uploading' ||
                                                !uploadForm.file ||
                                                !uploadForm.packVersion.trim()
                                            }
                                            className='flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:from-blue-600 hover:to-purple-600 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-700'>
                                            {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload Modpack'}
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => {
                                                setUploadForm({ file: null, packVersion: '', pack: 'CAPLAND' });
                                                setUploadError(null);
                                                setUploadStatus('idle');
                                            }}
                                            className='rounded-xl bg-gray-600 px-6 py-3 font-bold text-white transition-all duration-300 hover:bg-gray-700'>
                                            Clear
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className='overflow-x-auto'>
                                <table className='min-w-full divide-y divide-gray-700'>
                                    <thead className='bg-gray-800/50'>
                                        <tr>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                File Name
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Pack
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Pack Version
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Uploaded By
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Date
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-700 bg-gray-900/30'>
                                        {uploads.map((upload) => (
                                            <tr key={upload.id} className='transition-colors hover:bg-gray-800/50'>
                                                <td className='px-6 py-4 text-sm font-medium whitespace-nowrap text-white'>
                                                    {upload.fileName}
                                                </td>
                                                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                                                    <span className='inline-flex rounded-full px-2 py-1 text-xs font-semibold border border-blue-500/30 bg-blue-500/20 text-blue-400'>
                                                        {upload.pack === 'CAPLAND' ? 'Capland' : upload.pack === 'SKYBLOCK' ? 'Skyblock' : 'Vanilla++'}
                                                    </span>
                                                </td>
                                                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                                                    {upload.packVersion || 'N/A'}
                                                </td>
                                                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                                                    {upload.user?.name || upload.user?.email || 'Unknown User'}
                                                </td>
                                                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                                                    {new Date(upload.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className='px-6 py-4 text-sm font-medium whitespace-nowrap'>
                                                    <button
                                                        onClick={() => deleteUpload(upload.id)}
                                                        className='rounded border border-red-500/30 bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/30'>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {/* User Management Tab */}
                    {activeTab === 'users' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className='mb-8 rounded-lg border border-green-500/20 bg-gray-900/50 p-6 backdrop-blur-sm'>
                            <h2 className='mb-4 text-2xl font-semibold text-white'>User Management</h2>
                            <div className='overflow-x-auto'>
                                <table className='min-w-full divide-y divide-gray-700'>
                                    <thead className='bg-gray-800/50'>
                                        <tr>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Name
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Email
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Status
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Role
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase'>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-700 bg-gray-900/30'>
                                        {users.map((user) => (
                                            <tr key={user.id} className='transition-colors hover:bg-gray-800/50'>
                                                <td className='px-6 py-4 text-sm font-medium whitespace-nowrap text-white'>
                                                    {user.name || 'N/A'}
                                                </td>
                                                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                                                    {user.email}
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <span
                                                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                            user.emailVerified
                                                                ? 'border border-green-500/30 bg-green-500/20 text-green-400'
                                                                : 'border border-yellow-500/30 bg-yellow-500/20 text-yellow-400'
                                                        }`}>
                                                        {user.emailVerified ? 'Verified' : 'Pending'}
                                                    </span>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <span
                                                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                            user.isAdmin
                                                                ? 'border border-purple-500/30 bg-purple-500/20 text-purple-400'
                                                                : 'border border-blue-500/30 bg-blue-500/20 text-blue-400'
                                                        }`}>
                                                        {user.isAdmin ? 'Admin' : 'User'}
                                                    </span>
                                                </td>
                                                <td className='px-6 py-4 text-sm font-medium whitespace-nowrap'>
                                                    <button
                                                        onClick={() => toggleAdminStatus(user.id)}
                                                        className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                                                            user.isAdmin
                                                                ? 'border border-red-500/30 bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                                                : 'border border-green-500/30 bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                                        }`}>
                                                        {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
