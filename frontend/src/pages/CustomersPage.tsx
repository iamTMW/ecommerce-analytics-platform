import React, { useEffect, useState } from "react";
import TopProductsBarChart from "../components/TopProductsBarChart";
import { ProductRevenue } from "../types/ProductRevenue";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<ProductRevenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [max, setMax] = useState<string>("10");

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        setError(null);
        let url = "/api/customers/top";
        const params = [];
        if (max) params.push(`max=${encodeURIComponent(max)}`);
        if (params.length) url += `?${params.join("&")}`;
        const res = await fetch(url, {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to get top customers");
        const payload = (await res.json()) as ProductRevenue[];
        setCustomers(payload);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Could not load top customers");
        }
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [max]);

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="max-customers"
          >
            Max Customers
          </label>
          <input
            id="max-customers"
            type="number"
            className="border rounded px-2 py-1"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            min="1"
          />
        </div>
        {max !== "10" && (
          <button
            className="ml-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            onClick={() => setMax("10")}
            type="button"
          >
            Reset to 10
          </button>
        )}
      </div>
      {loading ? (
        <div>Loading customers...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <TopProductsBarChart
          products={customers}
          title="Top Customers by Revenue"
          max={parseInt(max) || 10}
        />
      )}
    </div>
  );
}