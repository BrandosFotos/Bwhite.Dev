import { MinecraftApplication, Prisma, Uploads, User } from '@prisma/client';

declare global {
    type UserWithAdmin = User & {
        uploads: Uploads[];
        isAdmin: boolean;
    };

    type MinecraftApplicationWithStatus = MinecraftApplication;

    type UploadWithUser = Uploads & {
        user: {
            name: string | null;
            email: string;
        };
    };
}
