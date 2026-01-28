import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

// --- 1. IMPORT KAMUS BAHASA ---
import en from '../locales/en.json';
import id from '../locales/id.json';
import de from '../locales/de.json';
import nl from '../locales/nl.json';
import pt from '../locales/pt.json';
import ko from '../locales/ko.json';
import ar from '../locales/ar.json';

// --- 2. DATA TEKNIS (Dari Source Code Asli Anda) ---
const NETWORK_DATA = {
  chainId: "77077",
  genesisHash: "0x1d58599424f1159828236111f1f9e83063f66345091a99540c4989679269491a",
  installCommand: "curl -sSL https://raw.githubusercontent.com/irlan7/quantumpay-go/master/install.sh | bash",
  status: "Mainnet-Alpha v1.1"
};

const LANGUAGES = [
  { code: 'en', label: '🇺🇸 EN (English)' },
  { code: 'id', label: '🇮🇩 ID (Indonesia)' },
  { code: 'de', label: '🇩🇪 DE (Deutsch)' },
  { code: 'nl', label: '🇳🇱 NL (Dutch)' },
  { code: 'pt', label: '🇵🇹 PT (Português)' },
  { code: 'ko', label: '🇰🇷 KO (Korean)' },
  { code: 'ar', label: '🇸🇦 AR (Arabic)' }
];

export default function RunNode() {
  const router = useRouter();
  const { locale } = router;
  const tObject: any = { en, id, de, nl, pt, ko, ar };
  const dict = tObject[locale as string] || en;

  const t = (section: string, key: string) => {
    try { return dict[section][key] || key; } catch (e) { return key; }
  };

  const changeLanguage = (e: any) => {
    const newLocale = e.target.value;
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0b0f14', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <Head>
        <title>Run a Node | QuantumPay Network</title>
      </Head>

      {/* --- NAVBAR STANDAR (120px Logo) --- */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', borderBottom: '1px solid #1f2937' }}>
        <Link href="/">
          <img src="/logo.png" alt="QuantumPay" style={{ height: '120px', width: 'auto', cursor: 'pointer' }} />
        </Link>

        <div style={{ display: 'flex', gap: '30px', fontSize: '1rem' }}>
          <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('navbar', 'home')}</Link>
          <Link href="/explorer" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('navbar', 'explorer')}</Link>
          <Link href="/run-node" style={{ color: '#fff', textDecoration: 'none' }}>{t('navbar', 'validators')}</Link>
          <Link href="/contact" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('navbar', 'contact')}</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <select onChange={changeLanguage} value={locale} style={{ background: '#1f2937', color: 'white', border: '1px solid #374151', padding: '8px 12px', borderRadius: '8px' }}>
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>
        </div>
      </nav>

      {/* --- CONTENT AREA --- */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#6366f1', marginBottom: '15px' }}>Join the Network</h1>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem' }}>Ikuti panduan ini untuk menginstal dan menjalankan validator QuantumPay Anda sendiri.</p>
        </header>

        {/* SECTION 1: HARDWARE REQUIREMENTS */}
        <section style={{ marginBottom: '60px', background: '#111827', padding: '40px', borderRadius: '24px', border: '1px solid #1f2937' }}>
          <h3 style={{ marginBottom: '25px', color: '#fbbf24', borderBottom: '1px solid #1f2937', paddingBottom: '10px' }}>Hardware Requirements</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {[
                { label: 'CPU', val: '2 Cores (Minimum)' },
                { label: 'RAM', val: '4GB (Usage optimized ~5%)' },
                { label: 'Storage', val: '40GB SSD' },
                { label: 'Network', val: '100 Mbps Up/Down' }
              ].map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1f2937' }}>
                  <td style={{ padding: '15px 0', color: '#9ca3af', fontWeight: 'bold' }}>{item.label}</td>
                  <td style={{ padding: '15px 0', textAlign: 'right', color: '#fff' }}>{item.val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* SECTION 2: AUTOMATED INSTALLATION */}
        <section style={{ marginBottom: '60px' }}>
          <h3 style={{ color: '#6366f1', marginBottom: '15px' }}>1. Automated Installation (Recommended)</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '15px' }}>Jalankan perintah ini di terminal Ubuntu Anda untuk instalasi otomatis v1.1</p>
          <div style={{ background: '#0a0d12', padding: '20px', borderRadius: '12px', border: '1px solid #6366f1', fontFamily: 'monospace', fontSize: '0.9rem', color: '#10b981', overflowX: 'auto', wordBreak: 'break-all' }}>
            {NETWORK_DATA.installCommand}
          </div>
        </section>

        {/* SECTION 3: GENESIS VERIFICATION */}
        <section style={{ marginBottom: '60px' }}>
          <h3 style={{ color: '#6366f1', marginBottom: '15px' }}>2. Genesis Verification</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '15px' }}>Pastikan Hash Genesis Anda cocok dengan Mainnet setelah sinkronisasi dimulai.</p>
          <div style={{ background: 'rgba(251, 146, 60, 0.05)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #fb923c', fontFamily: 'monospace', fontSize: '0.85rem', color: '#fb923c', wordBreak: 'break-all' }}>
            <strong>GENESIS_HASH:</strong> {NETWORK_DATA.genesisHash}
          </div>
        </section>

        {/* SECTION 4: NETWORK IDENTITY */}
        <section style={{ background: '#0f172a', padding: '30px', borderRadius: '20px', border: '1px solid #1f2937', textAlign: 'center' }}>
          <h4 style={{ marginBottom: '20px', color: '#fff' }}>Network Identity</h4>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
            <div>
              <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Chain ID</div>
              <div style={{ color: '#fff', fontWeight: 'bold' }}>{NETWORK_DATA.chainId} <span style={{ color: '#ef4444', fontSize: '0.7rem' }}>[DIBEKUKAN]</span></div>
            </div>
            <div>
              <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Status</div>
              <div style={{ color: '#6366f1', fontWeight: 'bold' }}>{NETWORK_DATA.status}</div>
            </div>
          </div>
        </section>

        <footer style={{ marginTop: '80px', textAlign: 'center', color: '#4b5563', fontSize: '0.8rem' }}>
          © 2026 QuantumPay Foundation. All Rights Reserved.
        </footer>
      </main>
    </div>
  );
}
