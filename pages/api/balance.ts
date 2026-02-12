import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  // ALAMAT IP VPS SINGAPURA (NGINX)
  // Ini adalah sumber data "Kebenaran" kita
  const NODE_URL = `http://15.235.192.4/balance?address=${address}`;

  try {
    const response = await fetch(NODE_URL);
    
    if (!response.ok) {
      throw new Error(`Node Unreachable: ${response.status}`);
    }

    const data = await response.json();

    // Kirim data bersih ke frontend
    res.status(200).json(data);
    
  } catch (error) {
    console.error("API Error:", error);
    // Return dummy data jika error agar tidak crash, tapi status error
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
}
