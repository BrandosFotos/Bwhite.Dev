import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid image ID' }, { status: 400 });
        }

        const galleryImage = await prisma.galleryImage.findUnique({
            where: { id }
        });

        if (!galleryImage) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        return new NextResponse(galleryImage.fileData, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Length': galleryImage.fileData.length.toString(),
                'Cache-Control': 'public, max-age=31536000'
            }
        });
    } catch (error) {
        console.error('Error serving gallery image:', error);
        return NextResponse.json({ error: 'Error serving image' }, { status: 500 });
    }
}
