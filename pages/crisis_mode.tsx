import Head from "next/head";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CrisisMode() {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>QuantumPay Crisis Mode</title>
        <meta
          name="description"
          content="How QuantumPay operates during power outages, internet disruption, or cyber crisis."
        />
      </Head>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">
          {t("crisisMode.title")}
        </h1>

        <p className="text-lg text-gray-500 mb-8">
          {t("crisisMode.subtitle")}
        </p>

        <p className="mb-10">
          {t("crisisMode.intro")}
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          {t("crisisMode.pillarsTitle")}
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-10">
          <li>{t("crisisMode.pillars.decentralization")}</li>
          <li>{t("crisisMode.pillars.selfCustody")}</li>
          <li>{t("crisisMode.pillars.offlineReady")}</li>
          <li>{t("crisisMode.pillars.transparency")}</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          {t("crisisMode.whatHappensTitle")}
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-10">
          {t("crisisMode.whatHappens").map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <p className="font-semibold">
          {t("crisisMode.closing")}
        </p>
      </main>
    </>
  );
}
