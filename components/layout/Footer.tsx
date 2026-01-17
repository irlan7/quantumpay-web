'use client';

import { useLanguage } from '../../contexts/LanguageContext';

const FOOTER_TEXT: Record<string, string> = {
  en: 'QuantumPay — Resilient Digital Payment Infrastructure',
  id: 'QuantumPay — Infrastruktur Pembayaran Digital Tangguh',
  de: 'QuantumPay — Widerstandsfähige digitale Zahlungsinfrastruktur',
  nl: 'QuantumPay — Veerkrachtige digitale betalingsinfrastructuur',
  ar: 'كوانتم باي — بنية دفع رقمية مرنة',
  ko: '퀀텀페이 — 탄력적인 디지털 결제 인프라',
  pt: 'QuantumPay — Infraestrutura de Pagamento Digital Resiliente',
};

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="footer">
      <p>{FOOTER_TEXT[language]}</p>
    </footer>
  );
}
