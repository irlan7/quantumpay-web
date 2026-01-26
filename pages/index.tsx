import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/layout/Navbar'

const Home: NextPage = () => {
  return (
    <div style={{ backgroundColor: '#05070a', color: '#ffffff', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Head>
        <title>QuantumPay | Sovereign Layer-1 Network</title>
      </Head>
      
      <Navbar />

      <main className="container" style={{ paddingTop: '100px' }}>
        <section style={{ textAlign: 'center', padding: '80px 20px' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: '900', letterSpacing: '-0.05em', marginBottom: '24px' }}>
            QuantumPay Blockchain
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.4rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
            Infrastruktur kedaulatan digital berbasis Layer-1 dengan konsensus BFT berkecepatan tinggi. 
            <span style={{ color: '#3b82f6', display: 'block', marginTop: '10px', fontWeight: 'bold' }}>
              Chain ID: 77077 [FROZEN]
            </span>
          </p>

          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {/* Perbaikan: Menghapus tag <a> manual untuk menghindari Runtime Error */}
            <Link href="/explorer" className="button" style={{ 
                backgroundColor: '#3b82f6', color: 'white', padding: '18px 36px', 
                borderRadius: '12px', fontWeight: '800', textDecoration: 'none',
                boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)'
              }}>
                Explore the Network
            </Link>

            <Link href="/run-node" className="button secondary" style={{ 
                border: '1px solid #334155', color: '#f1f5f9', padding: '18px 36px', 
                borderRadius: '12px', fontWeight: '800', textDecoration: 'none'
              }}>
                Run a Node
            </Link>
          </div>
        </section>

        {/* Technical Stats Section */}
        <section style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '24px', padding: '40px 20px' 
        }}>
          <div style={{ padding: '32px', border: '1px solid #1e293b', borderRadius: '16px', background: 'rgba(15, 23, 42, 0.5)' }}>
            <h3 style={{ color: '#3b82f6', marginBottom: '12px' }}>Network Finality</h3>
            <p style={{ color: '#94a3b8' }}>Konfirmasi blok instan dalam hitungan detik, dioptimalkan untuk skalabilitas sistem pembayaran global.</p>
          </div>
          <div style={{ padding: '32px', border: '1px solid #1e293b', borderRadius: '16px', background: 'rgba(15, 23, 42, 0.5)' }}>
            <h3 style={{ color: '#3b82f6', marginBottom: '12px' }}>Native Core</h3>
            <p style={{ color: '#94a3b8' }}>Dibangun menggunakan Go-Lang v1.1 untuk performa concurrency maksimal dan penggunaan memori yang efisien.</p>
          </div>
          <div style={{ padding: '32px', border: '1px solid #1e293b', borderRadius: '16px', background: 'rgba(15, 23, 42, 0.5)' }}>
            <h3 style={{ color: '#3b82f6', marginBottom: '12px' }}>Secure Nodes</h3>
            <p style={{ color: '#94a3b8' }}>Keamanan tingkat tinggi dengan aturan firewall yang diperketat untuk melindungi integritas validator.</p>
          </div>
        </section>
      </main>

      <footer style={{ textAlign: 'center', padding: '60px 0', borderTop: '1px solid #1e293b', marginTop: '60px' }}>
        <p style={{ color: '#475569', fontSize: '0.9rem' }}>
          © 2026 QuantumPay Network – Distributed Ledger Technology
        </p>
      </footer>
    </div>
  )
}

export default Home
