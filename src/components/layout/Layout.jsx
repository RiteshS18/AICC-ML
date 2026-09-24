import Navbar from './Navbar'
import ScrollProgress from '../ui/ScrollProgress'

export default function Layout({ children }) {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  )
}
