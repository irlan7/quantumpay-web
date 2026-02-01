import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

// --- 1. IMPORT KAMUS BAHASA (Tetap dipertahankan) ---
// Pastikan file-file ini ada di folder locales. Jika tidak ada, kode tetap jalan karena ada fallback.
import en from '../locales/en.json';
import id from '../locales/id.json';
import de from '../locales/de.json';
import nl from '../locales/nl.json';
import pt from '../locales/pt.json';
import ko from '../locales/ko.json';
import ar from '../locales/ar.json';

// --- 2. DATA INFRASTRUKTUR ---
const NODES = [
  { id: 'GENESIS-SG1', name: 'Quantum Command Center', provider: 'OVH Cloud', location: 'Singapore, Asia', flag: '🇸🇬', role: 'BOOTNODE & RPC', latency: '12ms' },
  { id: 'VALIDATOR-EU1', name: 'Iron Tank Validator', provider: 'Contabo', location: 'Frankfurt, Germany', flag: '🇩🇪', role: 'HEAVY VALIDATOR', latency: '145ms' },
  { id: 'VALIDATOR-US1', name: 'Eagle Eye Backup', provider: 'DatabaseMart', location: 'Texas, USA', flag: '🇺🇸', role: 'DISASTER RECOVERY', latency: '210ms' }
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

  // Fungsi Translate Aman (Anti-Error)
  const t = (section: string, key: string) => {
      try { return dict[section][key] || key; } catch (e) { return key; }
  };

  const changeLanguage = (e: any) => {
    const newLocale = e.target.value;
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  // --- DATA MANIFESTO (Hardcoded agar PASTI MUNCUL & RAJIN) ---
  const manifestoContent: any = {
    en: {
      title: "THE GENESIS MANIFESTO",
      main_quote: '"Silicon Valley Standards, Bamboo Spear Spirit."',
      desc: "Digital sovereignty does not require luxury offices in San Francisco. We build independent sovereignty on efficient hardware to secure the future.",
      points: [
        { title: "Zero Funding", desc: "Pure innovation without third-party debt." },
        { title: "One-Man Army", desc: "Global engineering discipline in every line." },
        { title: "Quantum Ark", desc: "Protecting assets from quantum threats." }
      ]
    },
    id: {
      title: "MANIFESTO GENESIS",
      main_quote: '"Standard Kerja Silicon Valley, Semangat Perlawanan Bambu Runcing."',
      desc: "Kedaulatan digital tidak butuh kantor mewah. Kami membangun kedaulatan mandiri di atas hardware efisien untuk mengamankan masa depan.",
      points: [
        { title: "Tanpa Pendanaan", desc: "Inovasi murni tanpa utang pihak ketiga." },
        { title: "One-Man Army", desc: "Disiplin teknik global di setiap baris kode." },
        { title: "Bahtera Kuantum", desc: "Melindungi aset dari ancaman kuantum." }
      ]
    },
    // Fallback sederhana untuk bahasa lain agar tidak error
    de: { title: "DAS GENESIS-MANIFEST", main_quote: '"Silicon Valley Standards, Bambusspeer-Geist."', desc: "Digitale Souveränität erfordert keine Luxusbüros.", points: [] },
    nl: { title: "HET GENESIS MANIFEST", main_quote: '"Silicon Valley Standaarden, Bamboe Speer Geest."', desc: "Digitale soevereiniteit vereist geen luxe kantoren.", points: [] }
  };

  // Pilih konten manifesto berdasarkan bahasa, fallback ke EN jika kosong
  const m = manifestoContent[locale as string] || manifestoContent['en'];
  // Pastikan points ada (untuk bahasa selain EN/ID yang mungkin kosong di atas)
  const points = m.points && m.points.length > 0 ? m.points : manifestoContent['en'].points;

  return (
    <div style={{minHeight: '100vh', background: '#0b0f14', color: '#fff', fontFamily: 'Inter, sans-serif', overflowX: 'hidden'}}>
      <Head>
        <title>QuantumPay | Sovereign Layer-1 Blockchain</title>
      </Head>

      {/* --- NAVBAR --- */}
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 5%', borderBottom: '1px solid #1f2937', background: 'rgba(11, 15, 20, 0.95)', position: 'sticky', top: 0, zIndex: 1000}}>
        {/* LOGO KIRI (UKURAN DIPERBESAR ke 100px) */}
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Link href="/">
                {/* Perubahan: height diperbesar dari 50px ke 100px */}
                <img src="/logo.png" alt="Logo" style={{height: '100px', width: 'auto', cursor: 'pointer', objectFit: 'contain'}} />
            </Link>
        </div>

        {/* MENU TENGAH (Termasuk LEGAL) */}
        <div style={{display: 'flex', gap: '30px', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '1px'}}>
            <Link href="/" style={{color: '#6366f1', textDecoration: 'none'}}>{t('navbar', 'home') || 'HOME'}</Link>
            <Link href="/explorer" style={{color: '#9ca3af', textDecoration: 'none'}}>{t('navbar', 'explorer') || 'EXPLORER'}</Link>
            <Link href="/run-node" style={{color: '#9ca3af', textDecoration: 'none'}}>{t('navbar', 'validators') || 'VALIDATORS'}</Link>
            <Link href="/contact" style={{color: '#9ca3af', textDecoration: 'none'}}>{t('navbar', 'contact') || 'CONTACT'}</Link>
            <Link href="/legal" style={{color: '#9ca3af', textDecoration: 'none'}}>{t('navbar', 'legal') || 'LEGAL'}</Link>
        </div>

        {/* KANAN: BAHASA & TOMBOL APP */}
        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <select onChange={changeLanguage} value={locale} style={{background: '#1f2937', color: 'white', border: '1px solid #374151', padding: '8px', borderRadius: '8px', cursor: 'pointer'}}>
                {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.label}</option>
                ))}
            </select>
            <Link href="/wallet">
                <button style={{padding: '10px 25px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '1px', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)'}}>
                    {t('navbar', 'launch_app') || 'LAUNCH APP'} 🚀
                </button>
            </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main style={{textAlign: 'center', padding: '120px 20px 80px'}}>
        <div style={{marginBottom: '20px', display: 'inline-block', padding: '5px 15px', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '20px', color: '#6366f1', letterSpacing: '3px', fontSize: '0.75rem', fontWeight: '800', background: 'rgba(99, 102, 241, 0.1)'}}>
            MAINNET ALPHA LIVE
        </div>
        <h1 style={{fontSize: '5rem', marginBottom: '20px', fontWeight: '900', lineHeight: '1.1'}}>
            THE SOVEREIGN <br /> 
            <span style={{color: '#ffd700', textShadow: '0 0 40px rgba(255, 215, 0, 0.2)'}}>SHIELD</span>
        </h1>
        <p style={{fontSize: '1.4rem', color: '#9ca3af', maxWidth: '800px', margin: '0 auto 60px', lineHeight: '1.6', fontStyle: 'italic'}}>
            {t('hero', 'subtitle') || '"Silicon Valley Standards, Bamboo Spear Spirit."'}
        </p>

        <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '100px'}}>
            <Link href="/explorer">
                <button style={{padding: '18px 40px', borderRadius: '15px', cursor: 'pointer', border: 'none', fontWeight: 'bold', background: '#6366f1', color: 'white', fontSize: '1rem', transition: 'transform 0.2s'}}>
                    {t('hero', 'btn_explore') || 'Explore Network'}
                </button>
            </Link>
            <Link href="/run-node">
                <button style={{padding: '18px 40px', borderRadius: '15px', cursor: 'pointer', fontWeight: 'bold', background: 'transparent', border: '1px solid #4b5563', color: '#fff', fontSize: '1rem'}}>
                    {t('hero', 'btn_run_node') || 'Run a Node'}
                </button>
            </Link>
        </div>

        {/* --- MANIFESTO SECTION (ANTI-ERROR & HARDCODED) --- */}
        <section style={{padding: '80px 20px', background: '#050505', borderTop: '1px solid #1f2937', borderBottom: '1px solid #1f2937', marginBottom: '100px'}}>
            <div style={{maxWidth: '1000px', margin: '0 auto'}}>
                <h2 style={{color: '#ffd700', letterSpacing: '4px', fontSize: '0.8rem', marginBottom: '40px', textTransform: 'uppercase'}}>
                    {m.title}
                </h2>
                <p style={{fontSize: '2rem', fontWeight: '300', color: '#e5e7eb', marginBottom: '30px', lineHeight: '1.3'}}>
                    {m.main_quote}
                </p>
                <p style={{color: '#9ca3af', fontSize: '1.1rem', marginBottom: '80px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto'}}>
                    {m.desc}
                </p>

                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '50px'}}>
                    {points.map((point: any, idx: number) => (
                        <div key={idx} style={{flex: '1 1 250px', maxWidth: '300px'}}>
                            <div style={{height: '2px', width: '50px', background: '#6366f1', margin: '0 auto 20px'}}></div>
                            <h4 style={{color: '#ffd700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '10px'}}>
                                {point.title}
                            </h4>
                            <p style={{color: '#6b7280', fontSize: '0.9rem'}}>
                                {point.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* --- INFRASTRUCTURE CARDS --- */}
        <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'left'}}>
            <h2 style={{textAlign: 'center', marginBottom: '10px', color: '#ffd700', fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase'}}>Global Network</h2>
            <h3 style={{textAlign: 'center', marginBottom: '60px', fontSize: '3rem', fontWeight: '800'}}>Infrastructure Status</h3>
            
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
                             transform: hoveredCard === index ? 'translateY(-5px)' : 'none'
                         }}>
                        <div style={{color: '#ffd700', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <span style={{height: '8px', width: '8px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981'}}></span> 
                            ACTIVE NODE
                        </div>
                        <h3 style={{color: '#fff', marginBottom: '5px', fontSize: '1.5rem'}}>{node.name}</h3>
                        <p style={{color: '#9ca3af', fontSize: '0.85rem', marginBottom: '30px', letterSpacing: '1px', textTransform: 'uppercase'}}>
                            {node.flag} {node.location}
                        </p>
                        <div style={{borderTop: '1px solid #374151', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <span style={{color: '#6b7280', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px'}}>LATENCY</span>
                            <span style={{color: '#6366f1', fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold'}}>{node.latency}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer style={{textAlign: 'center', padding: '80px 20px', borderTop: '1px solid #1f2937', background: '#050505'}}>
        <h4 style={{color: '#ffd700', fontSize: '0.7rem', letterSpacing: '4px', marginBottom: '30px'}}>CONTACT COMMAND</h4>
        <a href="mailto:quantumpaysec@gmail.com" style={{color: 'white', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', borderBottom: '2px solid #374151', paddingBottom: '5px'}}>
            quantumpaysec(at)gmail.com
        </a>
        <div style={{marginTop: '60px', color: '#4b5563', fontSize: '0.7rem', letterSpacing: '2px'}}>
            © 2026 QUANTUMPAY SOVEREIGN INFRASTRUCTURE
        </div>
      </footer>
    </div>
  );
}
