import { FC } from 'react';
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css';

const SunEditor = dynamic(() => import('suneditor-react'), {
    ssr: false,
});

type Props = {
    initialValue?: string | null;
    setContent: (value: string) => void;
};

export const WysiwygEditor: FC<Props> = ({ initialValue, setContent }) => {
    const handleChange = (content: string) => {
        setContent(content);
    };
    return (
        <SunEditor defaultValue={initialValue ?? ''} onChange={handleChange} />
    );
};
