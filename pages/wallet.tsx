import React, { useState, useEffect, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';

// --- PATH ASSET (Sesuai Struktur Folder Bapak) ---
const getIconPath = (symbol: string) => `/networks/svg/icon/${symbol.toLowerCase()}.svg`;

// --- DATABASE JARINGAN ---
const NETWORK_DATABASE = [
  { name: "Arbitrum One", symbol: "ARB", type: "L2", status: "live" },
  { name: "Avalanche C", symbol: "AVAX", type: "L1", status: "live" },
  { name: "Bitcoin PoW", symbol: "BTC", type: "BTC", status: "preview" },
  { name: "BNB Smart Chain", symbol: "BNB", type: "BSC", status: "live" },
  { name: "Ethereum Mainnet", symbol: "ETH", type: "L1", status: "live" },
  { name: "Solana SOL", symbol: "SOL", type: "L1", status: "preview" },
  { name: "Polygon Matic", symbol: "MATIC", type: "L2", status: "live" },
  { name: "Tether USDT", symbol: "USDT", type: "STABLE", status: "live" },
  { name: "Tron TRX", symbol: "TRX", type: "L1", status: "live" },
];

const QuantumSovereignApp = () => {
  // --- STATES (KEEP LOGIC UNCHANGED) ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mnemonicInput, setMnemonicInput] = useState("");
  const [showModal, setShowModal] = useState(null);
  const [isSigning, setIsSigning] = useState(false);
  const [fiatPrice, setFiatPrice] = useState(1934.30);
  
  // Bridge States (SafePal Style)
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState<string[]>(["BNB", "BTC"]);

  const VALID_KEY = "diesel club wagon shaft aerobic history slush capable crisp video clerk rebel";
  const myAddress = "0x74124379854723984723984QuantumPayV45";

  // Live Price Pulse
  useEffect(() => {
    const interval = setInterval(() => { 
      setFiatPrice(prev => prev + (Math.random() * 0.4 - 0.2)); 
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // --- LOGIC: FAVORITES & ALPHABETICAL SORT ---
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

  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]);
  };

  // --- LOGIN VIEW (Logo: 120px) ---
  if (!isLoggedIn) {
    return (
      <div className="qp-layout">
        <div className="qp-main-frame" style={{ textAlign: 'center' }}>
          <img src="/logo.png" style={{ width: '120px', marginBottom: '15px' }} alt="QuantumPay" />
          <h2 style={{ letterSpacing: '2px', fontWeight: 800, marginBottom: '20px' }}>SOVEREIGN ACCESS</h2>
          <textarea 
            className="qp-input" 
            rows={4} 
            value={mnemonicInput} 
            onChange={(e) => setMnemonicInput(e.target.value)} 
            placeholder="diesel club wagon..." 
            style={{ fontFamily: 'monospace', marginBottom: '30px', resize: 'none' }} 
          />
          <button className="qp-btn-main" onClick={() => mnemonicInput.trim().toLowerCase().replace(/\s+/g, ' ') === VALID_KEY ? setIsLoggedIn(true) : alert("Invalid Key")}>UNLOCK VAULT</button>
        </div>
      </div>
    );
  }

  return (
    <div className="qp-layout">
      <div className="qp-main-frame">
        {/* HEADER */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.png" style={{ width: '35px' }} alt="Logo" />
            <div style={{ fontWeight: 800 }}>Wallet <span style={{ color: 'var(--qp-violet)' }}>qBNB</span></div>
          </div>
          <button className="qp-logout-btn" onClick={() => {setIsLoggedIn(false); setMnemonicInput("");}}>Logout</button>
        </header>

        {/* BALANCE CARD */}
        <div style={{ background: 'var(--qp-surface-light)', borderRadius: '32px', padding: '25px', marginBottom: '30px', border: '1px solid var(--qp-border)' }}>
          <div style={{ color: 'var(--qp-text-dim)', fontSize: '0.85rem', fontWeight: 600 }}>Total Sovereign Assets</div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, margin: '10px 0', letterSpacing: '-1.5px' }}>500.00 <span style={{ fontSize: '1.2rem', color: 'var(--qp-gold)' }}>qBNB</span></h1>
          <div style={{ color: '#4ade80', fontSize: '0.85rem', fontWeight: 700 }}>≈ ${fiatPrice.toLocaleString(undefined, {minimumFractionDigits: 2})} (Live)</div>
        </div>

        {/* --- ACTION GRID (PERBAIKAN TATA LETAK: HORIZONTAL 4 KOLOM) --- */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '12px', 
          marginBottom: '35px',
          textAlign: 'center'
        }}>
          <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => setShowModal('deposit')}>
            <div className="qp-icon-circle" style={{ marginBottom: '8px' }}>📥</div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--qp-text-dim)' }}>Deposit</span>
          </div>
          <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => setShowModal('withdraw')}>
            <div className="qp-icon-circle" style={{ marginBottom: '8px' }}>📤</div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--qp-text-dim)' }}>Withdraw</span>
          </div>
          <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => setShowModal('bridge')}>
            <div className="qp-icon-circle" style={{ marginBottom: '8px' }}>⇄</div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--qp-text-dim)' }}>Bridge</span>
          </div>
          <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => setShowModal('send')}>
            <div className="qp-icon-circle" style={{ marginBottom: '8px' }}>↗</div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--qp-text-dim)' }}>Send</span>
          </div>
        </div>

        {/* --- MODAL BRIDGE (SAFEPAL STYLE) --- */}
        {showModal === 'bridge' && (
          <div className="qp-modal-overlay" onClick={() => setShowModal(null)}>
            <div className="qp-main-frame" style={{ padding: '25px' }} onClick={e => e.stopPropagation()}>
              <div style={{ position: 'sticky', top: 0, background: 'var(--qp-surface)', zIndex: 10 }}>
                <h3 style={{ marginBottom: '15px', textAlign: 'center' }}>Select Network</h3>
                <input 
                  type="text" className="qp-input" style={{marginBottom:'15px'}} placeholder="Search network..." 
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
                />
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '15px', scrollbarWidth: 'none' }}>
                  {["All", "L1", "L2", "BSC", "BTC"].map(cat => (
                    <div 
                      key={cat} 
                      className={`qp-filter-chip ${activeCategory === cat ? 'active' : ''}`} 
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              </div>
              <div className="qp-scroll-area" style={{maxHeight: '350px'}}>
                {processedNetworks.map((net, i) => (
                  <div key={i} className="qp-net-item">
                    {/* FIXED WRAPPER TO PREVENT ARBITRUM BLINKING */}
                    <div className="qp-net-logo-wrap" style={{ width: '38px', height: '38px', minWidth: '38px', overflow: 'hidden' }}>
                      <img 
                        src={getIconPath(net.symbol)} 
                        alt={net.symbol} 
                        className="qp-net-logo-img" 
                        style={{ width: '22px', height: '22px', display: 'block' }}
                        onError={(e) => { e.currentTarget.src = "/networks/generic.svg"; }} 
                      />
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{net.name} <span style={{ fontSize: '0.65rem', color: 'var(--qp-gold)' }}>[{net.type}]</span></span>
                    </div>
                    {/* FAVORITE STAR (SafePal Style) */}
                    <div 
                      style={{ cursor: 'pointer', fontSize: '1.2rem', color: favorites.includes(net.symbol) ? 'var(--qp-gold)' : 'rgba(255,255,255,0.1)', marginLeft: '10px' }}
                      onClick={() => toggleFavorite(net.symbol)}
                    >
                      {favorites.includes(net.symbol) ? '★' : '☆'}
                    </div>
                  </div>
                ))}
              </div>
              <button className="qp-btn-main" style={{ marginTop: '20px', background: 'transparent', border: '1px solid var(--qp-border)' }} onClick={() => setShowModal(null)}>Tutup</button>
            </div>
          </div>
        )}

        {/* --- MODAL TRANSAKSI (DEPOSIT/SEND/WITHDRAW) --- */}
        {showModal === 'deposit' && (
          <div className="qp-modal-overlay" onClick={() => setShowModal(null)}>
            <div className="qp-main-frame" style={{ maxWidth: '400px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
              <h3 style={{ marginBottom: '25px' }}>Receive Assets</h3>
              <div style={{ background: '#fff', padding: '15px', borderRadius: '24px', display: 'inline-block', marginBottom: '20px' }}>
                <QRCodeSVG value={myAddress} size={200} level="H" />
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--qp-text-dim)', wordBreak: 'break-all', padding: '0 20px' }}>{myAddress}</p>
              <button className="qp-btn-main" style={{ marginTop: '25px' }} onClick={() => setShowModal(null)}>Tutup</button>
            </div>
          </div>
        )}

        {(showModal === 'send' || showModal === 'withdraw') && (
          <div className="qp-modal-overlay" onClick={() => !isSigning && setShowModal(null)}>
            <div className="qp-main-frame" onClick={e => e.stopPropagation()}>
              <h3 style={{ marginBottom: '25px', textAlign: 'center' }}>{showModal.toUpperCase()}</h3>
              <div className="qp-input-group">
                <label style={{ fontSize: '0.75rem', color: 'var(--qp-text-dim)', marginBottom: '8px', display: 'block' }}>Destination Address</label>
                <input type="text" className="qp-input" placeholder="0x..." disabled={isSigning} />
              </div>
              <div className="qp-input-group">
                <label style={{ fontSize: '0.75rem', color: 'var(--qp-text-dim)', marginBottom: '8px', display: 'block' }}>Amount (qBNB)</label>
                <input type="number" className="qp-input" placeholder="0.00" disabled={isSigning} />
              </div>
              <button className="qp-btn-main" onClick={() => {setIsSigning(true); setTimeout(() => {setIsSigning(false); setShowModal(null);}, 2000)}} disabled={isSigning}>
                {isSigning ? "Signing ML-DSA..." : "Confirm"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuantumSovereignApp;
