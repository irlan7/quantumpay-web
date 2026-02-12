/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'http://15.235.192.4:8081/:path*', // IP Singapura Bapak
      },
    ];
  },
};

export default nextConfig;
