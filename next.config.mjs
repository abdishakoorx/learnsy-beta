/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'eu-central-1-shared-euc1-02.graphassets.com',
                port: '',
                pathname: '/**'
            },
        ]
    }
};

export default nextConfig;
