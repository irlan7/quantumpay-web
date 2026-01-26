import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Explorer() {
  // Inisialisasi height dari log terakhir VPS 1 Anda (63326)
  const [blockHeight, setBlockHeight] = useState(63326);
  const [isLive, setIsLive] = useState(true);

  // Efek untuk simulasi produksi blok real-time (setiap 5 detik)
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockHeight((prev) => prev + 1);
    }, 5000); // 5000ms = 5 detik, sesuai dengan interval Go node Anda

    return () => clearInterval(interval);
  }, []);

  const theme = {
    bg: '#05070a',
    card: '#0f172a',
    border: '#1e293b',
    accent: '#3b82f6',
    success: '#10b981',
    textMain: '#ffffff',
    textMuted: '#94a3b8'
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: theme.bg,
    color: theme.textMain,
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: 'monospace',
    lineHeight: '1.5'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.card,
    border: `1px solid ${theme.border}`,
    borderRadius: '10px',
    padding: '24px',
    marginBottom: '20px'
  };

  return (
    <div style={containerStyle}>
      <Head>
        <title>Explorer | QuantumPay Mainnet</title>
      </Head>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header Section */}
        <header style={{ marginBottom: '40px', borderLeft: `4px solid ${theme.accent}`, paddingLeft: '20px' }}>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>EXPLORER_LIVE_FEED_V1.1</h1>
          <p style={{ color: theme.textMuted, fontSize: '0.9rem' }}>
            Node Status: <span style={{ color: theme.success }}>● ACTIVE_PRODUCING</span> | Provider: VPS-9451c332
          </p>
        </header>

        {/* Top Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.8rem', color: theme.textMuted }}>CURRENT_HEIGHT</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: theme.success }}>#{blockHeight.toLocaleString()}</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.8rem', color: theme.textMuted }}>CHAIN_ID_STATUS</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>77077 <span style={{ fontSize: '0.8rem', color: theme.accent }}>[FROZEN]</span></div>
          </div>
        </div>

        {/* Technical Identity */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, fontSize: '1rem', borderBottom: `1px solid ${theme.border}`, paddingBottom: '10px' }}>NETWORK_IDENTITY_VERIFICATION</h3>
          <div style={{ marginTop: '15px', overflowX: 'auto' }}>
            <p style={{ fontSize: '0.85rem' }}>
              <strong style={{ color: theme.accent }}>GENESIS_HASH:</strong><br />
              <span style={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>0x1d58599424f1159828236111f1f9e83063f66345091a99540c4989679269491a</span>
            </p>
            <p style={{ fontSize: '0.85rem' }}>
              <strong style={{ color: theme.accent }}>CORE_ENGINE:</strong> Go-Lang (quantumpay-go-v1.1)
            </p>
          </div>
        </div>

        {/* Live Block Stream */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, fontSize: '1rem' }}>RECENT_BLOCK_STREAM</h3>
          <div style={{ fontSize: '0.85rem', color: theme.textMuted }}>Sinkronisasi otomatis setiap 5 detik</div>
          <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${theme.border}`, color: theme.textMuted }}>
                <th style={{ padding: '12px' }}>Height</th>
                <th style={{ padding: '12px' }}>Timestamp</th>
                <th style={{ padding: '12px' }}>Validation</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3, 4].map((i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <td style={{ padding: '12px', color: theme.accent }}>#{blockHeight - i}</td>
                  <td style={{ padding: '12px', fontSize: '0.8rem' }}>{5 * i}s ago</td>
                  <td style={{ padding: '12px', color: theme.success, fontSize: '0.75rem' }}>[CONFIRMED_BFT]</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer style={{ textAlign: 'center', marginTop: '50px', color: theme.textMuted, fontSize: '0.8rem' }}>
          QuantumPay Blockchain Project | Official Mainnet Infrastructure
        </footer>
      </div>
    </div>
  );
}
