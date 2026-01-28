import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

// --- 1. IMPORT KAMUS BAHASA (Konsisten dengan index.tsx) ---
import en from '../locales/en.json';
import id from '../locales/id.json';
import de from '../locales/de.json';
import nl from '../locales/nl.json';
import pt from '../locales/pt.json';
import ko from '../locales/ko.json';
import ar from '../locales/ar.json';

const LANGUAGES = [
  { code: 'en', label: '🇺🇸 EN (English)' },
  { code: 'id', label: '🇮🇩 ID (Indonesia)' },
  { code: 'de', label: '🇩🇪 DE (Deutsch)' },
  { code: 'nl', label: '🇳🇱 NL (Dutch)' },
  { code: 'pt', label: '🇵🇹 PT (Português)' },
  { code: 'ko', label: '🇰🇷 KO (Korean)' },
  { code: 'ar', label: '🇸🇦 AR (Arabic)' }
];

export default function Explorer() {
  const router = useRouter();
  const { locale } = router;
  const tObject: any = { en, id, de, nl, pt, ko, ar };
  const dict = tObject[locale as string] || en;

  // --- 2. LOGIKA SIMULASI BLOK (Sesuai source asli Anda) ---
  const [blockHeight, setBlockHeight] = useState(63326); // Start height
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockHeight((prev) => prev + 1);
    }, 5000); // Sinkron dengan interval Go node Anda
    return () => clearInterval(interval);
  }, []);

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
        <title>Explorer | QuantumPay Mainnet</title>
      </Head>

      {/* --- NAVBAR STANDAR QUANTUMPAY --- */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', borderBottom: '1px solid #1f2937' }}>
        <Link href="/">
          <img src="/logo.png" alt="QuantumPay" style={{ height: '120px', width: 'auto', cursor: 'pointer' }} />
        </Link>

        <div style={{ display: 'flex', gap: '30px', fontSize: '1rem' }}>
          <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('navbar', 'home')}</Link>
          <Link href="/explorer" style={{ color: '#fff', textDecoration: 'none' }}>{t('navbar', 'explorer')}</Link>
          <Link href="/run-node" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('navbar', 'validators')}</Link>
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

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        
        {/* HEADER SECTION */}
        <div style={{ borderLeft: '4px solid #6366f1', paddingLeft: '20px', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '1.8rem', margin: 0 }}>EXPLORER_LIVE_FEED_V1.1</h1>
            <p style={{ color: '#9ca3af', marginTop: '5px' }}>
                Node Status: <span style={{ color: '#10b981', fontWeight: 'bold' }}>● ACTIVE_PRODUCING</span> | Provider: VPS-9451c332
            </p>
        </div>

        {/* TOP METRICS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginBottom: '50px' }}>
            <div style={{ background: '#111827', padding: '30px', borderRadius: '20px', border: '1px solid #1f2937' }}>
                <div style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 'bold' }}>CURRENT_BLOCK_HEIGHT</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981', marginTop: '10px' }}>
                    #{blockHeight.toLocaleString()}
                </div>
            </div>
            <div style={{ background: '#111827', padding: '30px', borderRadius: '20px', border: '1px solid #1f2937' }}>
                <div style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 'bold' }}>CHAIN_ID_STATUS</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '10px' }}>
                    77077 <span style={{ color: '#6366f1', fontSize: '0.9rem' }}>[FROZEN]</span>
                </div>
            </div>
        </div>

        {/* TECHNICAL IDENTITY */}
        <div style={{ background: '#111827', padding: '30px', borderRadius: '24px', border: '1px solid #1f2937', marginBottom: '50px' }}>
            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #1f2937', paddingBottom: '10px' }}>NETWORK_IDENTITY_VERIFICATION</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '15px' }}>
                <strong style={{ color: '#6366f1' }}>GENESIS_HASH:</strong><br />
                <span style={{ fontFamily: 'monospace', color: '#9ca3af', wordBreak: 'break-all' }}>
                    0x1d58599424f1159828236111f1f9e83063f66345091a99540c4989679269491a
                </span>
            </p>
            <p style={{ fontSize: '0.9rem' }}>
                <strong style={{ color: '#6366f1' }}>CORE_ENGINE:</strong> 
                <span style={{ marginLeft: '10px', color: '#9ca3af' }}>Go-Lang (quantumpay-go-v1.1)</span>
            </p>
        </div>

        {/* LIVE BLOCK STREAM */}
        <div style={{ background: '#111827', padding: '30px', borderRadius: '24px', border: '1px solid #1f2937' }}>
            <h3 style={{ marginBottom: '25px' }}>RECENT_BLOCK_STREAM</h3>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #1f2937', color: '#9ca3af' }}>
                            <th style={{ padding: '15px' }}>Height</th>
                            <th style={{ padding: '15px' }}>Timestamp</th>
                            <th style={{ padding: '15px' }}>Validation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[0, 1, 2, 3, 4].map((i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #1f2937' }}>
                                <td style={{ padding: '15px', color: '#6366f1', fontWeight: 'bold' }}>#{blockHeight - i}</td>
                                <td style={{ padding: '15px', color: '#9ca3af' }}>{5 * i}s ago</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem' }}>
                                        [CONFIRMED_BFT]
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <footer style={{ marginTop: '60px', textAlign: 'center', color: '#4b5563', fontSize: '0.85rem' }}>
            QuantumPay Blockchain Project | Official Mainnet Infrastructure
        </footer>
      </main>
    </div>
  );
}
