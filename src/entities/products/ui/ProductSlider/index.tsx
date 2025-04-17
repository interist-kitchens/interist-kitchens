import { FC } from 'react';
import Image from 'next/image';
import { Carousel, ConfigProvider } from 'antd';

type Props = {
    name: string;
    images: string[];
};

export const ProductSlider: FC<Props> = ({ name, images }) => {
    return (
        <div className={'w-full lg:w-2/3 h-[640px]'}>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgContainer: '#5e94b9',
                    },
                }}
            >
                <Carousel arrows dotPosition="left" infinite={false} draggable>
                    {images.map((image) => (
                        <Image
                            key={image}
                            src={image}
                            alt={name}
                            width={450}
                            height={295}
                        />
                    ))}
                </Carousel>
            </ConfigProvider>
        </div>
    );
};
