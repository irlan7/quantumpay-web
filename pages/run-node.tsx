import React from 'react';
import Head from 'next/head';

export default function RunNode() {
  const theme = {
    bg: '#05070a',
    card: '#0f172a',
    accent: '#3b82f6',
    codeBg: '#000000',
    textMain: '#ffffff',
    textMuted: '#94a3b8'
  };

  const codeBox: React.CSSProperties = {
    backgroundColor: theme.codeBg,
    padding: '15px',
    borderRadius: '6px',
    color: '#10b981',
    fontSize: '0.9rem',
    overflowX: 'auto',
    border: '1px solid #1e293b',
    marginTop: '10px'
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.textMain, minHeight: '100vh', padding: '60px 20px', fontFamily: 'monospace' }}>
      <Head>
        <title>Run a Node | QuantumPay Network</title>
      </Head>

      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        <h1 style={{ color: theme.accent }}>JOIN_THE_DECENTRALIZATION</h1>
        <p style={{ color: theme.textMuted }}>Ikuti panduan teknis berikut untuk menjalankan validator node pada Chain ID 77001.</p>

        <section style={{ marginTop: '40px' }}>
          <h3>1. PERSYARATAN_HARDWARE</h3>
          <ul style={{ color: theme.textMuted, fontSize: '0.9rem' }}>
            <li>CPU: 2 Cores (Minimal)</li>
            <li>RAM: 4GB (Optimasi mesin Anda saat ini hanya menggunakan 5% RAM)</li>
            <li>Storage: 40GB SSD</li>
            <li>OS: Ubuntu 22.04 LTS / 24.04 LTS</li>
          </ul>
        </section>

        <section style={{ marginTop: '40px' }}>
          <h3>2. INSTALASI_NODE</h3>
          <p style={{ fontSize: '0.9rem' }}>Clone repositori core kami dan lakukan kompilasi:</p>
          <div style={codeBox}>
            git clone https://github.com/quantumpay/quantumpay-go<br/>
            cd quantumpay-go<br/>
            go build -o quantumpay-node
          </div>
        </section>

        <section style={{ marginTop: '40px' }}>
          <h3>3. KONFIGURASI_GENESIS</h3>
          <p style={{ fontSize: '0.9rem' }}>Pastikan Hash Genesis Anda cocok dengan Mainnet:</p>
          <div style={{ ...codeBox, color: '#fbbf24' }}>
            GENESIS_HASH: acc395137e5d0c28c609d011ea99d89405f07009c0bbf8933711e1a7f184edc6
          </div>
        </section>

        <section style={{ marginTop: '40px' }}>
          <h3>4. PEERING_KE_MAINNET</h3>
          <p style={{ fontSize: '0.9rem' }}>Hubungkan node Anda ke Bootnode utama (VPS 1):</p>
          <div style={codeBox}>
            ./quantumpay-node --peer /ip4/15.235.192.4/tcp/8080
          </div>
        </section>

        <div style={{ marginTop: '60px', padding: '20px', border: `1px dashed ${theme.accent}`, textAlign: 'center' }}>
          <p>Butuh akses Validator Key? Hubungi Tim Keamanan:</p>
          <a href="mailto:quantumpaysec@gmail.com" style={{ color: theme.accent, textDecoration: 'none', fontWeight: 'bold' }}>quantumpaysec@gmail.com</a>
        </div>
      </div>
    </div>
  );
}
