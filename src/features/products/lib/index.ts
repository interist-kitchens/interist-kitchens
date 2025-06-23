import { $Enums } from '@prisma/client';

export const getRelationTypeLabel = (type: $Enums.ProductRelationType) => {
    switch (type) {
        case $Enums.ProductRelationType.SIMILAR:
            return 'Похожий товар';
        case $Enums.ProductRelationType.UPSELL:
            return 'Апселл';
        case $Enums.ProductRelationType.BUNDLE:
            return 'Комплект';
        case $Enums.ProductRelationType.CROSS_SELL:
            return 'Сопутствующий';
        default:
            return type;
    }
};

export const getRelationTagColor = (type: $Enums.ProductRelationType) => {
    switch (type) {
        case $Enums.ProductRelationType.SIMILAR:
            return 'blue';
        case $Enums.ProductRelationType.UPSELL:
            return 'purple';
        case $Enums.ProductRelationType.BUNDLE:
            return 'green';
        case $Enums.ProductRelationType.CROSS_SELL:
            return 'orange';
        default:
            return 'default';
    }
};
