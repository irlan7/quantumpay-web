import { LanguageKey } from './Language';

export const SEO = {
  en: {
    title: 'QuantumPay – Global Digital Payments',
    description: 'QuantumPay provides secure, fast, and global digital payment solutions.'
  },
  id: {
    title: 'QuantumPay – Pembayaran Digital Global',
    description: 'QuantumPay menyediakan solusi pembayaran digital yang aman dan cepat.'
  },
  de: {
    title: 'QuantumPay – Globale Digitale Zahlungen',
    description: 'QuantumPay bietet sichere und schnelle digitale Zahlungslösungen.'
  },
  nl: {
    title: 'QuantumPay – Wereldwijde Digitale Betalingen',
    description: 'QuantumPay biedt veilige en snelle digitale betalingsoplossingen.'
  },
  ar: {
    title: 'QuantumPay – المدفوعات الرقمية العالمية',
    description: 'توفر QuantumPay حلول دفع رقمية آمنة وسريعة.'
  },
  ko: {
    title: 'QuantumPay – 글로벌 디지털 결제',
    description: 'QuantumPay는 안전하고 빠른 디지털 결제 솔루션을 제공합니다.'
  },
  pt: {
    title: 'QuantumPay – Pagamentos Digitais Globais',
    description: 'A QuantumPay oferece soluções de pagamento digital seguras e rápidas.'
  }
} satisfies Record<LanguageKey, { title: string; description: string }>;
