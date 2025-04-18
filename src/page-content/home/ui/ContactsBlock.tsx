import { Flex } from 'antd';
import { Link } from '../../../shared/ui/Typography';
import { CallBackButton } from '@/features/leads/callBack/ui/CallBackButton';

type Props = {
    homeUrl: string;
    phone: string;
};

export const ContactsBlock = ({ homeUrl, phone }: Props) => {
    const formattedPhone = phone.match(/\d+/g)?.join('');

    return (
        <Flex gap={12} align={'center'}>
            <Link href={homeUrl} target="_blank" className="!text-sm">
                {homeUrl}
            </Link>
            <Link
                href={`tel:${formattedPhone}`}
                strong
                className="!text-[var(--foreground)] hover:!text-[var(--hover-default)]"
            >
                {phone}
            </Link>
            <CallBackButton />
        </Flex>
    );
};
