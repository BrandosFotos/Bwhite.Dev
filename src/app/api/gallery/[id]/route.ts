import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);

        const galleryImage = await prisma.galleryImage.findUnique({
            where: { id },
            select: {
                id: true,
                fileName: true,
                fileData: true,
                filePath: true
            }
        });

        if (!galleryImage) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        return new NextResponse(galleryImage.fileData, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Disposition': `inline; filename="${galleryImage.fileName}"`
            }
        });
    } catch (error) {
        console.error('Error fetching gallery image:', error);
        return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);

        await prisma.galleryImage.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting gallery image:', error);
        return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
}
