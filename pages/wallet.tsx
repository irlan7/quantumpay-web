import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

// --- 1. IMPORT KAMUS BAHASA (Update Hari Ini) ---
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

export default function WalletUI() {
  const router = useRouter();
  const { locale } = router;
  const tObject: any = { en, id, de, nl, pt, ko, ar };
  const dict = tObject[locale as string] || en;

  // --- 2. STATES (Tetap Pertahankan Logika Backend Anda) ---
  const [wallet, setWallet] = useState<any>(null);
  const [balance, setBalance] = useState<number>(0);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mnemonic, setMnemonic] = useState<string | null>(null);

  const t = (section: string, key: string) => {
    try { return dict[section][key] || key; } catch (e) { return key; }
  };

  const changeLanguage = (e: any) => {
    const newLocale = e.target.value;
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  // --- 3. LOGIKA BACKEND (Sesuai Screenshot 5f2c & 45d5) ---
  useEffect(() => {
    const savedData = localStorage.getItem('quantum_wallet');
    if (savedData) {
      const parsedWallet = JSON.parse(savedData);
      setWallet(parsedWallet);
      fetchBalance(parsedWallet.address);
    }
  }, []);

  const fetchBalance = async (addr: string) => {
    try {
      const res = await fetch(`http://localhost:8080/balance?address=${addr}`);
      const data = await res.json();
      setBalance(data.balance);
    } catch (e) { console.error("Gagal load saldo"); }
  };

  const createRealWallet = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:8080/wallet/create');
      const data = await res.json();
      setWallet(data);
      localStorage.setItem('quantum_wallet', JSON.stringify(data));
      setMnemonic(data.mnemonic);
    } catch (err) { alert("Server Node Mati!"); }
    setIsLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0b0f14', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <Head>
        <title>Wallet | QuantumPay Network</title>
      </Head>

      {/* --- NAVBAR TERPADU (Logo 120px & Menu Lengkap) --- */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', borderBottom: '1px solid #1f2937' }}>
        <Link href="/">
          <img src="/logo.png" alt="QuantumPay" style={{ height: '120px', width: 'auto', cursor: 'pointer' }} />
        </Link>

        <div style={{ display: 'flex', gap: '25px', fontSize: '1rem' }}>
          <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('navbar', 'home')}</Link>
          <Link href="/explorer" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('navbar', 'explorer')}</Link>
          <Link href="/run-node" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('navbar', 'validators')}</Link>
          <Link href="/contact" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('navbar', 'contact')}</Link>
          <Link href="/legal" style={{ color: '#9ca3af', textDecoration: 'none' }}>{t('navbar', 'legal')}</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <select onChange={changeLanguage} value={locale} style={{ background: '#1f2937', color: 'white', border: '1px solid #374151', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}>
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>
        </div>
      </nav>

      {/* --- DASHBOARD --- */}
      <main style={{ padding: '60px 5%', textAlign: 'center' }}>
        {!wallet ? (
          <div style={{ maxWidth: '500px', margin: '0 auto', background: '#111827', padding: '50px', borderRadius: '30px', border: '1px solid #1f2937' }}>
            <h2 style={{ marginBottom: '20px' }}>Belum Ada Wallet</h2>
            <button onClick={createRealWallet} disabled={isLoading} style={{ width: '100%', padding: '18px', background: '#6366f1', color: '#fff', borderRadius: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                {isLoading ? 'Memproses...' : 'Buat Wallet Baru ✨'}
            </button>
          </div>
        ) : (
          <div style={{ background: '#111827', padding: '40px', borderRadius: '30px', maxWidth: '600px', margin: '0 auto', border: '1px solid #6366f1' }}>
             <p style={{ color: '#6366f1', fontWeight: 'bold', fontSize: '0.8rem' }}>SALDO AKTIF</p>
             <h1 style={{ fontSize: '3rem', margin: '15px 0' }}>{balance.toFixed(2)} QPAY</h1>
             <p style={{ background: '#0a0d12', padding: '10px', borderRadius: '8px', fontSize: '0.7rem', fontFamily: 'monospace' }}>{wallet.address}</p>
          </div>
        )}
      </main>
    </div>
  );
}
