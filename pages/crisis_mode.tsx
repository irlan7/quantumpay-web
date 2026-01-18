import Head from 'next/head';
import { useLanguage } from '../src/contexts/LanguageContext';

export default function CrisisMode() {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>QuantumPay Crisis Mode</title>
        <meta
          name="description"
          content="How QuantumPay operates during crisis."
        />
      </Head>

      <main style={{ padding: '2rem' }}>
        <h1>{t('crisisMode.title')}</h1>
        <p>{t('crisisMode.subtitle')}</p>
        <p>{t('crisisMode.intro')}</p>

        <h2>{t('crisisMode.pillarsTitle')}</h2>
        <ul>
          <li>{t('crisisMode.pillars.decentralization')}</li>
          <li>{t('crisisMode.pillars.selfCustody')}</li>
          <li>{t('crisisMode.pillars.offlineReady')}</li>
          <li>{t('crisisMode.pillars.transparency')}</li>
        </ul>
      </main>
    </>
  );
}
