/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'id', 'de', 'nl', 'ar', 'ko', 'pt'],
    defaultLocale: 'en',
  },
  typescript: {
    // Memaksa build tetap jalan meski ada error tipe data
    ignoreBuildErrors: true,
  },
  eslint: {
    // Memaksa build tetap jalan meski ada error linting
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
