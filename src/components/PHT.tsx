import { useState, useEffect } from 'react';

export function PHT() {
  const [time, setTime] = useState<string>('');
  const [visits, setVisits] = useState<string | null>(null);

  // Time ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(now);

      setTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch visit count as a number
  useEffect(() => {
    fetch('https://hits.sh/portfolio.ronaldrazon.com.json')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.hits) {
          setVisits(data.hits.toLocaleString());
        }
      })
      .catch(() => {
        // Fallback silently if API is unreachable
      });
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span>
        <strong className="font-semibold text-neutral-200">{time || 'Loading...'}</strong> in the Philippines
      </span>
      {visits && (
        <>
          <span className="text-neutral-600">·</span>
          <span>
            <strong className="font-semibold text-neutral-200">{visits}</strong> visits
          </span>
        </>
      )}
    </div>
  );
}