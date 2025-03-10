import { declarePage } from '@/shared/app';
import { createEvent, sample } from 'effector';

export const registrationPageStarted = createEvent();

export const registrationPage = declarePage({
    pageType: 'registration',
});

sample({
    clock: registrationPage.open,
    target: registrationPageStarted,
});
