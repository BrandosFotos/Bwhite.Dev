import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

declare global {
    var cachedPrisma: PrismaClient;
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
}

const adapter = new PrismaPg({ connectionString });

export let db: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    db = new PrismaClient({ adapter });
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient({ adapter });
    }
    db = global.cachedPrisma;
}
