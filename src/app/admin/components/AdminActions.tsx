'use client';

import { useTransition } from 'react';

interface AdminActionsProps {
    onUpdateApplication: (id: number, status: 'APPROVED' | 'REJECTED') => Promise<void>;
    onDeleteUpload: (id: number) => Promise<void>;
    onToggleAdmin: (id: number) => Promise<void>;
}

export function WhitelistActions({
    id,
    status,
    onUpdateApplication
}: {
    id: number;
    status: string;
    onUpdateApplication: AdminActionsProps['onUpdateApplication'];
}) {
    const [isPending, startTransition] = useTransition();

    if (status !== 'PENDING') return null;

    return (
        <div className='flex gap-2'>
            <button
                disabled={isPending}
                onClick={() => startTransition(() => onUpdateApplication(id, 'APPROVED'))}
                className='rounded bg-green-500 px-2 py-1 text-white hover:bg-green-600 disabled:opacity-50'>
                {isPending ? 'Processing...' : 'Approve'}
            </button>
            <button
                disabled={isPending}
                onClick={() => startTransition(() => onUpdateApplication(id, 'REJECTED'))}
                className='rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 disabled:opacity-50'>
                {isPending ? 'Processing...' : 'Reject'}
            </button>
        </div>
    );
}

export function UploadActions({
    id,
    filePath,
    onDeleteUpload
}: {
    id: number;
    filePath: string;
    onDeleteUpload: AdminActionsProps['onDeleteUpload'];
}) {
    const [isPending, startTransition] = useTransition();

    return (
        <div className='flex gap-2'>
            <a href={filePath} className='rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600' download>
                Download
            </a>
            <button
                disabled={isPending}
                onClick={() => startTransition(() => onDeleteUpload(id))}
                className='rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 disabled:opacity-50'>
                {isPending ? 'Deleting...' : 'Delete'}
            </button>
        </div>
    );
}

export function AdminToggle({
    id,
    isAdmin,
    onToggleAdmin
}: {
    id: number;
    isAdmin: boolean;
    onToggleAdmin: AdminActionsProps['onToggleAdmin'];
}) {
    const [isPending, startTransition] = useTransition();

    return (
        <button
            disabled={isPending}
            onClick={() => startTransition(() => onToggleAdmin(id))}
            className='rounded bg-purple-500 px-2 py-1 text-white hover:bg-purple-600 disabled:opacity-50'>
            {isPending ? 'Updating...' : 'Toggle Admin'}
        </button>
    );
}
