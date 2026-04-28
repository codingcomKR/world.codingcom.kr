import { useEffect, useState } from 'react';
import VirtualWorldRenderer from './components/VirtualWorldRenderer';

export default function App() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/virtual-campus')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
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

  if (loading) return <div className="flex h-screen items-center justify-center bg-slate-950 text-cyan-400 font-bold text-xl">데이터 동기화 중... 🚀</div>;
  if (error) return <div className="flex h-screen items-center justify-center bg-slate-950 text-rose-400 font-bold text-xl">에러 발생: {error}</div>;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#164e63_0%,#020617_48%,#020617_100%)] p-8 flex items-center justify-center">
      <VirtualWorldRenderer data={data} />
    </div>
  );
}