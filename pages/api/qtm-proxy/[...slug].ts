// pages/api/qtm-proxy/[...slug].ts
import type { NextApiRequest, NextApiResponse } from 'next';

const TARGET_URL = 'http://15.235.192.4:8082/api/v1';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  // Pastikan slug ada dan berbentuk array
  if (!slug || !Array.isArray(slug)) {
    return res.status(400).json({ error: 'Invalid path' });
  }

  const path = slug.join('/');
  const fullUrl = `${TARGET_URL}/${path}`;

  try {
    console.log(`📡 Proxy Request to: ${fullUrl}`);

    const backendResponse = await fetch(fullUrl, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    // Jika VPS memberikan error (misal 404 atau 500)
    if (!backendResponse.ok) {
       console.error(`❌ VPS Error ${backendResponse.status}: ${backendResponse.statusText}`);
       return res.status(backendResponse.status).json({ error: 'VPS Responded with Error', code: backendResponse.status });
    }

    const data = await backendResponse.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('❌ Proxy Network Error:', error);
    return res.status(500).json({ 
      error: 'Gagal terhubung ke Node Singapura', 
      hint: 'Cek Firewall Port 8082 di VPS atau status qtm-api',
      details: String(error)
    });
  }
}
