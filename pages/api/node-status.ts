import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * API untuk mengecek status Sovereign Node Quantumpay secara real-time.
 * Data diambil langsung dari RPC Port 8545 di VPS Singapura.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Alamat Node Singapura Bapak (Pintu Bank 8545)
  const NODE_RPC_URL = "http://15.235.192.4:8545";

  // Perintah standar blockchain untuk menanyakan nomor blok terbaru
  const rpcPayload = {
    jsonrpc: "2.0",
    method: "eth_blockNumber",
    params: [],
    id: 1
  };

  try {
    // Berikan batas waktu 5 detik agar website tidak 'hang' jika koneksi lambat
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(NODE_RPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rpcPayload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    // Jika server merespon dengan sukses
    if (response.ok) {
      const data = await response.json();
      
      // Data 'result' dari node berbentuk Hex (contoh: 0x1bc)
      // Kita ubah menjadi angka biasa (Desimal) agar mudah dibaca di dashboard
      const hexHeight = data.result || "0x0";
      const currentHeight = parseInt(hexHeight, 16);

      return res.status(200).json({ 
        status: "ONLINE", 
        height: currentHeight 
      });
    } else {
      throw new Error("Node Server Error");
    }

  } catch (error) {
    // Jika koneksi gagal (Node mati atau Port tertutup), dashboard akan merah (OFFLINE)
    console.error("Gagal sinkronisasi blok:", error);
    return res.status(200).json({ 
      status: "OFFLINE", 
      height: 0 
    });
  }
}
