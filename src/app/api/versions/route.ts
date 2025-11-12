import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const pack = searchParams.get('pack'); // CAPLAND, SKYBLOCK, or VANILLAPLUS

        const where: any = {};
        if (pack && ['CAPLAND', 'SKYBLOCK', 'VANILLAPLUS'].includes(pack)) {
            where.pack = pack;
        }

        const uploads = await prisma.uploads.findMany({
            where,
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
        console.error('Error fetching versions:', error);
        return NextResponse.json({ error: 'Error fetching versions' }, { status: 500 });
    }
}

