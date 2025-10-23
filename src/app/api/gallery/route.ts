import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;
        const title = data.get('title') as string;
        const description = data.get('description') as string;
        const username = data.get('username') as string;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        if (!username) {
            return NextResponse.json({ error: 'Username is required' }, { status: 400 });
        }

        // Check if username has an approved Minecraft application
        const minecraftApp = await prisma.minecraftApplication.findFirst({
            where: {
                username: username,
                status: 'APPROVED'
            }
        });

        if (!minecraftApp) {
            return NextResponse.json({ error: 'Username not found or not whitelisted' }, { status: 403 });
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
        }

        // Validate file size (max 50MB)
        if (file.size > 50 * 1024 * 1024) {
            return NextResponse.json({ error: 'File size must be less than 50MB' }, { status: 400 });
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
                minecraftUsername: username,
                userId: 1 // Default user ID since we're not using session-based auth
            }
        });

        // Return gallery image without binary data to avoid JSON serialization issues
        const { fileData, ...galleryImageResponse } = galleryImage;
        return NextResponse.json(galleryImageResponse);
    } catch (error) {
        console.error('Gallery upload error:', error);
        return NextResponse.json({ error: 'Error uploading image' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const galleryImages = await prisma.galleryImage.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                fileName: true,
                filePath: true,
                title: true,
                description: true,
                minecraftUsername: true,
                createdAt: true,
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
