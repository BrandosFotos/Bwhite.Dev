import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

import { writeFile } from 'fs/promises';
import { getServerSession } from 'next-auth';
import { join } from 'path';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save file to disk
        const uploadsDir = join(process.cwd(), 'public', 'uploads');
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = join(uploadsDir, fileName);

        await writeFile(filePath, buffer);

        // Save file info to database
        const upload = await db.uploads.create({
            data: {
                fileName: file.name,
                filePath: `/uploads/${fileName}`,
                userId: parseInt(session.user.id)
            }
        });

        return NextResponse.json(upload);
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
    }
}
