/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: process.env.NODE_ENV !== 'production',
    swcMinify: process.env.NODE_ENV === 'production',
    images: {
        domains: ['example.com'], // Ensure only necessary domains are included
    },
    i18n: {
        locales: ['en', 'fr'], // Add your supported locales here
        defaultLocale: 'en',
    },
    async redirects() {
        return [
            {
                source: '/old-path',
                destination: '/new-path',
                permanent: true,
            },
        ];
    },
    webpack: (config, { dev, isServer }) => {
        if (dev) {
            config.devtool = false; // Disable source maps in development
        }

        if (!isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                minSize: 20000,
                maxSize: 70000,
            };
        }

        return config;
    },
};

export default nextConfig;