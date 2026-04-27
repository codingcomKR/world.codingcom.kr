import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 flex flex-col items-center justify-center p-6 font-sans">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <main className={`relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">System Online</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/50">
            Hello, <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Supabase & Vercel!</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
            Welcome to your next-generation web application. Powered by <span className="text-white font-medium">React 19</span>, 
            styled with <span className="text-white font-medium">Tailwind CSS 4</span>, and optimized for performance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
            <button className="group relative px-8 py-4 bg-white text-black font-semibold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </button>
            <button className="px-8 py-4 bg-white/5 text-white font-semibold rounded-2xl border border-white/10 hover:bg-white/10 transition-all active:scale-95 backdrop-blur-sm">
              Documentation
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-20 border-t border-white/5">
            {[
              { label: 'Frontend', value: 'React 19' },
              { label: 'Styling', value: 'Tailwind 4' },
              { label: 'Backend', value: 'Supabase' },
              { label: 'Deploy', value: 'Vercel' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">{stat.label}</div>
                <div className="text-sm font-semibold text-zinc-200">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-8 left-0 right-0 z-10 text-center">
        <p className="text-zinc-600 text-xs tracking-widest uppercase">
          &copy; 2026 Codingcom.kr &bull; Built with Passion
        </p>
      </footer>
    </div>
  )
}

export default App
