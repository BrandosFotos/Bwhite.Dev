import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

import { getServerSession } from 'next-auth';

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.isAdmin) {
        redirect('/');
    }

    // Fetch some admin data
    const users = await db.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            isAdmin: true
        }
    });

    return (
        <div className='container mx-auto py-10'>
            <h1 className='mb-8 text-4xl font-bold'>Admin Dashboard</h1>

            <div className='bg-card rounded-lg border p-8'>
                <h2 className='mb-4 text-2xl font-semibold'>User Management</h2>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='border-b'>
                                <th className='pb-4 text-left'>ID</th>
                                <th className='pb-4 text-left'>Name</th>
                                <th className='pb-4 text-left'>Email</th>
                                <th className='pb-4 text-left'>Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className='border-b'>
                                    <td className='py-4'>{user.id}</td>
                                    <td className='py-4'>{user.name}</td>
                                    <td className='py-4'>{user.email}</td>
                                    <td className='py-4'>{user.isAdmin ? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
