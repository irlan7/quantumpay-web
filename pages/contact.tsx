import React from 'react';
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

const LANGUAGES = [
  { code: 'en', label: '🇺🇸 EN (English)' },
  { code: 'id', label: '🇮🇩 ID (Indonesia)' },
  { code: 'de', label: '🇩🇪 DE (Deutsch)' },
  { code: 'nl', label: '🇳🇱 NL (Dutch)' },
  { code: 'pt', label: '🇵🇹 PT (Português)' },
  { code: 'ko', label: '🇰🇷 KO (Korean)' },
  { code: 'ar', label: '🇸🇦 AR (Arabic)' }
];

export default function Contact() {
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

  // Fungsi Anti-Spam untuk membuka aplikasi email
  const handleEmailClick = () => {
    const user = 'quantumpaysec';
    const domain = 'gmail.com';
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <div style={{minHeight: '100vh', background: '#0b0f14', color: '#fff', fontFamily: 'Inter, sans-serif', overflowX: 'hidden'}}>
      <Head>
        <title>{t('navbar', 'contact')} | QuantumPay</title>
      </Head>

      {/* --- NAVBAR --- */}
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', borderBottom: '1px solid #1f2937'}}>
        <Link href="/">
          <img src="/logo.png" alt="QuantumPay" style={{height: '120px', width: 'auto', cursor: 'pointer'}} />
        </Link>

        <div style={{display: 'flex', gap: '30px', fontSize: '1rem'}}>
            <Link href="/" style={{color: '#9ca3af', textDecoration: 'none'}}>{t('navbar', 'home')}</Link>
            <Link href="/explorer" style={{color: '#9ca3af', textDecoration: 'none'}}>{t('navbar', 'explorer')}</Link>
            <Link href="/run-node" style={{color: '#9ca3af', textDecoration: 'none'}}>{t('navbar', 'validators')}</Link>
            <Link href="/contact" style={{color: '#fff', textDecoration: 'none'}}>{t('navbar', 'contact')}</Link>
        </div>

        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <select onChange={changeLanguage} value={locale} style={{background: '#1f2937', color: 'white', border: '1px solid #374151', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer'}}>
                {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.label}</option>
                ))}
            </select>
        </div>
      </nav>

      {/* --- CONTENT SECTION --- */}
      <main style={{maxWidth: '1100px', margin: '0 auto', padding: '80px 20px', textAlign: 'center'}}>
        <h1 style={{fontSize: '3.5rem', fontWeight: '900', marginBottom: '20px', background: 'linear-gradient(to right, #fbbf24, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          {t('navbar', 'contact')}
        </h1>
        <p style={{color: '#9ca3af', fontSize: '1.2rem', marginBottom: '60px', maxWidth: '750px', margin: '0 auto 60px', lineHeight: '1.6'}}>
           Kanal resmi QuantumPay. Kami mengutamakan keamanan dan transparansi melalui jalur komunikasi terverifikasi.
        </p>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px'}}>
            
            {/* CARD 1: GITHUB (Single Source of Truth) */}
            <a href="https://github.com/irlan7/quantumpay-go" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                <div style={{background: '#111827', padding: '45px 30px', borderRadius: '24px', border: '1px solid #6366f1', transition: '0.3s', height: '100%'}}>
                    <div style={{fontSize: '2.5rem', marginBottom: '20px'}}>📁</div>
                    <h3 style={{color: '#fff', marginBottom: '15px'}}>Single Source of Truth</h3>
                    <p style={{color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.5'}}>Pusat pengembangan kode sumber terbuka. Pantau Kernel dan kemajuan teknis secara real-time.</p>
                    <div style={{marginTop: '25px', color: '#6366f1', fontWeight: 'bold'}}>github.com/irlan7/quantumpay-go</div>
                </div>
            </a>

            {/* CARD 2: EMAIL (Anti-Bot Clickable) */}
            <div 
                onClick={handleEmailClick}
                style={{background: '#111827', padding: '45px 30px', borderRadius: '24px', border: '1px solid #1f2937', transition: '0.3s', height: '100%', cursor: 'pointer'}}
            >
                <div style={{fontSize: '2.5rem', marginBottom: '20px'}}>📧</div>
                <h3 style={{color: '#fff', marginBottom: '15px'}}>Official Support</h3>
                <p style={{color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.5'}}>Hubungi tim keamanan kami. Alamat ini dilindungi dari bot pemanen email.</p>
                <div style={{marginTop: '25px', color: '#fbbf24', fontWeight: 'bold'}}>
                    quantumpaysec<span style={{color: '#9ca3af'}}>(at)</span>gmail.com
                </div>
            </div>

            {/* CARD 3: LINKS & SOSMED */}
            <div style={{background: '#111827', padding: '45px 30px', borderRadius: '24px', border: '1px solid #1f2937', textAlign: 'left', height: '100%'}}>
                <div style={{marginBottom: '35px'}}>
                    <h4 style={{color: '#fff', marginBottom: '8px', fontSize: '1.1rem'}}>Main Website</h4>
                    <a href="http://www.quantumpaychain.org" target="_blank" rel="noopener noreferrer" style={{color: '#9ca3af', textDecoration: 'none', fontSize: '1rem', transition: '0.3s'}}>www.quantumpaychain.org</a>
                </div>
                <div>
                    <h4 style={{color: '#fff', marginBottom: '8px', fontSize: '1.1rem'}}>Social Media (X)</h4>
                    <a href="https://x.com/quantumpaychain" target="_blank" rel="noopener noreferrer" style={{color: '#9ca3af', textDecoration: 'none', fontSize: '1rem', transition: '0.3s'}}>@quantumpaychain</a>
                </div>
            </div>

        </div>

        <div style={{marginTop: '100px', borderTop: '1px solid #1f2937', paddingTop: '40px', color: '#4b5563', fontSize: '0.9rem'}}>
            © 2026 QuantumPay Distributed Ledger Network.
        </div>
      </main>
    </div>
  );
}
