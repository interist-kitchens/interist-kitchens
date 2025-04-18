import { atom } from '@/shared/factory/atom';
import { createEvent } from 'effector';
import { FormType } from '@/entities/leads/ui/ProductOrderForm';

export const productOrderFormModel = atom(() => {
    const submitForm = createEvent<FormType>();

    submitForm.watch((res) => console.log(res));
    return { submitForm, close };
});
