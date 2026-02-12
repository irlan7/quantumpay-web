import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

// --- 1. IMPORT KOMPONEN BARU ---
import FounderBalance from '../components/FounderBalance';

// --- 2. IMPORT INTEGRASI API GLOBAL ---
import { fetchNetworkStats } from '../lib/quantumApi';

// --- IMPORT KAMUS BAHASA ---
import en from '../locales/en.json';
import id from '../locales/id.json';
import de from '../locales/de.json';
import nl from '../locales/nl.json';
import pt from '../locales/pt.json';
import ko from '../locales/ko.json';
import ar from '../locales/ar.json';

// --- DATA INFRASTRUKTUR ---
const NODES = [
  { name: 'Quantum Command Center', location: 'Singapore, Asia', flag: '🇸🇬', role: 'BOOTNODE & RPC', latency: '12ms' },
  { name: 'Iron Tank Validator', location: 'Frankfurt, Germany', flag: '🇩🇪', role: 'HEAVY VALIDATOR', latency: '145ms' },
  { name: 'Eagle Eye Backup', location: 'Texas, USA', flag: '🇺🇸', role: 'DISASTER RECOVERY', latency: '210ms' }
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

  // State untuk Data Live dari Singapura
  const [nodeStatus, setNodeStatus] = useState("CONNECTING...");
  const [blockHeight, setBlockHeight] = useState(0);

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

  // --- LOGIKA FETCHING GLOBAL ---
  useEffect(() => {
    const getGlobalData = async () => {
      try {
        const stats = await fetchNetworkStats();
        setNodeStatus("ONLINE");
        setBlockHeight(stats.current_height);
      } catch (err) {
        console.error("Gagal koneksi ke Mainnet:", err);
        setNodeStatus("OFFLINE");
      }
    };

    getGlobalData();
    const interval = setInterval(getGlobalData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{minHeight: '100vh', background: '#0b0f14', color: '#fff', fontFamily: 'Inter, sans-serif', overflowX: 'hidden'}}>
      <Head>
        <title>QuantumPay | Sovereign Layer-1 Blockchain</title>
      </Head>

      {/* --- NAVBAR --- */}
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 5%', borderBottom: '1px solid #1f2937', background: 'rgba(11, 15, 20, 0.95)', position: 'sticky', top: 0, zIndex: 1000}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Link href="/">
                <img src="/logo.png" alt="Logo" style={{height: '100px', width: 'auto', cursor: 'pointer'}} />
            </Link>
        </div>

        <div style={{display: 'flex', gap: '30px', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '1px'}}>
            <Link href="/" style={{color: '#6366f1', textDecoration: 'none'}}>{t('navbar', 'home')}</Link>
            <Link href="/explorer" style={{color: '#9ca3af', textDecoration: 'none'}}>{t('navbar', 'explorer')}</Link>
            <Link href="/run-node" style={{color: '#9ca3af', textDecoration: 'none'}}>{t('navbar', 'validators')}</Link>
            <Link href="/contact" style={{color: '#9ca3af', textDecoration: 'none'}}>{t('navbar', 'contact')}</Link>
        </div>

        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <select onChange={changeLanguage} value={locale} style={{background: '#1f2937', color: 'white', border: '1px solid #374151', padding: '8px', borderRadius: '8px', cursor: 'pointer'}}>
                {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.label}</option>
                ))}
            </select>
            <Link href="/wallet">
                <button style={{padding: '10px 25px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)'}}>
                    {t('navbar', 'launch_app')} 🚀
                </button>
            </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main style={{textAlign: 'center', padding: '120px 20px 80px'}}>

        {/* --- LIVE STATS CONTAINER (Updated Layout 3 Cards) --- */}
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', marginBottom: '80px', alignItems: 'stretch'}}>

          {/* 1. KARTU STATUS NODE */}
          <div style={{
            padding: '25px',
            background: '#111827',
            borderRadius: '20px',
            border: `1px solid ${nodeStatus === 'ONLINE' ? '#10b981' : '#ef4444'}`,
            boxShadow: nodeStatus === 'ONLINE' ? '0 0 20px rgba(16, 185, 129, 0.1)' : 'none',
            flex: '1 1 300px',
            maxWidth: '350px',
            textAlign: 'left'
          }}>
            <p style={{margin: 0, fontSize: '0.7rem', color: '#9ca3af', letterSpacing: '2px', fontWeight: 'bold'}}>NETWORK STATUS</p>
            <h2 style={{margin: '10px 0', color: nodeStatus === 'ONLINE' ? '#10b981' : '#ef4444', fontSize: '1.8rem', fontWeight: 'bold'}}>
              ● {nodeStatus}
            </h2>
            <p style={{margin: 0, fontFamily: 'monospace', color: '#6366f1', fontSize: '0.9rem'}}>Height: {blockHeight.toLocaleString()}</p>
          </div>

          {/* 2. KARTU TOTAL SUPPLY (NEW - 210 Juta QTM) */}
          <div style={{
            padding: '25px',
            background: '#1f2937', // Sedikit berbeda warnanya untuk highlight
            borderRadius: '20px',
            border: '1px solid #374151',
            boxShadow: '0 0 30px rgba(99, 102, 241, 0.15)',
            flex: '1 1 300px',
            maxWidth: '350px',
            textAlign: 'left',
            position: 'relative',
            overflow: 'hidden'
          }}>
             {/* Decorative Background Glow */}
             <div style={{position: 'absolute', top: '-50px', right: '-50px', width: '100px', height: '100px', background: '#6366f1', filter: 'blur(60px)', opacity: 0.3}}></div>

             <p style={{margin: 0, fontSize: '0.7rem', color: '#d1d5db', letterSpacing: '2px', fontWeight: 'bold'}}>MAX TOTAL SUPPLY</p>
             <h2 style={{margin: '10px 0', color: '#fff', fontSize: '1.8rem', fontWeight: 'bold'}}>
               210,000,000 <span style={{fontSize: '1rem', color: '#818cf8'}}>QTM</span>
             </h2>
             {/* Progress Bar Full (Hard Cap) */}
             <div style={{width: '100%', height: '6px', background: '#374151', borderRadius: '3px', marginTop: '15px'}}>
                <div style={{width: '100%', height: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)', borderRadius: '3px'}}></div>
             </div>
             <p style={{margin: '10px 0 0', fontSize: '0.75rem', color: '#9ca3af'}}>Fixed Genesis Cap (Deflationary)</p>
          </div>

          {/* 3. KARTU SALDO FOUNDER / GUARDIAN (Imported Component) */}
          <div style={{flex: '1 1 300px', maxWidth: '350px'}}>
            <FounderBalance />
          </div>

        </div>

        {/* --- JUDUL UTAMA --- */}
        <div style={{marginBottom: '20px', display: 'inline-block', padding: '5px 15px', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '20px', color: '#6366f1', letterSpacing: '3px', fontSize: '0.75rem', fontWeight: '800', background: 'rgba(99, 102, 241, 0.1)'}}>
            {t('hero', 'chain_status')}
        </div>
        <h1 style={{fontSize: '5rem', marginBottom: '20px', fontWeight: '900', lineHeight: '1.1'}}>
            THE SOVEREIGN <br />
            <span style={{color: '#ffd700', textShadow: '0 0 40px rgba(255, 215, 0, 0.2)'}}>SHIELD</span>
        </h1>
        <p style={{fontSize: '1.4rem', color: '#9ca3af', maxWidth: '800px', margin: '0 auto 60px', lineHeight: '1.6', fontStyle: 'italic'}}>
            {t('hero', 'subtitle')}
        </p>

        <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '100px'}}>
            <Link href="/explorer">
                <button style={{padding: '18px 40px', borderRadius: '15px', cursor: 'pointer', border: 'none', fontWeight: 'bold', background: '#6366f1', color: 'white', fontSize: '1rem', transition: 'transform 0.2s'}}>
                    {t('hero', 'btn_explore')}
                </button>
            </Link>
            <Link href="/run-node">
                <button style={{padding: '18px 40px', borderRadius: '15px', cursor: 'pointer', fontWeight: 'bold', background: 'transparent', border: '1px solid #4b5563', color: '#fff', fontSize: '1rem'}}>
                    {t('hero', 'btn_run_node')}
                </button>
            </Link>
        </div>

        {/* --- INFRASTRUCTURE CARDS (Updated Visuals) --- */}
        <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'left'}}>
            <h2 style={{textAlign: 'center', marginBottom: '10px', color: '#ffd700', fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase'}}>{t('infrastructure', 'title')}</h2>
            <h3 style={{textAlign: 'center', marginBottom: '60px', fontSize: '3.5rem', fontWeight: '800'}}>{t('infrastructure', 'status')}</h3>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px'}}>
                {NODES.map((node, index) => (
                    <div key={index}
                         onMouseEnter={() => setHoveredCard(index)}
                         onMouseLeave={() => setHoveredCard(null)}
                         style={{
                             background: '#111827',
                             border: hoveredCard === index ? '1px solid #6366f1' : '1px solid #1f2937',
                             borderRadius: '25px',
                             padding: '40px',
                             transition: 'all 0.3s ease',
                             transform: hoveredCard === index ? 'translateY(-5px)' : 'none',
                             boxShadow: hoveredCard === index ? '0 10px 40px rgba(99, 102, 241, 0.1)' : 'none'
                         }}>
                        <div style={{color: '#ffd700', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <span style={{height: '8px', width: '8px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981'}}></span>
                            {t('infrastructure', 'active_node')}
                        </div>
                        <h3 style={{color: '#fff', marginBottom: '5px', fontSize: '1.5rem'}}>{node.name}</h3>
                        <p style={{color: '#9ca3af', fontSize: '0.85rem', marginBottom: '30px', letterSpacing: '1px', textTransform: 'uppercase'}}>
                            {node.flag} {node.location}
                        </p>
                        <div style={{borderTop: '1px solid #374151', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <span style={{color: '#6b7280', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px'}}>{t('infrastructure', 'latency')}</span>
                            <span style={{color: '#6366f1', fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold'}}>{node.latency}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </main>

      {/* --- FOOTER --- */}
      <footer style={{textAlign: 'center', padding: '80px 20px', borderTop: '1px solid #1f2937', background: '#050505'}}>
        <h4 style={{color: '#ffd700', fontSize: '0.7rem', letterSpacing: '4px', marginBottom: '30px'}}>{t('footer', 'contact_title')}</h4>
        <a href="mailto:quantumpaysec@gmail.com" style={{color: 'white', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', borderBottom: '2px solid #374151', paddingBottom: '5px'}}>
            quantumpaysec@gmail.com
        </a>
        <div style={{marginTop: '60px', color: '#4b5563', fontSize: '0.7rem', letterSpacing: '2px'}}>
            {t('footer', 'text')}
        </div>
      </footer>
    </div>
  );
}
