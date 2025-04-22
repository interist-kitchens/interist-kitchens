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
};

export default nextConfig;
