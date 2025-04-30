'use client';

import { FC } from 'react';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';

export const ContactMap: FC = () => {
    return (
        <YMaps>
            <div
                style={{ filter: 'grayscale(100%)' }}
                className={'hidden md:block'}
            >
                <Map
                    defaultState={{ center: [55.712117, 37.795142], zoom: 15 }}
                    width={968}
                    height={560}
                >
                    <Placemark
                        geometry={[55.712117, 37.795142]}
                        properties={{
                            hintContent: 'Собственный значок метки',
                            balloonContent: 'Это красивая метка',
                        }}
                        options={{
                            iconLayout: 'default#image',
                            iconImageHref: '/images/placemarker.png',
                            iconImageSize: [46, 63],
                            iconImageOffset: [-3, -42],
                        }}
                    />
                </Map>
            </div>
            <div style={{ filter: 'grayscale(100%)' }} className={'md:hidden'}>
                <Map
                    defaultState={{ center: [55.712117, 37.795142], zoom: 15 }}
                    width={343}
                    height={400}
                >
                    <Placemark
                        geometry={[55.712117, 37.795142]}
                        properties={{
                            hintContent: 'Собственный значок метки',
                            balloonContent: 'Это красивая метка',
                        }}
                        options={{
                            iconLayout: 'default#image',
                            iconImageHref: '/images/placemarker.png',
                            iconImageSize: [46, 63],
                            iconImageOffset: [-3, -42],
                        }}
                    />
                </Map>
            </div>
        </YMaps>
    );
};
