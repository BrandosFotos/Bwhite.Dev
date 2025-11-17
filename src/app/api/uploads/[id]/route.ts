import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id: idParam } = await context.params;

    if (!idParam) {
        return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }

    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    try {
        const upload = await prisma.uploads.findUnique({
            where: { id },
            select: {
                fileName: true,
                fileData: true
            }
        });

        if (!upload) {
            return NextResponse.json({ error: 'Upload not found' }, { status: 404 });
        }

        return new NextResponse(Buffer.from(upload.fileData), {
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': `attachment; filename="${upload.fileName}"`
            }
        });
    } catch (error) {
        console.error('Error downloading upload:', error);
        return NextResponse.json({ error: 'Failed to download upload' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id: idParam } = await context.params;

    if (!idParam) {
        return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }

    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    try {
        await prisma.uploads.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting upload:', error);
        return NextResponse.json({ error: 'Failed to delete upload' }, { status: 500 });
    }
}
