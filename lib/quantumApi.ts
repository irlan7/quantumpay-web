// lib/quantumApi.ts

// --- KONFIGURASI PROXY ---
// Mengarah ke route internal Next.js kita (pages/api/qtm-proxy/...)
// Ini mem-bypass masalah SSL (Mixed Content) di browser.
const API_BASE = "/api/qtm-proxy";

// --- TIPE DATA ---
export interface NetworkStats {
  network: string;
  pqc_status: string;
  algorithms: string[];
  total_supply: number;
  current_height: number;
}

// --- FUNGSI PEMBANTU (HELPER) ---
// Fungsi ini menangani semua request agar kita tidak mengulang kode try-catch
const fetchWithDebug = async (endpoint: string) => {
  const url = `${API_BASE}${endpoint}`;
  
  try {
    const response = await fetch(url);

    // 1. Cek apakah HTTP Status sukses (200-299)
    if (!response.ok) {
      // Coba baca pesan error dari JSON (jika ada)
      let errorBody;
      try {
        errorBody = await response.json();
      } catch (e) {
        errorBody = { message: "Gagal parsing JSON error" };
      }

      console.error(`❌ API Error [${endpoint}]:`, {
        status: response.status,
        statusText: response.statusText,
        body: errorBody
      });

      // Lempar error agar UI tahu
      throw new Error(errorBody.error || `Gagal mengambil data (${response.status})`);
    }

    // 2. Jika sukses, kembalikan JSON
    return await response.json();

  } catch (error) {
    // Tangani error jaringan (misal: koneksi terputus/offline)
    console.error(`❌ Network Error [${endpoint}]:`, error);
    throw error;
  }
};

// --- FUNGSI UTAMA ---

/**
 * Mengambil Statistik Global Jaringan
 * Endpoint: /stats
 */
export const fetchNetworkStats = async (): Promise<NetworkStats> => {
  return await fetchWithDebug('/stats');
};

/**
 * Mengambil Daftar Blok Terakhir
 * Endpoint: /blocks
 */
export const fetchRecentBlocks = async () => {
  return await fetchWithDebug('/blocks');
};

/**
 * Cek Saldo Wallet Berdasarkan Address
 * Endpoint: /address/:addr
 */
export const fetchBalance = async (address: string) => {
  if (!address) throw new Error("Alamat wallet kosong");
  return await fetchWithDebug(`/address/${address}`);
};
