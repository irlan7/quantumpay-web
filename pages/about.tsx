import Head from 'next/head';

export default function About() {
  // Inline styles untuk memastikan tampilan tetap konsisten tanpa Tailwind
  const containerStyle: React.CSSProperties = {
    backgroundColor: '#05070a',
    color: '#ffffff',
    minHeight: '100vh',
    padding: '60px 20px',
    fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    lineHeight: '1.6',
  };

  const contentWrapper: React.CSSProperties = {
    maxWidth: '1000px',
    margin: '0 auto',
  };

  const headerStyle: React.CSSProperties = {
    borderBottom: '1px solid #1e293b',
    paddingBottom: '40px',
    marginBottom: '50px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#3b82f6',
    letterSpacing: '-0.02em',
    marginBottom: '20px',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '40px',
  };

  const cardContainer: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '30px',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#0f172a',
    padding: '25px',
    borderRadius: '8px',
    border: '1px solid #1e293b',
  };

  const labelStyle: React.CSSProperties = {
    color: '#3b82f6',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      <Head>
        <title>About Us | QuantumPay Chain</title>
        <meta name="description" content="Official technical overview of the QuantumPay Blockchain Network." />
      </Head>

      <div style={contentWrapper}>
        {/* Header Section */}
        <header style={headerStyle}>
          <h1 style={titleStyle}>QuantumPay: Sovereign Blockchain Architecture</h1>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '800px' }}>
            Membangun infrastruktur Layer-1 yang dirancang untuk kedaulatan digital nasional 
            dan kepatuhan institusional global.
          </p>
        </header>

        {/* Vision Section */}
        <section style={sectionStyle}>
          <h2 style={{ color: '#f8fafc', marginBottom: '15px' }}>Filosofi Generasi 4.5</h2>
          <p style={{ color: '#cbd5e1' }}>
            QuantumPay (quantumpaychain.org) beroperasi pada titik temu antara inovasi teknis dan stabilitas hukum. 
            Kami memahami bahwa adopsi blockchain skala luas memerlukan transparansi bagi regulator tanpa 
            mengorbankan integritas data dan desentralisasi jaringan.
          </p>
        </section>

        {/* Strategic Pillars */}
        <div style={cardContainer}>
          <div style={cardStyle}>
            <span style={labelStyle}>Teknokratis</span>
            <h3 style={{ marginBottom: '10px' }}>Finalitas Deterministik</h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
              Konsensus PoS + BFT kami memastikan tidak ada pembatalan transaksi (reorg), 
              memberikan kepastian hukum yang mutlak bagi institusi finansial.
            </p>
          </div>

          <div style={cardStyle}>
            <span style={labelStyle}>Regulasi</span>
            <h3 style={{ marginBottom: '10px' }}>Legal-Tech Ready</h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
              Arsitektur berbasis identitas yang memungkinkan integrasi AML/KYC tingkat protokol 
              untuk mendukung kepatuhan di berbagai yurisdiksi internasional.
            </p>
          </div>

          <div style={cardStyle}>
            <span style={labelStyle}>Ekonomi</span>
            <h3 style={{ marginBottom: '10px' }}>Efisiensi Nasional</h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
              Mengurangi hambatan ekonomi dengan biaya transaksi yang stabil dan konsumsi energi 
              yang sangat rendah (ESG Compliant).
            </p>
          </div>
        </div>

        {/* Footer/Contact CTA */}
        <footer style={{ marginTop: '80px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
          <p>© 2026 QuantumPay Project. Distributed under the principles of Sovereign Technology.</p>
          <p style={{ marginTop: '10px', color: '#3b82f6' }}>quantumpaychain.org</p>
        </footer>
      </div>
    </div>
  );
}
