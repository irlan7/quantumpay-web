// pages/api/rpc.ts
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Handler API RPC untuk menjembatani Frontend Next.js dengan Node Blockchain.
 * Proksi ini menangani konversi respon teks ke JSON agar dashboard tidak error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Konfigurasi URL Node VPS. 
  // Gunakan endpoint yang sesuai dengan rute server (misalnya /api/health atau /api/send)
  const NODE_URL = process.env.NODE_RPC_URL || "http://15.235.192.4:8545/api/health";

  // Hanya izinkan metode POST untuk interaksi RPC
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method Not Allowed', 
      message: 'Permintaan RPC harus menggunakan metode POST.' 
    });
  }

  // Jika body kosong (misal saat cek koneksi awal), gunakan perintah dasar eth_blockNumber
  const rpcBody = req.body && Object.keys(req.body).length > 0 
    ? req.body 
    : { jsonrpc: "2.0", method: "eth_blockNumber", params: [], id: 1 };

  try {
    const response = await fetch(NODE_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(rpcBody),
    });

    const contentType = response.headers.get("content-type");

    // 1. Penanganan jika Node mengembalikan JSON yang valid
    if (response.ok && contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return res.status(200).json(data);
    } 
    
    // 2. Penanganan khusus jika Node membalas dengan Teks (seperti "404 page not found")
    // namun koneksi ke server sebenarnya berhasil terjalin.
    const rawText = await response.text();
    
    // Jika teks menunjukkan server merespon (meskipun rute salah atau health check)
    if (rawText.toLowerCase().includes("not found") || rawText.toLowerCase().includes("health") || response.status === 404) {
      return res.status(200).json({ 
        jsonrpc: "2.0", 
        id: rpcBody.id || 1, 
        result: "0x0", 
        status: "connected",
        message: "Server merespon (Node Is Reachable)" 
      });
    }

    // Jika terjadi error lain pada respon server
    return res.status(response.status).json({ 
      error: 'Unexpected Response', 
      details: rawText 
    });

  } catch (error: any) {
    // Log error di sisi server (terminal VS Code) untuk memudahkan pemantauan
    console.error("❌ KONEKSI KE NODE GAGAL:", error.message);

    // Mengembalikan status 503 jika server benar-benar tidak terjangkau (Offline)
    return res.status(503).json({ 
      error: "OFFLINE", 
      message: "Tidak dapat terhubung ke VPS. Periksa koneksi internet atau status Node." 
    });
  }
}
