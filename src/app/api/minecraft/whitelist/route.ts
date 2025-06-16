import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '../../../../../lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, email, discord, reason, experience } = body;

        // Basic validation
        if (!username || !email || !discord || !reason || !experience) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Check if username already applied
        const existingApplication = await prisma.minecraftApplication.findUnique({
            where: { username }
        });

        if (existingApplication) {
            return NextResponse.json({ error: 'An application with this username already exists' }, { status: 400 });
        }

        // Create new application
        const application = await prisma.minecraftApplication.create({
            data: {
                username,
                email,
                discord,
                reason,
                experience
            }
        });

        return NextResponse.json(application, { status: 201 });
    } catch (error) {
        console.error('Application submission error:', error);
        return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const applications = await prisma.minecraftApplication.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
    }
}
