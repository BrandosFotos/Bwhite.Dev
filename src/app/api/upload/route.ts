import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

import { getServerSession } from 'next-auth';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;
        const packVersion = data.get('packVersion') as string;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        if (!packVersion) {
            return NextResponse.json({ error: 'Pack version is required' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save file info and data to database
        const upload = await prisma.uploads.create({
            data: {
                fileName: file.name,
                filePath: `/uploads/${Date.now()}-${file.name}`,
                fileData: buffer,
                packVersion,
                userId: parseInt(session.user.id)
            }
        });

        return NextResponse.json(upload);
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
    }
}
