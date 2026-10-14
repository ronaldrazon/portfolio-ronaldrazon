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

  // Fetch live stats from Counter.dev via proxy
  useEffect(() => {
    let isMounted = true;

    async function fetchVisits() {
      try {
        const targetUrl = encodeURIComponent('https://counter.dev/api/v1/7b795f10-9616-476e-9bb8-5874e3acb7aa/summary');
        const res = await fetch(`https://corsproxy.io/?${targetUrl}`);
        if (!res.ok) throw new Error('Proxy fetch failed');

        const data = await res.json();
        const total = data?.pageviews ?? data?.visitors ?? data?.count;

        if (isMounted && total !== undefined && total !== null) {
          setVisits(Number(total).toLocaleString());
          localStorage.setItem('cached_visits', total.toString());
        }
      } catch (err) {
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