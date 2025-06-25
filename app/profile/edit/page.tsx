import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/authOptions';
import { UserProfileForm } from '@/features/user-profile';
import { getUserProfile } from '@/entities/user-profile';
import { MainLayout } from '@/widgets/layouts';
import { notFound, redirect } from 'next/navigation';
import { paths } from '@/shared/routing';

export default async function ProfileEditPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect(paths.login);
    }

    const user = await getUserProfile(session.user.id);

    if (!user) {
        notFound();
    }

    return (
        <MainLayout>
            <UserProfileForm user={user} />
        </MainLayout>
    );
}
