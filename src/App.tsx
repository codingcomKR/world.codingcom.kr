import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsVisible(true)
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/virtual-campus')
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching data:', error)
      setData({ error: 'Failed to fetch data' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 flex flex-col items-center justify-center p-6 font-sans">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <main className={`relative z-10 w-full max-w-4xl transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">System Online</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/50">
            Virtual Campus <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">API Live Data</span>
          </h1>

          <div className="relative mt-8 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8 min-h-[300px] flex items-center justify-center overflow-hidden">
              {loading ? (
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                  <p className="text-zinc-400 animate-pulse">데이터 불러오는 중...</p>
                </div>
              ) : (
                <div className="w-full text-left overflow-auto max-h-[500px] scrollbar-thin scrollbar-thumb-white/10">
                  <pre className="text-sm md:text-base font-mono text-emerald-400/90 leading-relaxed">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-white/5">
            {[
              { label: 'Frontend', value: 'React 19' },
              { label: 'Backend', value: 'Vercel Function' },
              { label: 'Status', value: loading ? 'Loading' : 'Ready' },
              { label: 'API', value: 'External Proxy' }
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
