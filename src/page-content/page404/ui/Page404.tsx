import { MainLayout } from '@/widgets/layouts';
import { Typography } from 'antd';
import { Title } from '@/shared/ui/Typography';
import { paths } from '@/shared/routing';
import { LinkButton } from '@/widgets/mainPageSlider/ui/LinkButton';

export default async function Page404() {
    return (
        <MainLayout>
            <div
                className={'flex flex-col justify-center items-center h-[50vh]'}
            >
                <Title level={1}>Страница не найдена</Title>
                <Typography className={'px-5 max-w-2xl text-center mb-4'}>
                    К сожалению, запрашиваемая страница не найдена. Возможно, вы
                    перешли по ссылке, в которой была допущена ошибка, или
                    ресурс был удален.
                </Typography>
                <LinkButton href={paths.home}>Вернуться на главную</LinkButton>
            </div>
        </MainLayout>
    );
}
