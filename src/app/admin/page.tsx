import { redirect } from 'next/navigation';

import AdminDashboardClient from '@/app/admin/AdminDashboardClient';
import { authOptions } from '@/lib/auth';

import { getServerSession } from 'next-auth';

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.isAdmin) {
        redirect('/');
    }

    return <AdminDashboardClient />;
}
