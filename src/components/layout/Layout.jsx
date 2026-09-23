import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  )
}
