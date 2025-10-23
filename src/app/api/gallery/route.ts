import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

import { getServerSession } from 'next-auth';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if user has an approved Minecraft application
        const minecraftApp = await prisma.minecraftApplication.findFirst({
            where: {
                email: session.user.email,
                status: 'APPROVED'
            }
        });

        if (!minecraftApp) {
            return NextResponse.json({ error: 'You must be whitelisted to upload gallery images' }, { status: 403 });
        }

        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;
        const title = data.get('title') as string;
        const description = data.get('description') as string;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save gallery image to database
        const galleryImage = await prisma.galleryImage.create({
            data: {
                fileName: file.name,
                filePath: `/gallery/${Date.now()}-${file.name}`,
                fileData: buffer,
                title: title || null,
                description: description || null,
                minecraftUsername: minecraftApp.username,
                userId: parseInt(session.user.id)
            }
        });

        return NextResponse.json(galleryImage);
    } catch (error) {
        console.error('Gallery upload error:', error);
        return NextResponse.json({ error: 'Error uploading image' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const galleryImages = await prisma.galleryImage.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });

        return NextResponse.json(galleryImages);
    } catch (error) {
        console.error('Error fetching gallery images:', error);
        return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
    }
}
