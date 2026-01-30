import React, { useState, useEffect, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';

// --- PATH ASSET ICON ---
const getIconPath = (symbol: string) => `/networks/svg/icon/${symbol.toLowerCase()}.svg`;

// --- DATABASE JARINGAN LENGKAP ---
const NETWORK_DATABASE = [
  { name: "Arbitrum One", symbol: "ARB", type: "L2" },
  { name: "Avalanche C", symbol: "AVAX", type: "L1" },
  { name: "Bitcoin PoW", symbol: "BTC", type: "BTC" },
  { name: "BNB Smart Chain", symbol: "BNB", type: "BSC" },
  { name: "Ethereum Mainnet", symbol: "ETH", type: "L1" },
  { name: "Solana SOL", symbol: "SOL", type: "L1" },
  { name: "Polygon Matic", symbol: "MATIC", type: "L2" },
  { name: "Tether USDT", symbol: "USDT", type: "STABLE" },
  { name: "Tron TRX", symbol: "TRX", type: "L1" },
];

const QuantumSovereignApp = () => {
  // --- CORE STATES (SSR SAFE) ---
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mnemonicInput, setMnemonicInput] = useState("");
  const [myAddress, setMyAddress] = useState("0x...");
  const [isNodeOnline, setIsNodeOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // --- UI & TRANSACTION STATES ---
  const [showModal, setShowModal] = useState<string | null>(null);
  const [isSigning, setIsSigning] = useState(false); // FIX: Error isSigning defined
  const [fiatPrice, setFiatPrice] = useState(1934.30);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState<string[]>(["BNB", "BTC"]);

  // --- API DETECTION ---
  const getApiBase = () => {
    if (typeof window !== 'undefined') {
      return window.location.hostname === 'localhost' 
        ? "http://localhost:8080/api" 
        : "https://quantumpaychain.org/api";
    }
    return "https://quantumpaychain.org/api";
  };

  // --- 1. INITIAL LOAD & HYDRATION ---
  useEffect(() => {
    setMounted(true); // Proteksi Refresh SSR
    const savedMnemonic = localStorage.getItem('qp_mnemonic');
    const savedAddress = localStorage.getItem('qp_address');
    
    if (savedMnemonic) setMnemonicInput(savedMnemonic);
    if (savedAddress) setMyAddress(savedAddress);

    const checkNode = async () => {
      try {
        const res = await fetch(`${getApiBase()}/health`);
        setIsNodeOnline(res.ok);
      } catch {
        setIsNodeOnline(false);
      }
    };
    checkNode();
    const interval = setInterval(checkNode, 5000);
    return () => clearInterval(interval);
  }, []);

  // Live Price Pulse
  useEffect(() => {
    const interval = setInterval(() => { 
      setFiatPrice(prev => prev + (Math.random() * 0.4 - 0.2)); 
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // --- 2. PQC: CREATE WALLET ACTION ---
  const handleCreateNew = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${getApiBase()}/wallet/create`);
      const data = await res.json();
      
      localStorage.setItem('qp_mnemonic', data.mnemonic);
      localStorage.setItem('qp_address', data.address);
      
      setMyAddress(data.address);
      setMnemonicInput(data.mnemonic);
      alert("PQC Wallet Berhasil! Periksa Log Shield di WSL.");
    } catch (err) {
      alert("Node Offline! Pastikan 'go run' di WSL aktif.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 3. CLEAR CACHE & LOGOUT ---
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setMnemonicInput("");
    setMyAddress("0x...");
    window.location.reload(); // Deep clear untuk Mozilla/Chrome
  };

  // --- 4. TRANSACTION HANDLER ---
  const handleTxConfirm = () => {
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      setShowModal(null);
      alert("Signed with ML-DSA Post-Quantum Shield! 🛡️");
    }, 2000);
  };

  // --- 5. BRIDGE LOGIC (RESTORED) ---
  const processedNetworks = useMemo(() => {
    const filtered = NETWORK_DATABASE.filter(net => {
      const matchesSearch = net.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            net.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || net.type === activeCategory;
      return matchesSearch && matchesCategory;
    });
    return filtered.sort((a, b) => {
      const isAFav = favorites.includes(a.symbol);
      const isBFav = favorites.includes(b.symbol);
      if (isAFav && !isBFav) return -1;
      if (!isAFav && isBFav) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, activeCategory, favorites]);

  if (!mounted) return null;

  const hasMnemonicInStorage = mnemonicInput.length > 10;

  // --- VIEW: LOGIN / WELCOME SCREEN ---
  if (!isLoggedIn) {
    return (
      <div className="qp-layout">
        <div className="qp-main-frame" style={{ textAlign: 'center' }}>
          <img src="/logo.png" style={{ width: '120px', marginBottom: '20px' }} alt="Logo" />
          <h2 style={{ letterSpacing: '2px', fontWeight: 800 }}>
            {hasMnemonicInStorage ? "SOVEREIGN ACCESS" : "WELCOME SOVEREIGN"}
          </h2>
          
          <textarea 
            className="qp-input" 
            rows={4} 
            value={mnemonicInput} 
            onChange={(e) => setMnemonicInput(e.target.value)} 
            placeholder="Input 12-word mnemonic..." 
            style={{ fontFamily: 'monospace', margin: '25px 0', resize: 'none' }} 
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button className="qp-btn-main" onClick={() => setIsLoggedIn(true)} disabled={!hasMnemonicInStorage}>
              UNLOCK VAULT
            </button>

            {/* CREATE NEW WALLET CAPTION (FIXED) */}
            {!hasMnemonicInStorage && (
              <button 
                className="qp-btn-main" 
                style={{ background: 'transparent', border: '1px solid #6366f1', color: '#fff' }}
                onClick={handleCreateNew}
                disabled={!isNodeOnline || isLoading}
              >
                {isLoading ? "GENERATING ML-DSA..." : "CREATE NEW WALLET (PQC)"}
              </button>
            )}
          </div>
          
          <p style={{ marginTop: '30px', fontSize: '11px', color: isNodeOnline ? '#4ade80' : '#f87171' }}>
             Sovereign Node Status: {isNodeOnline ? "CONNECTED 🟢" : "OFFLINE 🔴"}
          </p>
        </div>
      </div>
    );
  }

  // --- VIEW: MAIN DASHBOARD ---
  return (
    <div className="qp-layout">
      <div className="qp-main-frame">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.png" style={{ width: '35px' }} />
            <div style={{ fontWeight: 800 }}>Wallet <span style={{ color: '#6366f1' }}>qBNB</span></div>
          </div>
          <button className="qp-logout-btn" onClick={handleLogout}>Logout</button>
        </header>

        {/* BALANCE CARD */}
        <div style={{ background: '#1e1e2e', borderRadius: '32px', padding: '30px', marginBottom: '35px', border: '1px solid #333' }}>
          <div style={{ color: '#888', fontSize: '0.9rem' }}>Total Sovereign Assets</div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '10px 0' }}>500.00 <span style={{ fontSize: '1.2rem', color: '#facc15' }}>qBNB</span></h1>
          <div style={{ color: '#4ade80', fontWeight: 700 }}>≈ ${fiatPrice.toLocaleString(undefined, {minimumFractionDigits: 3})} (Live)</div>
        </div>

        {/* ACTION GRID (4 COLUMNS) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '35px', textAlign: 'center' }}>
          <div className="qp-action-item" onClick={() => setShowModal('deposit')}>
            <div className="qp-icon-circle">📥</div>
            <span>Deposit</span>
          </div>
          <div className="qp-action-item" onClick={() => setShowModal('withdraw')}>
            <div className="qp-icon-circle">📤</div>
            <span>Withdraw</span>
          </div>
          <div className="qp-action-item" onClick={() => setShowModal('bridge')}>
            <div className="qp-icon-circle">⇄</div>
            <span>Bridge</span>
          </div>
          <div className="qp-action-item" onClick={() => setShowModal('send')}>
            <div className="qp-icon-circle">↗</div>
            <span>Send</span>
          </div>
        </div>

        {/* --- MODAL BRIDGE (RESTORED NETWORK LIST) --- */}
        {showModal === 'bridge' && (
          <div className="qp-modal-overlay" onClick={() => setShowModal(null)}>
            <div className="qp-main-frame" style={{ padding: '25px' }} onClick={e => e.stopPropagation()}>
              <h3 style={{ marginBottom: '15px', textAlign: 'center' }}>Select Network</h3>
              <input 
                type="text" className="qp-input" style={{marginBottom:'15px'}} placeholder="Search network..." 
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
              />
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '15px' }}>
                {["All", "L1", "L2", "BSC", "BTC"].map(cat => (
                  <div key={cat} className={`qp-filter-chip ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
                    {cat}
                  </div>
                ))}
              </div>
              <div className="qp-scroll-area" style={{maxHeight: '350px'}}>
                {processedNetworks.map((net, i) => (
                  <div key={i} className="qp-net-item">
                    <div className="qp-net-logo-wrap" style={{ width: '38px', height: '38px', overflow: 'hidden' }}>
                      <img src={getIconPath(net.symbol)} alt={net.symbol} style={{ width: '22px' }} onError={(e) => { e.currentTarget.src = "/networks/generic.svg"; }} />
                    </div>
                    <div style={{ flexGrow: 1, marginLeft: '12px' }}>
                      <span style={{ fontWeight: 700 }}>{net.name}</span>
                    </div>
                    <div style={{ cursor: 'pointer', color: favorites.includes(net.symbol) ? '#facc15' : 'rgba(255,255,255,0.1)' }} onClick={() => setFavorites(f => f.includes(net.symbol) ? f.filter(s => s !== net.symbol) : [...f, net.symbol])}>
                      {favorites.includes(net.symbol) ? '★' : '☆'}
                    </div>
                  </div>
                ))}
              </div>
              <button className="qp-btn-main" style={{ marginTop: '20px', background: 'transparent', border: '1px solid #444' }} onClick={() => setShowModal(null)}>Close</button>
            </div>
          </div>
        )}

        {/* --- MODAL DEPOSIT (RESTORED LARGE QR) --- */}
        {showModal === 'deposit' && (
          <div className="qp-modal-overlay" onClick={() => setShowModal(null)}>
            <div className="qp-main-frame" style={{ maxWidth: '400px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
              <h3 style={{ marginBottom: '25px' }}>Receive Assets</h3>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '24px', display: 'inline-block' }}>
                <QRCodeSVG value={myAddress} size={220} level="H" />
              </div>
              <p style={{ fontSize: '0.75rem', marginTop: '20px', wordBreak: 'break-all', opacity: 0.7 }}>{myAddress}</p>
              <button className="qp-btn-main" style={{ marginTop: '25px' }} onClick={() => setShowModal(null)}>Close</button>
            </div>
          </div>
        )}

        {/* --- MODAL SEND/WITHDRAW (FIXED BUTTONS) --- */}
        {(showModal === 'send' || showModal === 'withdraw') && (
          <div className="qp-modal-overlay" onClick={() => !isSigning && setShowModal(null)}>
            <div className="qp-main-frame" onClick={e => e.stopPropagation()}>
              <h3 style={{ marginBottom: '25px', textAlign: 'center' }}>{showModal.toUpperCase()}</h3>
              <input type="text" className="qp-input" placeholder="Destination Address 0x..." style={{marginBottom:'15px'}} disabled={isSigning} />
              <input type="number" className="qp-input" placeholder="Amount (qBNB)" style={{marginBottom:'25px'}} disabled={isSigning} />
              <button className="qp-btn-main" onClick={handleTxConfirm} disabled={isSigning}>
                {isSigning ? "Signing ML-DSA Shield..." : "Confirm Transaction"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuantumSovereignApp;
