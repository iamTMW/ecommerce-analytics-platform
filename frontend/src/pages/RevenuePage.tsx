import React, { useEffect, useState } from 'react';
import RevenueChart from '../components/RevenueChart';
import { MonthlyRevenue } from '../types/MonthlyRevenue';

export default function RevenuePage() {
  const [rows, setRows] = useState<MonthlyRevenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        setError(null);
        // todo: change endpoint when branch complete
        const res = await fetch('/api/revenue/monthly', {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        });

        if (!res.ok) throw new Error('Failed to get monthly revenue');
        const payload = (await res.json()) as MonthlyRevenue[];
        setRows(payload);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError('Could not load monthly revenue');
        }
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, []);
  if (loading) return <div className="p-6">Loading revenue...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  return (
    <div className="p-6">
      <RevenueChart rows={rows} />
    </div>
  );
}
