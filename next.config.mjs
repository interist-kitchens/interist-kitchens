import withPlaiceholder from '@plaiceholder/next';
import withBundleAnalyzer from '@next/bundle-analyzer';

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
        '@ant-design/icons',
        'antd',
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
    experimental: {
        optimizePackageImports: ['@ant-design/icons', 'antd'],
        reactCompiler: true,
    },
    modularizeImports: {
        antd: {
            transform: 'antd/es/{{member}}',
            preventFullImport: true,
        },
        '@ant-design/icons': {
            transform: '@ant-design/icons/es/icons/{{member}}',
            preventFullImport: true,
        },
    },
    compiler: {
        reactRemoveProperties: true,
        removeConsole: { exclude: ['error', 'warn'] },
        styledComponents: true,
    },
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

const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

export default withPlaiceholder(bundleAnalyzer(nextConfig));
