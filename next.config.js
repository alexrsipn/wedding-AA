/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    },
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
