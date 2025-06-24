import { $Enums } from '@prisma/client';

export const relationTypeToColor: Record<$Enums.ProductRelationType, string> = {
    SIMILAR: 'blue',
    UPSELL: 'geekblue',
    BUNDLE: 'green',
    CROSS_SELL: 'orange',
};
