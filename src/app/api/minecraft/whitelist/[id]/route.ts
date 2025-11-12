import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id: idParam } = await context.params;
        const id = parseInt(idParam);
        const body = await request.json();
        const { status } = body;

        if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const updatedApplication = await prisma.minecraftApplication.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json(updatedApplication);
    } catch (error) {
        console.error('Error updating application:', error);
        return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
    }
}
