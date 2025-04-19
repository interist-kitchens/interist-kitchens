import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primaryColor: 'var(--primaryColor)',
            },
        },
        token: {
            headerBg: 'var(--background)',
            primaryColor: 'var(--primaryColor)',
        },
    },
    plugins: [],
};
export default config;
