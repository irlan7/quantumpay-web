import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function QuantumScan() {
  const [searchHash, setSearchHash] = useState('');
  const [txData, setTxData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if(!searchHash) return;
    setError('');
    setTxData(null);

    try {
      // Panggil API Backend yang baru kita buat
      const res = await fetch(`http://localhost:8080/tx/detail?hash=${searchHash}`);
      const data = await res.json();

      if (data.error) {
        setError("Transaksi tidak ditemukan. Pastikan Hash benar.");
      } else {
        setTxData(data);
      }
    } catch (err) {
      setError("Gagal koneksi ke server.");
    }
  };

  return (
    <div style={{minHeight: '100vh', background: '#0b0f14', color: '#fff', fontFamily: 'Inter, sans-serif', padding: '2rem'}}>
      <Head><title>QuantumScan | Blockchain Explorer</title></Head>

      <div className="container" style={{maxWidth: '800px', margin: '0 auto'}}>
        
        {/* HEADER */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem'}}>
            <h1 style={{margin: 0, fontSize: '1.5rem'}}>QuantumScan 🔍</h1>
            <Link href="/" style={{color: '#9ca3af', textDecoration: 'none'}}>← Back to Home</Link>
        </div>

        {/* SEARCH BOX */}
        <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: '2rem', marginBottom: '1rem'}}>QuantumPay Blockchain Explorer</h2>
            <div style={{display: 'flex', gap: '10px', maxWidth: '600px', margin: '0 auto'}}>
                <input 
                    type="text" 
                    placeholder="Search by Tx Hash (0x...)" 
                    value={searchHash}
                    onChange={(e) => setSearchHash(e.target.value)}
                    style={{flex: 1, padding: '15px', borderRadius: '8px', border: '1px solid #374151', background: '#1f2937', color: 'white', fontSize: '1rem'}}
                />
                <button 
                    onClick={handleSearch}
                    style={{padding: '0 25px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}
                >
                    SEARCH
                </button>
            </div>
        </div>

        {/* HASIL PENCARIAN */}
        {error && <div style={{textAlign: 'center', color: '#ef4444', marginTop: '20px'}}>{error}</div>}

        {txData && (
            <div style={{background: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '2rem', marginTop: '20px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #374151'}}>
                    <span style={{fontSize: '2rem'}}>📄</span>
                    <div>
                        <div style={{fontSize: '0.9rem', color: '#9ca3af'}}>Transaction Hash</div>
                        <div style={{fontFamily: 'monospace', color: '#fff', wordBreak: 'break-all'}}>{txData.tx_hash}</div>
                    </div>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                    <div>
                        <div style={{color: '#9ca3af', fontSize: '0.9rem'}}>Status</div>
                        <div style={{color: '#10b981', fontWeight: 'bold'}}>✅ {txData.status}</div>
                    </div>
                    <div>
                        <div style={{color: '#9ca3af', fontSize: '0.9rem'}}>Timestamp</div>
                        <div>{new Date(txData.timestamp).toLocaleString()}</div>
                    </div>
                    <div>
                        <div style={{color: '#9ca3af', fontSize: '0.9rem'}}>From</div>
                        <div style={{fontFamily: 'monospace', color: '#6366f1', fontSize: '0.9rem'}}>{txData.from.substring(0, 15)}...</div>
                    </div>
                    <div>
                        <div style={{color: '#9ca3af', fontSize: '0.9rem'}}>To</div>
                        <div style={{fontFamily: 'monospace', color: '#6366f1', fontSize: '0.9rem'}}>{txData.to.substring(0, 15)}...</div>
                    </div>
                    <div style={{gridColumn: 'span 2', background: 'rgba(99, 102, 241, 0.1)', padding: '15px', borderRadius: '8px', marginTop: '10px'}}>
                        <div style={{color: '#9ca3af', fontSize: '0.9rem'}}>Value Transfer</div>
                        <div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>{txData.amount} QPY</div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
}
