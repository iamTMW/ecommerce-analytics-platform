import React, { useEffect, useState } from 'react';
import RevenueChart from '../components/RevenueChart';
import { MonthlyRevenue } from '../types/MonthlyRevenue';

export default function RevenuePage() {
  const [rows, setRows] = useState<MonthlyRevenue[]>([]);
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
        let url = '/api/revenue/monthly';
        const params = [];
        if (startDate)
          params.push(`startDate=${encodeURIComponent(startDate)}`);
        if (endDate) params.push(`endDate=${encodeURIComponent(endDate)}`);
        if (params.length) url += `?${params.join('&')}`;
        const res = await fetch(url, {
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
  }, [startDate, endDate]);

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="start-date"
          >
            Start Date
          </label>
          <input
            id="start-date"
            type="date"
            className="border rounded px-2 py-1"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            max={endDate || undefined}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="end-date">
            End Date
          </label>
          <input
            id="end-date"
            type="date"
            className="border rounded px-2 py-1"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || undefined}
          />
        </div>
        {(startDate || endDate) && (
          <button
            className="ml-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            onClick={() => {
              setStartDate('');
              setEndDate('');
            }}
            type="button"
          >
            Clear Dates
          </button>
        )}
      </div>
      {loading ? (
        <div>Loading revenue...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <RevenueChart rows={rows} />
      )}
    </div>
  );
}
