'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';

export async function updateApplicationStatus(id: number, status: 'APPROVED' | 'REJECTED') {
    try {
        await db.minecraftApplication.update({
            where: { id },
            data: { status }
        });
        revalidatePath('/admin');
    } catch (error) {
        console.error('Error updating application status:', error);
        throw new Error('Failed to update application status');
    }
}

export async function deleteUpload(id: number) {
    try {
        await db.uploads.delete({
            where: { id }
        });
        revalidatePath('/admin');
    } catch (error) {
        console.error('Error deleting upload:', error);
        throw new Error('Failed to delete upload');
    }
}

export async function toggleAdminStatus(id: number) {
    try {
        const user = await db.user.findUnique({
            where: { id },
            select: { isAdmin: true }
        });

        await db.user.update({
            where: { id },
            data: { isAdmin: !user?.isAdmin }
        });
        revalidatePath('/admin');
    } catch (error) {
        console.error('Error toggling admin status:', error);
        throw new Error('Failed to toggle admin status');
    }
}
