import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/authOptions';
import { getUserProfile, UserProfile } from '@/entities/user-profile';
import { getUserOrders } from '@/entities/orders';
import { MainLayout } from '@/widgets/layouts';
import { notFound, redirect } from 'next/navigation';
import { paths } from '@/shared/routing';

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect(paths.login);
    }

    const [user, orders] = await Promise.all([
        getUserProfile(session.user.id),
        getUserOrders(session.user.id),
    ]);

    if (!user) {
        notFound();
    }

    return (
        <MainLayout>
            <UserProfile user={user} orders={orders} />
        </MainLayout>
    );
}
