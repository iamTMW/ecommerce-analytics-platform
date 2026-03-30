import React, { useEffect, useState } from 'react';
import RevenueChart from '../components/RevenueChart';
import { MonthlyRevenue } from '../types/MonthlyRevenue';
import { WeeklyRevenue } from '../types/WeeklyRevenue';
import { RevenueSeriesRow } from '../types/RevenueSeriesRow';

type RevenueView = 'monthly' | 'weekly';

export default function RevenuePage() {
  const [view, setView] = useState<RevenueView>('monthly');
  const [rows, setRows] = useState<RevenueSeriesRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        setError(null);
        if (view === 'monthly') {
          const res = await fetch('/api/revenue/monthly', {
            headers: { Accept: 'application/json' },
            signal: controller.signal,
          });
          if (!res.ok) throw new Error('Failed to get monthly revenue');
          const payload = (await res.json()) as MonthlyRevenue[];
          setRows(
            payload.map((r) => ({
              period: r.month,
              revenue: Number(r.revenue),
            })),
          );
        } else {
          const res = await fetch('/api/revenue/weekly', {
            headers: { Accept: 'application/json' },
            signal: controller.signal,
          });
          if (!res.ok) throw new Error('Failed to get weekly revenue');
          const payload = (await res.json()) as WeeklyRevenue[];
          setRows(
            payload.map((r) => ({
              period: r.week,
              revenue: Number(r.revenue),
            })),
          );
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError(
            view === 'monthly'
              ? 'Could not load monthly revenue'
              : 'Could not load weekly revenue',
          );
        }
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [view]);

  const datasetLabel =
    view === 'monthly' ? 'Monthly revenue' : 'Weekly revenue (ISO week)';

  if (loading) return <div className="p-6 text-gray-800">Loading revenue...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Time period</span>
        <div className="inline-flex rounded-lg border border-gray-300 bg-white p-0.5 shadow-sm">
          <button
            type="button"
            onClick={() => setView('monthly')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              view === 'monthly'
                ? 'bg-teal-600 text-white shadow'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setView('weekly')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              view === 'weekly'
                ? 'bg-teal-600 text-white shadow'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Weekly
          </button>
        </div>
      </div>
      <RevenueChart rows={rows} datasetLabel={datasetLabel} />
    </div>
  );
}
