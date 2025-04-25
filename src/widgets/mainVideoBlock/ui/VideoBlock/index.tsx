import { FC } from 'react';
import { Title } from '@/shared/ui/Typography';
import video from '@/app/assets/video/promo.webm';
import videoMp4 from '@/app/assets/video/promo.mp4';

export const VideoBlock: FC = () => {
    return (
        <div className={'container mx-auto'}>
            <Title level={2}>Премиальное качество</Title>
            <video loop autoPlay playsInline muted preload="auto">
                <source src={video} type="video/webm" />
                <source src={videoMp4} type="video/mp4" />
            </video>
        </div>
    );
};
