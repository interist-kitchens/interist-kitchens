import { Flex } from 'antd';
import { RegistrationForm } from '@/widgets/auth/ui/RegistrationForm';

export default function RegistrationPage() {
    return (
        <Flex
            justify={'center'}
            align={'center'}
            vertical
            style={{ height: '100%', backgroundColor: '#cdddea' }}
        >
            <RegistrationForm />
        </Flex>
    );
}
