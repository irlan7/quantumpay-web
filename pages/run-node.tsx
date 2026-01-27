import React from 'react';
import Head from 'next/head';

export default function RunNode() {
  // Data Teknis Terverifikasi (Audit 27 Jan 2026)
  const networkData = {
    chainId: "77077",
    genesisHash: "0x1d58599424f1159828236111f1f9e83063f66345091a99540c4989679269491a",
    installCommand: "curl -sSL https://raw.githubusercontent.com/irlan7/quantumpay-go/master/install.sh | bash",
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#05070a',
    color: '#ffffff',
    minHeight: '100vh',
    padding: '60px 20px',
    fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  };

  const mainWrapperStyle: React.CSSProperties = {
    maxWidth: '900px',
    margin: '0 auto',
  };

  const codeBoxStyle: React.CSSProperties = {
    backgroundColor: '#0f172a',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #1e293b',
    fontFamily: 'monospace',
    marginBottom: '30px',
    position: 'relative',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '40px',
    fontSize: '0.9rem',
  };

  return (
    <div style={containerStyle}>
      <Head>
        <title>Run a Node | QuantumPay Network</title>
        <meta name="description" content="Bergabung dengan jaringan QuantumPay sebagai validator." />
      </Head>

      <div style={mainWrapperStyle}>
        <header style={{ marginBottom: '50px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#3b82f6' }}>Join the Network</h1>
          <p style={{ color: '#94a3b8' }}>
            Ikuti panduan di bawah ini untuk menginstal dan menjalankan validator QuantumPay Anda sendiri.
          </p>
        </header>

        {/* Section Hardware Requirements */}
        <section style={{ marginBottom: '50px' }}>
          <h3 style={{ borderBottom: '1px solid #1e293b', paddingBottom: '10px', marginBottom: '20px' }}>
            Hardware Requirements
          </h3>
          <table style={tableStyle}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#64748b' }}>
                <th style={{ padding: '12px 0' }}>Spec</th>
                <th style={{ padding: '12px 0' }}>Minimum Requirement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px 0', borderBottom: '1px solid #1e293b' }}>CPU</td>
                <td style={{ padding: '12px 0', borderBottom: '1px solid #1e293b' }}>2 Cores (Minimum)</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 0', borderBottom: '1px solid #1e293b' }}>RAM</td>
                <td style={{ padding: '12px 0', borderBottom: '1px solid #1e293b' }}>4GB (Usage optimized ~5%)</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 0', borderBottom: '1px solid #1e293b' }}>Storage</td>
                <td style={{ padding: '12px 0', borderBottom: '1px solid #1e293b' }}>40GB SSD</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 0', borderBottom: '1px solid #1e293b' }}>OS</td>
                <td style={{ padding: '12px 0', borderBottom: '1px solid #1e293b' }}>Ubuntu 22.04 LTS / 24.04 LTS</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Section 1: Automated Installation */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#60a5fa', marginBottom: '15px' }}>1. Automated Installation (Recommended)</h3>
          <div style={codeBoxStyle}>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '10px' }}>
              # Jalankan perintah ini di terminal Ubuntu Anda untuk instalasi otomatis v1.1
            </p>
            <code style={{ color: '#4ade80', wordBreak: 'break-all', fontSize: '1rem' }}>
              {networkData.installCommand}
            </code>
          </div>
        </section>

        {/* Section 2: Genesis Verification */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#60a5fa', marginBottom: '15px' }}>2. Genesis Verification</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '10px', color: '#94a3b8' }}>
            Pastikan Hash Genesis Anda cocok dengan Mainnet setelah sinkronisasi dimulai:
          </p>
          <div style={{ 
            backgroundColor: 'rgba(251, 146, 60, 0.05)', 
            padding: '20px', 
            borderRadius: '8px',
            borderLeft: '4px solid #fb923c',
            fontSize: '0.85rem',
            fontFamily: 'monospace',
            wordBreak: 'break-all',
            color: '#fb923c'
          }}>
            <strong>GENESIS_HASH:</strong> {networkData.genesisHash}
          </div>
          <p style={{ marginTop: '15px', fontSize: '0.8rem', color: '#64748b' }}>
            Gunakan perintah <code>pm2 logs qp-node</code> untuk memverifikasi hash secara lokal.
          </p>
        </section>

        {/* Section 3: Network Identity */}
        <section style={{ marginBottom: '40px', padding: '20px', backgroundColor: '#0f172a', borderRadius: '12px' }}>
          <h4 style={{ marginBottom: '10px' }}>Network Identity</h4>
          <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem' }}>
            <div>
              <span style={{ color: '#64748b' }}>Chain ID:</span> 
              <span style={{ color: '#22c55e', marginLeft: '5px' }}>{networkData.chainId} [FROZEN]</span>
            </div>
            <div>
              <span style={{ color: '#64748b' }}>Status:</span> 
              <span style={{ color: '#3b82f6', marginLeft: '5px' }}>Mainnet-Alpha v1.1</span>
            </div>
          </div>
        </section>

        <footer style={{ marginTop: '80px', textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
          © 2026 QuantumPay Foundation. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}
