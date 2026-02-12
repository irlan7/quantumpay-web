import React, { useState, useEffect } from 'react';

// Tipe Data untuk Rate
type Rate = {
  pair: string;
  price: number;
  change: number;
};

export default function QuantumBridge() {
  // --- STATE ---
  const [amount, setAmount] = useState<string>('1000'); // Default $1,000
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [qtmRate, setQtmRate] = useState<number>(50.00); // 1 QTM = $50 (Asumsi)
  const [isProcessing, setIsProcessing] = useState(false);
  const [xmlPreview, setXmlPreview] = useState<string>(''); // Untuk melihat XML SWIFT

  // Simulasi Live Ticker (Oracle Mockup)
  const [rates, setRates] = useState<Rate[]>([
    { pair: 'QTM/USD', price: 50.25, change: 1.2 },
    { pair: 'QTM/EUR', price: 46.10, change: 0.8 },
    { pair: 'QTM/GBP', price: 39.50, change: 0.5 },
  ]);

  // Efek "Denyut Nadi" Pasar (Simulasi Oracle Update)
  useEffect(() => {
    const interval = setInterval(() => {
      setRates(prev => prev.map(r => ({
        ...r,
        price: r.price + (Math.random() - 0.5) * 0.1, // Fluktuasi kecil
        change: r.change + (Math.random() - 0.5) * 0.05
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Update Rate Utama saat Currency Berubah
  useEffect(() => {
    const selected = rates.find(r => r.pair === `QTM/${currency}`);
    if (selected) setQtmRate(selected.price);
  }, [currency, rates]);

  // Fungsi Kalkulasi (Hanya Estimasi UI, Math Asli di Backend Go)
  const estimatedQTM = parseFloat(amount) / qtmRate;

  // Fungsi Simulasi SWIFT XML Generation
  const handleSimulate = () => {
    setIsProcessing(true);
    setXmlPreview('');

    // Simulasi Delay Jaringan Bank
    setTimeout(() => {
      // Ini adalah format ISO 20022 (pacs.008) yang asli
      const mockXML = `
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.008.001.08">
  <FIToFICstmrCdtTrf>
    <GrpHdr>
      <MsgId>QTM-${Date.now()}</MsgId>
      <CreDtTm>${new Date().toISOString()}</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
    </GrpHdr>
    <CdtTrfTxInf>
      <PmtId><InstrId>${Math.floor(Math.random() * 1000000)}</InstrId></PmtId>
      <IntrBkSttlmAmt Ccy="${currency}">${parseFloat(amount).toFixed(2)}</IntrBkSttlmAmt>
      <InstdAmt Ccy="QTM">${estimatedQTM.toFixed(6)}</InstdAmt>
    </CdtTrfTxInf>
  </FIToFICstmrCdtTrf>
</Document>`.trim();
      
      setXmlPreview(mockXML);
      setIsProcessing(false);
    }, 1500);
  };

  // --- STYLES (Bank-Grade Dark UI) ---
  const s = {
    container: { background: '#0b0f19', border: '1px solid #1f2937', borderRadius: '16px', padding: '30px', fontFamily: 'Inter, sans-serif', color: '#fff', maxWidth: '1000px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #1f2937', paddingBottom: '20px' },
    title: { fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' },
    badge: { background: '#1e1b4b', color: '#818cf8', padding: '5px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid #312e81' },
    
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' },
    
    // Panel Kiri (Input)
    leftPanel: { paddingRight: '20px' },
    label: { display: 'block', color: '#9ca3af', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 'bold' },
    inputGroup: { display: 'flex', gap: '10px', marginBottom: '25px' },
    input: { background: '#111827', border: '1px solid #374151', padding: '15px', borderRadius: '10px', color: '#fff', fontSize: '1.2rem', flex: 1, outline: 'none' },
    select: { background: '#1f2937', border: '1px solid #374151', padding: '15px', borderRadius: '10px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' },
    
    infoRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem', color: '#d1d5db' },
    highlight: { color: '#34d399', fontWeight: 'bold', fontFamily: 'monospace' },
    
    btn: { width: '100%', padding: '18px', background: isProcessing ? '#4b5563' : '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', cursor: isProcessing ? 'wait' : 'pointer', marginTop: '20px', transition: 'all 0.2s' },

    // Panel Kanan (Output & XML)
    rightPanel: { background: '#020617', borderRadius: '12px', padding: '20px', border: '1px solid #1f2937' },
    xmlBox: { background: '#000', color: '#10b981', fontFamily: 'monospace', fontSize: '0.8rem', padding: '15px', borderRadius: '8px', border: '1px solid #333', height: '200px', overflowY: 'auto' as 'auto', whiteSpace: 'pre-wrap' as 'pre-wrap' },
    ticker: { display: 'flex', gap: '15px', marginBottom: '20px' },
    tickerItem: { background: '#111827', padding: '10px', borderRadius: '8px', border: '1px solid #374151', flex: 1, textAlign: 'center' as 'center' }
  };

  return (
    <div style={s.container}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <h2 style={s.title}>QuantumBridge Core</h2>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>ISO 20022 Compliant Fiat Gateway</p>
        </div>
        <div style={s.badge}>● ORACLE LIVE</div>
      </div>

      <div style={s.grid}>
        {/* KIRI: Input Konversi */}
        <div style={s.leftPanel}>
           <label style={s.label}>FIAT AMOUNT (INSTITUTIONAL)</label>
           <div style={s.inputGroup}>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                style={s.input} 
              />
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value as any)} 
                style={s.select}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
           </div>

           <div style={{ background: '#111827', padding: '20px', borderRadius: '10px', border: '1px solid #374151' }}>
              <div style={s.infoRow}>
                 <span>Oracle Rate ({currency}):</span>
                 <span style={s.highlight}>1 QTM = {qtmRate.toFixed(2)} {currency}</span>
              </div>
              <div style={s.infoRow}>
                 <span>Bridge Fee (0.1%):</span>
                 <span>{(parseFloat(amount) * 0.001).toFixed(2)} {currency}</span>
              </div>
              <div style={{ ...s.infoRow, borderTop: '1px solid #374151', paddingTop: '10px', marginTop: '10px' }}>
                 <span style={{ fontWeight: 'bold' }}>ESTIMATED RECEIVE:</span>
                 <span style={{ fontSize: '1.2rem', color: '#60a5fa', fontWeight: 'bold' }}>
                    {estimatedQTM.toFixed(6)} QTM
                 </span>
              </div>
           </div>

           <button style={s.btn} onClick={handleSimulate} disabled={isProcessing}>
             {isProcessing ? 'GENERATING SWIFT XML...' : 'SIMULATE SETTLEMENT'}
           </button>
        </div>

        {/* KANAN: XML & Data */}
        <div style={s.rightPanel}>
           <label style={s.label}>LIVE LIQUIDITY FEED</label>
           <div style={s.ticker}>
              {rates.map((r) => (
                <div key={r.pair} style={s.tickerItem}>
                   <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{r.pair}</div>
                   <div style={{ fontWeight: 'bold' }}>{r.price.toFixed(2)}</div>
                   <div style={{ fontSize: '0.7rem', color: r.change >= 0 ? '#34d399' : '#ef4444' }}>
                     {r.change >= 0 ? '+' : ''}{r.change.toFixed(2)}%
                   </div>
                </div>
              ))}
           </div>

           <label style={s.label}>SWIFT ISO 20022 PAYLOAD PREVIEW</label>
           <div style={s.xmlBox}>
              {xmlPreview ? xmlPreview : '// Menunggu input transaksi...\n// Klik "Simulate Settlement" untuk melihat struktur XML SWIFT.'}
           </div>
           
           <div style={{ marginTop: '15px', fontSize: '0.75rem', color: '#6b7280', fontStyle: 'italic' }}>
             *Sistem ini menggunakan standar pacs.008 untuk penyelesaian lintas batas. Data dienkripsi menggunakan Kyber-1024 sebelum transmisi.
           </div>
        </div>
      </div>
    </div>
  );
}
