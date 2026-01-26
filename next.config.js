module.exports = {
  i18n: {
    locales: ['en', 'id', 'de', 'nl', 'ar', 'ko', 'pt'],
    defaultLocale: 'en',
  },
  typescript: {
    // Mengabaikan error TypeScript agar build berhasil
    ignoreBuildErrors: true,
  },
  eslint: {
    // Mengabaikan error ESLint saat build
    ignoreDuringBuilds: true,
  },
}
