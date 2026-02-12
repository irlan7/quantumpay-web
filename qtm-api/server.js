const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001; // Kita pakai port 3001 agar tidak tabrakan dengan Go (9000)

app.use(cors());
app.use(express.json());

// ==========================================
// KONFIGURASI KONEKSI COCKROACHDB
// ==========================================
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'quantumpay_ledger',
  port: 26257, // Port standar CockroachDB
});

// ==========================================
// ENDPOINT: CEK SALDO DARI TABEL WALLETS
// ==========================================
app.get('/api/balance/:address', async (req, res) => {
  const { address } = req.params;

  try {
    // Query ke tabel 'wallets' yang tadi kita cek di terminal
    const query = 'SELECT address, balance, type FROM wallets WHERE address = $1';
    const result = await pool.query(query, [address]);

    if (result.rows.length > 0) {
      res.json({
        status: 'success',
        data: result.rows[0]
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Wallet tidak ditemukan di database'
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`🚀 API QuantumPay berjalan di http://localhost:${port}`);
});
