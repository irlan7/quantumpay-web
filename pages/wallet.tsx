import React, { useState, useEffect } from 'react';
import Head from 'next/head';

// --- KONFIGURASI SERVER (UPDATED FOR VERCEL PROXY) ---
// Kita gunakan jalur '/api/proxy' agar HTTPS (Vercel) bisa bicara dengan HTTP (VPS)
// Pastikan file next.config.mjs sudah di-update juga!
const API_BASE = '/api/proxy'; 

const NETWORK_DATABASE = [
  { name: "QuantumPay Alpha", symbol: "QTM", type: "L1" },
  { name: "Bitcoin", symbol: "BTC", type: "BTC" },
  { name: "Ethereum", symbol: "ETH", type: "L1" },
  { name: "BNB Chain", symbol: "BNB", type: "BSC" },
  { name: "Solana", symbol: "SOL", type: "L1" },
  { name: "Tether", symbol: "USDT", type: "STABLE" },
];

const getIconPath = (symbol: string) => {
  if (symbol === "QTM") return "/logo.png";
  return `/networks/svg/icon/${symbol.toLowerCase()}.svg`;
};

// --- GLOBAL TYPE (WASM) ---
declare global {
  interface Window {
    Go: any;
    QTM_CreateIdentity: any;
  }
}

