import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function WalletUI() {
  const [wallet, setWallet] = useState<any>(null); 
  const [balance, setBalance] = useState<number>(0);
  const [history, setHistory] = useState<any[]>([]); 
  const [activeTab, setActiveTab] = useState('History');
  const [isLoading, setIsLoading] = useState(false);

  // MODAL STATES
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false); // <--- BARU
  
  // INPUTS
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [importPhrase, setImportPhrase] = useState(''); // <--- BARU: Untuk ngetik 12 kata
  const [mnemonic, setMnemonic] = useState<string | null>(null);

  // 1. AUTO-LOGIN
  useEffect(() => {
    const savedData = localStorage.getItem('quantum_wallet');
    if (savedData) {
      const parsedWallet = JSON.parse(savedData);
      setWallet(parsedWallet);
      fetchBalance(parsedWallet.address);
      fetchHistory(parsedWallet.address);
    }
  }, []);

  // 2. FETCH DATA
  const fetchBalance = async (addr: string) => {
    try {
        const res = await fetch(`http://localhost:8080/balance?address=${addr}`);
        const data = await res.json();
        setBalance(data.balance);
    } catch (e) {}
  };

  const fetchHistory = async (addr: string) => {
      try {
          const res = await fetch(`http://localhost:8080/tx/history?address=${addr}`);
          const data = await res.json();
          setHistory(data || []);
      } catch (e) { console.error("Gagal load history"); }
  }

  // 3. CREATE WALLET
  const createRealWallet = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:8080/wallet/create');
      const data = await res.json();
      setWallet(data);
      localStorage.setItem('quantum_wallet', JSON.stringify(data));
      if (data.mnemonic) setMnemonic(data.mnemonic);
      fetchBalance(data.address);
      fetchHistory(data.address);
    } catch (err) { alert("Server Node Mati!"); }
    setIsLoading(false);
  };

  // 4. IMPORT WALLET (LOGIKA BARU)
  const handleImport = async () => {
    if(!importPhrase) { alert("Masukkan 12 kata rahasia!"); return; }
    setIsLoading(true);
    try {
        // Panggil API Import
        const url = `http://localhost:8080/wallet/import?phrase=${encodeURIComponent(importPhrase.trim())}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.error) {
            alert("GAGAL: " + data.error);
        } else {
            // Sukses pulihkan!
            setWallet(data);
            localStorage.setItem('quantum_wallet', JSON.stringify(data));
            fetchBalance(data.address);
            fetchHistory(data.address);
            setShowImportModal(false); // Tutup modal
            setImportPhrase(''); // Bersihkan input
            alert(`✅ Wallet Dipulihkan!\nAddr: ${data.address.substring(0,10)}...`);
        }
    } catch (err) { alert("Gagal koneksi server"); }
    setIsLoading(false);
  };

  // 5. ACTIONS
  const claimFaucet = async () => {
      if(!wallet) return;
      setIsLoading(true);
      try {
          await fetch(`http://localhost:8080/faucet?address=${wallet.address}`);
          fetchBalance(wallet.address);
          fetchHistory(wallet.address); 
          alert("Sukses! +100 QPY");
      } catch (err) { alert("Gagal klaim."); }
      setIsLoading(false);
  }

  const handleTransfer = async () => {
      if (!recipient || !amount) { alert("Data kurang!"); return; }
      setIsLoading(true);
      try {
          const url = `http://localhost:8080/tx/send?from=${wallet.address}&to=${recipient}&amount=${amount}`;
          const res = await fetch(url);
          const data = await res.json();
          if (data.status === 'success') {
              alert(`✅ Sukses! Hash: ${data.tx_hash.substring(0,10)}...`);
              setShowTransferModal(false);
              fetchBalance(wallet.address);
              fetchHistory(wallet.address); 
          } else { alert(`❌ Gagal: ${data.error}`); }
      } catch (err) { alert("Error koneksi."); }
      setIsLoading(false);
  }

  const handleLogout = () => {
      if(confirm("PASTIKAN SUDAH BACKUP 12 KATA!\nKeluar sekarang?")) {
          localStorage.removeItem('quantum_wallet');
          setWallet(null); setBalance(0); setHistory([]); setMnemonic(null);
      }
  }

  return (
    <div className="wallet-wrapper">
      <Head><title>QuantumPay Wallet</title></Head>

      {/* --- MODAL 1: MNEMONIC DISPLAY (SAAT CREATE) --- */}
      {mnemonic && (
          <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{background: '#1f2937', padding: '25px', borderRadius: '15px', width: '90%', maxWidth: '400px', border: '1px solid #ef4444'}}>
                  <h3 style={{color: '#ef4444', marginTop: 0, textAlign: 'center'}}>🔐 SECRET RECOVERY PHRASE</h3>
                  <p style={{color: '#d1d5db', fontSize: '0.9rem', textAlign: 'center'}}>Catat 12 kata ini. Ini satu-satunya cara memulihkan uang Anda!</p>
                  <div style={{background: '#111827', padding: '15px', borderRadius: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px'}}>
                      {mnemonic.split(' ').map((word, i) => (
                          <div key={i} style={{background: '#374151', padding: '5px', borderRadius: '5px', textAlign: 'center', fontSize: '0.8rem', color: '#fff'}}><span style={{color: '#9ca3af', marginRight: '5px'}}>{i+1}.</span>{word}</div>
                      ))}
                  </div>
                  <button onClick={() => setMnemonic(null)} style={{width: '100%', padding: '12px', background: '#10b981', border: 'none', color: 'white', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>I Have Saved It</button>
              </div>
          </div>
      )}

      {/* --- MODAL 2: IMPORT WALLET (INPUT 12 KATA) --- */}
      {showImportModal && (
          <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{background: '#1f2937', padding: '25px', borderRadius: '15px', width: '90%', maxWidth: '400px', border: '1px solid #6366f1'}}>
                  <h3 style={{color: '#fff', marginTop: 0}}>📥 Import Wallet</h3>
                  <p style={{color: '#9ca3af', fontSize: '0.9rem'}}>Tempelkan (Paste) 12 kata rahasia Anda di sini, pisahkan dengan spasi.</p>
                  <textarea 
                    value={importPhrase}
                    onChange={(e) => setImportPhrase(e.target.value)}
                    placeholder="example tiger piano ..."
                    style={{width: '100%', height: '100px', padding: '10px', background: '#111827', border: '1px solid #374151', color: 'white', borderRadius: '8px', marginBottom: '15px'}}
                  />
                  <div style={{display: 'flex', gap: '10px'}}>
                      <button onClick={() => setShowImportModal(false)} style={{flex: 1, padding: '10px', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px', cursor: 'pointer'}}>Cancel</button>
                      <button onClick={handleImport} disabled={isLoading} style={{flex: 1, padding: '10px', background: '#6366f1', border: 'none', color: 'white', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>{isLoading ? 'Recovering...' : 'Restore Wallet'}</button>
                  </div>
              </div>
          </div>
      )}

      {/* --- MODAL 3: TRANSFER --- */}
      {showTransferModal && (
          <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{background: '#1f2937', padding: '20px', borderRadius: '15px', width: '90%', maxWidth: '350px'}}>
                  <h3 style={{color: 'white', marginTop: 0}}>💸 Send QPY</h3>
                  <input type="text" placeholder="To Address 0x..." value={recipient} onChange={(e) => setRecipient(e.target.value)} style={{width: '100%', padding: '10px', marginBottom: '10px', background: '#111827', border: '1px solid #374151', color: 'white', borderRadius: '5px'}} />
                  <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} style={{width: '100%', padding: '10px', marginBottom: '20px', background: '#111827', border: '1px solid #374151', color: 'white', borderRadius: '5px'}} />
                  <div style={{display: 'flex', gap: '10px'}}>
                      <button onClick={() => setShowTransferModal(false)} style={{flex: 1, padding: '10px', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px'}}>Cancel</button>
                      <button onClick={handleTransfer} disabled={isLoading} style={{flex: 1, padding: '10px', background: '#6366f1', border: 'none', color: 'white', borderRadius: '8px', fontWeight: 'bold'}}>Send</button>
                  </div>
              </div>
          </div>
      )}

      {/* HEADER */}
      <div className="wallet-header">
        <div className="account-selector"><span>{wallet ? 'Main Account' : 'No Wallet'}</span></div>
        <div style={{display:'flex', gap:'10px'}}>
           {wallet && <span onClick={handleLogout} style={{fontSize:'0.8rem', color:'#ef4444', cursor:'pointer', border:'1px solid #ef4444', padding:'2px 8px', borderRadius:'4px'}}>LOGOUT</span>}
           <span>⚙️</span>
        </div>
      </div>

      {/* BALANCE & MAIN BUTTONS */}
      <div className="balance-card">
        <div className="balance-title">Total Asset Value</div>
        <div className="balance-amount" style={{fontSize: wallet ? '2.5rem' : '2rem'}}>
          {wallet ? <>{balance.toFixed(2)} <span style={{fontSize: '1rem'}}>QPY</span></> : "$ 0.00"}
        </div>
        {wallet && <div style={{fontFamily:'monospace', color:'#6366f1', fontSize:'0.75rem', background:'rgba(99,102,241,0.1)', padding:'5px', borderRadius:'5px', display:'inline-block'}}>{wallet.address}</div>}
        
        {!wallet ? (
            <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                {/* TOMBOL CREATE */}
                <button onClick={createRealWallet} className="button" style={{flex: 1, cursor:'pointer'}}>{isLoading ? '...' : '⚡ Create New'}</button>
                {/* TOMBOL IMPORT */}
                <button onClick={() => setShowImportModal(true)} className="button secondary" style={{flex: 1, borderColor: '#6366f1', color: '#6366f1', cursor:'pointer'}}>📥 Import Wallet</button>
            </div>
        ) : (
            <button onClick={claimFaucet} className="button secondary" style={{marginTop:'10px', fontSize:'0.8rem', borderColor:'#10b981', color:'#10b981'}}>💰 Claim Faucet (+100)</button>
        )}
      </div>

      {/* ACTIONS & LIST (Sama seperti sebelumnya) */}
      <div className="action-grid">
        <div className="action-item"><div className="action-icon">⬇️</div><span>Receive</span></div>
        <div className="action-item" onClick={() => wallet && setShowTransferModal(true)}><div className="action-icon" style={{background: showTransferModal ? '#6366f1':''}}>⬆️</div><span>Send</span></div>
        <div className="action-item"><div className="action-icon">💳</div><span>Buy</span></div>
        <div className="action-item"><div className="action-icon">↔️</div><span>Swap</span></div>
      </div>

      <div className="assets-section">
        <div className="asset-tabs">
            <div className={`tab ${activeTab==='History'?'active':''}`} onClick={()=>setActiveTab('History')}>Recent Activity</div>
            <div className={`tab ${activeTab==='Coin'?'active':''}`} onClick={()=>setActiveTab('Coin')}>Assets</div>
        </div>
        {activeTab === 'History' && (
            <div className="coin-list">
                {history.length === 0 && <div style={{textAlign:'center', color:'#6b7280', padding:'20px'}}>No transactions yet</div>}
                {history.map((tx, idx) => {
                    const isIncoming = tx.to === wallet?.address;
                    return (
                        <div key={idx} className="coin-item">
                            <div className="coin-left">
                                <div className="coin-icon" style={{background: isIncoming ? '#10b981' : '#ef4444', fontSize:'1.2rem'}}>{isIncoming ? '⬇️' : '⬆️'}</div>
                                <div><span className="coin-name">{isIncoming ? 'Receive' : 'Send'}</span><span className="coin-sub" style={{fontSize:'0.7rem'}}>{new Date(tx.timestamp).toLocaleTimeString()}</span></div>
                            </div>
                            <div className="coin-right"><span className="coin-name" style={{color: isIncoming ? '#10b981' : '#ef4444'}}>{isIncoming ? '+' : '-'}{tx.amount}</span><span className="coin-sub">Success</span></div>
                        </div>
                    )
                })}
            </div>
        )}
        {activeTab === 'Coin' && (
             <div className="coin-list">
                <div className="coin-item">
                    <div className="coin-left"><div className="coin-icon" style={{background: '#6366f1'}}>Q</div><div><span className="coin-name">QuantumPay</span><span className="coin-sub">$1.25</span></div></div>
                    <div className="coin-right"><span className="coin-name">{balance.toFixed(2)}</span><span className="coin-sub">${(balance*1.25).toFixed(2)}</span></div>
                </div>
            </div>
        )}
      </div>
      <div className="bottom-nav">
          <div className="nav-item active"><span>👛</span> Wallet</div><div className="nav-item"><span>📊</span> Market</div><div className="nav-item"><span>⚡</span> DApp</div><div className="nav-item"><span>🔁</span> Swap</div>
      </div>
    </div>
  );
}
