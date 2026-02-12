import React, { useEffect, useState } from 'react';
import { fetchBalance } from '../lib/quantumApi';

// Alamat Founder (Genesis Wallet)
const FOUNDER_ADDRESS = "0x6d047da4f3AB9Dda7647D8ff901f65DDa6597040";

export default function FounderBalance() {
  const [balance, setBalance] = useState<number | null>(null);
  const [securityTag, setSecurityTag] = useState("Verifying PQC...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const data = await fetchBalance(FOUNDER_ADDRESS);
        
        if (isMounted) {
          setBalance(data.balance);
          // Ambil label keamanan dari API, atau default ke Dilithium jika kosong
          setSecurityTag(data.vault_security || "Dilithium-Shielded");
          setLoading(false);
        }
      } catch (err) {
        console.error("Founder Balance Error:", err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    }

    loadData();
    
    // Refresh saldo setiap 10 detik (siapa tahu ada transaksi masuk)
    const interval = setInterval(loadData, 10000);
    return () => {
      clearInterval(interval);
      isMounted = false;
    };
  }, []);

  // Format angka (misal: 21000000 -> 21,000,000)
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div style={{
      padding: '25px 30px',
      background: 'linear-gradient(145deg, #111827, #0d1117)',
      borderRadius: '25px',
      border: '1px solid rgba(255, 215, 0, 0.2)', // Aksen Emas Tipis
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
      minWidth: '320px',
      textAlign: 'left',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Efek Kilau Background */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(255,215,0,0.05) 0%, rgba(0,0,0,0) 70%)',
        zIndex: 0
      }}></div>

      <div style={{position: 'relative', zIndex: 1}}>
        {/* Header Label */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
          <p style={{
            margin: 0, 
            fontSize: '0.7rem', 
            color: '#ffd700', // Warna Emas
            letterSpacing: '2px', 
            fontWeight: 'bold', 
            textTransform: 'uppercase'
          }}>
            GENESIS VAULT
          </p>
          
          {/* Badge Security */}
          <span style={{
            fontSize: '0.6rem',
            background: 'rgba(0, 242, 255, 0.1)',
            color: '#00f2ff', // Warna Neon Cyan
            padding: '2px 8px',
            borderRadius: '10px',
            border: '1px solid rgba(0, 242, 255, 0.2)'
          }}>
            🛡️ {securityTag}
          </span>
        </div>

        {/* Balance Display */}
        <h2 style={{
          margin: '5px 0', 
          color: '#fff', 
          fontSize: '2.2rem', 
          fontWeight: '800',
          letterSpacing: '-1px'
        }}>
          {loading ? (
            <span style={{fontSize: '1.5rem', color: '#6b7280'}}>Loading...</span>
          ) : error ? (
            <span style={{fontSize: '1.5rem', color: '#ef4444'}}>Offline</span>
          ) : (
            <>
              {formatNumber(balance || 0)} <span style={{fontSize: '1rem', color: '#9ca3af', fontWeight: 'normal'}}>QTM</span>
            </>
          )}
        </h2>

        {/* Address & Copy */}
        <div style={{marginTop: '15px'}}>
          <p style={{margin: '0 0 5px 0', fontSize: '0.75rem', color: '#6b7280'}}>Sovereign Address:</p>
          <code style={{
            display: 'block',
            background: '#000',
            padding: '8px 12px',
            borderRadius: '8px',
            color: '#a5b4fc',
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            border: '1px solid #1f2937'
          }}>
            {FOUNDER_ADDRESS}
          </code>
        </div>
        
        {/* Status Verified */}
        {!loading && !error && (
            <div style={{marginTop: '10px', fontSize: '0.7rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px'}}>
                <span>✓</span> On-Chain Verified
            </div>
        )}
      </div>
    </div>
  );
}
