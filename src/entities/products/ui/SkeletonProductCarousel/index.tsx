import { FC } from 'react';
import SkeletonNode from 'antd/es/skeleton/Node';

export const SkeletonProductCarousel: FC = () => {
    return (
        <div className={'grid grid-cols-4 gap-6'}>
            {[1, 2, 3, 4].map((number) => (
                <SkeletonNode
                    key={number}
                    style={{ height: '308px', width: '300px' }}
                />
            ))}
        </div>
    );
};
