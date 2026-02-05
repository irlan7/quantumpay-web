# ⚛️ QuantumPay Web Wallet
> **The World's First Browser-Based Post-Quantum Cryptography (PQC) Wallet Interface.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-Alpha_V2-green.svg)
![WASM](https://img.shields.io/badge/engine-WebAssembly-orange.svg)

## 🌍 Overview
QuantumPay Web is a sovereign, client-side interface that connects to the **QuantumPay Chain**. It utilizes **WebAssembly (WASM)** to generate quantum-secure identities directly in the user's browser, ensuring that private keys never touch the internet.

## 🚀 Key Features
- **🛡️ Client-Side Sovereignty:** Keys generated via WASM (Go-based logic) locally.
- **🆔 Deterministic Identity:** Advanced SHA-256 logic ensures your 12-word mnemonic always opens the same wallet address.
- **⚡ High Performance:** Connected to BadgerDB-based Go Nodes (Live Mainnet in Singapore).
- **💸 Low Gas Fees:** Dynamic fee structure (Free for VIP/Stakers, micro-fees for Global Users).

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (React)
- **Language:** TypeScript
- **Core Logic:** Go (compiled to `.wasm`)
- **Styling:** Tailwind CSS / Custom CSS

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn

### Installation
1. Clone the repo:
   ```bash
   git clone [https://github.com/irlan7/quantumpay-web.git](https://github.com/irlan7/quantumpay-web.git)
