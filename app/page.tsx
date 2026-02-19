import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"

const stats = [
  { value: "60%", label: "Cost Savings" },
  { value: "24/7", label: "Coverage" },
  { value: "100+", label: "Clients Served" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-20 pt-24 text-center sm:pt-28">
        <h1 className="max-w-4xl text-5xl leading-tight tracking-tight text-[#222222] [font-family:var(--font-heading)] sm:text-6xl">
          Professional Support. Zero Overhead.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#6b7280] [font-family:var(--font-sans)]">
          Elite virtual assistants and AI-powered reception from Latin America
          - at 60% less cost.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="/demo"
            className="inline-flex h-11 items-center justify-center rounded-sm bg-[#c8a97e] px-6 text-sm font-medium text-white transition-colors hover:bg-[#b69468]"
          >
            Book a Demo
          </a>
          <a
            href="/pricing"
            className="inline-flex h-11 items-center justify-center rounded-sm border border-[#c8a97e] px-6 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"
          >
            View Pricing
          </a>
        </div>

        <div className="mt-14 grid w-full max-w-3xl grid-cols-3 gap-6 border-t border-[#e6dbc9] pt-10">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <p className="text-3xl leading-none text-[#c8a97e] [font-family:var(--font-heading)] sm:text-4xl">
                {stat.value}
              </p>
              <p className="text-sm uppercase tracking-[0.14em] text-[#6b7280]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
