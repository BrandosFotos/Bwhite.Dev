// This file is used to create a singleton instance of PrismaClient
// to avoid creating multiple instances in a Next.js application.
// This is important for performance and to prevent connection leaks.
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let connectionString = process.env.DATABASE_URL;

// Allow build to proceed without DATABASE_URL in non-production, but warn
if (!connectionString) {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('DATABASE_URL environment variable is not set');
    } else {
        console.warn('DATABASE_URL environment variable is not set - using fallback for build');
        // Provide a dummy URL for build time
        connectionString = 'postgresql://dummy:dummy@localhost:5432/dummy';
    }
}

const adapter = new PrismaPg({ connectionString });

export const prisma = globalForPrisma.prisma || new PrismaClient({ 
    adapter,
    log: ['query', 'info', 'warn', 'error'] 
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
