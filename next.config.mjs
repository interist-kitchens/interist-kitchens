import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_INTERNAL_API_URL: process.env.NEXT_PUBLIC_INTERNAL_API_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
    transpilePackages: [
        'rc-util',
        'rc-picker',
        'rc-pagination',
        '@ant-design/icons-svg',
    ],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '0cu49g0vululgtgg.public.blob.vercel-storage.com',
                port: '',
            },
        ],
    },
    webpack: (config, { dev}) => {
        config.module.rules.push({
            test: /\.(mp4|webm|ogg)$/,
            type: 'asset/resource',
            generator: {
                filename: 'static/media/[name].[hash][ext]',
                outputPath: `${dev ? "../" : "../../"}`,
            },
        });
        return config;
    },
};

export default withPlaiceholder(nextConfig);
