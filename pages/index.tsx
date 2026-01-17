import Head from 'next/head';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { lang } = useLanguage();

  const content: Record<string, string> = {
    en: 'Welcome',
    id: 'Selamat datang',
    de: 'Willkommen',
    nl: 'Welkom',
    ar: 'مرحباً',
    ko: '환영합니다',
    pt: 'Bem-vindo'
  };

  return (
    <>
      <Head>
        <title>QuantumPay</title>
        <meta name="description" content="QuantumPay multilingual website" />
      </Head>

      <main style={{ padding: 24 }}>
        <LanguageSwitcher />
        <h1>QuantumPay</h1>
        <p>{content[lang]}</p>
      </main>
    </>
  );
}
