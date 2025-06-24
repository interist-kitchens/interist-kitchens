import { createMutation } from '@farfetched/core';
import { createInternalRequestFx } from '@/shared/api/requests';
import {
    CartOrderType,
    FormType,
    OrderProjectFormType,
} from '@/entities/leads/api/types';

export const sendProductOrder = createMutation({
    effect: createInternalRequestFx((formData: FormType) => ({
        url: `/leads/product-order`,
        method: 'POST',
        data: formData,
    })),
});

export const sendOrderProject = createMutation({
    effect: createInternalRequestFx((formData: OrderProjectFormType) => ({
        url: `/leads/order-project`,
        method: 'POST',
        data: formData,
    })),
});

export const sendCartOrder = createMutation({
    effect: createInternalRequestFx((data: CartOrderType) => ({
        url: `/leads/cart-order`,
        method: 'POST',
        data,
    })),
});
