import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const uploads = await prisma.uploads.findMany({
            select: {
                id: true,
                fileName: true,
                packVersion: true,
                createdAt: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(uploads);
    } catch (error) {
        console.error('Error fetching uploads:', error);
        return NextResponse.json({ error: 'Error fetching uploads' }, { status: 500 });
    }
}
