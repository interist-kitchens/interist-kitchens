import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/authOptions';
import { UserProfileForm } from '@/features/user-profile';
import { getUserProfile } from '@/entities/user-profile';

export default async function ProfileEditPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return <div>Необходимо авторизоваться</div>;
    }

    const user = await getUserProfile(session.user.id);

    if (!user) {
        return <div>Пользователь не найден</div>;
    }

    return <UserProfileForm user={user} />;
}
