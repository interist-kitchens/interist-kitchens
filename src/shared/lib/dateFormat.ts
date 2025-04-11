import dayjs from 'dayjs';

export const dateFormat = (date: Date): string =>
    dayjs(date).format('DD.MM.YYYY');
