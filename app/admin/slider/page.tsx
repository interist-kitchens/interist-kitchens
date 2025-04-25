import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { SliderAdminPage } from '@/page-content/slider/ui/SliderAdminPage';
import { getSlides } from '@/entities/slides';
import { slidesListModel } from '@/entities/slides/model';

async function preload() {
    'use server';

    const slides = await getSlides();

    return slides;
}

export default async function Page() {
    const scope = fork();

    const slides = await preload();
    await allSettled(slidesListModel.slidesListAdminPage.open, {
        scope,
    });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <SliderAdminPage slides={slides} />
        </EffectorNext>
    );
}
