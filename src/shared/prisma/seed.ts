import { prisma } from './prisma-client';
import { hash } from 'bcryptjs';

async function main() {
    const modernKitchens = await prisma.category.upsert({
        where: {
            alias: 'sovremennye-kuhni',
        },
        update: {},
        create: {
            id: 1,
            name: 'Современные кухни',
            metaTitle: 'Современные кухни под заказ с доставкой по России',
            metaDescription:
                'Купить современные кухни под заказ по выгодным ценам и доставкой по России',
            alias: 'sovremennye-kuhni',
            image: 'https://0cu49g0vululgtgg.public.blob.vercel-storage.com/public/2_d-JJipoj5RziwESbwnEuVhaKkLL4F7lp.webp',
        },
    });
    const romeKitchen = await prisma.product.upsert({
        where: {
            alias: 'kitchen-1-1',
        },
        update: {},
        create: {
            name: 'Кухня 1 3 метра',
            categoryId: 1,
            alias: 'kitchen-1-1',
            price: '67000',
            metaTitle: 'Современная кухня Кухня 1 3 метра',
            metaDescription:
                'Купить современные кухни Кухня 1 3 метра под заказ по выгодным ценам и доставкой по России',
            image: 'https://0cu49g0vululgtgg.public.blob.vercel-storage.com/public/11-ZVCXPOPmYTv9UnHs14hCXbjE5l7GO3.webp',
            images: [
                'https://0cu49g0vululgtgg.public.blob.vercel-storage.com/public/12-NwvAK5qKf8RNA6l6U3qILCJczYuxOx.webp',
                'https://0cu49g0vululgtgg.public.blob.vercel-storage.com/public/13-qEgXVnVStgvjNLPXibxWracQqgEqwn.webp',
                'https://0cu49g0vululgtgg.public.blob.vercel-storage.com/public/14-EJ72wQOlMFYIU1gDwgFhaHiiuPMT1R.webp',
                'https://0cu49g0vululgtgg.public.blob.vercel-storage.com/public/15-4dhwD8WVHi2I6oxo1LMZec0zUuNgNJ.webp',
                'https://0cu49g0vululgtgg.public.blob.vercel-storage.com/public/16-n8TdZvluRWK3Z0ix3IYiuiIF3q0TOY.webp',
            ],
        },
    });
    const tssKitchen = await prisma.product.upsert({
        where: {
            alias: 'rome-kitchen',
        },
        update: {},
        create: {
            name: 'Кухня Flag TSS',
            categoryId: 1,
            price: '62000',
            alias: 'kuhnya-flag-tss',
            metaTitle: 'Кухня Flag TSS',
            metaDescription:
                'Купить современные кухни Flag TSS под заказ по выгодным ценам и доставкой по России',
            image: 'https://0cu49g0vululgtgg.public.blob.vercel-storage.com/public/Flag_TSS_01_1730x1152_min-AkHCGgE9m4wga2ETvkAmC3fhccyDcg.webp',
        },
    });
    const deliveryPage = await prisma.page.upsert({
        where: {
            alias: 'dostavka-i-oplata',
        },
        update: {},
        create: {
            name: 'Доставка и оплата',
            alias: 'dostavka-i-oplata',
            metaTitle: 'Доставка и оплата',
            metaDescription: 'Доставка и оплата от компании Кухни от Кукухни',
            text: '<div class="ver-wrap center-wrap text-page__wrap _first txt"><p class="txt__h2 _margin-bottom">Бесплатная доставка по Москве и Московской области</p><p>Служба доставки завода-производителя бесплатно доставит вашу кухню по Москве и Московской области (до 10 км от МКАД).</p><p class="txt__h6">Тарифы на доставку свыше 10 км от МКАД и подъем груза:</p><div class="txt__table"><div class="txt__tr"><div class="txt__th">Виды работ</div><div class="txt__th">Стоимость</div></div><div class="txt__tr"><div class="txt__td">Доставка груза от 11 до 50 км от МКАД</div><div class="txt__td">1&nbsp;000&nbsp;₽</div></div><div class="txt__tr"><div class="txt__td">Доставка груза от 51 до 100 км от МКАД</div><div class="txt__td">1&nbsp;500&nbsp;₽</div></div><div class="txt__tr"><div class="txt__td">Доставка груза 100 км от МКАД (оплата в одну сторону)</div><div class="txt__td">2&nbsp;500&nbsp;₽ + 25&nbsp;₽ (за км)</div></div><div class="txt__tr"><div class="txt__td">Доставка груза от 11 км от МКАД</div><div class="txt__td">25&nbsp;₽ за км</div></div><div class="txt__tr"><div class="txt__td">Повторная доставка груза в пределах - до 10 км/от 11 до 50 км/от 51 до 100 км от МКАД</div><div class="txt__td">3&nbsp;500&nbsp;₽ / 4 000&nbsp;₽ / 4&nbsp;500&nbsp;₽</div></div><div class="txt__tr"><div class="txt__td">Подъем элементов заказа, ни один из размеров которого не превышает 1,5 м (за этаж)</div><div class="txt__td">60&nbsp;₽</div></div><div class="txt__tr"><div class="txt__td">Подъем негабаритного груза, один из размеров которого превышает 1,5 м (за этаж)</div><div class="txt__td">120&nbsp;₽</div></div><div class="txt__tr"><div class="txt__td">Подъем элементов груза к лифту и спуск их от лифта, в случае нахождения лифтовой площадки между этажами (на все доставленные товары)</div><div class="txt__td">500&nbsp;₽</div></div><div class="txt__tr"><div class="txt__td">Подъем пенала, ни один из элементов которого не превышает 2200*600*600/большего размера (за этаж)</div><div class="txt__td">120&nbsp;₽ / 150&nbsp;₽</div></div><div class="txt__tr"><div class="txt__td">Подъем пластиковой столешницы длиной до 2,5 м / более 2,5 м (за этаж)</div><div class="txt__td">120&nbsp;₽ / 150&nbsp;₽</div></div><div class="txt__tr"><div class="txt__td">Подъем столешницы из искусственного камня, размер которой до 1,5 м / более 1,5 м</div><div class="txt__td">150&nbsp;₽ / 200&nbsp;₽</div></div><div class="txt__tr"><div class="txt__td">Подъем стеновой панели длиной до 2,5 м / более 2,5 м / стеклянная стеновая панель (за этаж)</div><div class="txt__td">80&nbsp;₽ / 120&nbsp;₽ / 300&nbsp;₽</div></div><div class="txt__tr"><div class="txt__td">Подъем холодильника высотой до 1,8 м / высотой более 1,8 м / side-by-side (за этаж)</div><div class="txt__td">120&nbsp;₽ / 300&nbsp;₽ / 500&nbsp;₽</div></div><div class="txt__tr"><div class="txt__td">Подъем варочной панели, барной стойки, плоской вытяжки, мойки (за этаж)</div><div class="txt__td">30&nbsp;₽</div></div><div class="txt__tr"><div class="txt__td">Подъем духового шкафа, посудомоечной машины, холодильника для бара, кухонной вытяжки (за этаж)</div><div class="txt__td">60&nbsp;₽</div></div><div class="txt__tr"><div class="txt__td">Подъем стиральной машины (за этаж)</div><div class="txt__td">130&nbsp;₽</div></div><div class="txt__tr"><div class="txt__td">Перемещение элементов груза в случае нахождения лифта на расстоянии более 15 метров от двери подъезда (за все доставленные товары)</div><div class="txt__td">500&nbsp;₽</div></div><div class="txt__tr"><div class="txt__td">Перемещение элементов груза в случае расположения двери подъезда на расстоянии 15 метров и за каждые последующие 15 метров (за все доставленные товары)</div><div class="txt__td">400&nbsp;₽</div></div><div class="txt__tr"><div class="txt__td">Перегруз всех элементов груза в транспортное средство Заказчика</div><div class="txt__td">1&nbsp;500&nbsp;₽</div></div></div><p class="txt__h2 _margin-bottom">Доставка по России</p><p class="main-page__form-row">Стоимость и возможность доставки кухни в ваш регион уточняйте по телефону горячей линии Haier Kitchen Lab<span class="main-page__form-btn">Оставить заявку</span></p></div>',
        },
    });
    const montagePage = await prisma.page.upsert({
        where: {
            alias: 'sborka-i-montazh',
        },
        update: {},
        create: {
            name: 'Сборка и монтаж',
            alias: 'sborka-i-montazh',
            metaTitle: 'Сборка и монтаж',
            metaDescription: 'Сборка и монтаж от компании Кухни от Кукухни',
            text: '<div class="ver-wrap center-wrap text-page__wrap _first txt"><div class="text-page__form-row-with-btn"><p class="main-page__form-row">Соберем кухню и&nbsp;подключим технику в&nbsp;удобное для вас время. Стоимость услуг установки кухни составляет&nbsp;10% от&nbsp;стоимости кухни.</p></div><p class="txt__h5">Сборка кухни включает в&nbsp;себя:</p><ul><li>установку, выравнивание и&nbsp;стяжку модулей нижней и&nbsp;верхней базы, пеналов, стеллажей;</li><li>установку, герметизацию и&nbsp;стяжку столешниц, в&nbsp;том числе их&nbsp;доработку под колонны, выступы, вентиляционные короба и&nbsp;прочие конструктивные особенности помещения в&nbsp;зоне установки кухонного гарнитура;</li><li>установку цоколей;</li><li>установку и&nbsp;герметизацию плинтусов;</li><li>установку стеновых панелей;</li><li>установку карнизов, подзоров, декоративных элементов (баллюстрады, полуколонны, колонны и&nbsp;проч.);</li><li>установку ручек (в&nbsp;том числе и&nbsp;сверловку отверстий под них в&nbsp;случае отсутствия производственной сверловки).</li></ul></div>',
        },
    });
    const montageConditionsPage = await prisma.page.upsert({
        where: {
            alias: 'usloviya-montazha',
        },
        update: {},
        create: {
            name: 'Условия монтажа',
            alias: 'usloviya-montazha',
            metaTitle: 'Условия монтажа',
            metaDescription: 'Условия монтажа от компании Кухни от Кукухни',
            text: '<div class="ver-wrap center-wrap text-page__wrap _first txt"><ol><li>Под стандартной установкой понимаются установка, выравнивание и стяжка модулей нижней и верхней базы, пеналов, стеллажей, установка, герметизация и стяжка столешниц, в том числе их доработка под колонны, выступы, вентиляционные короба и прочие конструктивные особенности помещения в зоне установки кухонного гарнитура, установка цоколей, установка и герметизация плинтусов; установка стеновых панелей; установка карнизов, подзоров, декоративных элементов (баллюстрады, полуколонны, колонны и проч;)</li><li>Помещение должно соответствовать техническим нормам:<ul><li>угол сопряжения стен на всю длину помещения должен быть равен 90 градусам;</li><li>ровные стены;</li><li>вертикальный отвес;</li><li>помещение чистое и по возможности освобожденное от другой мебели.</li></ul></li><li>Монтаж производится по договоренности с монтажниками за 1–4 дня (в зависимости от сложности работ) и не может быть перенесен на более поздний срок с оплатой повторного выезда в случае несоответствия помещения техническим нормам. В таком случае монтажник не несет ответственности за технологические недоработки в работе.</li><li>Расходные материалы, необходимые для подключения кухонной техники, приобретаются Заказчиком самостоятельно. Стиральные и посудомоечные машины обычно комплектуются заливным шлангом длиной 1,5 м. В случае, если эта техника будет находиться не сразу после мойки (через тумбу), то этого шланга не хватит, соответственно нужно будет установить другой шланг нужной длины. Для подключения электрической цепи подсветки в плите нужно 3–5м двужильного провода в двойной изоляции с сечением 0,5 или 0,75.</li><li>Оплата дополнительных услуг согласно прайс-листу на дополнительные услуги оплачивается на месте после выполнения всех работ.</li><li>Работы, не входящие в данный прайс, производятся или не производятся совсем на усмотрение монтажников кухонного гарнитура и расцениваются установщиками на месте.</li><li>Все работы по монтажу кухонной мебели осуществляются только в присутствии Заказчика, который по завершении работ делает соответствующую отметку о приемке работ (ставит дату и подпись).</li><li>Покупатель обязан: перед установкой кухонного гарнитура предоставить монтажнику (сборщику) схему прохождения скрытой проводки и коммуникаций. В случае не предоставления выше указанной схемы, монтажник (сборщик) не несет ответственности за порчу (поломку) электропроводки и коммуникаций, а также за последствия поломки, такие как:<ul><li>короткое замыкание (в случае повреждения кабеля электропроводки);</li><li>затопление квартиры (в случае повреждения коммуникаций ГВС, ХВС, отопительной и канализационной систем).</li></ul></li></ol><div class="txt__pl"><b>Внимание!</b><ul><li>Подключение техники к системе водоснабжения и канализационной системе производится по личной договоренности с&nbsp;установщиками, поэтому за данные виды работ компания Haier ответственности не несет.</li><li>Вынос мусора осуществляется бесплатно при наличии контейнера для строительных отходов в радиусе 20 метров от подъезда. В&nbsp;случае отсутствия контейнера-вынос мусора осуществляется клиентом самостоятельно.</li></ul></div></div>',
        },
    });
    const warrantyPage = await prisma.page.upsert({
        where: {
            alias: 'garantiya',
        },
        update: {},
        create: {
            name: 'Гарантия',
            alias: 'garantiya',
            metaTitle: 'Гарантия',
            metaDescription: 'Гарантия от компании Кухни от Кукухни',
            text: '<div class="ver-wrap center-wrap text-page__wrap _first txt"><p class="txt__h4">Гарантийные обязательства не&nbsp;распространяются:</p><ol><li>На недостатки, возникшие в результате нарушения требований, установленных Руководством по эксплуатации;</li><li>На случаи порчи изделий в результате механических воздействий и небрежной эксплуатации;</li><li>На случаи порчи изделий в результате попадания влаги или эксплуатации в условиях повышенной влажности (разбухание материалов, деформация изделий, отслаивание покрытий, в том числе кромочных покрытий, коррозия и т.п.);</li><li>На случаи порчи изделий при перегревании выше или охлаждении ниже норм, установленных в Руководством по эксплуатации;</li><li>На недостатки, возникшие в результате несоблюдения и нарушения требований по техническому обслуживанию, установленных Руководством по эксплуатации;</li><li>На случаи порчи изделий покупателем в момент приёмки и эксплуатации в связи с применением разрушающих методов контроля качества изделий;</li><li>На встраиваемую технику, приобретённую покупателем у третьих лиц (сторонних продавцов);</li><li>На фурнитуру и комплектующие, установленные покупателем самостоятельно или приобретённые у третьих лиц;</li><li>На нестандартные модули и другие составные элементы, изготавливаемые по желанию покупателя;</li><li>На модуль под мойкой и столешницу в случае, если мойка установлена покупателем самостоятельно;</li><li>На лампы, входящие в комплект светильников, если их замена предусмотрена конструкцией светильника;</li><li>На заменяемые элементы питания (батареи или аккумуляторные батареи), поставленные в комплекте с электронными устройствами.</li></ol></div>',
        },
    });
    const users = await prisma.user.createMany({
        data: [
            {
                name: 'admin',
                email: 'admin@i.ru',
                password: await hash('adminadmin', 12),
                role: 'ADMIN',
            },
            {
                name: 'user',
                email: 'user@i.ru',
                password: await hash('useruser', 12),
                role: 'USER',
            },
        ],
    });
    console.log({
        modernKitchens,
        romeKitchen,
        tssKitchen,
        deliveryPage,
        montagePage,
        montageConditionsPage,
        warrantyPage,
        users,
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
