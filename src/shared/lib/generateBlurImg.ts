import axios from 'axios';
import { getPlaiceholder } from 'plaiceholder';

export const generateBlurImg = async (imageUrl: string) => {
    try {
        const fetchImgAsBuffer = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
        });

        const { base64 } = await getPlaiceholder(fetchImgAsBuffer.data);

        return base64;
    } catch (e) {
        if (e instanceof Error) console.log(e.stack);
    }
};
