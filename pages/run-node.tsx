import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

// --- 1. IMPORT KOMPONEN KALKULATOR ---
// Pastikan komponen ini juga sudah disesuaikan, atau jika masih error tampilannya,
// kabari saya agar saya buatkan versi Inline Style untuk Kalkulatornya juga.
import ValidatorCalculator from '../components/ValidatorCalculator';

// --- 2. IMPORT KAMUS BAHASA ---
import en from '../locales/en.json';
import id from '../locales/id.json';
import de from '../locales/de.json';
import nl from '../locales/nl.json';
import pt from '../locales/pt.json';
import ko from '../locales/ko.json';
import ar from '../locales/ar.json';

// --- 3. DATA TEKNIS ---
const NETWORK_DATA = {
  chainId: "77077",
  genesisHash: "0x1d58599424f1159828236111f1f9e83063f66345091a99540c4989679269491a",
  installCommand: "curl -sSL https://raw.githubusercontent.com/irlan7/quantumpay-go/master/install.sh | bash",
  status: "Mainnet-Alpha v1.1"
};

const LANGUAGES = [
  { code: 'en', label: '🇺🇸 EN' },
  { code: 'id', label: '🇮🇩 ID' },
  { code: 'de', label: '🇩🇪 DE' },
  { code: 'nl', label: '🇳🇱 NL' },
  { code: 'pt', label: '🇵🇹 PT' },
  { code: 'ko', label: '🇰🇷 KO' },
  { code: 'ar', label: '🇸🇦 AR' }
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

  // --- STYLE OBJECTS (Agar Kodingan Rapi) ---
  const styles = {
    container: { minHeight: '100vh', background: '#020617', color: '#fff', fontFamily: 'Inter, sans-serif' },
    nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 5%', borderBottom: '1px solid #1e293b', background: 'rgba(2, 6, 23, 0.95)', position: 'sticky' as 'sticky', top: 0, zIndex: 100 },
    navLinks: { display: 'flex', gap: '30px', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '1px' },
    hero: { textAlign: 'center' as 'center', padding: '100px 20px', position: 'relative' as 'relative', overflow: 'hidden' },
    badge: { display: 'inline-block', padding: '5px 15px', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '20px', color: '#60a5fa', fontSize: '0.75rem', fontWeight: 'bold', background: 'rgba(59, 130, 246, 0.1)', letterSpacing: '2px', marginBottom: '20px' },
    h1: { fontSize: '3.5rem', fontWeight: '900', lineHeight: '1.2', marginBottom: '20px' },
    gradientText: { background: 'linear-gradient(to right, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    section: { padding: '80px 20px', borderTop: '1px solid #1e293b' },
    cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' },
    card: { background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '30px', transition: 'all 0.3s' },
    cardRec: { background: '#1e293b', border: '2px solid #3b82f6', borderRadius: '20px', padding: '30px', transform: 'scale(1.02)', boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)' },
    codeBlock: { background: '#000', border: '1px solid #1e293b', padding: '20px', borderRadius: '10px', fontFamily: 'monospace', color: '#10b981', overflowX: 'auto' as 'auto', fontSize: '0.9rem' },
    footer: { padding: '40px', borderTop: '1px solid #1e293b', textAlign: 'center' as 'center', color: '#64748b', fontSize: '0.8rem', letterSpacing: '2px' }
  };

  return (
    <div style={styles.container}>
      <Head>
        <title>Run a Node | QuantumPay Sovereign Network</title>
      </Head>

      {/* --- NAVBAR --- */}
      <nav style={styles.nav}>
        <Link href="/">
          <img src="/logo.png" alt="Logo" style={{ height: '100px', cursor: 'pointer' }} />
        </Link>
        
        <div style={styles.navLinks}>
          <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>HOME</Link>
          <Link href="/explorer" style={{ color: '#94a3b8', textDecoration: 'none' }}>EXPLORER</Link>
          <Link href="/wallet" style={{ color: '#3b82f6', textDecoration: 'none' }}>WALLET</Link>
        </div>

        <div>
            <select 
                onChange={changeLanguage} 
                value={locale} 
                style={{ background: '#1e293b', color: 'white', border: '1px solid #334155', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
            >
                {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.label}</option>
                ))}
            </select>
        </div>
      </nav>

      <main>
        {/* --- HERO SECTION --- */}
        <section style={styles.hero}>
          {/* Background Glow Effect (Manual CSS) */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 70%)', zIndex: -1 }}></div>
          
          <div style={styles.badge}>INFRASTRUCTURE PHASE</div>
          <h1 style={styles.h1}>
            BECOME A <br />
            <span style={styles.gradientText}>
              SOVEREIGN VALIDATOR
            </span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Amankan jaringan QuantumPay, proses transaksi global, dan dapatkan imbalan QTM dari setiap blok yang Anda validasi.
          </p>
        </section>

        {/* --- VALIDATOR CALCULATOR SECTION --- */}
        <section style={{ padding: '0 20px 80px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
             {/* NOTE PENTING:
                Jika ValidatorCalculator.tsx juga menggunakan Tailwind (className), 
                tampilannya mungkin masih berantakan. 
                Jika itu terjadi, kabari saya biar saya berikan kode Calculator versi Inline Style juga.
             */}
             <ValidatorCalculator />
          </div>
        </section>

        {/* --- HARDWARE REQUIREMENTS --- */}
        <section style={{ ...styles.section, background: '#0f172a' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>Hardware Requirements</h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '60px' }}>Pilih spesifikasi yang sesuai dengan komitmen Anda.</p>
            
            <div style={styles.cardGrid}>
              {/* MINIMUM */}
              <div style={styles.card}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '20px' }}>Entry Level</h3>
                <ul style={{ listStyle: 'none', padding: 0, color: '#94a3b8', lineHeight: '2.5' }}>
                  <li><span style={{ color: '#3b82f6', fontWeight: 'bold' }}>CPU:</span> 2 Cores</li>
                  <li><span style={{ color: '#3b82f6', fontWeight: 'bold' }}>RAM:</span> 4 GB</li>
                  <li><span style={{ color: '#3b82f6', fontWeight: 'bold' }}>DISK:</span> 40 GB SSD</li>
                  <li><span style={{ color: '#3b82f6', fontWeight: 'bold' }}>NET:</span> 100 Mbps</li>
                </ul>
              </div>

              {/* RECOMMENDED */}
              <div style={styles.cardRec}>
                <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                    <span style={{ background: '#2563eb', color: 'white', fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>RECOMMENDED</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '20px' }}>Pro Validator</h3>
                <ul style={{ listStyle: 'none', padding: 0, color: '#e2e8f0', lineHeight: '2.5' }}>
                  <li><span style={{ color: '#34d399', fontWeight: 'bold' }}>CPU:</span> 4-8 Cores</li>
                  <li><span style={{ color: '#34d399', fontWeight: 'bold' }}>RAM:</span> 8-16 GB</li>
                  <li><span style={{ color: '#34d399', fontWeight: 'bold' }}>DISK:</span> 500 GB NVMe</li>
                  <li><span style={{ color: '#34d399', fontWeight: 'bold' }}>NET:</span> 1 Gbps</li>
                </ul>
              </div>

              {/* SOVEREIGN */}
              <div style={styles.card}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '20px' }}>Sovereign Node</h3>
                <ul style={{ listStyle: 'none', padding: 0, color: '#94a3b8', lineHeight: '2.5' }}>
                  <li><span style={{ color: '#a855f7', fontWeight: 'bold' }}>CPU:</span> 16+ Cores</li>
                  <li><span style={{ color: '#a855f7', fontWeight: 'bold' }}>RAM:</span> 32 GB+ ECC</li>
                  <li><span style={{ color: '#a855f7', fontWeight: 'bold' }}>DISK:</span> 2 TB NVMe RAID</li>
                  <li><span style={{ color: '#a855f7', fontWeight: 'bold' }}>NET:</span> 10 Gbps</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- INSTALLATION --- */}
        <section style={{ ...styles.section, background: '#020617' }}>
             <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ marginBottom: '50px' }}>
                    <h3 style={{ color: '#60a5fa', marginBottom: '15px', fontWeight: 'bold' }}>01. Automated Installation</h3>
                    <div style={styles.codeBlock}>
                        {NETWORK_DATA.installCommand}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                    <div>
                        <h3 style={{ color: '#fb923c', marginBottom: '15px', fontWeight: 'bold' }}>02. Genesis Hash</h3>
                        <div style={{ background: 'rgba(251, 146, 60, 0.1)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(251, 146, 60, 0.3)', color: '#fb923c', fontFamily: 'monospace', wordBreak: 'break-all', fontSize: '0.85rem' }}>
                            {NETWORK_DATA.genesisHash}
                        </div>
                    </div>
                    <div>
                        <h3 style={{ color: '#a855f7', marginBottom: '15px', fontWeight: 'bold' }}>03. Network Status</h3>
                        <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(168, 85, 247, 0.3)', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#cbd5e1' }}>Chain ID: <strong>{NETWORK_DATA.chainId}</strong></span>
                            <span style={{ color: '#34d399', fontWeight: 'bold' }}>{NETWORK_DATA.status}</span>
                        </div>
                    </div>
                </div>
             </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer style={styles.footer}>
        QUANTUMPAY FOUNDATION © 2026
      </footer>
    </div>
  );
}
