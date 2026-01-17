import LanguageSwitcher from '../src/components/LanguageSwitcher';
import { useLanguage } from '../src/contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main style={{ padding: 24 }}>
      <LanguageSwitcher />
      <h1>{t.title}</h1>
      <p>{t.welcome}</p>
    </main>
  );
}
