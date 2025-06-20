import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getRouteParam } from '@/lib/utils';

import { getServerSession } from 'next-auth';

export async function PATCH(request: NextRequest): Promise<NextResponse> {
    const id = getRouteParam(request);

    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { status } = await request.json();

        if (!status || !['APPROVED', 'REJECTED'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const application = await db.minecraftApplication.update({
            where: { id: parseInt(id) },
            data: { status }
        });

        return NextResponse.json(application);
    } catch (error) {
        console.error('Update application error:', error);
        return NextResponse.json({ error: 'Error updating application' }, { status: 500 });
    }
}
