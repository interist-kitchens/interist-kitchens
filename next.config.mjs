import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_INTERNAL_API_URL: process.env.NEXT_PUBLIC_INTERNAL_API_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        DATABASE_URL:
            process.env.VERCEL_ENV === 'production'
                ? process.env.PROD_DB_DATABASE_URL
                : process.env.DATABASE_URL,
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
                hostname:
                    'b914fd021b76-interest-file.s3.ru1.storage.beget.cloud',
                port: '',
            },
        ],
        minimumCacheTTL: 60,
    },
    serverExternalPackages: ['@aws-sdk/client-s3'],
    webpack: (config, { dev }) => {
        config.module.rules.push({
            test: /\.(mp4|webm|ogg)$/,
            type: 'asset/resource',
            generator: {
                filename: 'static/media/[name].[hash][ext]',
                outputPath: `${dev ? '../' : '../../'}`,
            },
        });
        return config;
    },
};

export default withPlaiceholder(nextConfig);
