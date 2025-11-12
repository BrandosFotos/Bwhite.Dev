import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id: idParam } = await context.params;
        const id = parseInt(idParam);
        const body = await request.json();
        const { isAdmin } = body;

        if (typeof isAdmin !== 'boolean') {
            return NextResponse.json({ error: 'isAdmin must be a boolean' }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { isAdmin },
            select: {
                id: true,
                name: true,
                email: true,
                isAdmin: true,
                emailVerified: true
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}
