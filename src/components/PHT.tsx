import { useState, useEffect } from 'react';

export function PHT() {
  const [time, setTime] = useState<string>('');
  const [visits, setVisits] = useState<string>('128');

  // Real-time PHT clock ticker (Asia/Manila)
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

  // Fetch live visit count with persistent local fallback
  useEffect(() => {
    let isMounted = true;

    async function fetchVisits() {
      try {
        // Namespace & Key for your portfolio
        const res = await fetch(
          'https://api.countapi.xyz/hit/portfolio.ronaldrazon.com/visits'
        );
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();

        if (isMounted && data && typeof data.value === 'number') {
          setVisits(data.value.toLocaleString());
          localStorage.setItem('cached_visits', data.value.toString());
          return;
        }
      } catch (err) {
        // Fallback to local storage or incremental base if network/CORS fails
        if (isMounted) {
          const cached = localStorage.getItem('cached_visits');
          if (cached) {
            setVisits(Number(cached).toLocaleString());
          }
        }
      }
    }

    fetchVisits();

    return () => {
      isMounted = false;
    };
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
      <span className="text-neutral-600">·</span>
      <span>
        <strong className="font-semibold text-neutral-200">{visits}</strong> visits
      </span>
    </div>
  );
}