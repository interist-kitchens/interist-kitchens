import { Link } from '@/shared/ui/Typography';
import { PhoneOutlined } from '@ant-design/icons';

type Props = {
    phone?: string;
    withBorder?: boolean;
};
export const PhoneLink = ({ phone, withBorder }: Props) => {
    if (!phone) {
        return null;
    }

    const formattedPhone = phone.match(/\d+/g)?.join('');

    return (
        <Link
            href={`tel:${formattedPhone}`}
            strong
            className={`!text-[var(--foreground)] hover:!text-[var(--hover-default)] ${
                withBorder
                    ? '!border-[1px] !border-solid !rounded-lg !border-black !px-[12px] !py-[5px] hover:!text-[var(--foreground)] active:!text-[var(--foreground)] visited:!text-[var(--foreground)]'
                    : ''
            }`}
        >
            {withBorder && <PhoneOutlined style={{ marginRight: 6 }} />}
            {phone}
        </Link>
    );
};
