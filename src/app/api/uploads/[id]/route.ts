import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const id = request.nextUrl.pathname.split('/').pop();
        if (!id) {
            return NextResponse.json({ error: 'Missing file ID' }, { status: 400 });
        }

        const upload = await prisma.uploads.findUnique({
            where: { id: parseInt(id) }
        });

        if (!upload) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        const fileBuffer = Buffer.from(upload.fileData);

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': `attachment; filename="${upload.fileName}"`
            }
        });
    } catch (error) {
        console.error('Error serving file:', error);
        return NextResponse.json({ error: 'Error serving file' }, { status: 500 });
    }
}
