'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export async function updateApplicationStatus(id: number, status: 'APPROVED' | 'REJECTED') {
    try {
        await prisma.minecraftApplication.update({
            where: { id },
            data: { status }
        });
        revalidatePath('/admin');
    } catch (error) {
        console.error('Error updating application:', error);
        throw new Error('Failed to update application');
    }
}

export async function deleteUpload(id: number) {
    try {
        await prisma.uploads.delete({
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
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            throw new Error('User not found');
        }

        await prisma.user.update({
            where: { id },
            data: { isAdmin: !user.isAdmin }
        });
        revalidatePath('/admin');
    } catch (error) {
        console.error('Error toggling admin status:', error);
        throw new Error('Failed to toggle admin status');
    }
}
