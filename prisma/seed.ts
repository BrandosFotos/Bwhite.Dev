import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create a new user
    const user = await prisma.user.upsert({
        where: { email: 'demo@demo.com' },
        update: {},
        create: {
            email: 'demo@demo.com',
            name: 'Demo User',
            password: 'fa3734736f13ba4a6d2d626a7d6c3de8437aca84c3e9c6e4f30d03faf08740d6' // Hashed password is 'password' in MD6-256
        }
    });
    console.log('User created:', user);
}

main()
    .then(() => {
        prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
