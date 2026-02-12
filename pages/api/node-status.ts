import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // ALAMAT IP VPS SINGAPURA (NGINX)
  const NODE_URL = 'http://15.235.192.4/stats';

  try {
    // Server Next.js menelepon ke Singapura
    const response = await fetch(NODE_URL);
    
    if (!response.ok) {
      throw new Error('Node Unreachable');
    }

    const data = await response.json();

    // Kirim data ke Frontend
    res.status(200).json({
      status: 'ONLINE',
      height: 0, // Nanti kita update jika API Go sudah kirim block height
      network: data.network,
      consensus: data.consensus
    });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ 
      status: 'OFFLINE', 
      height: 0,
      error: 'Failed to connect to Sovereign Node' 
    });
  }
}
