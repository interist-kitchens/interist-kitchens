import { createMutation } from '@farfetched/core';
import { createInternalRequestFx } from '@/shared/api/requests';
import { FormType } from '@/entities/leads/api/types';

export const sendProductOrder = createMutation({
    effect: createInternalRequestFx((formData: FormType) => ({
        url: `/leads/product-order`,
        method: 'POST',
        data: formData,
    })),
});
