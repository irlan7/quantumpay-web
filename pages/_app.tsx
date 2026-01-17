import type { AppProps } from 'next/app';

import { LanguageProvider } from '../contexts/LanguageContext';
import { ThemeProvider } from '../contexts/ThemeContext';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
}
