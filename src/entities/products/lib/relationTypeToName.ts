import { $Enums } from '@prisma/client';

export const relationTypeToName: Record<$Enums.ProductRelationType, string> = {
    SIMILAR: 'Похожий',
    UPSELL: 'Апселл',
    BUNDLE: 'Комплект',
    CROSS_SELL: 'Сопут.',
    MODULE: 'Модуль',
};