export default function QuantumWallet() {
  const [mounted, setMounted] = useState(false);
  
  // STATES
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mnemonicWords, setMnemonicWords] = useState<string[]>(Array(12).fill(""));
  const [loading, setLoading] = useState(false);
  const [nodeStatus, setNodeStatus] = useState("CONNECTING...");
  
  // WASM STATES
  const [wasmReady, setWasmReady] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  // USER DATA
  const [activeUser, setActiveUser] = useState({
    role: "USER", name: "Sovereign Guest", address: "", balance: "0", symbol: "QTM"
  });

  const [monitorData, setMonitorData] = useState({ ayah: "0", ibu: "0" });
  const [showModal, setShowModal] = useState<string | null>(null);

  // FORM STATES (TRANSFER)
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
          script.onload = async () => await initGoWasm();
          document.body.appendChild(script);
        } else {
          await initGoWasm();
        }
      } catch (err) { console.error("WASM Fail:", err); }
    };
    const initGoWasm = async () => {
      const go = new window.Go();
      const result = await WebAssembly.instantiateStreaming(fetch('/qtm_core.wasm'), go.importObject);
      go.run(result.instance);
      setWasmReady(true);
    };
    loadWasm();
    setMounted(true);
  }, []);

  // --- 2. HANDLERS ---
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
        alert(`✅ DOMPET BARU DIBUAT!\nID: ${identity.identity_id}\nLevel: ${identity.security_level}`);
      } catch (e) { alert("Error: " + e); }
      setGenerating(false);
    }, 500);
  };

  // --- 3. LOGIN LOGIC (UPDATED: FIXED ADDRESS + PROXY) ---
  const handleLogin = async () => {
    setLoading(true);
    const input = mnemonicWords.join(" ").toLowerCase().trim();
    
    // DETEKSI VIP
    const ADDR_FOUNDER = "0x6d047da4f3AB9Dda7647D8ff901f65DDa6597040"; 
    const ADDR_AYAH = "0xB766497a96d061887CeC4aAaCFBA25676a749061";    
    const ADDR_IBU = "0x1c83F44cca36cb423E30940571cFc81b0fEC9A81";     

    let detectedRole = "USER";
    let targetAddr = ""; 
    let targetName = "Sovereign Guest";

    if (input.includes("spy") && input.includes("supreme") && input.includes("evoke")) {
      detectedRole = "FOUNDER"; targetName = "FOUNDER IRLAN"; targetAddr = ADDR_FOUNDER;
    } else if (input.includes("holiday") && input.includes("hip") && input.includes("valley")) {
      detectedRole = "IBUNDA"; targetName = "ELLEN LANDRIANY"; targetAddr = ADDR_IBU;
    } else if (input.includes("genius") && input.includes("find") && input.includes("later")) {
      detectedRole = "AYAHANDA"; targetName = "AYAHANDA SUJITNO"; targetAddr = ADDR_AYAH;
    } else {
      detectedRole = "USER"; targetName = "Global User"; 
      
      // --- FIX: GENERATE ALAMAT PERMANEN DARI 12 KATA ---
      // Menggunakan SHA-256 agar input sama = output sama
      const msgBuffer = new TextEncoder().encode(input);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      targetAddr = "0x" + hashHex.substring(0, 40); // Ambil 40 karakter hex pertama
    }

    try {
      let balance = "0";
      // Cek Saldo ke VPS (Lewat Proxy Vercel)
      const res = await fetch(`${API_BASE}/balance?addr=${targetAddr}`);
      if (res.ok) { 
        const data = await res.json(); 
        balance = data.balance; 
      }
      setActiveUser({ role: detectedRole, name: targetName, address: targetAddr, balance: balance, symbol: "QTM" });
      setIsLoggedIn(true);
    } catch (err) {
      alert("Mode Offline: Node Singapura tidak merespons.");
      setIsLoggedIn(true);
    } finally {
      setLoading(false);
    }
  };

  // --- 4. TRANSFER LOGIC ---
  const handleTransfer = async () => {
    if (!recipient || !amount) return alert("Mohon lengkapi data transfer.");
    setTxStatus("PROCESSING...");
    
    try {
      // Transfer via Proxy
      const res = await fetch(`${API_BASE}/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            from: activeUser.address,
            to: recipient,
            amount: parseFloat(amount)
        })
      });

      const result = await res.json();
      
      if (res.ok) {
        alert(`✅ TRANSFER BERHASIL!\n\nHash: ${result.tx_hash}\nStatus: Confirmed`);
        setShowModal(null); // Tutup modal
        setRecipient("");
        setAmount("");
      } else {
        alert(`❌ TRANSFER GAGAL:\n${result.message || "Unknown error"}`);
      }
    } catch (err) {
      alert("Koneksi Error: Gagal menghubungi Node Validator.");
    } finally {
      setTxStatus("");
    }
  };

  // --- 5. SYNC LOOP ---
  useEffect(() => {
    if (!isLoggedIn) return;
    const syncData = async () => {
      try {
        const res = await fetch(`${API_BASE}/balance?addr=${activeUser.address}`);
        const data = await res.json();
        setActiveUser(prev => ({ ...prev, balance: data.balance }));
        setNodeStatus(activeUser.role === "FOUNDER" ? "👑 SOVEREIGN FOUNDER" : "● MAINNET ONLINE");

        if (activeUser.role === "FOUNDER") {
          const resAyah = await fetch(`${API_BASE}/balance?addr=0xB766497a96d061887CeC4aAaCFBA25676a749061`);
          const dAyah = await resAyah.json();
          const resIbu = await fetch(`${API_BASE}/balance?addr=0x1c83F44cca36cb423E30940571cFc81b0fEC9A81`);
          const dIbu = await resIbu.json();
          setMonitorData({ ayah: dAyah.balance, ibu: dIbu.balance });
        }
      } catch (err) { setNodeStatus("● RECONNECTING..."); }
    };
    syncData();
    const interval = setInterval(syncData, 5000);
    return () => clearInterval(interval);
  }, [isLoggedIn, activeUser.address, activeUser.role]);

  if (!mounted) return null;

  // --- VIEW: LOGIN ---
  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
        <Head><title>QuantumPay Wallet</title></Head>
        <div style={{ width: '100%', maxWidth: '420px', backgroundColor: '#0f172a', padding: '40px 30px', borderRadius: '32px', border: '1px solid #1e293b', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          <div style={{ marginBottom: '30px' }}><img src="/logo.png" alt="QuantumPay" style={{ height: '140px', width: 'auto', objectFit:'contain' }} /></div>
          <h2 style={{ color: 'white', marginBottom: '8px', fontSize:'24px', fontWeight:'800' }}>Sovereign Vault</h2>
          <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '30px' }}>Enter your 12-word mnemonic phrase</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '30px' }}>
            {mnemonicWords.map((word, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', top: '6px', left: '8px', fontSize: '9px', color: '#475569', fontWeight: 'bold' }}>{index + 1}</span>
                <input type="text" value={word} onChange={(e) => handleWordChange(index, e.target.value)} style={{ width: '100%', padding: '20px 4px 6px 4px', textAlign: 'center', backgroundColor: '#1e293b', border: word ? '1px solid #3b82f6' : '1px solid #334155', borderRadius: '8px', color: 'white', fontSize: '12px', outline: 'none', fontWeight: '600' }} />
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <button onClick={handleLogin} disabled={loading || mnemonicWords.some(w => w === "")} style={{ width: '100%', padding: '16px', borderRadius: '16px', backgroundColor: mnemonicWords.every(w => w !== "") ? '#2563eb' : '#1e293b', color: mnemonicWords.every(w => w !== "") ? 'white' : '#475569', fontWeight: 'bold', border: 'none', cursor: mnemonicWords.every(w => w !== "") ? 'pointer' : 'not-allowed', opacity: loading ? 0.7 : 1 }}>
                {loading ? "VERIFYING..." : "UNLOCK WALLET"}
            </button>
            <button onClick={handleCreateWallet} disabled={generating || !wasmReady} style={{ width: '100%', padding: '16px', borderRadius: '16px', backgroundColor: 'transparent', border: '1px solid #3b82f6', color: '#3b82f6', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                {generating ? "GENERATING KEYS..." : "⚡ CREATE NEW WALLET"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW: DASHBOARD ---
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', padding: '20px', fontFamily: 'sans-serif', color: 'white' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', marginTop: '10px' }}>
          <img src="/logo.png" style={{ height: '80px', objectFit: 'contain' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold', color: activeUser.role === 'FOUNDER' ? '#000' : '#fbbf24', background: activeUser.role === 'FOUNDER' ? 'linear-gradient(90deg, #facc15, #eab308)' : 'rgba(251, 191, 36, 0.1)', padding: '6px 12px', borderRadius: '20px' }}>
                {activeUser.role === "FOUNDER" ? "👑 VIP: Free Gas" : "⚡ Gas: Rp15"}
            </div>
            <div style={{ fontSize: '10px', fontWeight: 'bold', color: nodeStatus.includes("ONLINE") ? '#10b981' : '#ef4444', border: '1px solid #334155', padding: '6px 12px', borderRadius: '20px' }}>
                {nodeStatus}
            </div>
            <button onClick={() => setIsLoggedIn(false)} style={{ background: '#334155', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '10px', fontWeight: 'bold' }}>LOGOUT</button>
          </div>
        </div>

        {/* SALDO */}
        <div style={{ background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)', borderRadius: '30px', padding: '40px 30px', textAlign: 'center', border: '1px solid #334155', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', marginBottom: '30px' }}>
          <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '15px' }}>{activeUser.name} ASSETS</div>
          <div style={{ fontSize: '3.5rem', fontWeight: '900', lineHeight: '1', marginBottom: '5px' }}>{activeUser.balance} <span style={{ fontSize: '1rem', color: '#3b82f6', marginLeft: '8px' }}>QTM</span></div>
          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '20px', fontFamily: 'monospace', background: '#020617', padding: '8px 12px', borderRadius: '20px' }}>{activeUser.address}</div>
        </div>

        {/* MONITORING (VIP ONLY) */}
        {activeUser.role === "FOUNDER" && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
            <div style={{ background: '#0f172a', padding: '20px', borderRadius: '20px', border: '1px solid #1e293b', textAlign: 'center' }}><div style={{ fontSize: '9px', color: '#64748b', fontWeight: 'bold' }}>AYAHANDA</div><div style={{ fontSize: '18px', fontWeight: 'bold', color: '#3b82f6' }}>{monitorData.ayah}</div></div>
            <div style={{ background: '#0f172a', padding: '20px', borderRadius: '20px', border: '1px solid #1e293b', textAlign: 'center' }}><div style={{ fontSize: '9px', color: '#64748b', fontWeight: 'bold' }}>IBUNDA</div><div style={{ fontSize: '18px', fontWeight: 'bold', color: '#eab308' }}>{monitorData.ibu}</div></div>
          </div>
        )}

        {/* MENU */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '40px' }}>
          {['Deposit', 'Send', 'Bridge', 'Validator'].map((item, idx) => (
            <div key={idx} onClick={() => setShowModal(item.toLowerCase())} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ width: '56px', height: '56px', background: '#1e293b', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', border: '1px solid #334155' }}>{['📥','📤','🌉','🛡️'][idx]}</div>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>{item}</span>
            </div>
          ))}
        </div>

        {/* MODAL SEND (SUDAH AKTIF) */}
        {showModal === 'send' && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 50 }}>
            <div style={{ width: '100%', maxWidth: '350px', background: '#0f172a', borderRadius: '24px', padding: '30px', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}><h3 style={{ margin: 0 }}>Send QTM</h3><span onClick={() => setShowModal(null)} style={{ cursor: 'pointer', fontSize: '20px' }}>✕</span></div>
              
              <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize:'11px', color:'#94a3b8', display:'block', marginBottom:'8px' }}>Recipient Address</label>
                  <input type="text" value={recipient} onChange={(e)=>setRecipient(e.target.value)} placeholder="0x..." style={{ width:'100%', padding:'12px', borderRadius:'12px', background:'#1e293b', border:'1px solid #334155', color:'white', outline:'none' }} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize:'11px', color:'#94a3b8', display:'block', marginBottom:'8px' }}>Amount</label>
                  <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="0.00" style={{ width:'100%', padding:'12px', borderRadius:'12px', background:'#1e293b', border:'1px solid #334155', color:'white', outline:'none' }} />
              </div>

              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding:'15px', borderRadius:'12px', marginBottom:'25px', border:'1px solid rgba(59, 130, 246, 0.2)' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'5px', fontSize:'12px' }}><span style={{ color:'#94a3b8' }}>Network Fee</span><span style={{ fontWeight:'bold', color: activeUser.role==="FOUNDER"?'#eab308':'#fbbf24' }}>{activeUser.role==="FOUNDER"?"VIP FREE":"Rp 15"}</span></div>
              </div>

              <button onClick={handleTransfer} disabled={txStatus !== ""} style={{ width:'100%', padding:'15px', borderRadius:'12px', background:'#3b82f6', color:'white', fontWeight:'bold', border:'none', cursor:'pointer', opacity: txStatus ? 0.7 : 1 }}>
                  {txStatus || "Confirm Transfer"}
              </button>
            </div>
          </div>
        )}

        {/* MODAL BRIDGE (PLACEHOLDER) */}
        {showModal === 'bridge' && (
           <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 50 }}>
            <div style={{ width: '100%', maxWidth: '350px', background: '#0f172a', borderRadius: '24px', padding: '25px', border: '1px solid #1e293b' }}>
               <h3 style={{ margin: 0, marginBottom: '20px' }}>Coming Soon <span onClick={() => setShowModal(null)} style={{ float: 'right', cursor: 'pointer' }}>✕</span></h3>
               <p style={{ color: '#94a3b8' }}>Jembatan lintas rantai (Bridge) sedang dikembangkan.</p>
            </div>
           </div>
        )}
      </div>
    </div>
  );
}
