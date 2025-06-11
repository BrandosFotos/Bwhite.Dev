import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

import { deleteUpload, toggleAdminStatus, updateApplicationStatus } from './actions';
import { AdminToggle, UploadActions, WhitelistActions } from './components/AdminActions';
import { getServerSession } from 'next-auth';

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.isAdmin) {
        redirect('/');
    }

    // Fetch admin data
    const users = (await db.user.findMany({
        include: {
            uploads: true
        }
    })) as UserWithAdmin[];

    const whitelistApplications = (await db.minecraftApplication.findMany({
        orderBy: { createdAt: 'desc' }
    })) as MinecraftApplicationWithStatus[];

    const uploads = (await db.uploads.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    email: true
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    })) as UploadWithUser[];

    // Calculate statistics
    const totalUsers = users.length;
    const totalAdmins = users.filter((user) => user.isAdmin).length;
    const totalVerified = users.filter((user) => user.emailVerified).length;
    const pendingApplications = whitelistApplications.filter((app) => app.status === 'PENDING').length;

    return (
        <div className='container mx-auto space-y-8 py-10'>
            <h1 className='text-4xl font-bold'>Admin Dashboard</h1>

            {/* Statistics Cards */}
            <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                <div className='rounded-lg bg-blue-100 p-6 shadow'>
                    <h3 className='text-lg font-semibold text-blue-800'>Total Users</h3>
                    <p className='text-3xl font-bold text-blue-600'>{totalUsers}</p>
                </div>
                <div className='rounded-lg bg-green-100 p-6 shadow'>
                    <h3 className='text-lg font-semibold text-green-800'>Verified Users</h3>
                    <p className='text-3xl font-bold text-green-600'>{totalVerified}</p>
                </div>
                <div className='rounded-lg bg-purple-100 p-6 shadow'>
                    <h3 className='text-lg font-semibold text-purple-800'>Admin Users</h3>
                    <p className='text-3xl font-bold text-purple-600'>{totalAdmins}</p>
                </div>
                <div className='rounded-lg bg-yellow-100 p-6 shadow'>
                    <h3 className='text-lg font-semibold text-yellow-800'>Pending Applications</h3>
                    <p className='text-3xl font-bold text-yellow-600'>{pendingApplications}</p>
                </div>
            </div>

            {/* Whitelist Applications */}
            <div className='rounded-lg bg-white p-6 shadow'>
                <h2 className='mb-4 text-2xl font-semibold'>Whitelist Applications</h2>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='border-b'>
                                <th className='p-2 text-left'>Username</th>
                                <th className='p-2 text-left'>Discord</th>
                                <th className='p-2 text-left'>Status</th>
                                <th className='p-2 text-left'>Date</th>
                                <th className='p-2 text-left'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {whitelistApplications.map((app) => (
                                <tr key={app.id} className='border-b hover:bg-gray-50'>
                                    <td className='p-2'>{app.username}</td>
                                    <td className='p-2'>{app.discord}</td>
                                    <td className='p-2'>
                                        <span
                                            className={`rounded px-2 py-1 text-sm ${
                                                app.status === 'PENDING'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : app.status === 'APPROVED'
                                                      ? 'bg-green-100 text-green-800'
                                                      : 'bg-red-100 text-red-800'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className='p-2'>{new Date(app.createdAt).toLocaleDateString()}</td>
                                    <td className='p-2'>
                                        <WhitelistActions
                                            id={app.id}
                                            status={app.status}
                                            onUpdateApplication={updateApplicationStatus}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* File Management */}
            <div className='rounded-lg bg-white p-6 shadow'>
                <h2 className='mb-4 text-2xl font-semibold'>File Management</h2>
                <div className='mb-4'>
                    <form action='/api/upload' method='post' encType='multipart/form-data' className='flex gap-4'>
                        <input type='file' name='file' className='flex-1 rounded border p-2' required />
                        <button type='submit' className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
                            Upload
                        </button>
                    </form>
                </div>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='border-b'>
                                <th className='p-2 text-left'>File Name</th>
                                <th className='p-2 text-left'>Uploaded By</th>
                                <th className='p-2 text-left'>Date</th>
                                <th className='p-2 text-left'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {uploads.map((upload) => (
                                <tr key={upload.id} className='border-b hover:bg-gray-50'>
                                    <td className='p-2'>{upload.fileName}</td>
                                    <td className='p-2'>{upload.user.name || upload.user.email}</td>
                                    <td className='p-2'>{new Date(upload.createdAt).toLocaleDateString()}</td>
                                    <td className='p-2'>
                                        <UploadActions
                                            id={upload.id}
                                            filePath={upload.filePath}
                                            onDeleteUpload={deleteUpload}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Management */}
            <div className='rounded-lg bg-white p-6 shadow'>
                <h2 className='mb-4 text-2xl font-semibold'>User Management</h2>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='border-b'>
                                <th className='p-2 text-left'>Name</th>
                                <th className='p-2 text-left'>Email</th>
                                <th className='p-2 text-left'>Status</th>
                                <th className='p-2 text-left'>Role</th>
                                <th className='p-2 text-left'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className='border-b hover:bg-gray-50'>
                                    <td className='p-2'>{user.name}</td>
                                    <td className='p-2'>{user.email}</td>
                                    <td className='p-2'>
                                        <span
                                            className={`rounded px-2 py-1 text-sm ${
                                                user.emailVerified
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {user.emailVerified ? 'Verified' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className='p-2'>
                                        <span
                                            className={`rounded px-2 py-1 text-sm ${
                                                user.isAdmin
                                                    ? 'bg-purple-100 text-purple-800'
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {user.isAdmin ? 'Admin' : 'User'}
                                        </span>
                                    </td>
                                    <td className='p-2'>
                                        <AdminToggle
                                            id={user.id}
                                            isAdmin={user.isAdmin}
                                            onToggleAdmin={toggleAdminStatus}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
