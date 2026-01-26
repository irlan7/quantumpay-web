import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/layout/Navbar'

const Contact: NextPage = () => {
  return (
    <div style={{ backgroundColor: '#05070a', color: '#ffffff', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Head>
        <title>Contact & Transparency | QuantumPay Network</title>
      </Head>
      
      <Navbar />

      <main className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
        <div style={{ marginBottom: '60px' }}>
          <span style={{ 
            backgroundColor: '#1e293b', color: '#3b82f6', padding: '8px 20px', 
            borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #334155' 
          }}>
            SINGLE SOURCE OF TRUTH
          </span>
          <h1 style={{ fontSize: '3rem', fontWeight: '850', marginTop: '20px' }}>Hubungi QuantumPay</h1>
          <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
            Saluran komunikasi resmi dan keterbukaan kode sumber untuk integritas jaringan Layer-1.
          </p>
        </div>

        <div style={{ 
          maxWidth: '1000px', margin: '0 auto', display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', padding: '0 20px' 
        }}>
          {/* GitHub - Single Source of Truth */}
          <div style={{ padding: '40px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '16px', border: '1px solid #3b82f6' }}>
            <h3 style={{ color: '#3b82f6', marginBottom: '15px' }}>Open Source Codebase</h3>
            <a 
              href="https://github.com/irlan7/quantumpay-go" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff', textDecoration: 'none' }}
            >
              github.com/irlan7/quantumpay-go
            </a>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '15px' }}>
              Seluruh logika protokol, konsensus, dan aturan jaringan bersifat publik dan dapat diaudit oleh siapa saja.
            </p>
          </div>

          {/* Official X (Twitter) */}
          <div style={{ padding: '40px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '16px', border: '1px solid #1e293b' }}>
            <h3 style={{ color: '#3b82f6', marginBottom: '15px' }}>Official X Channel</h3>
            <a 
              href="https://x.com/quantumpaychain" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', textDecoration: 'none' }}
            >
              @quantumpaychain
            </a>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '15px' }}>
              Media informasi utama untuk pengumuman teknis dan pembaruan ekosistem secara real-time.
            </p>
          </div>

          {/* Technical Email */}
          <div style={{ padding: '40px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '16px', border: '1px solid #1e293b' }}>
            <h3 style={{ color: '#3b82f6', marginBottom: '15px' }}>Technical Support</h3>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#f1f5f9' }}>
              quantumpaysec@gmail.com
            </p>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '15px' }}>
              Saluran bantuan teknis khusus untuk validator node dan isu keamanan protokol.
            </p>
          </div>
        </div>
      </main>

      <footer style={{ marginTop: '100px', paddingBottom: '40px', textAlign: 'center', opacity: 0.5 }}>
        <p>© 2026 QuantumPay Network – Transparent & Open Infrastructure</p>
      </footer>
    </div>
  )
}

export default Contact
