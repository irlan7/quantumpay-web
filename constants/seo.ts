import { LanguageKey } from './language';

export const SEO: Record<
  LanguageKey,
  {
    title: string;
    description: string;
  }
> = {
  en: {
    title: 'QuantumPay — Decentralized Payment Network',
    description: 'QuantumPay is a next-generation blockchain payment ecosystem.',
  },
  id: {
    title: 'QuantumPay — Jaringan Pembayaran Terdesentralisasi',
    description: 'QuantumPay adalah ekosistem pembayaran blockchain generasi baru.',
  },
  de: {
    title: 'QuantumPay — Dezentrales Zahlungsnetzwerk',
    description: 'QuantumPay ist ein Blockchain-Zahlungsökosystem der nächsten Generation.',
  },
  nl: {
    title: 'QuantumPay — Gedecentraliseerd Betalingsnetwerk',
    description: 'QuantumPay is een next-gen blockchain betaalsysteem.',
  },
  ar: {
    title: 'QuantumPay — شبكة مدفوعات لامركزية',
    description: 'كوانتم باي هو نظام مدفوعات بلوكتشين من الجيل القادم.',
  },
  ko: {
    title: 'QuantumPay — 탈중앙화 결제 네트워크',
    description: 'QuantumPay는 차세대 블록체인 결제 생태계입니다.',
  },
  pt: {
    title: 'QuantumPay — Rede de Pagamentos Descentralizada',
    description: 'QuantumPay é um ecossistema de pagamentos blockchain de nova geração.',
  },
};
