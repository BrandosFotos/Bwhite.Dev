import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

import { getServerSession } from 'next-auth';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        // Check if user is admin (for admin uploads) or get username (for user uploads)
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;
        const title = data.get('title') as string;
        const description = data.get('description') as string;
        const username = data.get('username') as string;
        const pack = data.get('pack') as string;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // If admin is uploading, skip username validation
        let minecraftUsername: string | null = null;
        if (session?.user?.isAdmin) {
            // Admin upload - username is optional
            minecraftUsername = username || null;
        } else {
            // Regular user upload - username is required
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
            minecraftUsername = username;
        }

        // Validate and set pack (default to CAPLAND if not provided or invalid)
        let packValue: 'CAPLAND' | 'SKYBLOCK' | 'VANILLAPLUS' = 'CAPLAND';
        if (pack && ['CAPLAND', 'SKYBLOCK', 'VANILLAPLUS'].includes(pack)) {
            packValue = pack as 'CAPLAND' | 'SKYBLOCK' | 'VANILLAPLUS';
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
                minecraftUsername: minecraftUsername,
                pack: packValue,
                userId: session?.user?.id ? parseInt(session.user.id) : 1
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

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const pack = searchParams.get('pack'); // CAPLAND, SKYBLOCK, or VANILLAPLUS

        const where: any = {};
        if (pack && ['CAPLAND', 'SKYBLOCK', 'VANILLAPLUS'].includes(pack)) {
            where.pack = pack;
        }

        const galleryImages = await prisma.galleryImage.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                fileName: true,
                filePath: true,
                title: true,
                description: true,
                minecraftUsername: true,
                pack: true,
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
