import { useEffect, useState } from 'react';

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
      <div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white">
        <h1 className="text-2xl font-bold animate-pulse">데이터 불러오는 중... 🚀</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-red-900 text-white">
        <h1 className="text-2xl font-bold">에러 발생: {error}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white mb-6">Virtual Campus API 연동 성공! 🎉</h1>
      <pre className="bg-gray-800 text-green-400 p-6 rounded-lg shadow-xl overflow-auto max-w-4xl w-full font-mono text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}