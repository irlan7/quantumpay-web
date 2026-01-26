import React from 'react';
import Head from 'next/head'; // Menambahkan import Head yang sempat hilang

export default function Features() {
  // Data Teknis Terverifikasi Audit 27 Jan 2026
  const networkData = {
    name: "QuantumPay Mainnet",
    chainId: "77077", // Sesuai genesis.json
    nativeCoin: "QPAY", // Sesuai PROJECT_IDENTITY
    genesisHash: "0x1d58599424f1159828236111f1f9e83063f66345091a99540c4989679269491a", // Hash Panjang Final
    status: "FINAL & FROZEN"
  };

  // Styles berdasarkan struktur file Anda (2fa22a17)
  const containerStyle: React.CSSProperties = {
    backgroundColor: '#05070a', // Sesuai screenshot UI gelap
    color: '#ffffff',
    minHeight: '100vh',
    padding: '60px 20px',
    fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    lineHeight: '1.6',
  };

  const cardContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto 60px auto',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    padding: '30px',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    marginTop: '40px',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
    maxWidth: '1200px',
    margin: '40px auto',
  };

  const cellStyle: React.CSSProperties = {
    padding: '20px 0',
    borderBottom: '1px solid #1e293b',
  };

  return (
    <div style={containerStyle}>
      {/* Head Component untuk SEO dan Title */}
      <Head>
        <title>QuantumPay | Sovereign Layer-1 Network</title>
        <meta name="description" content="Infrastruktur kedaulatan digital berbasis Layer-1" />
      </Head>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={cardContainerStyle}>
          <div style={cardStyle}>
            <h3 style={{ color: '#3b82f6', marginBottom: '15px' }}>Explore the Network</h3>
            <p style={{ color: '#fb923c', fontSize: '0.85rem', marginBottom: '10px' }}>Status: Read-Only Mode.</p>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              Sedang dalam proses pengintegrasian gRPC dengan Next.js untuk data real-time.
            </p>
          </div>

          <div style={cardStyle}>
            <h3 style={{ color: '#3b82f6', marginBottom: '15px' }}>Run a Node</h3>
            <p style={{ color: '#fb923c', fontSize: '0.85rem', marginBottom: '10px' }}>Status: Documentation Stage.</p>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              Automated Node Deployer sedang dikembangkan. Gunakan manual setup via Go core.
            </p>
          </div>
        </div>

        {/* Technical Parameters Table */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{ ...cellStyle, textAlign: 'left', color: '#64748b' }}>Network Parameter</th>
              <th style={{ ...cellStyle, textAlign: 'left', color: '#64748b' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...cellStyle, fontWeight: 'bold' }}>Network Name</td>
              <td style={cellStyle}>{networkData.name}</td>
            </tr>
            <tr>
              <td style={{ ...cellStyle, fontWeight: 'bold' }}>Chain ID</td>
              <td style={{ ...cellStyle, color: '#22c55e', fontWeight: 'bold' }}>
                {networkData.chainId} ({networkData.status})
              </td>
            </tr>
            <tr>
              <td style={{ ...cellStyle, fontWeight: 'bold' }}>Native Coin</td>
              <td style={{ ...cellStyle, color: '#60a5fa', fontFamily: 'monospace' }}>
                {networkData.nativeCoin}
              </td>
            </tr>
            <tr>
              <td style={{ ...cellStyle, fontWeight: 'bold' }}>Genesis Hash</td>
              <td style={{ ...cellStyle, fontSize: '0.75rem', fontFamily: 'monospace', color: '#cbd5e1', wordBreak: 'break-all' }}>
                {networkData.genesisHash}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Footer Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '60px' }}>
          <div>
            <h4 style={{ color: '#60a5fa', marginBottom: '15px' }}>Sovereign Security</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              Arsitektur "Security by Design" dengan mekanisme slashing otomatis untuk validator 
              yang mencoba melakukan double-signing.
            </p>
          </div>
          <div style={{ backgroundColor: 'rgba(30, 58, 138, 0.2)', padding: '25px', borderRadius: '15px' }}>
            <h4 style={{ color: '#60a5fa', marginBottom: '15px' }}>Eco-Efficiency</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              Optimasi pada level protokol Go memastikan konsumsi energi minimal untuk adopsi institusional.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
