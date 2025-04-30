export const paths = {
    home: '/',
    login: '/login',
    register: '/registration',
    admin: '/admin',
    categoriesAdmin: '/admin/categories',
    categoriesAdminCreate: '/admin/categories/create',
    productsAdmin: '/admin/products',
    productsAdminCreate: '/admin/products/create',
    catalog: '/catalog',
    sliderAdmin: '/admin/slider',
    callbackAdmin: '/admin/callback',
    orderAdmin: '/admin/order',
    pageAdmin: '/admin/pages',
    pageAdminCreate: '/admin/pages/create',
    montage: 'sborka-i-montazh',
    delivery: 'dostavka-i-oplata',
    conditionsMontage: 'usloviya-montazha',
    warranty: 'garantiya',
    contacts: 'kontakty',
};

export const protectedRoutes = [
    paths.montage,
    paths.delivery,
    paths.conditionsMontage,
    paths.warranty,
];
