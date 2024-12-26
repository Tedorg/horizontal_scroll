/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.ctfassets.net',
            port: '',
            pathname: 'wexe5ejuxi1q/**',
          },
        ],
      },
};

export default nextConfig;
