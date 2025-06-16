import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

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

        return new NextResponse(upload.fileData, {
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
