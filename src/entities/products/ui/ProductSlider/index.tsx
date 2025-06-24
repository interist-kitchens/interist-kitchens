import { FC } from 'react';
import Image from 'next/image';
import { Carousel, ConfigProvider } from 'antd';

type Props = {
    name: string;
    images: {
        image: string;
        blurImage?: string;
    }[];
};

export const ProductSlider: FC<Props> = ({ name, images }) => {
    return (
        <div className="w-full lg:w-8/12 group" style={{ minHeight: '500px' }}>
            <ConfigProvider
                theme={{
                    components: {
                        Carousel: {
                            dotActiveWidth: 24,
                            dotWidth: 12,
                            dotHeight: 4,
                        },
                    },
                    token: {
                        colorBgContainer: '#5e94b9',
                        colorPrimary: '#1890ff',
                    },
                }}
            >
                <Carousel
                    arrows
                    dotPosition="left"
                    infinite={false}
                    draggable
                    className="h-full bg-white rounded-lg overflow-hidden shadow-lg"
                >
                    {images.map((image, index) => (
                        <div
                            key={`${image.image}-${index}`}
                            className="relative w-full h-[500px]"
                        >
                            <Image
                                src={image.image}
                                alt={`${name} - фото ${index + 1}`}
                                fill
                                style={{
                                    objectFit: 'contain',
                                }}
                                placeholder={image.blurImage ? 'blur' : 'empty'}
                                blurDataURL={image.blurImage}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </Carousel>
            </ConfigProvider>
        </div>
    );
};
