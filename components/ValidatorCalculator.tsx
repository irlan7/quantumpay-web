import React, { useState, useEffect } from 'react';

export default function ValidatorCalculator() {
  // --- PARAMETER TEKNIS (QTM ONLY) ---
  // Skenario: 210 Juta QTM habis dalam 50 tahun (Emission)
  // Emisi Tahunan = 4,200,000 QTM
  // Emisi Harian = ~11,506 QTM
  const DAILY_EMISSION_QTM = 11506;
  
  // Skenario Gas Fee: 10 Juta Tx * 0.0005 QTM = 5,000 QTM
  const DAILY_FEES_QTM = 5000;

  // Total Reward Pool Harian (Emisi + Fee)
  const TOTAL_DAILY_REWARD_POOL = DAILY_EMISSION_QTM + DAILY_FEES_QTM; // ~16,506 QTM

  // Validator Share (misal 50% untuk Validator, 50% Burn/Treasury)
  const VALIDATOR_POOL = TOTAL_DAILY_REWARD_POOL * 0.5; // ~8,253 QTM untuk diperebutkan

  // Asumsi Total Staking Global (Misal 20% supply awal terkunci)
  const [networkTotalStake, setNetworkTotalStake] = useState(42000000); 

  // --- STATE USER ---
  const [myStake, setMyStake] = useState(10000); 
  
  const [stats, setStats] = useState({ 
    networkShare: 0,
    dailyBlockReward: 0,
    monthlyBlockReward: 0,
    yearlyBlockReward: 0
  });

  useEffect(() => {
    // 1. Hitung Network Share (Kekuatan Voting)
    // Rumus: Stake Saya / Total Stake Jaringan
    const share = (myStake / networkTotalStake) * 100;

    // 2. Hitung Estimasi Reward QTM
    // Rumus: Pool Validator * Share %
    const dailyQTM = VALIDATOR_POOL * (share / 100);
    const monthlyQTM = dailyQTM * 30;
    const yearlyQTM = dailyQTM * 365;

    setStats({
      networkShare: share,
      dailyBlockReward: dailyQTM,
      monthlyBlockReward: monthlyQTM,
      yearlyBlockReward: yearlyQTM
    });

  }, [myStake, networkTotalStake]);

  // Helper Format
  const fmt = (num: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(num);
  const fmtInt = (num: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(num);

  // Styles (Inline untuk kompatibilitas)
  const s = {
    card: { background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '30px', color: '#fff', maxWidth: '800px', margin: '0 auto', fontFamily: 'Inter, sans-serif' },
    header: { textAlign: 'center' as 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #1e293b' },
    h3: { fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '5px' },
    p: { fontSize: '0.9rem', color: '#94a3b8' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' },
    inputGroup: { marginBottom: '20px' },
    label: { display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#64748b', marginBottom: '10px', textTransform: 'uppercase' as 'uppercase', letterSpacing: '1px' },
    valueDisplay: { fontSize: '1.2rem', fontFamily: 'monospace', color: '#60a5fa', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' },
    range: { width: '100%', height: '6px', background: '#334155', borderRadius: '3px', cursor: 'pointer', accentColor: '#3b82f6' },
    
    // Result Box Technical Look
    resultBox: { background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '25px' },
    statRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px dashed #1e293b' },
    statLabel: { fontSize: '0.9rem', color: '#94a3b8' },
    statValue: { fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', fontFamily: 'monospace' },
    highlight: { color: '#34d399' },
    shareValue: { color: '#f59e0b' }, // Amber for share
    disclaimer: { marginTop: '20px', fontSize: '0.75rem', color: '#475569', lineHeight: '1.5', fontStyle: 'italic' }
  };

  return (
    <div style={s.card}>
      <div style={s.header}>
        <h3 style={s.h3}>📡 Network Consensus Simulator</h3>
        <p style={s.p}>Estimasi partisipasi teknis Anda dalam mengamankan Mainnet.</p>
      </div>

      <div style={s.grid}>
        {/* KOLOM KIRI: PARAMETER */}
        <div>
          {/* SLIDER 1: MY STAKE */}
          <div style={s.inputGroup}>
            <label style={s.label}>Validator Capacity (Self-Bonded)</label>
            <div style={s.valueDisplay}>
               <span>{fmtInt(myStake)} QTM</span>
            </div>
            <input 
              type="range" min="1000" max="1000000" step="1000"
              value={myStake} onChange={(e) => setMyStake(Number(e.target.value))}
              style={s.range}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '5px' }}>
                <span>Guardian (10k)</span>
                <span>Sovereign (1M)</span>
            </div>
          </div>

          {/* SLIDER 2: NETWORK TOTAL (DIFFICULTY) */}
          <div style={s.inputGroup}>
            <label style={s.label}>Global Network Stake</label>
            <div style={s.valueDisplay}>
               <span style={{ color: '#94a3b8' }}>{fmtInt(networkTotalStake)} QTM</span>
            </div>
            <input 
              type="range" min="10000000" max="100000000" step="1000000"
              value={networkTotalStake} onChange={(e) => setNetworkTotalStake(Number(e.target.value))}
              style={{ ...s.range, accentColor: '#94a3b8' }}
            />
             <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '5px' }}>
                Semakin banyak validator global, reward per node semakin terdistribusi (Desentralisasi).
             </p>
          </div>
        </div>

        {/* KOLOM KANAN: HASIL TEKNIS */}
        <div style={s.resultBox}>
           <div style={s.statRow}>
              <span style={s.statLabel}>Consensus Power (Voting Power)</span>
              <span style={{ ...s.statValue, ...s.shareValue }}>{stats.networkShare.toFixed(4)}%</span>
           </div>

           <div style={s.statRow}>
              <span style={s.statLabel}>Est. Daily Block Rewards</span>
              <span style={{ ...s.statValue, ...s.highlight }}>+{fmt(stats.dailyBlockReward)} QTM</span>
           </div>

           <div style={s.statRow}>
              <span style={s.statLabel}>Est. Monthly Accumulation</span>
              <span style={s.statValue}>+{fmt(stats.monthlyBlockReward)} QTM</span>
           </div>

           <div style={{ ...s.statRow, borderBottom: 'none' }}>
              <span style={s.statLabel}>Est. Annual Accumulation</span>
              <span style={s.statValue}>+{fmt(stats.yearlyBlockReward)} QTM</span>
           </div>

           <div style={{ background: '#0f172a', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
               <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '5px' }}><strong>⚙️ Technical Note:</strong></p>
               <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                   Reward berasal dari Block Emission (Inflasi Terkontrol) + Gas Fee Sharing. Node harus mempertahankan uptime {'>'}99.9% untuk menghindari slashing (penalti).
               </p>
           </div>
        </div>
      </div>

      <div style={s.disclaimer}>
        *DISCLAIMER: Kalkulator ini hanya untuk tujuan simulasi teknis infrastruktur. Angka di atas adalah estimasi reward token QTM (Utility Token) berdasarkan partisipasi konsensus, bukan jaminan keuntungan finansial. Nilai QTM dapat berfluktuasi. Menjalankan node memiliki risiko teknis.
      </div>
    </div>
  );
}
