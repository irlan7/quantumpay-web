import { LanguageProvider } from './contexts/LanguageContext';

export default function App({ Component, pageProps }: any) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
