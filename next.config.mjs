/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'http://15.235.192.4:8080/api/v1/:path*', // Jembatan ke VPS
      },
    ]
  },
};

export default nextConfig;
