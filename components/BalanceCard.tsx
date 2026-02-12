import React, { useState, useEffect } from 'react';

const BalanceCard = () => {
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Alamat dompet Founder Bapak
  const founderAddress = "0x6d047da4f3AB9Dda7647D8ff901f65DDa6597040";

  useEffect(() => {
    // Memanggil API Node.js yang jalan di port 3001
    fetch(`http://localhost:3001/api/balance/${founderAddress}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 'success') {
          setWallet(json.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal koneksi ke API:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-cyan-500 animate-pulse">Synchronizing with Quantum Chain...</div>;
  if (!wallet) return <div className="text-red-400">Node Offline</div>;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-black border border-cyan-500/30 p-6 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.15)]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">Network Status</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></span>
            <span className="text-white text-xs font-medium">Mainnet Online</span>
          </div>
        </div>
        <span className="bg-cyan-500/10 text-cyan-400 text-[10px] px-2 py-1 rounded border border-cyan-500/20 font-mono">
          {wallet.type.toUpperCase()}
        </span>
      </div>

      <p className="text-slate-400 text-xs mb-1">Total Balance</p>
      <h3 className="text-3xl font-bold text-white tracking-tight">
        {parseFloat(wallet.balance).toLocaleString('id-ID')} <span className="text-cyan-500 text-xl">QTM</span>
      </h3>

      <div className="mt-6 pt-4 border-t border-slate-800">
        <p className="text-slate-500 text-[9px] uppercase tracking-wider mb-2">Verified Address</p>
        <code className="text-[10px] text-slate-300 bg-slate-800/50 p-2 rounded block break-all font-mono border border-slate-700">
          {wallet.address}
        </code>
      </div>
    </div>
  );
};

export default BalanceCard;
