import { Flex } from 'antd';
import { CallBackButton } from '@/features/leads/callBack/ui/CallBackButton';
import { PhoneLink } from '@/shared/ui/PhoneLink';

type Props = {
    phone: string;
};

export const ContactsBlock = ({ phone }: Props) => {
    return (
        <Flex gap={12} align={'center'} rootClassName="!hidden md:!flex">
            <PhoneLink phone={phone} />
            <CallBackButton />
        </Flex>
    );
};
