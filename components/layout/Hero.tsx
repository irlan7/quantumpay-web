export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-black text-white px-6">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black opacity-90" />

      <div className="relative z-10 max-w-5xl text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          QuantumPay
        </h1>

        <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto">
          Next-Generation Blockchain Payment Infrastructure.  
          Secure. Scalable. Quantum-Ready.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#technology"
            className="rounded-xl bg-white px-8 py-3 text-black font-semibold transition hover:bg-zinc-200"
          >
            Explore Technology
          </a>

          <a
            href="/roadmap"
            className="rounded-xl border border-zinc-700 px-8 py-3 font-semibold text-white transition hover:bg-zinc-800"
          >
            View Roadmap
          </a>
        </div>

        <div className="mt-12 text-sm text-zinc-500">
          Built for enterprises, institutions, and the future of global payments
        </div>
      </div>
    </section>
  );
}
