'use client';

import { useState } from 'react';

export function UploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [packVersion, setPackVersion] = useState('');
    const [pack, setPack] = useState<'CAPLAND' | 'SKYBLOCK' | 'VANILLAPLUS'>('CAPLAND');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('packVersion', packVersion);
        formData.append('pack', pack);

        try {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/upload', true);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progress = (event.loaded / event.total) * 100;
                    setUploadProgress(Math.round(progress));
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200) {
                    // Reset form
                    setFile(null);
                    setPackVersion('');
                    setPack('CAPLAND');
                    setUploadProgress(0);
                    // You might want to trigger a refresh of the uploads list here
                } else {
                    console.error('Upload failed:', xhr.responseText);
                }
                setIsUploading(false);
            };

            xhr.onerror = () => {
                console.error('Upload failed');
                setIsUploading(false);
            };

            xhr.send(formData);
        } catch (error) {
            console.error('Upload error:', error);
            setIsUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label htmlFor='file' className='block text-sm font-medium text-gray-700'>
                    File
                </label>
                <input
                    type='file'
                    id='file'
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    required
                />
            </div>

            <div>
                <label htmlFor='pack' className='block text-sm font-medium text-gray-700'>
                    Pack
                </label>
                <select
                    id='pack'
                    value={pack}
                    onChange={(e) => setPack(e.target.value as 'CAPLAND' | 'SKYBLOCK' | 'VANILLAPLUS')}
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    required>
                    <option value='CAPLAND'>Capland</option>
                    <option value='SKYBLOCK'>Skyblock</option>
                    <option value='VANILLAPLUS'>Vanilla++</option>
                </select>
            </div>

            <div>
                <label htmlFor='packVersion' className='block text-sm font-medium text-gray-700'>
                    Pack Version
                </label>
                <input
                    type='text'
                    id='packVersion'
                    value={packVersion}
                    onChange={(e) => setPackVersion(e.target.value)}
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    placeholder='e.g., 1.0.0'
                    required
                />
            </div>

            {isUploading && (
                <div className='h-2.5 w-full rounded-full bg-gray-200'>
                    <div
                        className='h-2.5 rounded-full bg-blue-600 transition-all duration-300'
                        style={{ width: `${uploadProgress}%` }}></div>
                </div>
            )}

            <button
                type='submit'
                disabled={isUploading || !file}
                className='w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50'>
                {isUploading ? `Uploading... ${uploadProgress}%` : 'Upload'}
            </button>
        </form>
    );
}
