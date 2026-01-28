import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

// --- IMPORT KAMUS ---
import en from '../locales/en.json';
import id from '../locales/id.json';

export default function Legal() {
  const router = useRouter();
  const { locale } = router;
  const tObject: any = { en, id }; // Sesuaikan dengan bahasa yang tersedia
  const dict = tObject[locale as string] || en;

  const t = (section: string, key: string) => {
    try { return dict[section][key] || key; } catch (e) { return key; }
  };

  return (
    <div style={{minHeight: '100vh', background: '#0b0f14', color: '#fff', fontFamily: 'Inter, sans-serif'}}>
      <Head>
        <title>Legal & Compliance | QuantumPay</title>
      </Head>

      {/* --- NAVBAR --- */}
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', borderBottom: '1px solid #1f2937'}}>
        <Link href="/">
          <img src="/logo.png" alt="QuantumPay" style={{height: '120px', width: 'auto', cursor: 'pointer'}} />
        </Link>
        <div style={{display: 'flex', gap: '30px'}}>
            <Link href="/" style={{color: '#9ca3af', textDecoration: 'none'}}>{t('navbar', 'home')}</Link>
            <Link href="/contact" style={{color: '#9ca3af', textDecoration: 'none'}}>{t('navbar', 'contact')}</Link>
            <Link href="/legal" style={{color: '#fff', textDecoration: 'none'}}>{t('navbar', 'legal')}</Link>
        </div>
      </nav>

      <main style={{maxWidth: '800px', margin: '0 auto', padding: '80px 20px', lineHeight: '1.8'}}>
        <h1 style={{fontSize: '2.5rem', marginBottom: '40px', color: '#fbbf24'}}>Legal & Kepatuhan Regulasi</h1>
        
        <section style={{background: '#111827', padding: '30px', borderRadius: '20px', border: '1px solid #1f2937', marginBottom: '30px'}}>
            <h3 style={{color: '#6366f1', marginBottom: '15px'}}>Pernyataan Resmi Mengenai Indonesia</h3>
            <p style={{color: '#d1d5db'}}>
                <strong>QuantumPay Network</strong> secara tegas menyatakan bahwa kami **TIDAK MENJUAL** koin, token, atau aset digital apapun dalam bentuk penawaran umum (ICO/IEO/Private Sale) kepada penduduk di wilayah hukum Republik Indonesia.
            </p>
            <p style={{color: '#d1d5db', marginTop: '15px'}}>
                Keputusan ini diambil sebagai bentuk penghormatan tertinggi kami terhadap hukum dan regulasi lokal yang sedang berkembang di Indonesia. Kami mendukung penuh upaya pemerintah dalam menciptakan ekosistem digital yang aman dan teratur.
            </p>
        </section>

        <section style={{color: '#9ca3af', fontSize: '0.95rem'}}>
            <h3 style={{color: '#fff', marginBottom: '10px'}}>Tujuan Teknologi</h3>
            <p>
                Platform ini bersifat edukatif dan teknis, berfokus pada pengembangan infrastruktur <em>Distributed Ledger Technology</em> (DLT). Partisipasi dalam jaringan (seperti menjalankan node) bertujuan untuk stabilitas teknologi dan bukan merupakan instrumen investasi keuangan yang ditawarkan secara publik di Indonesia.
            </p>
        </section>

        <div style={{marginTop: '60px', textAlign: 'center', color: '#4b5563', fontSize: '0.8rem'}}>
            © 2026 QuantumPay Foundation | Compliance Division
        </div>
      </main>
    </div>
  );
}
