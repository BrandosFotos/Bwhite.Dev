import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;

    if (!id) {
        return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }

    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    try {
        const galleryImage = await prisma.galleryImage.findUnique({
            where: { id: parsedId },
            select: { id: true, fileName: true, fileData: true, filePath: true }
        });

        if (!galleryImage) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        const getContentType = (fileName: string): string => {
            const ext = fileName.toLowerCase().split('.').pop();
            const contentTypes: Record<string, string> = {
                jpg: 'image/jpeg',
                jpeg: 'image/jpeg',
                png: 'image/png',
                gif: 'image/gif',
                webp: 'image/webp',
                svg: 'image/svg+xml'
            };
            return contentTypes[ext || ''] || 'application/octet-stream';
        };

        return new NextResponse(Buffer.from(galleryImage.fileData), {
            headers: {
                'Content-Type': getContentType(galleryImage.fileName),
                'Content-Disposition': `inline; filename="${galleryImage.fileName}"`
            }
        });
    } catch (error) {
        console.error('Error fetching gallery image:', error);
        return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const parsedId = parseInt(id, 10);

        await prisma.galleryImage.delete({
            where: { id: parsedId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting gallery image:', error);
        return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
}
