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

// --- 2. DATA INFRASTRUKTUR ---
const NODES = [
  { id: 'GENESIS-SG1', name: 'Quantum Command Center', provider: 'OVH Cloud', location: 'Singapore, Asia', flag: '🇸🇬', ip: '15.235.***.***', role: 'BOOTNODE & RPC', latency: '12ms' },
  { id: 'VALIDATOR-EU1', name: 'Iron Tank Validator', provider: 'Contabo', location: 'Frankfurt, Germany', flag: '🇩🇪', ip: '5.189.***.***', role: 'HEAVY VALIDATOR', latency: '145ms' },
  { id: 'VALIDATOR-US1', name: 'Eagle Eye Backup', provider: 'DatabaseMart', location: 'Texas, USA', flag: '🇺🇸', ip: '38.247.***.***', role: 'DISASTER RECOVERY', latency: '210ms' }
];

const LANGUAGES = [
  { code: 'en', label: '🇺🇸 EN (English)' },
  { code: 'id', label: '🇮🇩 ID (Indonesia)' },
  { code: 'de', label: '🇩🇪 DE (Deutsch)' },
  { code: 'nl', label: '🇳🇱 NL (Dutch)' },
  { code: 'pt', label: '🇵🇹 PT (Português)' },
  { code: 'ko', label: '🇰🇷 KO (Korean)' },
  { code: 'ar', label: '🇸🇦 AR (Arabic)' }
];

export default function Home() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
    <div style={{minHeight: '100vh', background: '#0b0f14', color: '#fff', fontFamily: 'Inter, sans-serif', overflowX: 'hidden'}}>
      <Head>
        <title>QuantumPay | Sovereign Layer-1 Blockchain</title>
      </Head>

      {/* --- NAVBAR --- */}
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', borderBottom: '1px solid #1f2937'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <img src="/logo.png" alt="Logo" style={{height: '120px', width: 'auto'}} />
        </div>

        {/* MENU NAVIGASI DENGAN LINK LEGAL */}
        <div style={{display: 'flex', gap: '25px', fontSize: '0.95rem'}}>
            <Link href="/" style={{color: '#fff', textDecoration: 'none'}}>{t('navbar', 'home')}</Link>
            <Link href="/explorer" style={{color: '#9ca3af', textDecoration: 'none'}}>{t('navbar', 'explorer')}</Link>
            <Link href="/run-node" style={{color: '#9ca3af', textDecoration: 'none'}}>{t('navbar', 'validators')}</Link>
            <Link href="/contact" style={{color: '#9ca3af', textDecoration: 'none'}}>{t('navbar', 'contact')}</Link>
            {/* LINK LEGAL BARU */}
            <Link href="/legal" style={{color: '#9ca3af', textDecoration: 'none'}}>{t('navbar', 'legal')}</Link>
        </div>

        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <select onChange={changeLanguage} value={locale} style={{background: '#1f2937', color: 'white', border: '1px solid #374151', padding: '8px', borderRadius: '8px'}}>
                {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.label}</option>
                ))}
            </select>
            <Link href="/wallet">
                <button style={{padding: '10px 20px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>
                    {t('navbar', 'launch_app')} 🚀
                </button>
            </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main style={{textAlign: 'center', padding: '100px 20px'}}>
        <div style={{marginBottom: '15px', color: '#6366f1', letterSpacing: '3px', fontSize: '0.85rem', fontWeight: '800'}}>
            {t('hero', 'chain_status')}
        </div>
        <h1 style={{fontSize: '4.5rem', marginBottom: '25px', fontWeight: '900'}}>{t('hero', 'title')}</h1>
        <p style={{fontSize: '1.3rem', color: '#9ca3af', maxWidth: '850px', margin: '0 auto 50px', lineHeight: '1.6'}}>{t('hero', 'subtitle')}</p>

        <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '100px'}}>
            <Link href="/explorer">
                <button style={{padding: '20px 45px', borderRadius: '50px', cursor: 'pointer', border: 'none', fontWeight: 'bold', background: '#6366f1', color: 'white', boxShadow: '0 0 25px rgba(99, 102, 241, 0.4)'}}>{t('hero', 'btn_explore')}</button>
            </Link>
            <Link href="/run-node">
                <button style={{padding: '20px 45px', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', background: 'transparent', border: '1px solid #4b5563', color: '#fff'}}>{t('hero', 'btn_run_node')}</button>
            </Link>
        </div>

        {/* --- INFRASTRUCTURE CARDS --- */}
        <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'left'}}>
            <h2 style={{textAlign: 'center', marginBottom: '50px'}}>{t('infrastructure', 'title')}</h2>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px'}}>
                {NODES.map((node, index) => (
                    <div key={index} onMouseEnter={() => setHoveredCard(index)} onMouseLeave={() => setHoveredCard(null)} style={{background: '#111827', border: hoveredCard === index ? '1px solid #6366f1' : '1px solid #1f2937', borderRadius: '20px', padding: '30px', transition: '0.3s'}}>
                        <h3 style={{color: '#fff', marginBottom: '10px'}}>{node.name}</h3>
                        <p style={{color: '#9ca3af', fontSize: '0.9rem'}}>{node.flag} {node.location}</p>
                        <div style={{marginTop: '20px', background: '#0a0d12', padding: '15px', borderRadius: '12px', fontSize: '0.85rem', fontFamily: 'monospace'}}>
                            <div style={{color: '#10b981'}}>Latency: {node.latency}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </main>

      <footer style={{textAlign: 'center', padding: '60px', borderTop: '1px solid #1f2937', color: '#4b5563'}}>
        {t('footer', 'text')}
      </footer>
    </div>
  );
}
