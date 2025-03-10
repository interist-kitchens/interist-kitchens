import { EffectorNext } from '@effector/next';
import { RegistrationForm } from '@/widgets/auth/ui/RegistrationForm';
import { Flex } from 'antd';
import { allSettled, fork, serialize } from 'effector';
import { registrationPage } from '@/page-content/registrationPage/model';

export default async function Page() {
    const scope = fork();

    await allSettled(registrationPage.open, { scope });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <Flex
                justify={'center'}
                align={'center'}
                vertical
                style={{ height: '100%', backgroundColor: '#cdddea' }}
            >
                <RegistrationForm />
            </Flex>
        </EffectorNext>
    );
}
