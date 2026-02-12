import React, { useState, useEffect } from 'react';
import Head from 'next/head';

// --- PERBAIKAN 1: Sesuaikan dengan nama file Proxy kita ---
const API_BASE = '/api/qtm-proxy';

// VIP ADDRESSES (Sovereign Family)
// API Go kita sekarang Case-Insensitive, jadi huruf besar/kecil aman.
const ADDR_FOUNDER = "0x6d047da4f3AB9Dda7647D8ff901f65DDa6597040";
const ADDR_AYAH = "0xB766497a96d061887CeC4aAaCFBA25676a749061";
const ADDR_IBU = "0x1c83F44cca36cb423E30940571cFc81b0fEC9A81";

// Helper: Format Angka Mahal (e.g. 21,000,000)
const formatNumber = (num: string | number) => {
  if (!num) return "0";
  return Number(num).toLocaleString('en-US');
};

declare global {
  interface Window {
    Go: any;
    QTM_CreateIdentity: any;
  }
}

export default function QuantumWallet() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mnemonicWords, setMnemonicWords] = useState<string[]>(Array(12).fill(""));
  const [loading, setLoading] = useState(false);
  const [nodeStatus, setNodeStatus] = useState("CONNECTING...");
  const [wasmReady, setWasmReady] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [activeUser, setActiveUser] = useState({
    role: "USER", name: "Sovereign Guest", address: "", balance: "0", symbol: "QTM"
  });

  const [monitorData, setMonitorData] = useState({ ayah: "0", ibu: "0" });
  const [showModal, setShowModal] = useState<string | null>(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txStatus, setTxStatus] = useState("");

  // --- 1. WASM INIT ---
  useEffect(() => {
    const loadWasm = async () => {
      try {
        if (!window.Go) {
          const script = document.createElement('script');
          script.src = '/wasm_exec.js';
          script.onload = async () => {
            const go = new window.Go();
            const result = await WebAssembly.instantiateStreaming(fetch('/qtm_core.wasm'), go.importObject);
            go.run(result.instance);
            setWasmReady(true);
          };
          document.body.appendChild(script);
        }
      } catch (err) { console.error("WASM Shield Fail:", err); }
    };
    loadWasm();
    setMounted(true);
  }, []);

  // --- 2. LOGIN LOGIC (Fixed URL) ---
  const handleLogin = async () => {
    setLoading(true);
    const input = mnemonicWords.map(w => w.toLowerCase().trim()).join(" ");

    let detectedRole = "USER";
    let targetAddr = "";
    let targetName = "Global User";

    // DETECTION VIP
    if (input.includes("spy") && input.includes("supreme") && input.includes("evoke")) {
      detectedRole = "FOUNDER"; targetName = "FOUNDER IRLAN"; targetAddr = ADDR_FOUNDER;
    } else if (input.includes("holiday") && input.includes("hip") && input.includes("valley")) {
      detectedRole = "IBUNDA"; targetName = "ELLEN LANDRIANY"; targetAddr = ADDR_IBU;
    } else if (input.includes("genius") && input.includes("find") && input.includes("later")) {
      detectedRole = "AYAHANDA"; targetName = "AYAHANDA SUJITNO"; targetAddr = ADDR_AYAH;
    } else {
      // WASM / DETERMINISTIC FALLBACK
      if (wasmReady) {
         // Gunakan WASM jika ada (Nanti diisi logika real)
         // Sementara fallback simulasi address dari hash
         const msgBuffer = new TextEncoder().encode(input);
         const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
         const hashArray = Array.from(new Uint8Array(hashBuffer));
         targetAddr = "0x" + hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 40);
      } else {
         targetAddr = "0x0000000000000000000000000000000000000000";
      }
    }

    try {
      // --- PERBAIKAN 2: Gunakan jalur RESTful (/address/0x...) sesuai main.go ---
      const res = await fetch(`${API_BASE}/address/${targetAddr}`);
      let balance = "0";
      
      if (res.ok) {
        const data = await res.json();
        balance = data.balance?.toString() || "0";
        setNodeStatus("● MAINNET ONLINE");
      } else {
        // Jika 404 (Address baru/belum ada di DB), anggap saldo 0 tapi Online
        console.warn("Wallet belum aktif di on-chain");
        setNodeStatus("● NEW WALLET");
      }

      setActiveUser({ role: detectedRole, name: targetName, address: targetAddr, balance, symbol: "QTM" });
      setIsLoggedIn(true);
      
    } catch (err) {
      alert("Koneksi ke Node Singapura Terputus. Cek Internet.");
      setActiveUser(prev => ({ ...prev, address: targetAddr, name: targetName }));
      setIsLoggedIn(true);
    } finally { setLoading(false); }
  };

  // --- 3. SYNC LOOP (Fixed URL) ---
  useEffect(() => {
    if (!isLoggedIn) return;
    const syncData = async () => {
      try {
        // Fetch User Balance
        const res = await fetch(`${API_BASE}/address/${activeUser.address}`);
        if(res.ok) {
            const data = await res.json();
            setActiveUser(prev => ({ ...prev, balance: data.balance?.toString() || "0" }));
            setNodeStatus(activeUser.role === "FOUNDER" ? "👑 SOVEREIGN FOUNDER" : "● MAINNET ONLINE");
        }

        // Fetch Family Balance (Only for Founder)
        if (activeUser.role === "FOUNDER") {
          // Fetch Ayah
          const rA = await fetch(`${API_BASE}/address/${ADDR_AYAH}`);
          const dA = rA.ok ? await rA.json() : { balance: 0 };
          
          // Fetch Ibu
          const rI = await fetch(`${API_BASE}/address/${ADDR_IBU}`);
          const dI = rI.ok ? await rI.json() : { balance: 0 };
          
          setMonitorData({ 
              ayah: dA.balance?.toString() || "0", 
              ibu: dI.balance?.toString() || "0" 
          });
        }
      } catch (err) { setNodeStatus("● RECONNECTING..."); }
    };

    // Jalankan pertama kali
    syncData();

    // Loop setiap 5 detik
    const interval = setInterval(syncData, 5000);
    return () => clearInterval(interval);
  }, [isLoggedIn, activeUser.address, activeUser.role]);

  // --- 4. HANDLERS ---
  const handleWordChange = (index: number, value: string) => {
    const newWords = [...mnemonicWords];
    newWords[index] = value;
    setMnemonicWords(newWords);
  };

  const handleCreateWallet = () => {
    if (!wasmReady || !window.QTM_CreateIdentity) return alert("Loading Quantum Shield...");
    setGenerating(true);
    setTimeout(() => {
      try {
        const jsonResult = window.QTM_CreateIdentity();
        const identity = JSON.parse(jsonResult);
        setMnemonicWords(identity.master_mnemonic.split(" ").slice(0, 12));
      } catch (e) { alert("Error: " + e); }
      setGenerating(false);
    }, 500);
  };

  const handleTransfer = async () => {
    if (!recipient || !amount) return alert("Mohon lengkapi data transfer.");
    setTxStatus("SIGNING...");
    setTimeout(() => {
        alert(`✅ Simulasi Transfer Berhasil!\n\nSent: ${amount} QTM\nTo: ${recipient}`);
        setTxStatus("");
        setShowModal(null);
    }, 2000);
  };

  if (!mounted) return null;

  // --- RENDER UI ---
  return (
    <div className="qp-layout" style={{ minHeight: '100vh', backgroundColor: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'sans-serif' }}>
      <Head><title>QuantumPay | Sovereign Vault</title></Head>

      {!isLoggedIn ? (
        /* LOGIN VIEW */
        <div className="qp-main-frame animate-quantum-in" style={{ maxWidth: '420px', backgroundColor: '#0f172a', padding: '40px', borderRadius: '32px', border: '1px solid #1e293b', textAlign: 'center' }}>
          <img src="/logo.png" style={{ height: '100px', marginBottom: '20px' }} />
          <h2 className="quantum-glow" style={{marginBottom: '30px'}}>Sovereign Vault</h2>
          
          <div style={{background: 'rgba(30, 41, 59, 0.5)', padding: '10px', borderRadius: '12px', fontSize: '11px', color: '#94a3b8', marginBottom: '20px'}}>
             Masukkan Mnemonic Phrase untuk Membuka Dompet
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', margin: '20px 0' }}>
            {mnemonicWords.map((word, idx) => (
              <input key={idx} type="text" value={word} onChange={(e) => handleWordChange(idx, e.target.value)}
                placeholder={String(idx+1)}
                style={{ width: '100%', padding: '12px 5px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: 'white', textAlign: 'center', fontSize: '12px' }} />
            ))}
          </div>
          <button onClick={handleLogin} disabled={loading} className="quantum-border" style={{ width: '100%', padding: '16px', borderRadius: '16px', backgroundColor: '#2563eb', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? "SYNCING NODE..." : "UNLOCK WALLET"}
          </button>
          <button onClick={handleCreateWallet} style={{ marginTop: '20px', background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: '12px' }}>
            {generating ? "GENERATING..." : "⚡ Create New Wallet"}
          </button>
        </div>
      ) : (
        /* DASHBOARD VIEW */
        <div className="qp-main-frame" style={{ maxWidth: '480px', width: '100%' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
             <img src="/logo.png" style={{ height: '50px' }} />
             <div style={{ textAlign: 'right' }}>
               <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 'bold', border: '1px solid #10b981', padding: '4px 8px', borderRadius: '12px', marginBottom: '5px' }}>{nodeStatus}</div>
               <button onClick={() => setIsLoggedIn(false)} style={{ fontSize: '10px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}>LOGOUT</button>
             </div>
          </div>

          {/* Main Balance Card */}
          <div className="quantum-border" style={{ padding: '40px 20px', textAlign: 'center', background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)', borderRadius: '24px', border: '1px solid #334155', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>{activeUser.name} BALANCE</div>
            <div className="quantum-glow" style={{ fontSize: '3rem', fontWeight: '900', margin: '15px 0', lineHeight: 1 }}>
                {formatNumber(activeUser.balance)} <span style={{fontSize: '1rem', color: '#3b82f6'}}>QTM</span>
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', background: '#020617', padding: '8px', borderRadius: '20px', display: 'inline-block', fontFamily: 'monospace' }}>
                {activeUser.address}
            </div>
          </div>

          {/* VIP Monitor Area (Only for Founder) */}
          {activeUser.role === "FOUNDER" && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '25px' }}>
              <div style={{ background: '#1e293b', padding: '20px', borderRadius: '16px', textAlign: 'center', border: '1px solid #334155' }}>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'bold', marginBottom: '5px' }}>AYAHANDA</div>
                <div style={{ color: '#3b82f6', fontSize: '1.2rem', fontWeight: 'bold' }}>{formatNumber(monitorData.ayah)} <span style={{fontSize:'0.8rem'}}>QTM</span></div>
              </div>
              <div style={{ background: '#1e293b', padding: '20px', borderRadius: '16px', textAlign: 'center', border: '1px solid #334155' }}>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'bold', marginBottom: '5px' }}>IBUNDA</div>
                <div style={{ color: '#fbbf24', fontSize: '1.2rem', fontWeight: 'bold' }}>{formatNumber(monitorData.ibu)} <span style={{fontSize:'0.8rem'}}>QTM</span></div>
              </div>
            </div>
          )}

          {/* MENU BUTTONS (4 Pillars) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '30px' }}>
             {[
               { id: 'receive', label: 'Receive', icon: '📥' },
               { id: 'send', label: 'Send', icon: '📤' },
               { id: 'bridge', label: 'Bridge', icon: '🌉' },
               { id: 'validator', label: 'Stake', icon: '🛡️' }
             ].map((btn) => (
               <div key={btn.id} onClick={() => setShowModal(btn.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                 <div style={{ width: '56px', height: '56px', background: '#1e293b', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', border: '1px solid #334155', fontSize: '24px' }}>
                   {btn.icon}
                 </div>
                 <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>{btn.label}</span>
               </div>
             ))}
          </div>

          {/* --- MODALS --- */}
          {showModal === 'receive' && (
             <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 100 }}>
               <div style={{ width: '100%', maxWidth: '350px', background: '#0f172a', borderRadius: '24px', padding: '30px', border: '1px solid #1e293b', textAlign: 'center' }}>
                 <h3 style={{ margin: '0 0 20px 0' }}>Receive QTM</h3>
                 <div style={{ background: 'white', padding: '20px', borderRadius: '12px', display: 'inline-block', marginBottom: '20px' }}>
                    <div style={{ width: '150px', height: '150px', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>QR CODE</div>
                 </div>
                 <p style={{ fontSize: '11px', color: '#94a3b8', background: '#1e293b', padding: '10px', borderRadius: '8px', wordBreak: 'break-all' }}>{activeUser.address}</p>
                 <button onClick={() => { setShowModal(null); }} style={{ marginTop: '15px', width: '100%', padding: '12px', borderRadius: '12px', background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer' }}>Close</button>
               </div>
             </div>
          )}

          {showModal === 'send' && (
             <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 100 }}>
               <div style={{ width: '100%', maxWidth: '350px', background: '#0f172a', borderRadius: '24px', padding: '30px', border: '1px solid #1e293b' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}><h3 style={{ margin: 0 }}>Send QTM</h3><span onClick={() => setShowModal(null)} style={{ cursor: 'pointer' }}>✕</span></div>
                 <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize:'11px', color:'#94a3b8', display:'block', marginBottom:'8px' }}>Recipient Address</label>
                    <input type="text" value={recipient} onChange={(e)=>setRecipient(e.target.value)} placeholder="0x..." style={{ width:'100%', padding:'12px', borderRadius:'12px', background:'#1e293b', border:'1px solid #334155', color:'white', outline:'none' }} />
                 </div>
                 <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize:'11px', color:'#94a3b8', display:'block', marginBottom:'8px' }}>Amount</label>
                    <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="0.00" style={{ width:'100%', padding:'12px', borderRadius:'12px', background:'#1e293b', border:'1px solid #334155', color:'white', outline:'none' }} />
                 </div>
                 <button onClick={handleTransfer} disabled={txStatus !== ""} style={{ width:'100%', padding:'15px', borderRadius:'12px', background:'#3b82f6', color:'white', fontWeight:'bold', border:'none', cursor:'pointer', opacity: txStatus ? 0.7 : 1 }}>
                    {txStatus || "Confirm Transfer"}
                 </button>
               </div>
             </div>
          )}

          {(showModal === 'bridge' || showModal === 'validator') && (
             <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 100 }}>
               <div style={{ width: '100%', maxWidth: '350px', background: '#0f172a', borderRadius: '24px', padding: '30px', border: '1px solid #1e293b', textAlign: 'center' }}>
                 <h3>Coming Soon</h3>
                 <p style={{ color: '#94a3b8', fontSize: '13px' }}>Fitur ini sedang dalam tahap finalisasi audit keamanan.</p>
                 <button onClick={() => setShowModal(null)} style={{ marginTop: '15px', padding: '10px 20px', borderRadius: '12px', background: '#334155', color: 'white', border: 'none', cursor: 'pointer' }}>Close</button>
               </div>
             </div>
          )}

        </div>
      )}
    </div>
  );
}
