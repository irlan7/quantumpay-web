const FOUNDER_ADDR = "0x6d047da4f3AB9Dda7647D8ff901f65DDa6597040";
// Gunakan URL Proxy Website yang sudah Online
const API_URL = "https://www.quantumpaychain.org/api/proxy/balance?addr=" + FOUNDER_ADDR;

console.clear();
console.log("\x1b[36m%s\x1b[0m", "========================================");
console.log("\x1b[33m%s\x1b[0m", "🚀  QUANTUMPAY LIVE TRACKER (GOD MODE)");
console.log("\x1b[36m%s\x1b[0m", "========================================");
console.log("📡  Target Address :", FOUNDER_ADDR);
console.log("⏳  Menghubungkan ke Mainnet...\n");

let lastBalance = null;

async function checkBalance() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        
        // Konversi saldo ke angka
        const currentBalance = parseFloat(data.balance);

        // Inisialisasi awal (Log pertama kali)
        if (lastBalance === null) {
            console.log(`✅ [STATUS] Saldo Saat Ini: \x1b[32m${currentBalance} QTM\x1b[0m`);
            console.log("----------------------------------------");
            console.log("👀  Menunggu transaksi baru...");
            lastBalance = currentBalance;
            return;
        }

        // Cek Perubahan Saldo
        if (currentBalance !== lastBalance) {
            const diff = currentBalance - lastBalance;
            const time = new Date().toLocaleTimeString();

            if (diff > 0) {
                // Uang Masuk (Hijau)
                console.log(`\n🟢 [${time}] DANA MASUK!  +${diff} QTM`);
                console.log(`💰 Total Baru: ${currentBalance} QTM`);
            } else {
                // Uang Keluar (Merah)
                console.log(`\n🔴 [${time}] DANA KELUAR! ${diff} QTM`);
                console.log(`💰 Total Baru: ${currentBalance} QTM`);
            }
            
            // Bunyikan "Bip" di terminal (Visual Bell)
            process.stdout.write('\x07');
            lastBalance = currentBalance;
        }

    } catch (error) {
        // Abaikan error koneksi sesaat agar script tidak mati
    }
}

// Cek setiap 2 detik
setInterval(checkBalance, 2000);
