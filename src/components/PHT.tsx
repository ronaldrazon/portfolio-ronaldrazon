import { useState, useEffect } from 'react';

export function PHT() {
  const [time, setTime] = useState<string>('');
  const [visits, setVisits] = useState<string | null>(null);

  // Real-time PHT clock ticker
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

  // Fetch live visits count from hits.sh API
  useEffect(() => {
    let isMounted = true;

    async function fetchVisits() {
      try {
        const response = await fetch('https://hits.sh/portfolio.ronaldrazon.com.json', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) throw new Error('API fetch failed');

        const data = await response.json();
        const count = data?.hits ?? data?.value ?? data?.count;

        if (isMounted && count !== undefined) {
          setVisits(Number(count).toLocaleString());
        }
      } catch (error) {
        // Fallback display if API endpoint is restricted or offline
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