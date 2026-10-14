import { useState, useEffect } from 'react';

export function PHT() {
  const [time, setTime] = useState<string>('');
  const [visits, setVisits] = useState<string | null>(null);

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

  // Fetch & increment live visit count via CounterAPI
  useEffect(() => {
    let isMounted = true;

    async function fetchVisits() {
      try {
        // Hits CounterAPI for your domain portfolio.ronaldrazon.com
        const response = await fetch(
          'https://api.counterapi.dev/v1/portfolio.ronaldrazon.com/visits/up'
        );

        if (!response.ok) throw new Error('CounterAPI request failed');

        const data = await response.json();
        
        // Response format: { "count": 124 }
        if (isMounted && data && data.count !== undefined) {
          setVisits(Number(data.count).toLocaleString());
        }
      } catch (error) {
        if (isMounted) {
          setVisits(null);
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