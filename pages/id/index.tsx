import Head from 'next/head';
import { LanguageProvider, useLanguage } from '../../src/contexts/LanguageContext';
import LanguageSwitcher from '../../src/components/LanguageSwitcher';

function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
      </Head>

      <LanguageSwitcher />
      <h1>{t.title}</h1>
      <p>{t.welcome}</p>
    </>
  );
}

export default function Page() {
  return (
    <LanguageProvider defaultLang="id">
      <Home />
    </LanguageProvider>
  );
}
