import { Spin } from 'antd';

export default function Loading() {
    return (
        <section className="flex items-center justify-center w-screen h-screen">
            <Spin />
        </section>
    );
}
