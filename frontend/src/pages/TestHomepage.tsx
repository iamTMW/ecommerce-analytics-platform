import React, { useEffect, useState } from 'react';
import RevenueChart from '../components/RevenueChart';
import { MonthlyRevenue } from '../types/MonthlyRevenue';

export default function TestHomepage() {
  const startDate = '2011-01-01';
  const endDate = '2011-12-31';
  const [rows, setRows] = useState<MonthlyRevenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    // eslint-disable-next-line
  }, [startDate, endDate]);

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Overview</h3>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded border border-gray-200">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-800">$45,230</p>
        </div>
        <div className="bg-white p-4 rounded border border-gray-200">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold text-gray-800">1,240</p>
        </div>
        <div className="bg-white p-4 rounded border border-gray-200">
          <p className="text-sm text-gray-600">Active Customers</p>
          <p className="text-2xl font-bold text-gray-800">523</p>
        </div>
      </div>
      <h4 className="text-md font-semibold mb-2 text-black">
        This Years Revenue
      </h4>
      {loading ? (
        <div className="text-neutral-500">Loading revenue...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <RevenueChart rows={rows} />
      )}
    </div>
  );
}
