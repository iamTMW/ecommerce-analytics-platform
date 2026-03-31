import React, { useEffect, useState } from 'react';
import RevenueChart from '../components/RevenueChart';
import { MonthlyRevenue } from '../types/MonthlyRevenue';
import { WeeklyRevenue } from '../types/WeeklyRevenue';
import { RevenueSeriesRow } from '../types/RevenueSeriesRow';

type RevenueView = 'monthly' | 'weekly';

function buildQueryParams(startDate: string, endDate: string): string {
  const params: string[] = [];
  if (startDate) params.push(`startDate=${encodeURIComponent(startDate)}`);
  if (endDate) params.push(`endDate=${encodeURIComponent(endDate)}`);
  return params.length ? `?${params.join('&')}` : '';
}

export default function RevenuePage() {
  const [view, setView] = useState<RevenueView>('monthly');
  const [rows, setRows] = useState<RevenueSeriesRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const q = buildQueryParams(startDate, endDate);
        if (view === 'monthly') {
          const res = await fetch(`/api/revenue/monthly${q}`, {
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
          const res = await fetch(`/api/revenue/weekly${q}`, {
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
  }, [view, startDate, endDate]);

  const datasetLabel =
    view === 'monthly' ? 'Monthly revenue' : 'Weekly revenue (ISO week)';

  return (
    <div className="p-6">
      <div className="mb-4 flex flex-wrap gap-4 items-end">
        <div>
          <label
            className="block text-sm font-medium mb-1 text-gray-800"
            htmlFor="start-date"
          >
            Start date
          </label>
          <input
            id="start-date"
            type="date"
            className="border border-gray-300 rounded px-2 py-1 text-gray-900"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            max={endDate || undefined}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1 text-gray-800"
            htmlFor="end-date"
          >
            End date
          </label>
          <input
            id="end-date"
            type="date"
            className="border border-gray-300 rounded px-2 py-1 text-gray-900"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || undefined}
          />
        </div>
        {(startDate || endDate) && (
          <button
            className="ml-2 px-3 py-1.5 bg-gray-200 rounded hover:bg-gray-300 text-sm text-gray-800"
            onClick={() => {
              setStartDate('');
              setEndDate('');
            }}
            type="button"
          >
            Clear dates
          </button>
        )}
      </div>

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

      {loading ? (
        <div className="text-gray-800">Loading revenue...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <RevenueChart rows={rows} datasetLabel={datasetLabel} />
      )}
    </div>
  );
}
