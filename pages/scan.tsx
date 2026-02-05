import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function QuantumScan() {
  // 1. DATA STATIS (MOCKUP) - AGAR TIDAK ERROR "404" SAAT DIBUKA
  // Kita gunakan data ini dulu sampai backend explorer siap 100%.
  const [stats] = useState({ 
      height: 12845, 
      totalTx: 342, 
      supply: "21,000,000" 
  });
  
  const [txs] = useState([
      { hash: "0x7f49...a1b2", block: 12845, from: "0x6d04...7040", to: "0x02e0...cbc", value: "10.00", time: "2 mins ago" },
      { hash: "0x3c21...99e1", block: 12844, from: "0x1234...abcd", to: "0x6d04...7040", value: "50.00", time: "5 mins ago" },
      { hash: "0x1a88...55f2", block: 12843, from: "0x9876...xyz1", to: "0x1234...abcd", value: "1.50", time: "10 mins ago" },
      { hash: "0x99cc...22a1", block: 12841, from: "0xaaaa...bbbb", to: "0xcccc...dddd", value: "100.00", time: "15 mins ago" },
      { hash: "0x77ff...0001", block: 12840, from: "0x6d04...7040", to: "0xeeee...ffff", value: "5.00", time: "25 mins ago" },
  ]);

  const [search, setSearch] = useState("");

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', fontFamily: 'Inter, sans-serif', color: '#e2e8f0' }}>
      <Head><title>QuantumScan | Block Explorer</title></Head>

      {/* NAVBAR */}
      <nav style={{ borderBottom: '1px solid #1e293b', padding: '15px 20px', backgroundColor: '#020617' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/logo.png" style={{ height: '32px', objectFit: 'contain' }} alt="Logo" />
                <span style={{ fontWeight: 'bold', fontSize: '18px', color: 'white' }}>QuantumScan</span>
                <span style={{ fontSize: '10px', background: '#3b82f6', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>MAINNET</span>
            </div>
            <Link href="/wallet" style={{ textDecoration: 'none', color: '#94a3b8', fontSize: '14px', fontWeight: '500' }}>Back to Wallet</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        
        {/* SEARCH BAR */}
        <div style={{ marginBottom: '30px', background: 'linear-gradient(90deg, #1e1b4b 0%, #312e81 100%)', padding: '40px', borderRadius: '16px' }}>
            <h2 style={{ color: 'white', marginBottom: '15px', marginTop: 0 }}>The QuantumPay Blockchain Explorer</h2>
            <div style={{ display: 'flex', gap: '10px', maxWidth: '600px' }}>
                <input 
                    type="text" 
                    placeholder="Search by Address / Txn Hash / Block..." 
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    style={{ flex: 1, padding: '12px 15px', borderRadius: '8px', border: 'none', outline: 'none' }}
                />
                <button style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>SEARCH</button>
            </div>
        </div>

        {/* STATS CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
            {/* CARD 1: PRICE (UPDATED) */}
            <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
                <div style={{ color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', marginBottom: '5px' }}>QTM PRICE</div>
                {/* SAFE LABEL: PRE-MARKET */}
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>$0.50 <span style={{ fontSize:'12px', color:'#fbbf24' }}>(Pre-Market)</span></div>
            </div>

            {/* CARD 2: BLOCK */}
            <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
                <div style={{ color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', marginBottom: '5px' }}>LATEST BLOCK</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>#{stats.height}</div>
            </div>

            {/* CARD 3: TRANSACTIONS */}
            <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
                <div style={{ color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', marginBottom: '5px' }}>TOTAL TRANSACTIONS</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>{stats.totalTx}</div>
            </div>
        </div>

        {/* TABLE */}
        <div style={{ background: '#1e293b', borderRadius: '16px', border: '1px solid #334155', overflow: 'hidden' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #334155' }}>
                <h3 style={{ margin: 0, fontSize: '16px', color: 'white' }}>Latest Transactions</h3>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead style={{ background: '#0f172a', color: '#94a3b8', textAlign: 'left' }}>
                        <tr>
                            <th style={{ padding: '15px' }}>Txn Hash</th>
                            <th style={{ padding: '15px' }}>Block</th>
                            <th style={{ padding: '15px' }}>Age</th>
                            <th style={{ padding: '15px' }}>From</th>
                            <th style={{ padding: '15px' }}>To</th>
                            <th style={{ padding: '15px' }}>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {txs.map((tx, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #334155' }}>
                                <td style={{ padding: '15px', color: '#3b82f6', fontFamily: 'monospace' }}>{tx.hash}</td>
                                <td style={{ padding: '15px', color: '#3b82f6' }}>{tx.block}</td>
                                <td style={{ padding: '15px', color: '#cbd5e1' }}>{tx.time}</td>
                                <td style={{ padding: '15px', fontFamily: 'monospace', color: '#cbd5e1' }}>{tx.from.substring(0,8)}...</td>
                                <td style={{ padding: '15px', fontFamily: 'monospace', color: '#cbd5e1' }}>{tx.to.substring(0,8)}...</td>
                                <td style={{ padding: '15px', color: 'white', fontWeight: 'bold' }}>{tx.value} QTM</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div style={{ padding: '15px', textAlign: 'center', borderTop: '1px solid #334155', background: '#0f172a' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8', cursor: 'pointer' }}>View All Transactions ➝</span>
            </div>
        </div>

      </div>
    </div>
  );
}
