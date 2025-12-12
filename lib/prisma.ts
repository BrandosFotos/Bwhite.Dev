// This file is used to create a singleton instance of PrismaClient
// to avoid creating multiple instances in a Next.js application.
// This is important for performance and to prevent connection leaks.
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
}

const adapter = new PrismaPg({ connectionString });

export const prisma = globalForPrisma.prisma || new PrismaClient({ 
    adapter,
    log: ['query', 'info', 'warn', 'error'] 
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
