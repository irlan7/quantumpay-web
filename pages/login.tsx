import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();

  const [walletAddress, setWalletAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // 🔐 MOCK blockchain connect (UI only)
    // Tidak ada private key, tidak ada signing
    setTimeout(() => {
      if (walletAddress.length > 10 && password.length >= 4) {
        setConnected(true);
      } else {
        setError(t("login.error"));
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <main
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          border: "1px solid #2a2a2a",
          borderRadius: "12px",
          padding: "2rem",
          background: "var(--card-bg, #0f172a)",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
          {t("login.title")}
        </h1>
        <p style={{ marginBottom: "1.5rem", opacity: 0.8 }}>
          {t("login.subtitle")}
        </p>

        {connected ? (
          <div
            style={{
              padding: "1rem",
              borderRadius: "8px",
              background: "#052e16",
              color: "#86efac",
            }}
          >
            ✅ Connected to QuantumPay Network  
            <br />
            <small>Chain ID: 77001</small>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.3rem" }}>
                {t("login.walletAddress")}
              </label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="qpay1xxxxxxxxxxxxxxxx"
                style={{
                  width: "100%",
                  padding: "0.6rem",
                  borderRadius: "6px",
                  border: "1px solid #334155",
                  background: "#020617",
                  color: "#e5e7eb",
                }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.3rem" }}>
                {t("login.password")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.6rem",
                  borderRadius: "6px",
                  border: "1px solid #334155",
                  background: "#020617",
                  color: "#e5e7eb",
                }}
              />
            </div>

            {error && (
              <div style={{ color: "#f87171", marginBottom: "0.8rem" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.7rem",
                borderRadius: "8px",
                border: "none",
                background: "#2563eb",
                color: "#ffffff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {loading ? t("login.loading") : t("login.loginButton")}
            </button>
          </form>
        )}

        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "0.75rem",
            opacity: 0.7,
          }}
        >
          {t("login.disclaimer")}
        </p>
      </div>
    </main>
  );
}
