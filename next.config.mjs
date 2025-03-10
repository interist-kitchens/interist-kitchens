/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_INTERNAL_API_URL: process.env.NEXT_PUBLIC_INTERNAL_API_URL,
    },
    transpilePackages: [
        'rc-util',
        "rc-picker",
        "rc-pagination",
        "@ant-design/icons-svg"
    ],
};

export default nextConfig;
