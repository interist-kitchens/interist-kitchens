/** https://www.prisma.io/docs/orm/reference/error-reference коды ошибок Prisma */
export const getPrismaTypeError = (errorCode: string) => {
    switch (errorCode) {
        case 'P2002':
            return 'Алиас уже занят. Введите другой';
        default:
            return 'Ошибка запроса на добавление. Попробуйте позже.';
    }
};
