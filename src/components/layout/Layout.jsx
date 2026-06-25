import Sidebar from './Sidebar'

export default function Layout({ children }) {
  return (
    <>
      <Sidebar />
      <main className="md:ml-[72px] mb-[64px] md:mb-0 min-h-screen">
        {children}
      </main>
    </>
  )
}
