/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.dummyimage.com',
                pathname: '/**',
            },
        ],
    }
};

module.exports = nextConfig;
