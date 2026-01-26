import Head from 'next/head';

export default function Features() {
  const containerStyle: React.CSSProperties = {
    backgroundColor: '#05070a',
    color: '#ffffff',
    minHeight: '100vh',
    padding: '60px 20px',
    fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    lineHeight: '1.6',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    padding: '30px',
    marginBottom: '20px',
  };

  const statusBox: React.CSSProperties = {
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    border: '1px solid #3b82f6',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '30px',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    marginTop: '40px',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
    color: '#cbd5e1',
  };

  return (
    <div style={containerStyle}>
      <Head>
        <title>Technical Specifications | QuantumPay Chain</title>
        <meta name="description" content="Detailed technical features of QuantumPay Blockchain Gen 4.5" />
      </Head>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.8rem', color: '#3b82f6', marginBottom: '10px' }}>Technical Architecture</h1>
          <p style={{ color: '#94a3b8' }}>Spesifikasi Protokol QuantumPay Mainnet (Chain ID 77001)</p>
        </header>

        {/* Core Engine Section */}
        <section style={cardStyle}>
          <h2 style={{ color: '#f8fafc', marginBottom: '15px' }}>Core Engine & Consensus</h2>
          <p>
            QuantumPay dibangun menggunakan bahasa <strong>Go (Golang)</strong> untuk performa konkurensi tingkat tinggi. 
            Menggunakan konsensus <strong>Hybrid PoS + BFT</strong>, jaringan memastikan finalitas transaksi 
            deterministik (irreversible) dalam hitungan detik setelah blok diproduksi.
          </p>
        </section>

        {/* Integration Status (The "Under Construction" Part) */}
        <section style={statusBox}>
          <h3 style={{ color: '#3b82f6', fontSize: '1.1rem', marginBottom: '15px' }}>🏗️ System Integration Progress</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div>
              <strong style={{ display: 'block', color: '#f8fafc' }}>Explore the Network</strong>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Status: <span style={{ color: '#fbbf24' }}>Read-Only Mode</span>. <br />
                Sedang dalam proses pengintegrasian gRPC dengan Next.js untuk data real-time.
              </p>
            </div>
            <div>
              <strong style={{ display: 'block', color: '#f8fafc' }}>Run a Node</strong>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Status: <span style={{ color: '#fbbf24' }}>Documentation Stage</span>. <br />
                Automated Node Deployer sedang dikembangkan. Gunakan manual setup via Go core.
              </p>
            </div>
          </div>
        </section>

        {/* Network Identity Table */}
        <table style={tableStyle}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #1e293b' }}>
              <th style={{ padding: '12px' }}>Network Parameter</th>
              <th style={{ padding: '12px' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #0f172a' }}>
              <td style={{ padding: '12px' }}>Network Name</td>
              <td style={{ padding: '12px' }}>QuantumPay Mainnet</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #0f172a' }}>
              <td style={{ padding: '12px' }}>Chain ID</td>
              <td style={{ padding: '12px', color: '#10b981' }}>77001 (FINAL & FROZEN)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #0f172a' }}>
              <td style={{ padding: '12px' }}>Native Coin</td>
              <td style={{ padding: '12px' }}>$QP</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #0f172a' }}>
              <td style={{ padding: '12px' }}>Genesis Hash</td>
              <td style={{ padding: '12px', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                acc395137e5d0c28c609d011ea99d89405f07009c0bbf8933711e1a7f184edc6
              </td>
            </tr>
          </tbody>
        </table>

        {/* Security & Scalability */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '40px' }}>
          <div style={cardStyle}>
            <h3 style={{ color: '#3b82f6', marginBottom: '10px' }}>Sovereign Security</h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
              Arsitektur "Security by Design" dengan mekanisme slashing otomatis untuk validator 
              yang mencoba melakukan double-signing atau offline dalam waktu lama.
            </p>
          </div>
          <div style={cardStyle}>
            <h3 style={{ color: '#3b82f6', marginBottom: '10px' }}>Eco-Efficiency</h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
              Optimasi pada level protokol Go memastikan konsumsi energi minimal, 
              memenuhi standar ESG untuk adopsi institusional dan nasional.
            </p>
          </div>
        </div>

        <footer style={{ marginTop: '80px', textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
          Mainnet Launch: 16 January 2026 | Distributed Protocol v1.1
        </footer>
      </div>
    </div>
  );
}
