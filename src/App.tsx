import { useEffect, useState } from 'react';
import VirtualWorldRenderer from './VirtualWorldRenderer';

export default function App() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/virtual-campus')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0a0a0a] text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          <h1 className="text-xl font-bold tracking-widest text-cyan-400 animate-pulse uppercase">Initialising System... 🚀</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-red-950 text-white">
        <div className="p-8 border-2 border-red-500 rounded-2xl bg-black/50 backdrop-blur-xl text-center">
          <h1 className="text-2xl font-black text-red-500 uppercase mb-4 tracking-tighter">System Error Detected</h1>
          <p className="text-red-200/60 font-mono text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <VirtualWorldRenderer data={data} />
  );
}