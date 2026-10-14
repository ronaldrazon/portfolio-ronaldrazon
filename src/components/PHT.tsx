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

  // Fetch live visit count from your local Vercel serverless function
  useEffect(() => {
    let isMounted = true;

    async function fetchVisits() {
      try {
        const res = await fetch('/api/visits');
        if (!res.ok) throw new Error('API offline');

        const data = await res.json();
        if (isMounted && data?.visits) {
          setVisits(Number(data.visits).toLocaleString());
        }
      } catch (err) {
        // Fallback silently to default baseline
      }
    }

    fetchVisits();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex items-center text-xs font-mono text-neutral-400">
      <span className="relative flex h-2 w-2 mr-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span>
        <strong className="font-semibold text-neutral-200">{time || 'Loading...'}</strong> in the Philippines
      </span>
      <span>{' · '}</span>
      <span>
        <strong className="font-semibold text-neutral-200">{visits}</strong> visits
      </span>
    </div>
  );
}