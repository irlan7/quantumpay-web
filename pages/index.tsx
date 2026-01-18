import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import Navbar from '../components/layout/Navbar';

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="min-h-screen px-6 py-16 bg-white dark:bg-black text-black dark:text-white">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold">
            {t('home.title')}
          </h1>

          <p className="text-lg opacity-80">
            {t('home.subtitle')}
          </p>

          <section className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="p-6 rounded-xl border dark:border-gray-800">
              <h3 className="font-semibold text-xl">
                {t('home.features.fast')}
              </h3>
              <p className="mt-2 opacity-80">
                {t('home.features.fast_desc')}
              </p>
            </div>

            <div className="p-6 rounded-xl border dark:border-gray-800">
              <h3 className="font-semibold text-xl">
                {t('home.features.secure')}
              </h3>
              <p className="mt-2 opacity-80">
                {t('home.features.secure_desc')}
              </p>
            </div>

            <div className="p-6 rounded-xl border dark:border-gray-800">
              <h3 className="font-semibold text-xl">
                {t('home.features.global')}
              </h3>
              <p className="mt-2 opacity-80">
                {t('home.features.global_desc')}
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
