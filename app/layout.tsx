import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Coda',
  description: 'Weekly commentary on world affairs — China, Singapore, Europe',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <header className="border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-2xl mx-auto px-6 py-5 flex items-baseline justify-between">
            <a href="/" className="text-xl font-semibold tracking-tight" style={{ fontFamily: 'sans-serif', color: 'var(--fg)', textDecoration: 'none' }}>
              Coda
            </a>
            <nav className="flex gap-6 text-sm" style={{ fontFamily: 'sans-serif', color: 'var(--muted)' }}>
              <a href="/" className="hover:text-black transition-colors" style={{ textDecoration: 'none' }}>文章</a>
              <a href="/about" className="hover:text-black transition-colors" style={{ textDecoration: 'none' }}>关于</a>
            </nav>
          </div>
        </header>
        <main className="max-w-2xl mx-auto px-6 py-12">
          {children}
        </main>
        <footer className="border-t mt-20" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-2xl mx-auto px-6 py-8 text-sm" style={{ fontFamily: 'sans-serif', color: 'var(--muted)' }}>
            Coda — 每周时事评论 · Weekly Commentary
          </div>
        </footer>
      </body>
    </html>
  )
}
