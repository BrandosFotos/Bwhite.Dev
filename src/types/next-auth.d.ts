import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            isAdmin: boolean;
        } & DefaultSession['user'];
    }

    interface User {
        isAdmin: boolean;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        isAdmin: boolean;
    }
}
