import { User as PrismaUser } from '@prisma/client';

declare global {
    namespace PrismaJson {
        type User = PrismaUser & {
            isAdmin: boolean;
        };
    }
}
