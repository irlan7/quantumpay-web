import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

// Menggunakan API Key terbaru Bapak
const resend = new Resend('re_T36Wum6R_KYEkgfyN4FYjhDEqPS4oadNY');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, fullName, hash, amount, pdfBase64 } = req.body;

  try {
    const { data, error } = await resend.emails.send({
      from: 'QuantumPay <onboarding@resend.dev>',
      to: [email],
      subject: `🛡️ Struk Transaksi: ${amount} qBNB Sukses`,
      html: `
        <div style="font-family: sans-serif; border: 1px solid #eee; padding: 25px; border-radius: 12px; max-width: 500px;">
          <h2 style="color: #6366f1;">Sovereign Receipt</h2>
          <p>Halo <strong>${fullName}</strong>,</p>
          <p>Transaksi Anda telah diamankan dengan <strong>ML-DSA Post-Quantum Shield</strong>.</p>
          <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Jumlah:</strong> ${amount} qBNB</p>
            <p style="margin: 5px 0;"><strong>Hash:</strong> <small style="word-break: break-all;">${hash}</small></p>
          </div>
          <p>Terlampir struk PDF resmi berlogo QuantumPay untuk arsip Anda.</p>
          <p style="font-size: 11px; color: #999; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
            © 2026 QuantumPay Sovereign Network.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `QuantumPay_Receipt_${hash.substring(0, 10)}.pdf`,
          content: pdfBase64.split(',')[1], // Mengambil data base64 murni
        },
      ],
    });

    if (error) {
      console.error("Resend Error:", error);
      return res.status(400).json({ success: false, error });
    }

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Critical API Error:", err);
    res.status(500).json({ success: false, error: err });
  }
}

// --- 🔓 BAGIAN PALING PENTING: MEMBUKA KAPASITAS DATA ---
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Menaikkan batas dari 1mb ke 10mb agar PDF berlogo bisa lewat
    },
  },
};
